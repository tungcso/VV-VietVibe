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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const users_service_js_1 = require("./users.service.js");
const jwt_auth_guard_js_1 = require("../login/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../login/guards/roles.guard.js");
const roles_decorator_js_1 = require("../login/decorators/roles.decorator.js");
const update_profile_dto_js_1 = require("./dto/update-profile.dto.js");
const update_password_dto_js_1 = require("./dto/update-password.dto.js");
const admin_update_password_dto_js_1 = require("./dto/admin-update-password.dto.js");
const update_learning_unit_progress_dto_js_1 = require("./dto/update-learning-unit-progress.dto.js");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll(search, month) {
        return this.usersService.findAll(search, month);
    }
    async countAll() {
        const count = await this.usersService.countAll();
        return { count };
    }
    deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
    adminUpdatePassword(id, dto) {
        return this.usersService.adminUpdatePassword(id, dto.newPassword);
    }
    getProfile(req) {
        return this.usersService.getProfile(req.user.userId);
    }
    updateProfile(req, updateProfileDto) {
        return this.usersService.updateProfile(req.user.userId, updateProfileDto);
    }
    updatePassword(req, updatePasswordDto) {
        return this.usersService.updatePassword(req.user.userId, updatePasswordDto);
    }
    async uploadAvatar(req, file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const avatarUrl = `/avatars/${file.filename}`;
        return this.usersService.updateAvatar(req.user.userId, avatarUrl);
    }
    getListeningSettings(req) {
        return this.usersService.getListeningSettings(req.user.userId);
    }
    updateListeningSettings(req, updateDto) {
        return this.usersService.updateListeningSettings(req.user.userId, updateDto);
    }
    getOverallProgress(req) {
        return this.usersService.getOverallProgress(req.user.userId);
    }
    updateLearningUnitProgress(req, learningUnitId, updateDto) {
        return this.usersService.updateLearningUnitProgress(req.user.userId, learningUnitId, updateDto);
    }
    markVocabularyCardViewed(req, learningUnitId, cardId) {
        return this.usersService.markVocabularyCardViewed(req.user.userId, learningUnitId, cardId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] List all users' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search by name or email' }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false, description: 'Filter by month: "current" for current month' }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Get total user count' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "countAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Delete a user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID to delete' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Patch)(':id/admin-password'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Change user password' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_update_password_dto_js_1.AdminUpdatePasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "adminUpdatePassword", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('me/profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user profile (name, email)' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_js_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('me/password'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user password' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_dto_js_1.UpdatePasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('me/avatar'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload user avatar' }),
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/avatars',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${uniqueSuffix}${ext}`);
            },
        }),
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|svg\+xml|webp)$/)) {
                return cb(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Get)('me/listening-settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy cài đặt luyện nghe' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getListeningSettings", null);
__decorate([
    (0, common_1.Put)('me/listening-settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật cài đặt luyện nghe' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateListeningSettings", null);
__decorate([
    (0, common_1.Get)('me/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Get overall learning progress' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Overall progress counts and per-unit status' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getOverallProgress", null);
__decorate([
    (0, common_1.Patch)('me/progress/learning-units/:learningUnitId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Toggle vocab/listening progress for a learning unit',
    }),
    (0, swagger_1.ApiParam)({ name: 'learningUnitId', description: 'Learning unit id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Updated overall progress counts and per-unit status',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('learningUnitId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_learning_unit_progress_dto_js_1.UpdateLearningUnitProgressDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateLearningUnitProgress", null);
__decorate([
    (0, common_1.Patch)('me/progress/vocabulary-units/:learningUnitId/cards/:cardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a vocabulary card as viewed' }),
    (0, swagger_1.ApiParam)({ name: 'learningUnitId', description: 'Learning unit id' }),
    (0, swagger_1.ApiParam)({ name: 'cardId', description: 'Vocabulary card id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Updated vocabulary progress for the learning unit',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('learningUnitId')),
    __param(2, (0, common_1.Param)('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "markVocabularyCardViewed", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)('access_token'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_js_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map