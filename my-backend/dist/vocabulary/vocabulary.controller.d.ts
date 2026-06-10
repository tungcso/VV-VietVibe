import { GetVocabularyListQueryDto } from './dto/get-vocabulary-list.query';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabularyService } from './vocabulary.service';
export declare class VocabularyController {
    private readonly vocabularyService;
    constructor(vocabularyService: VocabularyService);
    getVocabularyList(query: GetVocabularyListQueryDto): Promise<{
        data: any;
        meta: {
            page: number;
            limit: number;
            total: any;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getVocabularyByLearningUnit(learningUnitId: string): Promise<{
        learningUnit: {
            id: string;
            titleVi: any;
            titleJa: any;
            description: any;
            situation: {
                id: string;
                titleVi: any;
                titleJa: any;
                place: {
                    id: string;
                    nameVi: any;
                    nameJa: any;
                    avatarUrl: any;
                } | null;
            } | null;
            level: {
                id: string;
                code: any;
                nameVi: any;
                nameJa: any;
                description: any;
            } | null;
        } | null;
        data: any;
        meta: {
            total: any;
        };
    }>;
    createVocabulary(createDto: CreateVocabularyDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            learningUnitId: string;
            wordVi: any;
            meaningJa: any;
            exampleVi: any;
            exampleJa: any;
            note: any;
            tag: any;
            createdAt: any;
            updatedAt: any;
            learningUnit: {
                id: string;
                titleVi: any;
                titleJa: any;
                description: any;
                situation: {
                    id: string;
                    titleVi: any;
                    titleJa: any;
                    place: {
                        id: string;
                        nameVi: any;
                        nameJa: any;
                        avatarUrl: any;
                    } | null;
                } | null;
                level: {
                    id: string;
                    code: any;
                    nameVi: any;
                    nameJa: any;
                    description: any;
                } | null;
            } | null;
        };
    }>;
    getVocabularyById(id: string): Promise<{
        success: boolean;
        data: {
            id: string;
            learningUnitId: string;
            wordVi: any;
            meaningJa: any;
            exampleVi: any;
            exampleJa: any;
            note: any;
            tag: any;
            createdAt: any;
            updatedAt: any;
            learningUnit: {
                id: string;
                titleVi: any;
                titleJa: any;
                description: any;
                situation: {
                    id: string;
                    titleVi: any;
                    titleJa: any;
                    place: {
                        id: string;
                        nameVi: any;
                        nameJa: any;
                        avatarUrl: any;
                    } | null;
                } | null;
                level: {
                    id: string;
                    code: any;
                    nameVi: any;
                    nameJa: any;
                    description: any;
                } | null;
            } | null;
        };
    }>;
    updateVocabulary(id: string, updateDto: UpdateVocabularyDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            learningUnitId: string;
            wordVi: any;
            meaningJa: any;
            exampleVi: any;
            exampleJa: any;
            note: any;
            tag: any;
            createdAt: any;
            updatedAt: any;
            learningUnit: {
                id: string;
                titleVi: any;
                titleJa: any;
                description: any;
                situation: {
                    id: string;
                    titleVi: any;
                    titleJa: any;
                    place: {
                        id: string;
                        nameVi: any;
                        nameJa: any;
                        avatarUrl: any;
                    } | null;
                } | null;
                level: {
                    id: string;
                    code: any;
                    nameVi: any;
                    nameJa: any;
                    description: any;
                } | null;
            } | null;
        };
    }>;
    deleteVocabulary(id: string): Promise<{
        success: boolean;
        message: string;
        deletedId: string;
    }>;
    getAllVocabulary(): Promise<{
        success: boolean;
        data: any;
        meta: {
            total: any;
        };
    }>;
}
