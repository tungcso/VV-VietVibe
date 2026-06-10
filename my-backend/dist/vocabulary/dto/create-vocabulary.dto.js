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
exports.CreateVocabularyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVocabularyDto {
    learning_unit_id;
    word_vi;
    meaning_ja;
    example_vi;
    example_ja;
    note;
    tag;
}
exports.CreateVocabularyDto = CreateVocabularyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Learning Unit ID',
        example: '6a0062476ba452f577db7e77',
        required: true,
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "learning_unit_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vietnamese word',
        example: 'phở',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: 'Từ Tiếng Việt không được để trống' }),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "word_vi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Japanese meaning',
        example: 'フォー（ベトナムのヌードル）',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: 'Nghĩa Tiếng Nhật không được để trống' }),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "meaning_ja", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vietnamese example sentence',
        example: 'Tôi thích ăn phở.',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "example_vi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Japanese example sentence',
        example: ' Phởが好きです。',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "example_ja", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional notes',
        example: 'Vietnamese traditional soup made from beef or chicken',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tag for categorization',
        example: 'food,culture',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "tag", void 0);
//# sourceMappingURL=create-vocabulary.dto.js.map