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
exports.GetVocabularyListQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetVocabularyListQueryDto {
    page = 1;
    limit = 20;
    search;
    learningUnitId;
    situationId;
    levelId;
    placeId;
    tag;
    sortBy = 'created_at';
    sortOrder = 'desc';
}
exports.GetVocabularyListQueryDto = GetVocabularyListQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, description: 'Page number', example: 1, minimum: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], GetVocabularyListQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, description: 'Items per page', example: 20, minimum: 1, maximum: 100 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Object)
], GetVocabularyListQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Search in Vietnamese word, Japanese meaning, examples, or notes', example: 'phở' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetVocabularyListQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Filter by learning unit id', example: '6a0062476ba452f577db7e77' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetVocabularyListQueryDto.prototype, "learningUnitId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Filter by situation id', example: '6a0062476ba452f577db7e76' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetVocabularyListQueryDto.prototype, "situationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Filter by level id', example: '6a006247b979c9c2d96bc1b4' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetVocabularyListQueryDto.prototype, "levelId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Filter by place id', example: '6a006247b979c9c2d96bc1b9' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GetVocabularyListQueryDto.prototype, "placeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Filter by tag', example: 'daily' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetVocabularyListQueryDto.prototype, "tag", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Field to sort by', example: 'created_at' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetVocabularyListQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Sort direction', example: 'desc', enum: ['asc', 'desc'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetVocabularyListQueryDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=get-vocabulary-list.query.js.map