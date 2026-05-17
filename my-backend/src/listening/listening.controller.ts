import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateListeningDto } from './dto/create-listening.dto';
import { UpdateListeningDto } from './dto/update-listening.dto';
import { ListeningService } from './listening.service';

@ApiTags('Listening')
@Controller('listening')
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Post()
  @ApiOperation({ summary: 'Create a listening lesson' })
  @ApiCreatedResponse({ description: 'Created listening lesson' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  createListeningLesson(@Body() createListeningDto: CreateListeningDto) {
    return this.listeningService.createListeningLesson(createListeningDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all listening lessons' })
  @ApiOkResponse({ description: 'List of listening lessons' })
  getAllListeningLessons() {
    return this.listeningService.getAllListeningLessons();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get listening lesson by id' })
  @ApiParam({ name: 'id', description: 'Listening lesson id' })
  @ApiOkResponse({ description: 'Listening lesson with transcript lines' })
  @ApiNotFoundResponse({ description: 'Listening lesson not found' })
  getListeningLessonById(@Param('id') id: string) {
    return this.listeningService.getListeningLessonById(id);
  }

  @Get('learning-unit/:learningUnitId')
  @ApiOperation({ summary: 'Get listening lesson by learning unit id' })
  @ApiParam({ name: 'learningUnitId', description: 'Learning unit id' })
  @ApiOkResponse({ description: 'Listening lesson for the learning unit' })
  @ApiNotFoundResponse({ description: 'Listening lesson not found' })
  getListeningLessonByLearningUnit(@Param('learningUnitId') learningUnitId: string) {
    return this.listeningService.getListeningLessonByLearningUnit(learningUnitId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a listening lesson' })
  @ApiParam({ name: 'id', description: 'Listening lesson id' })
  @ApiOkResponse({ description: 'Updated listening lesson' })
  @ApiNotFoundResponse({ description: 'Listening lesson not found' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  updateListeningLesson(@Param('id') id: string, @Body() updateListeningDto: UpdateListeningDto) {
    return this.listeningService.updateListeningLesson(id, updateListeningDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a listening lesson' })
  @ApiParam({ name: 'id', description: 'Listening lesson id' })
  @ApiOkResponse({ description: 'Deleted listening lesson' })
  @ApiNotFoundResponse({ description: 'Listening lesson not found' })
  deleteListeningLesson(@Param('id') id: string) {
    return this.listeningService.deleteListeningLesson(id);
  }
}
