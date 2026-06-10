import { SituationService } from './situation.service';
export declare class SituationController {
    private readonly situationService;
    constructor(situationService: SituationService);
    findAll(): Promise<{
        data: {
            id: import("mongoose").Types.ObjectId;
            title_vn: string;
            title_jp: string;
            duration: number;
        }[];
    }>;
    findOneWithDetails(id: string): Promise<{
        id: import("mongoose").Types.ObjectId;
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
    updateProgress(id: string, updateDto: import('./dto/update-progress.dto').UpdateProgressDto, req: any): Promise<{
        success: boolean;
        progress_seconds: number;
        is_completed: boolean;
        newly_unlocked_badges: string[];
    }>;
}
