import { TranscriptLineDto } from '../transcript-line.dto';
export declare class CreateListeningDto {
    learningUnitId: string;
    titleVi: string;
    titleJa: string;
    audioUrl: string;
    durationSeconds: number;
    description?: string;
    transcriptLines?: TranscriptLineDto[];
    ambientSoundIds?: string[];
}
