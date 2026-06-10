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
exports.CreatePlaceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePlaceDto {
    nameVi;
    nameJa;
    description;
    avatarUrl;
}
exports.CreatePlaceDto = CreatePlaceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Vietnamese place name', example: 'Siêu thị' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "nameVi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Japanese place name', example: 'スーパー' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "nameJa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Optional place description', example: 'Khu vực mua sắm hàng ngày' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Optional avatar URL', example: 'https://example.com/avatar.png' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "avatarUrl", void 0);
//# sourceMappingURL=create-place.dto.js.map