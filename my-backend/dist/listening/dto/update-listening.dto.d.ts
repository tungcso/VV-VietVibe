import { TranscriptLineDto } from '../transcript-line.dto';
export declare class UpdateListeningDto {
    learningUnitId?: string;
    titleVi?: string;
    titleJa?: string;
    audioUrl?: string;
    durationSeconds?: number;
    description?: string;
    transcriptLines?: TranscriptLineDto[];
    ambientSoundIds?: string[];
}
