import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { User, UserDocument } from '../login/schemas/user.schema.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';
import { UpdateLearningUnitProgressDto } from './dto/update-learning-unit-progress.dto.js';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getProfile(userId: string): Promise<mongoose.Document<unknown, {}, UserDocument, {}, mongoose.DefaultSchemaOptions> & User & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProfile(userId: string, updateData: UpdateProfileDto): Promise<mongoose.Document<unknown, {}, UserDocument, {}, mongoose.DefaultSchemaOptions> & User & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    updateAvatar(userId: string, avatarUrl: string): Promise<mongoose.Document<unknown, {}, UserDocument, {}, mongoose.DefaultSchemaOptions> & User & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getListeningSettings(userId: string): Promise<{
        playback_speed: number;
        auto_pause: boolean;
        environment_sound_id: any | null;
        environment_volume: number;
    }>;
    updateListeningSettings(userId: string, updateDto: import('./dto/update-listening-settings.dto.js').UpdateListeningSettingsDto): Promise<{
        playback_speed: number;
        auto_pause: boolean;
        environment_sound_id: any | null;
        environment_volume: number;
    }>;
    getOverallProgress(userId: string): Promise<{
        total_vocab_tasks: any;
        total_listening_tasks: any;
        total_checked_vocab: any;
        total_checked_listening: any;
        learning_unit_progress: any;
    }>;
    updateLearningUnitProgress(userId: string, learningUnitId: string, updateDto: UpdateLearningUnitProgressDto): Promise<{
        total_vocab_tasks: any;
        total_listening_tasks: any;
        total_checked_vocab: any;
        total_checked_listening: any;
        learning_unit_progress: any;
    }>;
    markVocabularyCardViewed(userId: string, learningUnitId: string, cardId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            userId: string;
            learningUnitId: string;
            cardId: string;
            viewedCardIds: any;
            viewedCardCount: any;
            totalCards: any;
            completed: boolean;
            completedAt: any;
        };
    }>;
    findAll(search?: string, month?: string): Promise<(mongoose.Document<unknown, {}, UserDocument, {}, mongoose.DefaultSchemaOptions> & User & mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    countAll(): Promise<number>;
    deleteUser(userId: string): Promise<{
        message: string;
    }>;
    adminUpdatePassword(userId: string, newPassword: string): Promise<{
        message: string;
    }>;
    private ensureUserExists;
    private toObjectId;
}
