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
exports.AudioProcessingQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const listening_session_constants_1 = require("../listening-session.constants");
class AudioProcessingQueryDto {
    currentPositionSeconds;
    playbackSpeed;
    playbackMode;
    ambientSound;
    ambientVolume;
    transcriptLineId;
}
exports.AudioProcessingQueryDto = AudioProcessingQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        description: 'Current playback position in seconds',
        example: 12,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AudioProcessingQueryDto.prototype, "currentPositionSeconds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        oneOf: [{ type: 'number' }, { type: 'string' }],
        enum: ['0.75x', '1.0x', 0.75, 1],
        description: 'Playback speed. FE sends "0.75x" or "1.0x".',
        example: '0.75x',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, listening_session_constants_1.normalizePlaybackSpeed)(value)),
    (0, class_validator_1.IsIn)([...listening_session_constants_1.PLAYBACK_SPEEDS]),
    __metadata("design:type", Number)
], AudioProcessingQueryDto.prototype, "playbackSpeed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        enum: [...listening_session_constants_1.PLAYBACK_MODES, 'auto_stop'],
        description: 'Playback mode. "study" stops at the end of each segment.',
        example: 'study',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, listening_session_constants_1.normalizePlaybackMode)(value)),
    (0, class_validator_1.IsIn)([...listening_session_constants_1.PLAYBACK_MODES]),
    __metadata("design:type", String)
], AudioProcessingQueryDto.prototype, "playbackMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        enum: [...listening_session_constants_1.AMBIENT_SOUNDS, 'off', 'none', 'street'],
        nullable: true,
        description: 'Ambient sound key selected by the user',
        example: 'cafe',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, listening_session_constants_1.normalizeAmbientSound)(value)),
    (0, class_validator_1.IsIn)([...listening_session_constants_1.AMBIENT_SOUNDS]),
    __metadata("design:type", Object)
], AudioProcessingQueryDto.prototype, "ambientSound", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Number,
        minimum: 0,
        maximum: 100,
        description: 'Ambient sound volume percentage',
        example: 40,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (0, listening_session_constants_1.normalizeAmbientVolume)(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], AudioProcessingQueryDto.prototype, "ambientVolume", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        description: 'Transcript line id to play from exactly',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AudioProcessingQueryDto.prototype, "transcriptLineId", void 0);
//# sourceMappingURL=audio-processing-query.dto.js.map