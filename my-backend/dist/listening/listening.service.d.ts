import { AudioProcessingQueryDto } from './dto/audio-processing-query.dto';
import { CreateListeningDto } from './dto/create-listening.dto';
import { CreateLearningUnitDto } from './dto/create-learning-unit.dto';
import { CreatePlaceDto } from './dto/create-place.dto';
import { CreateSituationDto } from './dto/create-situation.dto';
import { StartListeningSessionDto } from './dto/start-listening-session.dto';
import { UpdateLearningUnitDto } from './dto/update-learning-unit.dto';
import { UpdateListeningDto } from './dto/update-listening.dto';
import { UpdateListeningSessionDto } from './dto/update-listening-session.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { UpdateSituationDto } from './dto/update-situation.dto';
export declare class ListeningService {
    getAllPlaces(): Promise<any>;
    getSituationsByPlaceId(placeId: string): Promise<any>;
    getPlaceFull(placeId: string): Promise<{
        situations: any;
        id: string;
        nameVi: any;
        nameJa: any;
        description: any;
        avatarUrl: any;
    }>;
    getLearningUnitsBySituationId(situationId: string): Promise<any>;
    getAllListeningLessons(): Promise<any>;
    getAllSituations(): Promise<any>;
    getAllLearningUnits(): Promise<any>;
    getAllLevels(): Promise<any>;
    createPlace(createDto: CreatePlaceDto): Promise<{
        id: string;
        nameVi: any;
        nameJa: any;
        description: any;
        avatarUrl: any;
    }>;
    updatePlace(id: string, updateDto: UpdatePlaceDto): Promise<{
        id: string;
        nameVi: any;
        nameJa: any;
        description: any;
        avatarUrl: any;
    }>;
    deletePlace(id: string): Promise<{
        deleted: boolean;
    }>;
    createSituation(createDto: CreateSituationDto): Promise<{
        id: string;
        placeId: string;
        titleVi: any;
        titleJa: any;
        description: any;
    }>;
    updateSituation(id: string, updateDto: UpdateSituationDto): Promise<{
        id: string;
        placeId: string;
        titleVi: any;
        titleJa: any;
        description: any;
    }>;
    deleteSituation(id: string): Promise<{
        deleted: boolean;
    }>;
    createLearningUnit(createDto: CreateLearningUnitDto): Promise<{
        id: string;
        situationId: string;
        levelId: string;
        titleVi: any;
        titleJa: any;
        description: any;
        level: {
            id: string;
            code: any;
            nameVi: any;
            nameJa: any;
            description: any;
        } | null;
    }>;
    updateLearningUnit(id: string, updateDto: UpdateLearningUnitDto): Promise<{
        id: string;
        situationId: string;
        levelId: string;
        titleVi: any;
        titleJa: any;
        description: any;
        level: {
            id: string;
            code: any;
            nameVi: any;
            nameJa: any;
            description: any;
        } | null;
    }>;
    deleteLearningUnit(id: string): Promise<{
        deleted: boolean;
    }>;
    getListeningLessonById(id: string): Promise<any>;
    getListeningLessonByLearningUnit(learningUnitId: string): Promise<any>;
    createListeningLesson(createDto: CreateListeningDto): Promise<any>;
    updateListeningLesson(id: string, updateDto: UpdateListeningDto): Promise<any>;
    deleteListeningLesson(id: string): Promise<{
        deleted: boolean;
    }>;
    getAudioProcessingPlan(id: string, query: AudioProcessingQueryDto): Promise<{
        lessonId: string;
        learningUnitId: string;
        titleVi: any;
        titleJa: any;
        audioUrl: any;
        durationSeconds: any;
        currentPositionSeconds: number;
        playbackSpeed: 1 | 0.75;
        playbackRate: 1 | 0.75;
        playbackMode: "study" | "continuous";
        shouldAutoStop: boolean;
        nextStopAtSeconds: any;
        ambientSound: string;
        ambientVolume: number;
        shouldMixAmbientSound: boolean;
        ambientMix: {
            enabled: boolean;
            sound: "cafe" | "road" | "market" | "office" | null;
            volume: number;
        };
        currentTranscriptLineIndex: number;
        currentTranscriptLine: {
            id: string;
            index: number;
            startTime: any;
            endTime: any;
            textVi: any;
            textJa: any;
        } | null;
        segments: {
            id: string;
            index: number;
            startTime: any;
            endTime: any;
            textVi: any;
            textJa: any;
        }[];
    }>;
    startListeningSession(id: string, userIdString: string, startDto: StartListeningSessionDto): Promise<{
        session: {
            id: string;
            userId: string;
            lessonId: string;
            learningUnitId: string;
            playbackSpeed: 1 | 0.75;
            playbackMode: "study" | "continuous";
            ambientSound: string;
            ambientVolume: number;
            lastPositionSeconds: any;
            currentTranscriptLineId: string | null;
            completed: any;
            completedAt: any;
            endedAt: any;
            createdAt: any;
            updatedAt: any;
        };
        lesson: {
            id: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            description: any;
            ambientSoundIds: any;
            createdAt: any;
            updatedAt: any;
            transcriptLines: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
        audioProcessing: {
            lessonId: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            currentPositionSeconds: number;
            playbackSpeed: 1 | 0.75;
            playbackRate: 1 | 0.75;
            playbackMode: "study" | "continuous";
            shouldAutoStop: boolean;
            nextStopAtSeconds: any;
            ambientSound: string;
            ambientVolume: number;
            shouldMixAmbientSound: boolean;
            ambientMix: {
                enabled: boolean;
                sound: "cafe" | "road" | "market" | "office" | null;
                volume: number;
            };
            currentTranscriptLineIndex: number;
            currentTranscriptLine: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            } | null;
            segments: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
    }>;
    getLatestListeningSession(id: string, userIdValue: string): Promise<{
        session: {
            id: string;
            userId: string;
            lessonId: string;
            learningUnitId: string;
            playbackSpeed: 1 | 0.75;
            playbackMode: "study" | "continuous";
            ambientSound: string;
            ambientVolume: number;
            lastPositionSeconds: any;
            currentTranscriptLineId: string | null;
            completed: any;
            completedAt: any;
            endedAt: any;
            createdAt: any;
            updatedAt: any;
        };
        lesson: {
            id: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            description: any;
            ambientSoundIds: any;
            createdAt: any;
            updatedAt: any;
            transcriptLines: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
        audioProcessing: {
            lessonId: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            currentPositionSeconds: number;
            playbackSpeed: 1 | 0.75;
            playbackRate: 1 | 0.75;
            playbackMode: "study" | "continuous";
            shouldAutoStop: boolean;
            nextStopAtSeconds: any;
            ambientSound: string;
            ambientVolume: number;
            shouldMixAmbientSound: boolean;
            ambientMix: {
                enabled: boolean;
                sound: "cafe" | "road" | "market" | "office" | null;
                volume: number;
            };
            currentTranscriptLineIndex: number;
            currentTranscriptLine: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            } | null;
            segments: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
    }>;
    getListeningSessionById(sessionId: string, userIdString: string): Promise<{
        session: {
            id: string;
            userId: string;
            lessonId: string;
            learningUnitId: string;
            playbackSpeed: 1 | 0.75;
            playbackMode: "study" | "continuous";
            ambientSound: string;
            ambientVolume: number;
            lastPositionSeconds: any;
            currentTranscriptLineId: string | null;
            completed: any;
            completedAt: any;
            endedAt: any;
            createdAt: any;
            updatedAt: any;
        };
        lesson: {
            id: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            description: any;
            ambientSoundIds: any;
            createdAt: any;
            updatedAt: any;
            transcriptLines: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
        audioProcessing: {
            lessonId: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            currentPositionSeconds: number;
            playbackSpeed: 1 | 0.75;
            playbackRate: 1 | 0.75;
            playbackMode: "study" | "continuous";
            shouldAutoStop: boolean;
            nextStopAtSeconds: any;
            ambientSound: string;
            ambientVolume: number;
            shouldMixAmbientSound: boolean;
            ambientMix: {
                enabled: boolean;
                sound: "cafe" | "road" | "market" | "office" | null;
                volume: number;
            };
            currentTranscriptLineIndex: number;
            currentTranscriptLine: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            } | null;
            segments: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
    }>;
    updateListeningSession(sessionId: string, userIdString: string, updateDto: UpdateListeningSessionDto): Promise<{
        session: {
            id: string;
            userId: string;
            lessonId: string;
            learningUnitId: string;
            playbackSpeed: 1 | 0.75;
            playbackMode: "study" | "continuous";
            ambientSound: string;
            ambientVolume: number;
            lastPositionSeconds: any;
            currentTranscriptLineId: string | null;
            completed: any;
            completedAt: any;
            endedAt: any;
            createdAt: any;
            updatedAt: any;
        };
        lesson: {
            id: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            description: any;
            ambientSoundIds: any;
            createdAt: any;
            updatedAt: any;
            transcriptLines: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
        audioProcessing: {
            lessonId: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            currentPositionSeconds: number;
            playbackSpeed: 1 | 0.75;
            playbackRate: 1 | 0.75;
            playbackMode: "study" | "continuous";
            shouldAutoStop: boolean;
            nextStopAtSeconds: any;
            ambientSound: string;
            ambientVolume: number;
            shouldMixAmbientSound: boolean;
            ambientMix: {
                enabled: boolean;
                sound: "cafe" | "road" | "market" | "office" | null;
                volume: number;
            };
            currentTranscriptLineIndex: number;
            currentTranscriptLine: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            } | null;
            segments: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
    }>;
    completeListeningSession(sessionId: string, userIdString: string): Promise<{
        session: {
            id: string;
            userId: string;
            lessonId: string;
            learningUnitId: string;
            playbackSpeed: 1 | 0.75;
            playbackMode: "study" | "continuous";
            ambientSound: string;
            ambientVolume: number;
            lastPositionSeconds: any;
            currentTranscriptLineId: string | null;
            completed: any;
            completedAt: any;
            endedAt: any;
            createdAt: any;
            updatedAt: any;
        };
        lesson: {
            id: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            description: any;
            ambientSoundIds: any;
            createdAt: any;
            updatedAt: any;
            transcriptLines: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
        audioProcessing: {
            lessonId: string;
            learningUnitId: string;
            titleVi: any;
            titleJa: any;
            audioUrl: any;
            durationSeconds: any;
            currentPositionSeconds: number;
            playbackSpeed: 1 | 0.75;
            playbackRate: 1 | 0.75;
            playbackMode: "study" | "continuous";
            shouldAutoStop: boolean;
            nextStopAtSeconds: any;
            ambientSound: string;
            ambientVolume: number;
            shouldMixAmbientSound: boolean;
            ambientMix: {
                enabled: boolean;
                sound: "cafe" | "road" | "market" | "office" | null;
                volume: number;
            };
            currentTranscriptLineIndex: number;
            currentTranscriptLine: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            } | null;
            segments: {
                id: string;
                index: number;
                startTime: any;
                endTime: any;
                textVi: any;
                textJa: any;
            }[];
        };
    }>;
    private findLessonOrThrow;
    private findSessionOrThrow;
    private findUserOrThrow;
    private getTranscriptLines;
    private resolveSessionSettings;
    private resolvePlaybackSpeed;
    private resolvePlaybackMode;
    private resolveAmbientSound;
    private resolveAmbientVolume;
    private resolvePlaybackPosition;
    private buildSessionResponse;
    private buildLessonResponse;
    private buildAudioProcessingPlan;
    private mapTranscriptLine;
    private findCurrentTranscriptLine;
    private clampPosition;
    private isLessonCompleted;
    private persistListeningProgress;
    private deleteLearningUnitDependencies;
    private toObjectId;
    private mapPlace;
    private mapSituation;
    private mapLearningUnit;
    private mapLevel;
}
