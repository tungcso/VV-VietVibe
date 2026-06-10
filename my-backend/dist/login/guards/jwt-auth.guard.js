"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const token_blacklist_service_js_1 = require("../services/token-blacklist.service.js");
const jwt_utils_service_js_1 = require("../services/jwt-utils.service.js");
let JwtAuthGuard = class JwtAuthGuard {
    jwtUtilsService;
    tokenBlacklistService;
    constructor(jwtUtilsService, tokenBlacklistService) {
        this.jwtUtilsService = jwtUtilsService;
        this.tokenBlacklistService = tokenBlacklistService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header が必要です');
        }
        try {
            const token = this.jwtUtilsService.extractTokenFromBearer(authHeader);
            const isBlacklisted = await this.tokenBlacklistService.isTokenBlacklisted(token);
            if (isBlacklisted) {
                throw new common_1.UnauthorizedException('Token が無効です。再度ログインしてください');
            }
            const payload = this.jwtUtilsService.verifyToken(token);
            request.user = {
                userId: payload.sub,
                email: payload.email,
                role: payload.role,
                tokenType: payload.type,
            };
            request.token = token;
            return true;
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Token が無効です');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_utils_service_js_1.JwtUtilsService,
        token_blacklist_service_js_1.TokenBlacklistService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map