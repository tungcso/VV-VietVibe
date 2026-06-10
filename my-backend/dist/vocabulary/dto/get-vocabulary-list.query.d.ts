export declare class GetVocabularyListQueryDto {
    page: number;
    limit: number;
    search?: string;
    learningUnitId?: string;
    situationId?: string;
    levelId?: string;
    placeId?: string;
    tag?: string;
    sortBy?: 'created_at' | 'word_vi';
    sortOrder?: 'asc' | 'desc';
}
