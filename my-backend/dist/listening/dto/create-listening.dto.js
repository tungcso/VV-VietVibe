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
exports.CreateListeningDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const transcript_line_dto_1 = require("../transcript-line.dto");
class CreateListeningDto {
    learningUnitId;
    titleVi;
    titleJa;
    audioUrl;
    durationSeconds;
    description;
    transcriptLines;
    ambientSoundIds;
}
exports.CreateListeningDto = CreateListeningDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Learning unit id that this listening lesson belongs to', example: '6a0062476ba452f577db7e77' }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateListeningDto.prototype, "learningUnitId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Vietnamese title for the listening lesson', example: 'Thanh toán tại cửa hàng' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateListeningDto.prototype, "titleVi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Japanese title for the listening lesson', example: '店での支払い' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateListeningDto.prototype, "titleJa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Audio URL for the listening lesson', example: 'https://example.com/audio.mp3' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateListeningDto.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Duration of the audio in seconds', example: 68 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateListeningDto.prototype, "durationSeconds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String, description: 'Description for the listening lesson', example: 'Bài nghe về thanh toán tại quán ăn.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateListeningDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [transcript_line_dto_1.TranscriptLineDto], description: 'Transcript lines for the lesson' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => transcript_line_dto_1.TranscriptLineDto),
    __metadata("design:type", Array)
], CreateListeningDto.prototype, "transcriptLines", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], description: 'Environment sound ids allowed for this lesson' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsMongoId)({ each: true }),
    __metadata("design:type", Array)
], CreateListeningDto.prototype, "ambientSoundIds", void 0);
//# sourceMappingURL=create-listening.dto.js.map