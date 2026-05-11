import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsMongoId, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetVocabularyListQueryDto {
  @ApiPropertyOptional({ type: Number, description: 'Page number', example: 1, minimum: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ type: Number, description: 'Items per page', example: 20, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @ApiPropertyOptional({ type: String, description: 'Search in Vietnamese word, Japanese meaning, examples, or notes', example: 'phở' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ type: String, description: 'Filter by learning unit id', example: '6a0062476ba452f577db7e77' })
  @IsOptional()
  @IsMongoId()
  learningUnitId?: string;

  @ApiPropertyOptional({ type: String, description: 'Filter by situation id', example: '6a0062476ba452f577db7e76' })
  @IsOptional()
  @IsMongoId()
  situationId?: string;

  @ApiPropertyOptional({ type: String, description: 'Filter by level id', example: '6a006247b979c9c2d96bc1b4' })
  @IsOptional()
  @IsMongoId()
  levelId?: string;

  @ApiPropertyOptional({ type: String, description: 'Filter by place id', example: '6a006247b979c9c2d96bc1b9' })
  @IsOptional()
  @IsMongoId()
  placeId?: string;

  @ApiPropertyOptional({ type: String, description: 'Filter by tag', example: 'daily' })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiPropertyOptional({ type: String, description: 'Field to sort by', example: 'created_at' })
  @IsOptional()
  @IsString()
  sortBy?: 'created_at' | 'word_vi' = 'created_at';

  @ApiPropertyOptional({ type: String, description: 'Sort direction', example: 'desc', enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
