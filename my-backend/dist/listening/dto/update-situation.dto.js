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
exports.UpdateSituationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateSituationDto {
    placeId;
    titleVi;
    titleJa;
    description;
}
exports.UpdateSituationDto = UpdateSituationDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Place id that this situation belongs to' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateSituationDto.prototype, "placeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Vietnamese title for the situation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSituationDto.prototype, "titleVi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Japanese title for the situation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSituationDto.prototype, "titleJa", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Optional situation description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSituationDto.prototype, "description", void 0);
//# sourceMappingURL=update-situation.dto.js.map