# Frontend Integration Guide - Token Revocation

## 📋 Overview

This guide shows how to integrate the token revocation API with your Next.js frontend.

## 🔧 Setup

### 1. Create Auth Service (`lib/auth.service.ts`)

```typescript
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    user_name: string;
    role: string;
  };
}

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  },

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  },

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to refresh token');
    }

    return response.json();
  },

  async logout(accessToken: string): Promise<void> {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  },

  async revokeToken(accessToken: string, reason?: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/revoke`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason: reason || 'logout' }),
    });

    if (!response.ok) {
      throw new Error('Failed to revoke token');
    }
  },

  async revokeAllTokens(accessToken: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/revoke-all`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to revoke all tokens');
    }
  },
};
```

### 2. Create Token Storage Hook (`hooks/useTokenStorage.ts`)

```typescript
'use client';

import { useCallback } from 'react';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

export const useTokenStorage = () => {
  const getAccessToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }, []);

  const getRefreshToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  }, []);

  const getUser = useCallback(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }, []);

  const setTokens = useCallback((accessToken: string, refreshToken: string, user: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }, []);

  const clearTokens = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  return {
    getAccessToken,
    getRefreshToken,
    getUser,
    setTokens,
    clearTokens,
  };
};
```

### 3. Create Auth Context (`context/AuthContext.tsx`)

```typescript
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
  useState,
} from 'react';
import { authService } from '@/lib/auth.service';
import { useTokenStorage } from '@/hooks/useTokenStorage';

interface User {
  id: string;
  email: string;
  user_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  revokeAllDevices: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessToken, getRefreshToken, getUser, setTokens, clearTokens } =
    useTokenStorage();

  // Initialize auth state
  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, [getUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await authService.login(email, password);
        setTokens(response.access_token, response.refresh_token, response.user);
        setUser(response.user);
      } finally {
        setIsLoading(false);
      }
    },
    [setTokens],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await authService.register(name, email, password);
        setTokens(response.access_token, response.refresh_token, response.user);
        setUser(response.user);
      } finally {
        setIsLoading(false);
      }
    },
    [setTokens],
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        await authService.logout(accessToken);
      }
      clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [getAccessToken, clearTokens]);

  const revokeAllDevices = useCallback(async () => {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error('No access token');

    await authService.revokeAllTokens(accessToken);
    clearTokens();
    setUser(null);
  }, [getAccessToken, clearTokens]);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');

    const response = await authService.refreshToken(refreshToken);
    const currentUser = getUser();
    setTokens(response.access_token, response.refresh_token, currentUser);
  }, [getRefreshToken, getUser, setTokens]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    revokeAllDevices,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 4. Create API Interceptor (`lib/api.ts`)

```typescript
import { useAuth } from '@/context/AuthContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiCall = async (
  endpoint: string,
  options: RequestInit = {},
  useAuthContext?: ReturnType<typeof useAuth>,
): Promise<any> => {
  const accessToken = useAuthContext?.getAccessToken?.() || localStorage.getItem('auth_token');

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
  });

  // Handle token expiration
  if (response.status === 401 && useAuthContext?.refreshAccessToken) {
    try {
      await useAuthContext.refreshAccessToken();
      // Retry request with new token
      return apiCall(endpoint, options, useAuthContext);
    } catch (error) {
      // Refresh failed, need to login again
      useAuthContext?.logout?.();
      throw error;
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
};
```

### 5. Update Login Screen (`app/_components/login-screen.tsx`)

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/listening'); // or your default route
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  );
};
```

### 6. Update App Layout (`app/layout.tsx`)

```typescript
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

## 🔄 Typical Flow

### Login Flow
```
User Input → login() → API /auth/login → Save tokens → Redirect
```

### API Request Flow
```
GET /api/route → apiCall() → Add Auth header → Send request → Return data
```

### Token Refresh Flow
```
API returns 401 → refreshAccessToken() → Get new token → Retry request
```

### Logout Flow
```
Click logout → logout() → API /auth/logout → Clear tokens → Redirect to login
```

### Multi-Device Logout
```
Click "Logout all devices" → revokeAllDevices() → API /auth/revoke-all → All tokens revoked
```

## 📝 Example Component with Protected Route

```typescript
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { isAuthenticated, isLoading, logout, revokeAllDevices } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <h1>Protected Content</h1>

      <button onClick={logout}>ログアウト</button>
      <button onClick={revokeAllDevices}>すべてのデバイスからログアウト</button>
    </div>
  );
}
```

## ⚠️ Best Practices

1. **Store Tokens Securely**
   - Use HttpOnly cookies if possible
   - Or use an in-memory store with server-side validation
   - Avoid localStorage for sensitive tokens

2. **Handle Token Expiration**
   - Implement automatic refresh before expiration
   - Or refresh on 401 responses
   - Show login screen on refresh failure

3. **Logout Properly**
   - Always call logout endpoint
   - Clear local tokens
   - Redirect to login page

4. **Error Handling**
   - Catch network errors
   - Handle expired tokens gracefully
   - Show user-friendly error messages

5. **Security**
   - Use HTTPS only
   - Set appropriate CORS headers
   - Validate token server-side for sensitive operations

## 🧪 Testing

```typescript
// Test logout flow
const { logout } = useAuth();
await logout();
expect(localStorage.getItem('auth_token')).toBeNull();
```
