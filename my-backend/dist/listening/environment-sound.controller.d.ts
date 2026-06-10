import { Model } from 'mongoose';
import { EnvironmentSoundDocument } from './schemas/environment-sound.schema';
export declare class EnvironmentSoundController {
    private envSoundModel;
    constructor(envSoundModel: Model<EnvironmentSoundDocument>);
    findAll(): Promise<{
        data: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            audio_url: string;
        }[];
    }>;
}
