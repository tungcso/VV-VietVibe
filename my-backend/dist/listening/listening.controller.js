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
exports.ListeningController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs_1 = require("fs");
const audio_processing_query_dto_1 = require("./dto/audio-processing-query.dto");
const create_listening_dto_1 = require("./dto/create-listening.dto");
const create_learning_unit_dto_1 = require("./dto/create-learning-unit.dto");
const create_place_dto_1 = require("./dto/create-place.dto");
const create_situation_dto_1 = require("./dto/create-situation.dto");
const start_listening_session_dto_1 = require("./dto/start-listening-session.dto");
const update_learning_unit_dto_1 = require("./dto/update-learning-unit.dto");
const update_listening_dto_1 = require("./dto/update-listening.dto");
const update_listening_session_dto_1 = require("./dto/update-listening-session.dto");
const update_place_dto_1 = require("./dto/update-place.dto");
const update_situation_dto_1 = require("./dto/update-situation.dto");
const listening_service_1 = require("./listening.service");
const jwt_auth_guard_js_1 = require("../login/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../login/guards/roles.guard.js");
const roles_decorator_js_1 = require("../login/decorators/roles.decorator.js");
let ListeningController = class ListeningController {
    listeningService;
    constructor(listeningService) {
        this.listeningService = listeningService;
    }
    createListeningLesson(createDto) {
        return this.listeningService.createListeningLesson(createDto);
    }
    uploadAudio(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        return {
            audioUrl: `/audios/${file.filename}`,
        };
    }
    async deleteAudioFile(audioUrl) {
        if (!audioUrl) {
            throw new common_1.BadRequestException('audioUrl is required');
        }
        if (!audioUrl.startsWith('/audios/') || audioUrl.includes('..')) {
            throw new common_1.BadRequestException('Invalid audioUrl');
        }
        const fileName = audioUrl.replace('/audios/', '');
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'public', 'audios', fileName);
        try {
            if ((0, fs_1.existsSync)(filePath)) {
                (0, fs_1.unlinkSync)(filePath);
                return { success: true };
            }
            else {
                throw new common_1.NotFoundException('Audio file not found');
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Failed to delete audio file: ${error.message}`);
        }
    }
    createPlace(createDto) {
        return this.listeningService.createPlace(createDto);
    }
    updatePlace(id, updateDto) {
        return this.listeningService.updatePlace(id, updateDto);
    }
    deletePlace(id) {
        return this.listeningService.deletePlace(id);
    }
    createSituation(createDto) {
        return this.listeningService.createSituation(createDto);
    }
    updateSituation(id, updateDto) {
        return this.listeningService.updateSituation(id, updateDto);
    }
    deleteSituation(id) {
        return this.listeningService.deleteSituation(id);
    }
    getAllLearningUnits() {
        return this.listeningService.getAllLearningUnits();
    }
    createLearningUnit(createDto) {
        return this.listeningService.createLearningUnit(createDto);
    }
    updateLearningUnit(id, updateDto) {
        return this.listeningService.updateLearningUnit(id, updateDto);
    }
    deleteLearningUnit(id) {
        return this.listeningService.deleteLearningUnit(id);
    }
    getAllPlaces() {
        return this.listeningService.getAllPlaces();
    }
    getAllLevels() {
        return this.listeningService.getAllLevels();
    }
    getPlaceFull(placeId) {
        return this.listeningService.getPlaceFull(placeId);
    }
    getSituationsByPlaceId(placeId) {
        return this.listeningService.getSituationsByPlaceId(placeId);
    }
    getLearningUnitsBySituationId(situationId) {
        return this.listeningService.getLearningUnitsBySituationId(situationId);
    }
    getAllListeningLessons() {
        return this.listeningService.getAllListeningLessons();
    }
    getListeningLessonByLearningUnit(learningUnitId) {
        return this.listeningService.getListeningLessonByLearningUnit(learningUnitId);
    }
    completeListeningSession(sessionId, req) {
        return this.listeningService.completeListeningSession(sessionId, req.user.userId);
    }
    getListeningSessionById(sessionId, req) {
        return this.listeningService.getListeningSessionById(sessionId, req.user.userId);
    }
    updateListeningSession(sessionId, updateDto, req) {
        return this.listeningService.updateListeningSession(sessionId, req.user.userId, updateDto);
    }
    getAudioProcessingPlan(id, query) {
        return this.listeningService.getAudioProcessingPlan(id, query);
    }
    getLatestListeningSession(id, req) {
        return this.listeningService.getLatestListeningSession(id, req.user.userId);
    }
    startListeningSession(id, startDto, req) {
        return this.listeningService.startListeningSession(id, req.user.userId, startDto);
    }
    getListeningLessonById(id) {
        return this.listeningService.getListeningLessonById(id);
    }
    updateListeningLesson(id, updateListeningDto) {
        return this.listeningService.updateListeningLesson(id, updateListeningDto);
    }
    deleteListeningLesson(id) {
        return this.listeningService.deleteListeningLesson(id);
    }
};
exports.ListeningController = ListeningController;
__decorate([
    (0, common_1.Post)('admin/create'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Create a listening lesson',
        description: 'Only admin can create a listening lesson',
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Listening lesson created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_listening_dto_1.CreateListeningDto]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "createListeningLesson", null);
__decorate([
    (0, common_1.Post)('admin/upload-audio'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Upload audio file' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Audio uploaded successfully' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/audios',
            filename: (req, file, cb) => {
                let decodedName = file.originalname;
                try {
                    decodedName = Buffer.from(file.originalname, 'latin1').toString('utf8');
                }
                catch (e) { }
                const extension = (0, path_1.extname)(decodedName).toLowerCase();
                let baseName = decodedName.substring(0, decodedName.length - extension.length);
                baseName = baseName.replace(/[^a-zA-Z0-9\u0080-\uFFFF_-]/g, '_');
                cb(null, `${baseName}${extension}`);
            },
        }),
        limits: {
            fileSize: 50 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            const allowedExt = ['.mp3', '.wav', '.m4a'];
            const allowedMime = [
                'audio/mpeg',
                'audio/mp3',
                'audio/wav',
                'audio/x-wav',
                'audio/mp4',
                'audio/x-m4a',
            ];
            const extension = (0, path_1.extname)(file.originalname).toLowerCase();
            if (!allowedExt.includes(extension) || !allowedMime.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException('Only mp3/wav/m4a files are allowed'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "uploadAudio", null);
__decorate([
    (0, common_1.Delete)('admin/delete-audio'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Delete an uploaded audio file' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                audioUrl: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Body)('audioUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListeningController.prototype, "deleteAudioFile", null);
__decorate([
    (0, common_1.Post)('admin/places'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Create a place' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Place created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_dto_1.CreatePlaceDto]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "createPlace", null);
__decorate([
    (0, common_1.Put)('admin/places/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Update a place' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Place id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Place updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_place_dto_1.UpdatePlaceDto]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "updatePlace", null);
__decorate([
    (0, common_1.Delete)('admin/places/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Delete a place' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Place id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Place deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "deletePlace", null);
__decorate([
    (0, common_1.Post)('admin/situations'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Create a situation' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Situation created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_situation_dto_1.CreateSituationDto]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "createSituation", null);
__decorate([
    (0, common_1.Put)('admin/situations/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Update a situation' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Situation id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Situation updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_situation_dto_1.UpdateSituationDto]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "updateSituation", null);
__decorate([
    (0, common_1.Delete)('admin/situations/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Delete a situation' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Situation id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Situation deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "deleteSituation", null);
__decorate([
    (0, common_1.Get)('admin/learning-units'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Get all learning units' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of learning units' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getAllLearningUnits", null);
__decorate([
    (0, common_1.Post)('admin/learning-units'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Create a learning unit' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Learning unit created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_learning_unit_dto_1.CreateLearningUnitDto]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "createLearningUnit", null);
__decorate([
    (0, common_1.Put)('admin/learning-units/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Update a learning unit' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Learning unit id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Learning unit updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_learning_unit_dto_1.UpdateLearningUnitDto]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "updateLearningUnit", null);
__decorate([
    (0, common_1.Delete)('admin/learning-units/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: '[ADMIN] Delete a learning unit' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Learning unit id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Learning unit deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "deleteLearningUnit", null);
__decorate([
    (0, common_1.Get)('places'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all places' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of places' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getAllPlaces", null);
__decorate([
    (0, common_1.Get)('levels'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all levels' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of levels' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getAllLevels", null);
__decorate([
    (0, common_1.Get)('places/:placeId/full'),
    (0, swagger_1.ApiOperation)({ summary: 'Get place with situations and learning units' }),
    (0, swagger_1.ApiParam)({ name: 'placeId', description: 'Place id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Place hierarchy' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Place not found' }),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getPlaceFull", null);
__decorate([
    (0, common_1.Get)('places/:placeId/situations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get situations by place id' }),
    (0, swagger_1.ApiParam)({ name: 'placeId', description: 'Place id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of situations for the place' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Place not found' }),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getSituationsByPlaceId", null);
__decorate([
    (0, common_1.Get)('situations/:situationId/learning-units'),
    (0, swagger_1.ApiOperation)({ summary: 'Get learning units by situation id' }),
    (0, swagger_1.ApiParam)({ name: 'situationId', description: 'Situation id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of learning units for the situation' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Situation not found' }),
    __param(0, (0, common_1.Param)('situationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getLearningUnitsBySituationId", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all listening lessons' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of listening lessons' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getAllListeningLessons", null);
__decorate([
    (0, common_1.Get)('learning-unit/:learningUnitId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get listening lesson by learning unit id' }),
    (0, swagger_1.ApiParam)({ name: 'learningUnitId', description: 'Learning unit id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listening lesson for the learning unit' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening lesson not found' }),
    __param(0, (0, common_1.Param)('learningUnitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getListeningLessonByLearningUnit", null);
__decorate([
    (0, common_1.Post)('sessions/:sessionId/complete'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Complete a listening session and persist listening progress',
    }),
    (0, swagger_1.ApiParam)({ name: 'sessionId', description: 'Listening session id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Completed listening session state' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening session not found' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "completeListeningSession", null);
__decorate([
    (0, common_1.Get)('sessions/:sessionId'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a listening session with audio processing state',
    }),
    (0, swagger_1.ApiParam)({ name: 'sessionId', description: 'Listening session id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listening session state' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening session not found' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getListeningSessionById", null);
__decorate([
    (0, common_1.Patch)('sessions/:sessionId'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({ summary: 'Update listening session position/settings' }),
    (0, swagger_1.ApiParam)({ name: 'sessionId', description: 'Listening session id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Updated listening session state' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening session not found' }),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_listening_session_dto_1.UpdateListeningSessionDto, Object]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "updateListeningSession", null);
__decorate([
    (0, common_1.Get)(':id/audio-processing'),
    (0, swagger_1.ApiOperation)({
        summary: 'Build audio processing plan for a listening lesson',
        description: 'Returns transcript segments, current segment, speed/mode, and ambient-mix metadata for the FE audio player.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Listening lesson id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Audio processing plan with transcript segments',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, audio_processing_query_dto_1.AudioProcessingQueryDto]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getAudioProcessingPlan", null);
__decorate([
    (0, common_1.Get)(':id/sessions/latest'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get latest listening session for a lesson and learner',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Listening lesson id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Latest listening session state' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening session not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getLatestListeningSession", null);
__decorate([
    (0, common_1.Post)(':id/sessions'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Start a listening session for a lesson',
        description: 'Creates a session, resumes from saved progress when no initial position is passed, and returns audio processing state.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Listening lesson id' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Started listening session state' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening lesson or user not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, start_listening_session_dto_1.StartListeningSessionDto, Object]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "startListeningSession", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get listening lesson by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Listening lesson id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Listening lesson with transcript lines' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "getListeningLessonById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Update a listening lesson',
        description: 'Only admin can update listening lessons',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Listening lesson id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Updated listening lesson' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening lesson not found' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid payload' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_listening_dto_1.UpdateListeningDto]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "updateListeningLesson", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, swagger_1.ApiOperation)({
        summary: '[ADMIN] Delete a listening lesson',
        description: 'Only admin can delete listening lessons',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Listening lesson id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Deleted listening lesson' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Listening lesson not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListeningController.prototype, "deleteListeningLesson", null);
exports.ListeningController = ListeningController = __decorate([
    (0, swagger_1.ApiTags)('Listening'),
    (0, common_1.Controller)('listening'),
    __metadata("design:paramtypes", [listening_service_1.ListeningService])
], ListeningController);
//# sourceMappingURL=listening.controller.js.map