import { CanActivate, ExecutionContext } from '@nestjs/common';
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
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtUtilsService;
    private readonly tokenBlacklistService;
    constructor(jwtUtilsService: JwtUtilsService, tokenBlacklistService: TokenBlacklistService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
