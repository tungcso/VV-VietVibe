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
exports.LogoutResponseDto = exports.RevokeAllTokensResponseDto = exports.RevokeTokenResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RevokeTokenResponseDto {
    success;
    message;
    revoked_at;
}
exports.RevokeTokenResponseDto = RevokeTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Success status',
    }),
    __metadata("design:type", Boolean)
], RevokeTokenResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Token successfully revoked',
        description: 'Success message',
    }),
    __metadata("design:type", String)
], RevokeTokenResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-05-17T10:30:00Z',
        description: 'Time when token was revoked',
    }),
    __metadata("design:type", Date)
], RevokeTokenResponseDto.prototype, "revoked_at", void 0);
class RevokeAllTokensResponseDto {
    success;
    message;
    tokens_revoked;
    revoked_at;
}
exports.RevokeAllTokensResponseDto = RevokeAllTokensResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Success status',
    }),
    __metadata("design:type", Boolean)
], RevokeAllTokensResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'All tokens revoked successfully',
        description: 'Success message',
    }),
    __metadata("design:type", String)
], RevokeAllTokensResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Number of tokens revoked',
    }),
    __metadata("design:type", Number)
], RevokeAllTokensResponseDto.prototype, "tokens_revoked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-05-17T10:30:00Z',
        description: 'Time when operation was performed',
    }),
    __metadata("design:type", Date)
], RevokeAllTokensResponseDto.prototype, "revoked_at", void 0);
class LogoutResponseDto {
    success;
    message;
}
exports.LogoutResponseDto = LogoutResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Success status',
    }),
    __metadata("design:type", Boolean)
], LogoutResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ログアウトしました',
        description: 'Logout message',
    }),
    __metadata("design:type", String)
], LogoutResponseDto.prototype, "message", void 0);
//# sourceMappingURL=revoke-response.dto.js.map