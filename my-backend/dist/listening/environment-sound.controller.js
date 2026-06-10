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
exports.EnvironmentSoundController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const environment_sound_schema_1 = require("./schemas/environment-sound.schema");
let EnvironmentSoundController = class EnvironmentSoundController {
    envSoundModel;
    constructor(envSoundModel) {
        this.envSoundModel = envSoundModel;
    }
    async findAll() {
        const sounds = await this.envSoundModel.find().exec();
        return {
            data: sounds.map(sound => ({
                id: sound._id,
                name: sound.name,
                audio_url: sound.audio_url
            }))
        };
    }
};
exports.EnvironmentSoundController = EnvironmentSoundController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách âm thanh môi trường' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnvironmentSoundController.prototype, "findAll", null);
exports.EnvironmentSoundController = EnvironmentSoundController = __decorate([
    (0, swagger_1.ApiTags)('Environment Sounds'),
    (0, common_1.Controller)('environment-sounds'),
    __param(0, (0, mongoose_1.InjectModel)(environment_sound_schema_1.EnvironmentSound.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EnvironmentSoundController);
//# sourceMappingURL=environment-sound.controller.js.map