"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const path = __importStar(require("path"));
const mongoose_3 = __importDefault(require("mongoose"));
const bcrypt = __importStar(require("bcryptjs"));
const user_schema_js_1 = require("../login/schemas/user.schema.js");
const models = require(path.resolve(__dirname, '../../src/models'));
const { LearningUnit, UserProgress, VocabularyCard } = models;
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getProfile(userId) {
        const user = await this.userModel
            .findById(userId)
            .select('-password_hash')
            .exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateProfile(userId, updateData) {
        if (updateData.email) {
            const existingUser = await this.userModel
                .findOne({ email: updateData.email, _id: { $ne: userId } })
                .exec();
            if (existingUser) {
                throw new common_1.BadRequestException('Email is already in use');
            }
        }
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userId, { $set: updateData }, { returnDocument: 'after', runValidators: true })
            .select('-password_hash')
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async updatePassword(userId, updatePasswordDto) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const passwordMatches = await bcrypt.compare(updatePasswordDto.currentPassword, user.password_hash);
        if (!passwordMatches) {
            throw new common_1.BadRequestException('Incorrect current password');
        }
        const newPasswordHash = await bcrypt.hash(updatePasswordDto.newPassword, 10);
        user.password_hash = newPasswordHash;
        await user.save();
        return { message: 'Password updated successfully' };
    }
    async updateAvatar(userId, avatarUrl) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userId, { $set: { avatar_url: avatarUrl } }, { returnDocument: 'after' })
            .select('-password_hash')
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async getListeningSettings(userId) {
        const user = await this.userModel
            .findById(userId)
            .select('listening_settings badges')
            .exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user.listening_settings || {};
    }
    async updateListeningSettings(userId, updateDto) {
        const user = await this.userModel.findById(userId).exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!user.listening_settings) {
            user.listening_settings = {
                playback_speed: 1.0,
                auto_pause: false,
                environment_sound_id: null,
                environment_volume: 50,
            };
        }
        if (updateDto.playback_speed !== undefined)
            user.listening_settings.playback_speed = updateDto.playback_speed;
        if (updateDto.auto_pause !== undefined)
            user.listening_settings.auto_pause = updateDto.auto_pause;
        if (updateDto.environment_sound_id !== undefined)
            user.listening_settings.environment_sound_id =
                updateDto.environment_sound_id;
        if (updateDto.environment_volume !== undefined)
            user.listening_settings.environment_volume = updateDto.environment_volume;
        await user.save();
        return user.listening_settings;
    }
    async getOverallProgress(userId) {
        await this.ensureUserExists(userId);
        const [totalLearningUnits, userProgress] = await Promise.all([
            LearningUnit.countDocuments(),
            UserProgress.find({ user_id: this.toObjectId(userId) }),
        ]);
        const summary = userProgress.reduce((acc, progress) => {
            const unitId = String(progress.learning_unit_id);
            const vocabCompleted = Boolean(progress.vocabulary_progress?.completed);
            const listenCompleted = Boolean(progress.listening_progress?.completed);
            if (vocabCompleted)
                acc.total_checked_vocab += 1;
            if (listenCompleted)
                acc.total_checked_listening += 1;
            acc.learning_unit_progress[unitId] = {
                vocab: vocabCompleted,
                listen: listenCompleted,
            };
            return acc;
        }, {
            total_checked_vocab: 0,
            total_checked_listening: 0,
            learning_unit_progress: {},
        });
        return {
            total_vocab_tasks: totalLearningUnits,
            total_listening_tasks: totalLearningUnits,
            total_checked_vocab: summary.total_checked_vocab,
            total_checked_listening: summary.total_checked_listening,
            learning_unit_progress: summary.learning_unit_progress,
        };
    }
    async updateLearningUnitProgress(userId, learningUnitId, updateDto) {
        await this.ensureUserExists(userId);
        const unit = await LearningUnit.findById(this.toObjectId(learningUnitId));
        if (!unit) {
            throw new common_1.NotFoundException('Learning unit not found');
        }
        const now = updateDto.completed ? new Date() : null;
        const updatePayload = {};
        if (updateDto.field === 'vocab') {
            updatePayload['vocabulary_progress.completed'] = updateDto.completed;
            updatePayload['vocabulary_progress.completed_at'] = now;
        }
        else {
            updatePayload['listening_progress.completed'] = updateDto.completed;
            updatePayload['listening_progress.completed_at'] = now;
        }
        await UserProgress.updateOne({
            user_id: this.toObjectId(userId),
            learning_unit_id: this.toObjectId(learningUnitId),
        }, {
            $set: updatePayload,
            $setOnInsert: {
                user_id: this.toObjectId(userId),
                learning_unit_id: this.toObjectId(learningUnitId),
            },
        }, { upsert: true });
        return this.getOverallProgress(userId);
    }
    async markVocabularyCardViewed(userId, learningUnitId, cardId) {
        await this.ensureUserExists(userId);
        const learningUnitObjectId = this.toObjectId(learningUnitId);
        const cardObjectId = this.toObjectId(cardId);
        const [learningUnit, vocabularyCard, totalCards] = await Promise.all([
            LearningUnit.findById(learningUnitObjectId).select('_id').exec(),
            VocabularyCard.findOne({
                _id: cardObjectId,
                learning_unit_id: learningUnitObjectId,
            })
                .select('_id learning_unit_id')
                .exec(),
            VocabularyCard.countDocuments({ learning_unit_id: learningUnitObjectId }),
        ]);
        if (!learningUnit) {
            throw new common_1.NotFoundException('Learning unit not found');
        }
        if (!vocabularyCard) {
            throw new common_1.NotFoundException('Vocabulary card not found for this learning unit');
        }
        const userObjectId = this.toObjectId(userId);
        const updated = await UserProgress.findOneAndUpdate({
            user_id: userObjectId,
            learning_unit_id: learningUnitObjectId,
        }, {
            $setOnInsert: { user_id: userObjectId, learning_unit_id: learningUnitObjectId },
            $addToSet: { 'vocabulary_progress.viewed_card_ids': cardObjectId },
        }, { new: true, upsert: true }).exec();
        if (!updated) {
            throw new common_1.NotFoundException('User progress could not be updated');
        }
        const viewedCardIds = updated.vocabulary_progress?.viewed_card_ids || [];
        if (viewedCardIds.length === totalCards) {
            await UserProgress.updateOne({
                user_id: userObjectId,
                learning_unit_id: learningUnitObjectId,
                'vocabulary_progress.completed': { $ne: true },
            }, {
                $set: {
                    'vocabulary_progress.completed': true,
                    'vocabulary_progress.completed_at': new Date(),
                },
            }).exec();
        }
        const finalProgress = await UserProgress.findOne({
            user_id: userObjectId,
            learning_unit_id: learningUnitObjectId,
        }).exec();
        const completed = Boolean(finalProgress?.vocabulary_progress?.completed);
        return {
            success: true,
            message: completed
                ? 'Vocabulary progress completed successfully'
                : 'Vocabulary progress updated successfully',
            data: {
                userId,
                learningUnitId,
                cardId,
                viewedCardIds: finalProgress?.vocabulary_progress?.viewed_card_ids || [],
                viewedCardCount: finalProgress?.vocabulary_progress?.viewed_card_ids?.length || 0,
                totalCards,
                completed,
                completedAt: finalProgress?.vocabulary_progress?.completed_at ?? null,
            },
        };
    }
    async findAll(search, month) {
        const filter = { role: { $ne: 'admin' } };
        if (search) {
            const regex = new RegExp(search, 'i');
            filter.$or = [{ user_name: regex }, { email: regex }];
        }
        if (month === 'current') {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            filter.created_at = { $gte: startOfMonth };
        }
        const users = await this.userModel
            .find(filter)
            .select('-password_hash')
            .sort({ created_at: -1 })
            .exec();
        return users;
    }
    async countAll() {
        return this.userModel.countDocuments({ role: { $ne: 'admin' } }).exec();
    }
    async deleteUser(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role === 'admin') {
            throw new common_1.BadRequestException('Cannot delete admin user');
        }
        await this.userModel.findByIdAndDelete(userId).exec();
        try {
            const UserProgress = require(path.resolve(__dirname, '../../src/models')).UserProgress;
            await UserProgress.deleteMany({ user_id: this.toObjectId(userId) });
        }
        catch {
        }
        return { message: 'User deleted successfully' };
    }
    async adminUpdatePassword(userId, newPassword) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        user.password_hash = newPasswordHash;
        await user.save();
        return { message: 'Password updated successfully' };
    }
    async ensureUserExists(userId) {
        const user = await this.userModel.findById(userId).select('_id').exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    toObjectId(id) {
        if (!mongoose_3.default.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid id');
        }
        return new mongoose_3.default.Types.ObjectId(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_js_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map