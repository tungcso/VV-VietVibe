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
exports.SituationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const situation_schema_1 = require("./schemas/situation.schema");
const user_listening_progress_schema_1 = require("./schemas/user-listening-progress.schema");
let SituationService = class SituationService {
    situationModel;
    progressModel;
    constructor(situationModel, progressModel) {
        this.situationModel = situationModel;
        this.progressModel = progressModel;
    }
    async findAll() {
        const situations = await this.situationModel.find().select('-scripts').exec();
        return { data: situations.map(sit => ({
                id: sit._id,
                title_vn: sit.title_vn,
                title_jp: sit.title_jp,
                duration: sit.duration
            })) };
    }
    async findOneWithDetails(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Invalid ID');
        const situation = await this.situationModel.findById(id).exec();
        if (!situation)
            throw new common_1.NotFoundException('Situation not found');
        return {
            id: situation._id,
            title_vn: situation.title_vn,
            title_jp: situation.title_jp,
            main_audio_url: situation.main_audio_url,
            duration: situation.duration,
            scripts: situation.scripts.map((s, idx) => ({
                id: s._id?.toString() || `sub_${idx}`,
                speaker_name: s.speaker_name,
                content_jp: s.content_jp,
                content_vn: s.content_vn,
                start_time: s.start_time,
                end_time: s.end_time,
                order_index: s.order_index
            }))
        };
    }
    async updateProgress(userId, situationId, progressSeconds) {
        if (!mongoose_2.Types.ObjectId.isValid(situationId))
            throw new common_1.NotFoundException('Invalid ID');
        const situation = await this.situationModel.findById(situationId).exec();
        if (!situation)
            throw new common_1.NotFoundException('Situation not found');
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        const situationObjectId = new mongoose_2.Types.ObjectId(situationId);
        let progress = await this.progressModel.findOne({ user_id: userObjectId, situation_id: situationObjectId });
        if (!progress) {
            progress = new this.progressModel({ user_id: userObjectId, situation_id: situationObjectId });
        }
        if (progressSeconds > progress.highest_progress_seconds) {
            progress.highest_progress_seconds = progressSeconds;
        }
        let newlyUnlocked = [];
        if (!progress.is_completed && progressSeconds >= situation.duration) {
            progress.is_completed = true;
            newlyUnlocked.push('LISTENING');
        }
        await progress.save();
        return {
            success: true,
            progress_seconds: progress.highest_progress_seconds,
            is_completed: progress.is_completed,
            newly_unlocked_badges: newlyUnlocked
        };
    }
};
exports.SituationService = SituationService;
exports.SituationService = SituationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(situation_schema_1.Situation.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_listening_progress_schema_1.UserListeningProgress.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SituationService);
//# sourceMappingURL=situation.service.js.map