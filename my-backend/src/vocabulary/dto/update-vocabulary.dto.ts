import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateVocabularyDto {
  @ApiProperty({
    description: 'Learning Unit ID',
    example: '6a0062476ba452f577db7e77',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  learning_unit_id?: string;

  @ApiProperty({
    description: 'Vietnamese word',
    example: 'phở',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Từ Tiếng Việt không được để trống' })
  word_vi?: string;

  @ApiProperty({
    description: 'Japanese meaning',
    example: 'フォー（ベトナムのヌードル）',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Nghĩa Tiếng Nhật không được để trống' })
  meaning_ja?: string;

  @ApiProperty({
    description: 'Vietnamese example sentence',
    example: 'Tôi thích ăn phở.',
    required: false,
  })
  @IsOptional()
  @IsString()
  example_vi?: string;

  @ApiProperty({
    description: 'Japanese example sentence',
    example: 'Phởが好きです。',
    required: false,
  })
  @IsOptional()
  @IsString()
  example_ja?: string;

  @ApiProperty({
    description: 'Additional notes',
    example: 'Vietnamese traditional soup made from beef or chicken',
    required: false,
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    description: 'Tag for categorization',
    example: 'food,culture',
    required: false,
  })
  @IsOptional()
  @IsString()
  tag?: string;
}
