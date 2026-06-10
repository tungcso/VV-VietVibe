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
exports.PlacesFullResponseDto = exports.PlaceFullDto = exports.SituationFullDto = exports.LearningUnitFullDto = exports.SearchResultsResponseDto = exports.SearchResultDto = exports.SearchQueryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SearchQueryDto {
    query;
    level;
    difficulty;
    hasProgress;
    completed;
    placeIds;
    sortBy;
    offset;
    limit;
}
exports.SearchQueryDto = SearchQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'restaurant', description: 'Search query string' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchQueryDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'N4', description: 'Filter by level (N5, N4, N3, N2, N1)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['N5', 'N4', 'N3', 'N2', 'N1']),
    __metadata("design:type", String)
], SearchQueryDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'easy',
        description: 'Filter by difficulty (easy, medium, hard)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['easy', 'medium', 'hard']),
    __metadata("design:type", String)
], SearchQueryDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Show only items with progress',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SearchQueryDto.prototype, "hasProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Show only completed items',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SearchQueryDto.prototype, "completed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['place_id_1', 'place_id_2'],
        description: 'Filter by place IDs',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SearchQueryDto.prototype, "placeIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'relevance',
        description: 'Sort by (relevance, newest, popular)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['relevance', 'newest', 'popular']),
    __metadata("design:type", String)
], SearchQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Pagination offset' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchQueryDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: 'Pagination limit' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SearchQueryDto.prototype, "limit", void 0);
class SearchResultDto {
    id;
    type;
    title;
    subtitle;
    description;
    placeId;
    situationId;
    level;
    difficulty;
    progress;
    completed;
    avatarUrl;
    matchScore;
    createdAt;
    updatedAt;
}
exports.SearchResultDto = SearchResultDto;
class SearchResultsResponseDto {
    data;
    total;
    offset;
    limit;
    pages;
}
exports.SearchResultsResponseDto = SearchResultsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SearchResultDto] }),
    __metadata("design:type", Array)
], SearchResultsResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, description: 'Total count of matching results' }),
    __metadata("design:type", Number)
], SearchResultsResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Pagination offset' }),
    __metadata("design:type", Number)
], SearchResultsResponseDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20, description: 'Pagination limit' }),
    __metadata("design:type", Number)
], SearchResultsResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Total pages' }),
    __metadata("design:type", Number)
], SearchResultsResponseDto.prototype, "pages", void 0);
class LearningUnitFullDto {
    id;
    titleVi;
    titleJa;
    description;
    levelId;
    level;
    difficulty;
    audioUrl;
    transcriptUrl;
}
exports.LearningUnitFullDto = LearningUnitFullDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LearningUnitFullDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LearningUnitFullDto.prototype, "titleVi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LearningUnitFullDto.prototype, "titleJa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], LearningUnitFullDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LearningUnitFullDto.prototype, "levelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LearningUnitFullDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LearningUnitFullDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LearningUnitFullDto.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LearningUnitFullDto.prototype, "transcriptUrl", void 0);
class SituationFullDto {
    id;
    titleVi;
    titleJa;
    description;
    learningUnits;
}
exports.SituationFullDto = SituationFullDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SituationFullDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SituationFullDto.prototype, "titleVi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SituationFullDto.prototype, "titleJa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SituationFullDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LearningUnitFullDto] }),
    __metadata("design:type", Array)
], SituationFullDto.prototype, "learningUnits", void 0);
class PlaceFullDto {
    id;
    nameVi;
    nameJa;
    description;
    avatarUrl;
    situations;
    createdAt;
    updatedAt;
}
exports.PlaceFullDto = PlaceFullDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlaceFullDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlaceFullDto.prototype, "nameVi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlaceFullDto.prototype, "nameJa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PlaceFullDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], PlaceFullDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SituationFullDto] }),
    __metadata("design:type", Array)
], PlaceFullDto.prototype, "situations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlaceFullDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlaceFullDto.prototype, "updatedAt", void 0);
class PlacesFullResponseDto {
    places;
    totalPlaces;
    totalSituations;
    totalLearningUnits;
}
exports.PlacesFullResponseDto = PlacesFullResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PlaceFullDto] }),
    __metadata("design:type", Array)
], PlacesFullResponseDto.prototype, "places", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlacesFullResponseDto.prototype, "totalPlaces", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlacesFullResponseDto.prototype, "totalSituations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlacesFullResponseDto.prototype, "totalLearningUnits", void 0);
//# sourceMappingURL=search.dto.js.map