import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { JwtAuthGuard } from '../login/guards/jwt-auth.guard.js';
import { RolesGuard } from '../login/guards/roles.guard.js';
import { Roles } from '../login/decorators/roles.decorator.js';

@ApiTags('Listening')
@Controller('listening')
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Get()
  @ApiOperation({ summary: 'Get all listening lessons' })
  @ApiOkResponse({ description: 'List of listening lessons' })
  getAllListeningLessons() {
    return this.listeningService.getAllListeningLessons();
  }

  @Get('places')
  @ApiOperation({ summary: 'Get all places' })
  @ApiOkResponse({ description: 'List of places' })
  getAllPlaces() {
    return this.listeningService.getAllPlaces();
  }

  @Get('places/:placeId/situations')
  @ApiOperation({ summary: 'Get situations by place id' })
  @ApiParam({ name: 'placeId', description: 'Place id' })
  @ApiOkResponse({ description: 'List of situations for the place' })
  @ApiNotFoundResponse({ description: 'Place not found' })
  getSituationsByPlaceId(@Param('placeId') placeId: string) {
    return this.listeningService.getSituationsByPlaceId(placeId);
  }

  @Get('situations/:situationId/learning-units')
  @ApiOperation({ summary: 'Get learning units by situation id' })
  @ApiParam({ name: 'situationId', description: 'Situation id' })
  @ApiOkResponse({ description: 'List of learning units for the situation' })
  @ApiNotFoundResponse({ description: 'Situation not found' })
  getLearningUnitsBySituationId(@Param('situationId') situationId: string) {
    return this.listeningService.getLearningUnitsBySituationId(situationId);
  }

  @Get('learning-unit/:learningUnitId')
  @ApiOperation({ summary: 'Get listening lesson by learning unit id' })
  @ApiParam({ name: 'learningUnitId', description: 'Learning unit id' })
  @ApiOkResponse({ description: 'Listening lesson for the learning unit' })
  @ApiNotFoundResponse({ description: 'Listening lesson not found' })
  getListeningLessonByLearningUnit(
    @Param('learningUnitId') learningUnitId: string,
  ) {
    return this.listeningService.getListeningLessonByLearningUnit(
      learningUnitId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get listening lesson by id' })
  @ApiParam({ name: 'id', description: 'Listening lesson id' })
  @ApiOkResponse({ description: 'Listening lesson with transcript lines' })
  @ApiNotFoundResponse({ description: 'Listening lesson not found' })
  getListeningLessonById(@Param('id') id: string) {
    return this.listeningService.getListeningLessonById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '[ADMIN] Create a listening lesson',
    description: 'Only admin can create listening lessons',
  })
  @ApiCreatedResponse({ description: 'Created listening lesson' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  createListeningLesson(@Body() createListeningDto: CreateListeningDto) {
    return this.listeningService.createListeningLesson(createListeningDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '[ADMIN] Update a listening lesson',
    description: 'Only admin can update listening lessons',
  })
  @ApiParam({ name: 'id', description: 'Listening lesson id' })
  @ApiOkResponse({ description: 'Updated listening lesson' })
  @ApiNotFoundResponse({ description: 'Listening lesson not found' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  updateListeningLesson(
    @Param('id') id: string,
    @Body() updateListeningDto: UpdateListeningDto,
  ) {
    return this.listeningService.updateListeningLesson(id, updateListeningDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '[ADMIN] Delete a listening lesson',
    description: 'Only admin can delete listening lessons',
  })
  @ApiParam({ name: 'id', description: 'Listening lesson id' })
  @ApiOkResponse({ description: 'Deleted listening lesson' })
  @ApiNotFoundResponse({ description: 'Listening lesson not found' })
  deleteListeningLesson(@Param('id') id: string) {
    return this.listeningService.deleteListeningLesson(id);
  }
}
