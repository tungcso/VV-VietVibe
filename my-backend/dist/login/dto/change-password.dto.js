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
exports.ChangePasswordResponseDto = exports.ChangePasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ChangePasswordDto {
    current_password;
    new_password;
    confirm_password;
    reason;
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current password',
        example: 'OldPass123!',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: '現在のパスワードを入力してください' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "current_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New password (min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char)',
        example: 'NewPass456!',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'パスワードは最小8文字である必要があります' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: 'パスワードは大文字、小文字、数字、特殊文字(!@#$%^&*)を含む必要があります',
    }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "new_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Confirm new password',
        example: 'NewPass456!',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "confirm_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reason for password change (optional)',
        example: 'security_issue',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "reason", void 0);
class ChangePasswordResponseDto {
    success;
    message;
    data;
}
exports.ChangePasswordResponseDto = ChangePasswordResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ChangePasswordResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'パスワードが正常に変更されました' }),
    __metadata("design:type", String)
], ChangePasswordResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            changed_at: '2026-05-24T10:00:00Z',
            user_id: '507f1f77bcf86cd799439011',
            email: 'user@gmail.com',
            all_tokens_revoked: true,
        },
    }),
    __metadata("design:type", Object)
], ChangePasswordResponseDto.prototype, "data", void 0);
//# sourceMappingURL=change-password.dto.js.map