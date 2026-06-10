import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { RevokeTokenDto } from './dto/revoke-token.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { JwtUtilsService } from './services/jwt-utils.service.js';
import { TokenBlacklistService } from './services/token-blacklist.service.js';
import { AccountLockoutService } from './services/account-lockout.service.js';
import { AuditLogService } from './services/audit-log.service.js';
export declare class LoginService {
    private readonly userModel;
    private readonly jwtUtilsService;
    private readonly tokenBlacklistService;
    private readonly accountLockoutService;
    private readonly auditLogService;
    constructor(userModel: Model<UserDocument>, jwtUtilsService: JwtUtilsService, tokenBlacklistService: TokenBlacklistService, accountLockoutService: AccountLockoutService, auditLogService: AuditLogService);
    validateUser(email: string, password: string, ipAddress?: string, userAgent?: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    login(loginDto: LoginDto, ipAddress?: string, userAgent?: string): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            user_name: string;
            role: string;
            avatar_url: string | null;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            user_name: string;
            role: string;
            avatar_url: string | null;
        };
    }>;
    revokeToken(token: string, revokeDto?: RevokeTokenDto): Promise<{
        success: boolean;
        message: string;
        revoked_at: Date;
    }>;
    revokeAllTokens(token: string, reason?: string): Promise<{
        success: boolean;
        message: string;
        tokens_revoked: number;
        revoked_at: Date;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
    }>;
    logout(token: string): Promise<{
        success: boolean;
        message: string;
    }>;
    changePassword(token: string, changePasswordDto: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
        data: {
            changed_at: string;
            user_id: string;
            email: string;
            all_tokens_revoked: boolean;
        };
    }>;
    getAuditHistory(token: string, limit?: number): Promise<{
        success: boolean;
        data: import("./schemas/audit-log.schema.js").AuditLogDocument[];
        meta: {
            total: number;
        };
    }>;
}
