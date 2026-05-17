import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env.js';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtUtilsService {
  /**
   * Generate Access Token (expires in 1 day)
   */
  generateAccessToken(userId: string, email: string, role: string): string {
    return jwt.sign(
      {
        sub: userId,
        email,
        role,
        type: 'access',
      },
      JWT_SECRET,
      { expiresIn: '1d' },
    );
  }

  /**
   * Generate Refresh Token (expires in 30 days)
   */
  generateRefreshToken(userId: string, email: string, role: string): string {
    return jwt.sign(
      {
        sub: userId,
        email,
        role,
        type: 'refresh',
      },
      JWT_SECRET,
      { expiresIn: '30d' },
    );
  }

  /**
   * Verify and decode JWT token
   */
  verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token が期限切れです');
      }
      throw new UnauthorizedException('無効な Token です');
    }
  }

  /**
   * Extract token from Bearer string
   */
  extractTokenFromBearer(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Authorization header が無効です');
    }
    return authHeader.substring(7);
  }

  /**
   * Get token expiration date
   */
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt.decode(token) as any;
    if (!decoded?.exp) {
      throw new BadRequestException('Token の有効期限を取得できません');
    }
    return new Date(decoded.exp * 1000);
  }

  /**
   * Get token expiration in seconds
   */
  getTokenExpirationInSeconds(token: string): number {
    const decoded = jwt.decode(token) as any;
    if (!decoded?.exp || !decoded?.iat) {
      throw new BadRequestException('Token の有効期限を計算できません');
    }
    return decoded.exp - decoded.iat;
  }
}
