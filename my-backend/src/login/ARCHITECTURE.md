# Architecture Diagram - Token Revocation System

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Frontend)                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Next.js App with AuthContext                            │   │
│  │  - Login/Register screens                                │   │
│  │  - Protected routes                                      │   │
│  │  - Token storage & refresh logic                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────┬─────────────────────────────────────────────────┘
                 │ HTTP Requests with JWT Bearer Token
                 │
┌────────────────▼─────────────────────────────────────────────────┐
│                    BACKEND (NestJS Server)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              LoginController (Router)                     │   │
│  │  POST /auth/login           → login endpoint             │   │
│  │  POST /auth/register        → register endpoint          │   │
│  │  POST /auth/refresh         → refresh token              │   │
│  │  POST /auth/logout          → logout & revoke            │   │
│  │  POST /auth/revoke          → revoke token               │   │
│  │  POST /auth/revoke-all      → revoke all tokens          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ▲                                    │
│                              │                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              LoginService (Business Logic)                │   │
│  │  - validateUser()                                         │   │
│  │  - login()         → generate tokens                      │   │
│  │  - register()      → create user + tokens                │   │
│  │  - refreshToken()  → rotate tokens                       │   │
│  │  - revokeToken()   → add to blacklist                    │   │
│  │  - revokeAllTokens() → logout all devices               │   │
│  │  - logout()        → revoke + return message             │   │
│  └──────────────────────────────────────────────────────────┘   │
│      ▲               ▲                       ▲                   │
│      │               │                       │                   │
│  ┌───────────┐  ┌───────────────────┐  ┌──────────────────┐    │
│  │  User     │  │ JwtUtilsService   │  │TokenBlacklistSrv │   │
│  │ Database  │  │ - generate tokens │  │ - revokeToken()  │   │
│  │(MongoDB)  │  │ - verify token    │  │ - isBlacklisted()│   │
│  │           │  │ - get expiration  │  │ - cleanExpired() │   │
│  └───────────┘  └───────────────────┘  └──────────────────┘   │
│      ▲                                           ▲               │
│      │                                           │               │
│      │                     ┌─────────────────────┘               │
│      │                     ▼                                     │
│      │          ┌──────────────────────┐                       │
│      │          │ JwtAuthGuard         │                       │
│      │          │ - extract token      │                       │
│      │          │ - verify signature   │                       │
│      │          │ - check blacklist    │                       │
│      │          │ - attach user info   │                       │
│      │          └──────────────────────┘                       │
│      │                     ▲                                     │
│      │                     │                                     │
│      │    ┌────────────────┴───────────────────┐               │
│      │    │ (Protects all /api/* routes)       │               │
│      │    └────────────────────────────────────┘               │
└──────────────────────────────────────────────────────────────────┘
       │                                        │
       │ Write User                             │ Manage TokenBlacklist
       │                                        │
┌──────▼────────────────────────────────────────▼───────────────┐
│                   MongoDB Database                             │
│  ┌──────────────┐              ┌──────────────────────────┐   │
│  │ Users        │              │ TokenBlacklists          │   │
│  │ - _id        │              │ - token (unique)         │   │
│  │ - email      │              │ - user_id (indexed)      │   │
│  │ - user_name  │              │ - email                  │   │
│  │ - password   │              │ - revoked_at             │   │
│  │ - role       │              │ - expires_at (TTL idx)   │   │
│  │ - timestamps │              │ - reason                 │   │
│  └──────────────┘              └──────────────────────────┘   │
│                                                                 │
│  TTL Index on expires_at: Automatically deletes expired docs   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Token Lifecycle

```
┌─────────┐
│  Login  │
└────┬────┘
     │
     ▼
┌─────────────────────────────────────┐
│ Generate Tokens:                    │
│ - Access Token (1 day)              │
│ - Refresh Token (30 days)           │
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ Return to Client:                   │
│ - Tokens stored securely            │
│ - User data returned                │
└────┬────────────────────────────────┘
     │
     ├─── Access Token Valid ─┐
     │                        ▼
     │              ┌──────────────────────┐
     │              │ API Request          │
     │              │ (with access token)  │
     │              └──────┬───────────────┘
     │                     │
     │              ┌──────▼───────────────┐
     │              │ JwtAuthGuard:        │
     │              │ ✓ Verify token       │
     │              │ ✓ Check blacklist    │
     │              │ ✓ Check expiration   │
     │              │ → Grant access       │
     │              └──────────────────────┘
     │
     ├─── Access Token Expires ─┐
     │                          ▼
     │                  ┌──────────────────────┐
     │                  │ Refresh Token Flow:  │
     │                  │ 1. Send refresh_tkn  │
     │                  │ 2. Verify it         │
     │                  │ 3. Revoke old token  │
     │                  │ 4. Generate new pair │
     │                  │ 5. Return to client  │
     │                  └──────────────────────┘
     │
     └─── User Logout ─┐
                       ▼
              ┌──────────────────────┐
              │ Revocation Flow:     │
              │ 1. Verify token      │
              │ 2. Get expiration    │
              │ 3. Add to blacklist  │
              │ 4. Return success    │
              └──────────────────────┘
                       │
                       ▼
              ┌──────────────────────┐
              │ Token Blacklist:     │
              │ - Stored in DB       │
              │ - Checked on request │
              │ - Auto-deleted by    │
              │   TTL after expiry   │
              └──────────────────────┘
```

## 🛡️ Request Flow with Authentication

```
┌─────────────────────────────────────────────────────────────┐
│ Protected Route: GET /api/users/profile                    │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Request Header Check:                                       │
│ Authorization: Bearer {token}?                              │
│ ✓ Yes → Continue                                            │
│ ✗ No → Reject with 401 Unauthorized                        │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Extract Token from Bearer:                                  │
│ token = authHeader.substring(7)                             │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Check Token in Blacklist:                                   │
│ SELECT * FROM tokenblacklists WHERE token = ?              │
│ ✓ Not in blacklist → Continue                              │
│ ✗ In blacklist → Reject with 401 (Token revoked)          │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Verify JWT Signature:                                       │
│ jwt.verify(token, JWT_SECRET)                               │
│ ✓ Valid signature → Continue                                │
│ ✗ Invalid signature → Reject with 401                      │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Check Token Expiration:                                     │
│ now < token.exp?                                            │
│ ✓ Not expired → Continue                                    │
│ ✗ Expired → Reject with 401 (Expired)                      │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Extract Payload:                                            │
│ {                                                           │
│   sub: user_id,                                             │
│   email: user_email,                                        │
│   role: user_role,                                          │
│   type: 'access'                                            │
│ }                                                           │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ Attach to Request:                                          │
│ req.user = {                                                │
│   userId: payload.sub,                                      │
│   email: payload.email,                                     │
│   role: payload.role                                        │
│ }                                                           │
│ req.token = token                                           │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ ✅ Grant Access to Route Handler                            │
│ → Handler receives req.user & req.token                     │
│ → Can use for authorization checks                          │
│ → Can revoke token if needed                                │
└─────────────────────────────────────────────────────────────┘
```

## 🔀 Token Refresh (Rotation) Flow

```
Client                              Server
  │                                  │
  │─── POST /auth/refresh ──────────>│
  │     { refresh_token: xxx }       │
  │                                  │
  │                        ┌─────────▼─────────┐
  │                        │ Verify Token      │
  │                        │ - Check signature │
  │                        │ - Check type      │
  │                        │ - Check blacklist │
  │                        │ - Check expiry    │
  │                        └────────┬──────────┘
  │                                 │
  │                        ┌────────▼──────────┐
  │                        │ Is Valid?         │
  │                        │ ✓ Yes → Continue  │
  │                        │ ✗ No → Reject     │
  │                        └────────┬──────────┘
  │                                 │
  │                        ┌────────▼──────────┐
  │                        │ Revoke Old Token  │
  │                        │ → Add to blacklist│
  │                        │ → Store reason    │
  │                        └────────┬──────────┘
  │                                 │
  │                        ┌────────▼──────────┐
  │                        │ Generate New:     │
  │                        │ - access_token    │
  │                        │ - refresh_token   │
  │                        └────────┬──────────┘
  │                                 │
  │<── { access, refresh, expires }─┤
  │                                  │
  └─ Update Local Storage           │
     Save new tokens               │
```

## 📊 Sequence Diagram - Login to API Call

```
User    Client    Backend   Guard    Service   DB
 │        │          │        │        │        │
 │ Login  │          │        │        │        │
 ├──────>│          │        │        │        │
 │        │ POST /auth/login │        │        │
 │        ├─────────>│        │        │        │
 │        │          │ validateUser() │        │
 │        │          ├───────────────────────>│
 │        │          │        │        │ Find user
 │        │          │        │        │<──────┤
 │        │          │ Generate tokens│        │
 │        │          ├─ accessToken   │        │
 │        │          ├─ refreshToken  │        │
 │        │          │<────────────────────────┤
 │        │ {tokens} │        │        │        │
 │        │<─────────┤        │        │        │
 │<────── │          │        │        │        │
 │ Save tokens       │        │        │        │
 │                   │        │        │        │
 │ API Request       │        │        │        │
 ├──────────────────────────>│        │        │
 │        Auth: Bearer token            │        │
 │        │          │ @UseGuards      │        │
 │        │          │ JwtAuthGuard    │        │
 │        │          ├──────>│        │        │
 │        │          │        │ Extract token  │
 │        │          │        │ Verify sig     │
 │        │          │        │ Check blacklist│
 │        │          │        ├──────────────>│
 │        │          │        │ Found?        │
 │        │          │        │        No
 │        │          │        │<──────────────┤
 │        │          │        │ Attach user   │
 │        │          │<──────┤        │
 │        │          │ Handler access  │
 │        │          ├──────────────────────>│
 │        │          │        │        │ Query data
 │        │          │        │        │<──────┤
 │        │ Response │        │        │        │
 │        │<─────────┤        │        │        │
 │<────── │          │        │        │        │
```

## 🔐 Security Model

```
┌─────────────────────────────────────────────────────┐
│ Token Revocation Security Features                  │
│                                                     │
│ 1. STATEFUL VALIDATION                             │
│    ├─ Every request checks token in DB             │
│    ├─ Prevents token replay after logout           │
│    ├─ Supports multi-device logout                 │
│    └─ Better than pure stateless JWT               │
│                                                     │
│ 2. TOKEN ROTATION                                  │
│    ├─ Refresh token rotated on each use            │
│    ├─ Old refresh tokens revoked                   │
│    ├─ Prevents token fixation attacks              │
│    └─ Reduces compromise window                    │
│                                                     │
│ 3. AUTOMATIC CLEANUP                               │
│    ├─ TTL index on expires_at                      │
│    ├─ Revoked tokens deleted after expiry          │
│    ├─ Reduces database size                        │
│    └─ Optional scheduled cleanup                   │
│                                                     │
│ 4. MULTIPLE REVOKE REASONS                         │
│    ├─ logout - user logout                         │
│    ├─ password_changed - admin action              │
│    ├─ security_issue - suspicious activity         │
│    ├─ token_rotation - automatic rotation          │
│    └─ manual - explicit revocation                 │
│                                                     │
│ 5. BLACKLIST INDEXING                              │
│    ├─ Unique index on token field                  │
│    ├─ Index on user_id for bulk operations         │
│    ├─ TTL index on expires_at                      │
│    └─ Fast O(1) lookup on request                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```
