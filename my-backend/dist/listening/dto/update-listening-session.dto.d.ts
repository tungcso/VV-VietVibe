import { type AmbientSound, type PlaybackMode, type PlaybackSpeed } from '../listening-session.constants';
export declare class UpdateListeningSessionDto {
    currentPositionSeconds?: number;
    playbackSpeed?: PlaybackSpeed;
    playbackMode?: PlaybackMode;
    ambientSound?: AmbientSound | null;
    ambientVolume?: number;
    transcriptLineId?: string;
    completed?: boolean;
}
