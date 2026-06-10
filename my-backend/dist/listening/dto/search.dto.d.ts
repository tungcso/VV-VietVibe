export declare class SearchQueryDto {
    query?: string;
    level?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    hasProgress?: boolean;
    completed?: boolean;
    placeIds?: string[];
    sortBy?: 'relevance' | 'newest' | 'popular';
    offset?: number;
    limit?: number;
}
export declare class SearchResultDto {
    id: string;
    type: 'place' | 'situation' | 'learning_unit';
    title: string;
    subtitle?: string;
    description?: string;
    placeId?: string;
    situationId?: string;
    level?: string;
    difficulty?: string;
    progress?: number;
    completed?: boolean;
    avatarUrl?: string;
    matchScore?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class SearchResultsResponseDto {
    data: SearchResultDto[];
    total: number;
    offset: number;
    limit: number;
    pages: number;
}
export declare class LearningUnitFullDto {
    id: string;
    titleVi: string;
    titleJa: string;
    description?: string;
    levelId: string;
    level: string;
    difficulty: string;
    audioUrl?: string;
    transcriptUrl?: string;
}
export declare class SituationFullDto {
    id: string;
    titleVi: string;
    titleJa: string;
    description?: string;
    learningUnits: LearningUnitFullDto[];
}
export declare class PlaceFullDto {
    id: string;
    nameVi: string;
    nameJa: string;
    description?: string;
    avatarUrl?: string;
    situations: SituationFullDto[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class PlacesFullResponseDto {
    places: PlaceFullDto[];
    totalPlaces: number;
    totalSituations: number;
    totalLearningUnits: number;
}
