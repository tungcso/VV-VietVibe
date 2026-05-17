import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenBlacklistService } from '../services/token-blacklist.service.js';
import { JwtUtilsService } from '../services/jwt-utils.service.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
        tokenType: 'access' | 'refresh';
      };
      token?: string;
    }
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtUtilsService: JwtUtilsService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header が必要です');
    }

    try {
      const token = this.jwtUtilsService.extractTokenFromBearer(authHeader);

      // Kiểm tra token có bị revoke không
      const isBlacklisted = await this.tokenBlacklistService.isTokenBlacklisted(token);
      if (isBlacklisted) {
        throw new UnauthorizedException('Token が無効です。再度ログインしてください');
      }

      // Verify token
      const payload = this.jwtUtilsService.verifyToken(token);

      // Attach user info vào request
      request.user = {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
        tokenType: payload.type,
      };
      request.token = token;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      throw new UnauthorizedException('Token が無効です');
    }
  }
}
