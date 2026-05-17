# Quick Start Guide - Token Revocation API

## ⚡ 5 Minute Setup

### 1. Backend Setup (Already Done)

The token revocation system is already integrated in the codebase:

✅ `login.service.ts` - Enhanced with token revocation logic  
✅ `login.controller.ts` - New endpoints for revocation  
✅ `JwtUtilsService` - Token generation and verification  
✅ `TokenBlacklistService` - Manage revoked tokens  
✅ `JwtAuthGuard` - Protect routes  
✅ `TokenBlacklist` schema - MongoDB collection  

**Your Backend is Ready! No additional setup needed.**

### 2. Environment Configuration

Verify your `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/vietvibe_db
PORT=3001
JWT_SECRET=your_secret_key_change_this
```

### 3. Start Backend

```bash
cd my-backend
npm run start:dev
```

### 4. Test API Endpoints

Use cURL or Postman:

```bash
# 1. Register
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Thanh Ha",
    "email": "user@example.com",
    "password": "password123"
  }'

# Response:
# {
#   "access_token": "eyJhbGc...",
#   "refresh_token": "eyJhbGc...",
#   "user": { ... }
# }

# 2. Use token to access protected resource
curl -X GET http://localhost:3001/api/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# 3. Refresh token
curl -X POST http://localhost:3001/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'

# 4. Logout (revoke token)
curl -X POST http://localhost:3001/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# 5. Logout from all devices
curl -X POST http://localhost:3001/auth/revoke-all \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 5. Frontend Integration

Copy the frontend integration code from `FRONTEND_INTEGRATION_GUIDE.md`:

```typescript
// In your my-frontend project:
// 1. Create lib/auth.service.ts
// 2. Create hooks/useTokenStorage.ts
// 3. Create context/AuthContext.tsx
// 4. Update app/layout.tsx with AuthProvider
// 5. Update login component
```

## 📊 Database Check

```bash
# Connect to MongoDB
mongosh

# List collections
use vietvibe_db
show collections

# Check TokenBlacklist collection
db.tokenblacklists.find().pretty()

# Check TTL index
db.tokenblacklists.getIndexes()
```

## 🧪 Manual Testing Flow

```bash
# Step 1: Login
TOKEN=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }' | jq -r '.access_token')

echo "Token: $TOKEN"

# Step 2: Use token
curl -X GET http://localhost:3001/api/profile \
  -H "Authorization: Bearer $TOKEN"

# Step 3: Logout
curl -X POST http://localhost:3001/auth/logout \
  -H "Authorization: Bearer $TOKEN"

# Step 4: Try to use token after logout (should fail)
curl -X GET http://localhost:3001/api/profile \
  -H "Authorization: Bearer $TOKEN"
# Expected: 401 Unauthorized - Token is blacklisted
```

## 🔄 Frontend Quick Test

```typescript
// In your login-screen.tsx
import { authService } from '@/lib/auth.service';

// Test login
const response = await authService.login('user@example.com', 'password123');
console.log('Login response:', response);

// Save tokens
localStorage.setItem('accessToken', response.access_token);
localStorage.setItem('refreshToken', response.refresh_token);

// Test protected API call
const profile = await fetch('/api/profile', {
  headers: {
    'Authorization': `Bearer ${response.access_token}`
  }
});

// Test logout
await authService.logout(response.access_token);
localStorage.removeItem('accessToken');
```

## ✅ Checklist

- [ ] Backend running on port 3001
- [ ] MongoDB connected
- [ ] Can register user via `/auth/register`
- [ ] Can login via `/auth/login`
- [ ] Tokens are returned
- [ ] Can logout via `/auth/logout`
- [ ] Token is revoked (try to use after logout - should fail)
- [ ] Can refresh token via `/auth/refresh`
- [ ] Can logout from all devices via `/auth/revoke-all`
- [ ] Frontend has AuthContext setup
- [ ] Login/Logout working in frontend

## 🚀 Optional: Enable Scheduled Cleanup

If you want automatic database cleanup (recommended for production):

```bash
# Install scheduler
npm install @nestjs/schedule

# Update app.module.ts to include:
import { ScheduleModule } from '@nestjs/schedule';
import { TokenCleanupTask } from './login/tasks/token-cleanup.task.js';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // ... other imports
  ],
  providers: [TokenCleanupTask],
})
export class AppModule {}
```

Then expired tokens will be automatically cleaned from the database every day at 2:00 AM.

## 🐛 Troubleshooting

### Issue: "Token is invalid" after logout
✅ Expected behavior - token is in blacklist

### Issue: 401 Unauthorized without logout
- Check token format: `Bearer <token>`
- Check token expiration
- Check token signature

### Issue: Refresh token not working
- Verify refresh token exists
- Check it's not expired (30 days)
- Check it's not in blacklist

### Issue: CORS error from frontend
- Check app.module has `app.enableCors()`
- Check backend is responding to preflight requests
- Check frontend URL is allowed

## 📚 Documentation

- [Full Token Revocation API docs](./TOKEN_REVOCATION_API.md)
- [Frontend Integration Guide](./FRONTEND_INTEGRATION_GUIDE.md)
- [API Endpoints](./TOKEN_REVOCATION_API.md#-api-endpoints)
