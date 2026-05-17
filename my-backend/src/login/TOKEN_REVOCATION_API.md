# API Token Revocation System - Tài liệu Thiết Kế

## Tổng Quan

Hệ thống quản lý token revocation được xây dựng trên NestJS, cho phép:
- ✅ Logout an toàn với token revocation
- ✅ Refresh tokens (token rotation)
- ✅ Logout từ tất cả devices
- ✅ Token blacklist management
- ✅ Tự động cleanup tokens hết hạn

## Kiến Trúc

### 1. **Schema - Token Blacklist** (`token-blacklist.schema.ts`)
```typescript
- token: string (unique, indexed)
- user_id: string
- email: string
- revoked_at: Date
- expires_at: Date (TTL index for auto-cleanup)
- reason: string ('logout', 'password_changed', 'security_issue', etc.)
```

### 2. **Services**

#### `JwtUtilsService`
- Quản lý JWT generation và verification
- 2 loại tokens:
  - **Access Token**: 1 ngày (dùng cho API requests)
  - **Refresh Token**: 30 ngày (dùng để lấy token mới)

```typescript
generateAccessToken(userId, email, role)    // 1d
generateRefreshToken(userId, email, role)   // 30d
verifyToken(token)                          // Xác minh & decode
getTokenExpirationDate(token)               // Lấy thời gian hết hạn
```

#### `TokenBlacklistService`
- Quản lý token blacklist operations
```typescript
revokeToken(token, userId, email, expiresAt, reason)
isTokenBlacklisted(token)                   // Kiểm tra token bị revoke?
revokeAllUserTokens(userId)                 // Logout tất cả devices
cleanExpiredTokens()                        // Cleanup hết hạn
```

### 3. **Guards - JwtAuthGuard**
- Kiểm tra JWT token
- Xác minh token không bị revoke
- Attach user info vào request

### 4. **API Endpoints**

#### `POST /auth/login` - Đăng nhập
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": {
    "id": "645...",
    "email": "user@example.com",
    "user_name": "thanhha",
    "role": "learner"
  }
}
```

#### `POST /auth/register` - Đăng ký
```json
Request:
{
  "name": "Thanh Ha",
  "email": "user@example.com",
  "password": "password123"
}

Response (201):
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": { ... }
}
```

#### `POST /auth/refresh` - Refresh Access Token
```json
Request:
{
  "refresh_token": "eyJhbGc..."
}

Response (200):
{
  "access_token": "eyJhbGM...",      // Token mới
  "refresh_token": "eyJhbGQ...",     // Token mới (rotated)
  "expires_in": 86400                // 1 day in seconds
}

Việc refresh sẽ revoke token cũ (token rotation)
```

#### `POST /auth/logout` - Logout
```json
Request Headers:
Authorization: Bearer eyJhbGc...

Response (200):
{
  "success": true,
  "message": "ログアウトしました"
}

Token được thêm vào blacklist
```

#### `POST /auth/revoke` - Revoke Token Hiện Tại
```json
Request Headers:
Authorization: Bearer eyJhbGc...

Body (optional):
{
  "reason": "security_issue"  // 'logout', 'password_changed', etc.
}

Response (200):
{
  "success": true,
  "message": "Token successfully revoked",
  "revoked_at": "2026-05-17T10:30:00Z"
}
```

#### `POST /auth/revoke-all` - Logout Tất Cả Devices
```json
Request Headers:
Authorization: Bearer eyJhbGc...

Response (200):
{
  "success": true,
  "message": "All tokens revoked successfully",
  "tokens_revoked": 5,
  "revoked_at": "2026-05-17T10:30:00Z"
}

Tất cả tokens của user được revoke
```

## 🔄 Token Flow

### Login Flow
```
1. User gửi login request
2. Server verify email/password
3. Server tạo 2 tokens:
   - access_token (1 day) → dùng cho API
   - refresh_token (30 days) → dùng để lấy token mới
4. Trả về cả 2 tokens
```

### API Request Flow
```
1. Client gửi request với: Authorization: Bearer {access_token}
2. JwtAuthGuard kiểm tra:
   - Token format đúng?
   - Token signature hợp lệ?
   - Token hết hạn?
   - Token bị revoke?
3. Nếu OK: attach user info vào request
4. Route handler xử lý
```

### Refresh Token Flow
```
1. Access token hết hạn
2. Client gửi: refresh_token
3. Server verify refresh_token:
   - Signature hợp lệ?
   - Hết hạn?
   - Bị revoke?
4. Nếu OK:
   - Revoke token cũ (prevent reuse)
   - Tạo tokens mới
   - Trả về token mới
```

### Logout Flow
```
1. Client gửi: POST /auth/logout với access_token
2. Server:
   - Verify token hợp lệ
   - Thêm token vào blacklist (expires_at = token's expiration)
   - Trả về success message
3. Token không thể dùng nữa
```

## 🔐 Security Features

### 1. **Token Rotation**
- Refresh token được rotate mỗi lần refresh
- Token cũ tự động revoke
- Ngăn token reuse attacks

### 2. **Automatic Cleanup**
- TTL index tự động xóa entries hết hạn
- Scheduled task chạy mỗi đêm
- Tiết kiệm database storage

### 3. **Blacklist Checking**
- Mỗi request kiểm tra token có bị revoke
- Logout không cần client delete token
- Logout từ tất cả devices

### 4. **Multiple Revoke Reasons**
- `logout`: User logout bình thường
- `password_changed`: Password thay đổi
- `security_issue`: Phát hiện suspicious activity
- `token_rotation`: Token rotation khi refresh
- `manual`: Manual revoke

## 📝 Sử Dụng

### Frontend - TypeScript Example

```typescript
// 1. Login
const loginResponse = await fetch('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

const { access_token, refresh_token, user } = await loginResponse.json();

// Lưu tokens (localStorage hoặc secure cookie)
localStorage.setItem('accessToken', access_token);
localStorage.setItem('refreshToken', refresh_token);

// 2. API Request with Token
const response = await fetch('/api/protected-route', {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
});

// 3. Refresh Token (khi access_token hết hạn)
const refreshResponse = await fetch('/auth/refresh', {
  method: 'POST',
  body: JSON.stringify({ refresh_token })
});

const { access_token: newAccessToken, refresh_token: newRefreshToken } = 
  await refreshResponse.json();

// Update tokens
localStorage.setItem('accessToken', newAccessToken);
localStorage.setItem('refreshToken', newRefreshToken);

// 4. Logout
const logoutResponse = await fetch('/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
});

// Clear tokens
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
```

### Backend - Protecting Routes

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './login/guards/jwt-auth.guard.js';
import { CurrentUser, CurrentToken } from './login/decorators/auth.decorators.js';

@Controller('api')
export class ProtectedController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    return {
      id: user.userId,
      email: user.email,
      role: user.role
    };
  }
  
  @Post('revoke-all-devices')
  @UseGuards(JwtAuthGuard)
  async revokeAllDevices(@CurrentToken() token: string) {
    return this.loginService.revokeAllTokens(token);
  }
}
```

## 🚀 Setup Hướng Dẫn

### 1. Install Dependencies
```bash
npm install @nestjs/schedule
```

### 2. Enable Schedule Module (app.module.ts)
```typescript
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // ... other imports
  ]
})
export class AppModule {}
```

### 3. Register TokenCleanupTask
```typescript
// app.module.ts
import { TokenCleanupTask } from './login/tasks/token-cleanup.task.js';

@Module({
  providers: [TokenCleanupTask],
})
export class AppModule {}
```

## 📊 Database

### TokenBlacklist Collection
```json
{
  "_id": ObjectId,
  "token": "eyJhbGc...",
  "user_id": "645...",
  "email": "user@example.com",
  "revoked_at": ISODate("2026-05-17T10:30:00Z"),
  "expires_at": ISODate("2026-05-18T10:30:00Z"),
  "reason": "logout",
  "created_at": ISODate("2026-05-17T10:30:00Z"),
  "updated_at": ISODate("2026-05-17T10:30:00Z")
}
```

### Indexes
```
- token: unique index (for fast lookup)
- expires_at: TTL index (auto-delete after expiration)
- user_id: index (for user logout all)
```

## 🔄 Migration Guide (Nếu có hệ thống cũ)

### Từ stateless JWT sang Token Blacklist
```typescript
// 1. Tạo TokenBlacklist collection
// 2. Update login.service.ts
// 3. Add JwtAuthGuard vào protected routes
// 4. Client: implement refresh token handling
// 5. Test logout functionality
```

## ⚠️ Lưu Ý

1. **Token Storage**
   - ❌ Không lưu token trong localStorage (XSS vulnerable)
   - ✅ Dùng HttpOnly cookies hoặc secure storage
   - ✅ Hoặc implement in-memory storage + refresh endpoint

2. **Refresh Token Security**
   - Refresh token nên expire lâu hơn access token
   - Implement refresh token rotation
   - Có thể store refresh tokens trong secure database

3. **Performance**
   - Token blacklist lookup là O(1) do index
   - TTL index tự động cleanup
   - Không ảnh hưởng tới performance

4. **CORS**
   - Ensure CORS headers cho refresh endpoint
   - Cookie-based setup: credentials: 'include'

## 📚 Tham Khảo

- [JWT.io](https://jwt.io) - JWT spec
- [NestJS Docs](https://docs.nestjs.com) - NestJS
- [OWASP - Session Management](https://owasp.org/www-community/attacks/Session_fixation)
