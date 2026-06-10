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
exports.UpdateLearningUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateLearningUnitDto {
    situationId;
    levelId;
    titleVi;
    titleJa;
    description;
}
exports.UpdateLearningUnitDto = UpdateLearningUnitDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Situation id that this learning unit belongs to' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateLearningUnitDto.prototype, "situationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Level id for this learning unit' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateLearningUnitDto.prototype, "levelId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Vietnamese title for the learning unit' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLearningUnitDto.prototype, "titleVi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Japanese title for the learning unit' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLearningUnitDto.prototype, "titleJa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Optional learning unit description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLearningUnitDto.prototype, "description", void 0);
//# sourceMappingURL=update-learning-unit.dto.js.map