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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_vocabulary_list_query_1 = require("./dto/get-vocabulary-list.query");
const create_vocabulary_dto_1 = require("./dto/create-vocabulary.dto");
const update_vocabulary_dto_1 = require("./dto/update-vocabulary.dto");
const vocabulary_service_1 = require("./vocabulary.service");
const jwt_auth_guard_1 = require("../login/guards/jwt-auth.guard");
const roles_guard_1 = require("../login/guards/roles.guard");
const roles_decorator_1 = require("../login/decorators/roles.decorator");
let VocabularyController = class VocabularyController {
    vocabularyService;
    constructor(vocabularyService) {
        this.vocabularyService = vocabularyService;
    }
    getVocabularyList(query) {
        return this.vocabularyService.getVocabularyList(query);
    }
    getVocabularyByLearningUnit(learningUnitId) {
        return this.vocabularyService.getVocabularyByLearningUnit(learningUnitId);
    }
    async createVocabulary(createDto, req) {
        return this.vocabularyService.createVocabulary(createDto);
    }
    async getVocabularyById(id) {
        return this.vocabularyService.getVocabularyById(id);
    }
    async updateVocabulary(id, updateDto) {
        return this.vocabularyService.updateVocabulary(id, updateDto);
    }
    async deleteVocabulary(id) {
        return this.vocabularyService.deleteVocabulary(id);
    }
    async getAllVocabulary() {
        return this.vocabularyService.getAllVocabulary();
    }
};
exports.VocabularyController = VocabularyController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated vocabulary list' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Paginated vocabulary cards' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_vocabulary_list_query_1.GetVocabularyListQueryDto]),
    __metadata("design:returntype", void 0)
], VocabularyController.prototype, "getVocabularyList", null);
__decorate([
    (0, common_1.Get)('learning-unit/:learningUnitId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vocabulary list by learning unit' }),
    (0, swagger_1.ApiParam)({ name: 'learningUnitId', description: 'Learning unit id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Vocabulary cards for a learning unit' }),
    __param(0, (0, common_1.Param)('learningUnitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VocabularyController.prototype, "getVocabularyByLearningUnit", null);
__decorate([
    (0, common_1.Post)('admin/create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Create new vocabulary card',
        description: 'Only admin can create new vocabulary cards',
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Vocabulary card created successfully' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vocabulary_dto_1.CreateVocabularyDto, Object]),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "createVocabulary", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Get vocabulary card by ID',
        description: 'Only admin can view vocabulary details',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vocabulary card ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Vocabulary card details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "getVocabularyById", null);
__decorate([
    (0, common_1.Put)('admin/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Update vocabulary card',
        description: 'Only admin can update vocabulary cards',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vocabulary card ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Vocabulary card updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vocabulary_dto_1.UpdateVocabularyDto]),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "updateVocabulary", null);
__decorate([
    (0, common_1.Delete)('admin/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Delete vocabulary card',
        description: 'Only admin can delete vocabulary cards',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Vocabulary card ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Vocabulary card deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vocabulary card not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "deleteVocabulary", null);
__decorate([
    (0, common_1.Get)('admin/list/all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Get all vocabulary cards with full details',
        description: 'Only admin can view complete vocabulary list with all fields',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'All vocabulary cards' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VocabularyController.prototype, "getAllVocabulary", null);
exports.VocabularyController = VocabularyController = __decorate([
    (0, swagger_1.ApiTags)('Vocabulary'),
    (0, common_1.Controller)('vocabulary'),
    __metadata("design:paramtypes", [vocabulary_service_1.VocabularyService])
], VocabularyController);
//# sourceMappingURL=vocabulary.controller.js.map