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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const login_dto_js_1 = require("./dto/login.dto.js");
const register_dto_js_1 = require("./dto/register.dto.js");
const refresh_token_dto_js_1 = require("./dto/refresh-token.dto.js");
const revoke_token_dto_js_1 = require("./dto/revoke-token.dto.js");
const change_password_dto_js_1 = require("./dto/change-password.dto.js");
const login_service_js_1 = require("./login.service.js");
const login_response_dto_js_1 = require("./dto/login-response.dto.js");
const revoke_response_dto_js_1 = require("./dto/revoke-response.dto.js");
const jwt_auth_guard_js_1 = require("./guards/jwt-auth.guard.js");
let LoginController = class LoginController {
    loginService;
    constructor(loginService) {
        this.loginService = loginService;
    }
    async login(loginDto, req) {
        const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
        const userAgent = req.get('user-agent') || 'unknown';
        return this.loginService.login(loginDto, ipAddress, userAgent);
    }
    async register(registerDto) {
        return this.loginService.register(registerDto);
    }
    async refreshToken(refreshTokenDto) {
        return this.loginService.refreshToken(refreshTokenDto);
    }
    async revokeToken(req, revokeDto) {
        return this.loginService.revokeToken(req.token, revokeDto);
    }
    async revokeAllTokens(req) {
        return this.loginService.revokeAllTokens(req.token, 'manual_revoke_all');
    }
    async logout(req) {
        return this.loginService.logout(req.token);
    }
    async changePassword(req, changePasswordDto) {
        return this.loginService.changePassword(req.token, changePasswordDto);
    }
    async getAuditHistory(req) {
        return this.loginService.getAuditHistory(req.token);
    }
};
exports.LoginController = LoginController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: 'ユーザーログイン',
        description: 'メールアドレスとパスワードでログイン、access_token と refresh_token を返す',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'ログイン成功',
        type: login_response_dto_js_1.LoginResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_js_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({
        summary: 'ユーザー登録',
        description: '新規ユーザーを登録、access_token と refresh_token を返す',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '登録成功',
        type: login_response_dto_js_1.LoginResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_js_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: 'Access Token 更新',
        description: 'Refresh Token を使用して新しい Access Token を取得 (Refresh Token Rotation)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token 更新成功',
        type: refresh_token_dto_js_1.RefreshTokenResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_js_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('revoke'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiBody)({ type: revoke_token_dto_js_1.RevokeTokenDto, required: false }),
    (0, swagger_1.ApiOperation)({
        summary: '現在の Token を無効化',
        description: '現在のアクセストークンを無効化（ブラックリスト登録）',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token 無効化成功',
        type: revoke_response_dto_js_1.RevokeTokenResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, revoke_token_dto_js_1.RevokeTokenDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "revokeToken", null);
__decorate([
    (0, common_1.Post)('revoke-all'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: 'すべてのデバイスからログアウト',
        description: 'ユーザーの全トークンを無効化（全デバイスからログアウト）',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'すべてのトークン無効化成功',
        type: revoke_response_dto_js_1.RevokeAllTokensResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "revokeAllTokens", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: 'ログアウト',
        description: '現在のトークンを無効化してログアウト',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'ログアウト成功',
        type: revoke_response_dto_js_1.LogoutResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: 'パスワード変更',
        description: '現在のパスワードを検証後、新しいパスワードに変更。全トークンは無効化される',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'パスワード変更成功',
        type: change_password_dto_js_1.ChangePasswordResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_js_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('audit-history'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: 'ユーザーの監査ログ取得',
        description: 'ユーザーの全認証イベント履歴を取得',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '監査ログ取得成功',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getAuditHistory", null);
exports.LoginController = LoginController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [login_service_js_1.LoginService])
], LoginController);
//# sourceMappingURL=login.controller.js.map