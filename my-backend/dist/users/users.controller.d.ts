import { UsersService } from './users.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UpdatePasswordDto } from './dto/update-password.dto.js';
import { AdminUpdatePasswordDto } from './dto/admin-update-password.dto.js';
import { UpdateLearningUnitProgressDto } from './dto/update-learning-unit-progress.dto.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(search?: string, month?: string): Promise<(import("mongoose").Document<unknown, {}, import("../login/schemas/user.schema.js").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../login/schemas/user.schema.js").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    countAll(): Promise<{
        count: number;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    adminUpdatePassword(id: string, dto: AdminUpdatePasswordDto): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<import("mongoose").Document<unknown, {}, import("../login/schemas/user.schema.js").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../login/schemas/user.schema.js").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<import("mongoose").Document<unknown, {}, import("../login/schemas/user.schema.js").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../login/schemas/user.schema.js").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updatePassword(req: any, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    uploadAvatar(req: any, file: any): Promise<import("mongoose").Document<unknown, {}, import("../login/schemas/user.schema.js").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../login/schemas/user.schema.js").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getListeningSettings(req: any): Promise<{
        playback_speed: number;
        auto_pause: boolean;
        environment_sound_id: any | null;
        environment_volume: number;
    }>;
    updateListeningSettings(req: any, updateDto: import('./dto/update-listening-settings.dto.js').UpdateListeningSettingsDto): Promise<{
        playback_speed: number;
        auto_pause: boolean;
        environment_sound_id: any | null;
        environment_volume: number;
    }>;
    getOverallProgress(req: any): Promise<{
        total_vocab_tasks: any;
        total_listening_tasks: any;
        total_checked_vocab: any;
        total_checked_listening: any;
        learning_unit_progress: any;
    }>;
    updateLearningUnitProgress(req: any, learningUnitId: string, updateDto: UpdateLearningUnitProgressDto): Promise<{
        total_vocab_tasks: any;
        total_listening_tasks: any;
        total_checked_vocab: any;
        total_checked_listening: any;
        learning_unit_progress: any;
    }>;
    markVocabularyCardViewed(req: any, learningUnitId: string, cardId: string): Promise<{
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
}
