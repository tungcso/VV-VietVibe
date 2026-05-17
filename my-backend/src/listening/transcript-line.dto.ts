import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class TranscriptLineDto {
  @ApiPropertyOptional({ type: Number, description: 'Transcript start time in seconds', example: 0 })
  @IsNumber()
  @Min(0)
  startTime: number;

  @ApiPropertyOptional({ type: Number, description: 'Transcript end time in seconds', example: 3.5 })
  @IsNumber()
  @Min(0)
  endTime: number;

  @ApiPropertyOptional({ type: String, description: 'Vietnamese transcript text', example: 'Xin chào.' })
  @IsString()
  @IsNotEmpty()
  textVi: string;

  @ApiPropertyOptional({ type: String, description: 'Japanese transcript text', example: 'こんにちは。' })
  @IsOptional()
  @IsString()
  textJa?: string;
}
