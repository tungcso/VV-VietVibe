import { Model, Types } from 'mongoose';
import { SituationDocument } from './schemas/situation.schema';
import { UserListeningProgressDocument } from './schemas/user-listening-progress.schema';
export declare class SituationService {
    private situationModel;
    private progressModel;
    constructor(situationModel: Model<SituationDocument>, progressModel: Model<UserListeningProgressDocument>);
    findAll(): Promise<{
        data: {
            id: Types.ObjectId;
            title_vn: string;
            title_jp: string;
            duration: number;
        }[];
    }>;
    findOneWithDetails(id: string): Promise<{
        id: Types.ObjectId;
        title_vn: string;
        title_jp: string;
        main_audio_url: string;
        duration: number;
        scripts: {
            id: any;
            speaker_name: any;
            content_jp: any;
            content_vn: any;
            start_time: any;
            end_time: any;
            order_index: any;
        }[];
    }>;
    updateProgress(userId: string, situationId: string, progressSeconds: number): Promise<{
        success: boolean;
        progress_seconds: number;
        is_completed: boolean;
        newly_unlocked_badges: string[];
    }>;
}
