import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetVocabularyListQueryDto } from './dto/get-vocabulary-list.query';
import { VocabularyService } from './vocabulary.service';

@ApiTags('Vocabulary')
@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated vocabulary list' })
  @ApiOkResponse({ description: 'Paginated vocabulary cards' })
  getVocabularyList(@Query() query: GetVocabularyListQueryDto) {
    return this.vocabularyService.getVocabularyList(query);
  }

  @Get('learning-unit/:learningUnitId')
  @ApiOperation({ summary: 'Get vocabulary list by learning unit' })
  @ApiParam({ name: 'learningUnitId', description: 'Learning unit id' })
  @ApiOkResponse({ description: 'Vocabulary cards for a learning unit' })
  getVocabularyByLearningUnit(@Param('learningUnitId') learningUnitId: string) {
    return this.vocabularyService.getVocabularyByLearningUnit(learningUnitId);
  }
}
