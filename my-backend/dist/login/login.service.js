"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const user_schema_js_1 = require("./schemas/user.schema.js");
const jwt_utils_service_js_1 = require("./services/jwt-utils.service.js");
const token_blacklist_service_js_1 = require("./services/token-blacklist.service.js");
const account_lockout_service_js_1 = require("./services/account-lockout.service.js");
const audit_log_service_js_1 = require("./services/audit-log.service.js");
let LoginService = class LoginService {
    userModel;
    jwtUtilsService;
    tokenBlacklistService;
    accountLockoutService;
    auditLogService;
    constructor(userModel, jwtUtilsService, tokenBlacklistService, accountLockoutService, auditLogService) {
        this.userModel = userModel;
        this.jwtUtilsService = jwtUtilsService;
        this.tokenBlacklistService = tokenBlacklistService;
        this.accountLockoutService = accountLockoutService;
        this.auditLogService = auditLogService;
    }
    async validateUser(email, password, ipAddress, userAgent) {
        const normalizedEmail = email.toLowerCase().trim();
        const isLocked = await this.accountLockoutService.isAccountLocked(normalizedEmail);
        if (isLocked) {
            const lockoutInfo = await this.accountLockoutService.getLockoutInfo(normalizedEmail);
            await this.auditLogService.logAuthEvent(normalizedEmail, 'login_failed', 'account_locked', {
                ip_address: ipAddress,
                user_agent: userAgent,
                error_message: `Account locked. Unlock in ${lockoutInfo.unlock_in_minutes} minutes`,
            });
            throw new common_1.UnauthorizedException(`アカウントが一時的にロックされています。${lockoutInfo.unlock_in_minutes}分後にもう一度お試しください`);
        }
        const user = await this.userModel.findOne({ email: normalizedEmail }).exec();
        if (!user) {
            await this.accountLockoutService.recordFailedAttempt(normalizedEmail, ipAddress || 'unknown', userAgent || 'unknown');
            await this.auditLogService.logAuthEvent(normalizedEmail, 'login_failed', 'invalid_email', {
                ip_address: ipAddress,
                user_agent: userAgent,
                error_message: 'Email not found',
            });
            throw new common_1.UnauthorizedException('メールアドレスまたはパスワードが正しくありません');
        }
        const passwordMatches = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatches) {
            const lockoutRecord = await this.accountLockoutService.recordFailedAttempt(normalizedEmail, ipAddress || 'unknown', userAgent || 'unknown');
            await this.auditLogService.logAuthEvent(normalizedEmail, 'login_failed', 'invalid_password', {
                user_id: user._id.toString(),
                ip_address: ipAddress,
                user_agent: userAgent,
                error_message: 'Invalid password',
                metadata: {
                    failed_attempts: lockoutRecord.failed_attempts,
                    account_status: lockoutRecord.status,
                },
            });
            if (lockoutRecord.locked_until && lockoutRecord.locked_until > new Date()) {
                const lockoutInfo = await this.accountLockoutService.getLockoutInfo(normalizedEmail);
                throw new common_1.UnauthorizedException(`アカウントが一時的にロックされています。${lockoutInfo.unlock_in_minutes}分後にもう一度お試しください`);
            }
            throw new common_1.UnauthorizedException('メールアドレスまたはパスワードが正しくありません');
        }
        await this.accountLockoutService.recordSuccessfulLogin(normalizedEmail);
        return user;
    }
    async login(loginDto, ipAddress, userAgent) {
        const user = await this.validateUser(loginDto.email, loginDto.password, ipAddress, userAgent);
        const userId = user._id.toString();
        const access_token = this.jwtUtilsService.generateAccessToken(userId, user.email, user.role);
        const refresh_token = this.jwtUtilsService.generateRefreshToken(userId, user.email, user.role);
        await this.auditLogService.logAuthEvent(user.email, 'login_success', 'success', {
            user_id: userId,
            ip_address: ipAddress,
            user_agent: userAgent,
        });
        return {
            access_token,
            refresh_token,
            user: {
                id: userId,
                email: user.email,
                user_name: user.user_name,
                role: user.role,
                avatar_url: user.avatar_url,
            },
        };
    }
    async register(registerDto) {
        const email = registerDto.email.toLowerCase().trim();
        const name = registerDto.name.trim();
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            await this.auditLogService.logAuthEvent(email, 'register', 'failed', {
                error_message: 'Email already exists',
            });
            throw new common_1.BadRequestException('このメールアドレスはすでに使用されています');
        }
        const password_hash = await bcrypt.hash(registerDto.password, 10);
        const user = await this.userModel.create({
            email,
            user_name: name,
            password_hash,
        });
        const userId = user._id.toString();
        const access_token = this.jwtUtilsService.generateAccessToken(userId, user.email, user.role);
        const refresh_token = this.jwtUtilsService.generateRefreshToken(userId, user.email, user.role);
        await this.auditLogService.logAuthEvent(email, 'register', 'success', {
            user_id: userId,
        });
        return {
            access_token,
            refresh_token,
            user: {
                id: userId,
                email: user.email,
                user_name: user.user_name,
                role: user.role,
                avatar_url: user.avatar_url,
            },
        };
    }
    async revokeToken(token, revokeDto) {
        const payload = this.jwtUtilsService.verifyToken(token);
        const expirationDate = this.jwtUtilsService.getTokenExpirationDate(token);
        const reason = revokeDto?.reason || 'logout';
        await this.tokenBlacklistService.revokeToken(token, payload.sub, payload.email, expirationDate, reason);
        return {
            success: true,
            message: 'Token successfully revoked',
            revoked_at: new Date(),
        };
    }
    async revokeAllTokens(token, reason = 'logout') {
        const payload = this.jwtUtilsService.verifyToken(token);
        const user = await this.userModel.findById(payload.sub).exec();
        if (!user) {
            throw new common_1.UnauthorizedException('ユーザーが見つかりません');
        }
        const expirationDate = this.jwtUtilsService.getTokenExpirationDate(token);
        await this.tokenBlacklistService.revokeToken(token, payload.sub, payload.email, expirationDate, reason);
        const tokens_revoked = await this.tokenBlacklistService.getUserRevokedTokenCount(payload.sub);
        return {
            success: true,
            message: 'All tokens revoked successfully',
            tokens_revoked: tokens_revoked + 1,
            revoked_at: new Date(),
        };
    }
    async refreshToken(refreshTokenDto) {
        const payload = this.jwtUtilsService.verifyToken(refreshTokenDto.refresh_token);
        if (payload.type !== 'refresh') {
            throw new common_1.UnauthorizedException('Invalid token type. Expected refresh token.');
        }
        const isBlacklisted = await this.tokenBlacklistService.isTokenBlacklisted(refreshTokenDto.refresh_token);
        if (isBlacklisted) {
            throw new common_1.UnauthorizedException('Token が無効です。再度ログインしてください');
        }
        const new_access_token = this.jwtUtilsService.generateAccessToken(payload.sub, payload.email, payload.role);
        const new_refresh_token = this.jwtUtilsService.generateRefreshToken(payload.sub, payload.email, payload.role);
        const expirationDate = this.jwtUtilsService.getTokenExpirationDate(refreshTokenDto.refresh_token);
        await this.tokenBlacklistService.revokeToken(refreshTokenDto.refresh_token, payload.sub, payload.email, expirationDate, 'token_rotation');
        const expires_in = this.jwtUtilsService.getTokenExpirationInSeconds(new_access_token);
        return {
            access_token: new_access_token,
            refresh_token: new_refresh_token,
            expires_in,
        };
    }
    async logout(token) {
        const payload = this.jwtUtilsService.verifyToken(token);
        await this.revokeToken(token, { reason: 'logout' });
        await this.auditLogService.logAuthEvent(payload.email, 'logout', 'success', {
            user_id: payload.sub,
        });
        return {
            success: true,
            message: 'ログアウトしました',
        };
    }
    async changePassword(token, changePasswordDto) {
        const payload = this.jwtUtilsService.verifyToken(token);
        const user = await this.userModel.findById(payload.sub).exec();
        if (!user) {
            throw new common_1.UnauthorizedException('ユーザーが見つかりません');
        }
        const passwordMatches = await bcrypt.compare(changePasswordDto.current_password, user.password_hash);
        if (!passwordMatches) {
            await this.auditLogService.logAuthEvent(user.email, 'password_changed', 'failed', {
                user_id: user._id.toString(),
                error_message: 'Current password incorrect',
            });
            throw new common_1.UnauthorizedException('現在のパスワードが正しくありません');
        }
        if (changePasswordDto.new_password !== changePasswordDto.confirm_password) {
            throw new common_1.BadRequestException('新しいパスワードが一致しません');
        }
        if (changePasswordDto.current_password === changePasswordDto.new_password) {
            throw new common_1.BadRequestException('新しいパスワードは現在のパスワードと異なる必要があります');
        }
        const new_password_hash = await bcrypt.hash(changePasswordDto.new_password, 10);
        await this.userModel.updateOne({ _id: user._id }, { password_hash: new_password_hash });
        await this.revokeAllTokens(token, 'password_changed');
        await this.auditLogService.logAuthEvent(user.email, 'password_changed', 'success', {
            user_id: user._id.toString(),
            metadata: {
                reason: changePasswordDto.reason || 'user_initiated',
                all_tokens_revoked: true,
            },
        });
        return {
            success: true,
            message: 'パスワードが正常に変更されました',
            data: {
                changed_at: new Date().toISOString(),
                user_id: user._id.toString(),
                email: user.email,
                all_tokens_revoked: true,
            },
        };
    }
    async getAuditHistory(token, limit = 50) {
        const payload = this.jwtUtilsService.verifyToken(token);
        const history = await this.auditLogService.getUserAuditHistory(payload.email, limit);
        return {
            success: true,
            data: history,
            meta: {
                total: history.length,
            },
        };
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_js_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_utils_service_js_1.JwtUtilsService,
        token_blacklist_service_js_1.TokenBlacklistService,
        account_lockout_service_js_1.AccountLockoutService,
        audit_log_service_js_1.AuditLogService])
], LoginService);
//# sourceMappingURL=login.service.js.map