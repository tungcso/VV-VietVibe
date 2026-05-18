import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { CreateListeningDto } from './dto/create-listening.dto';
import { UpdateListeningDto } from './dto/update-listening.dto';

const models = require(path.resolve(__dirname, '../../src/models'));
const mongoose = require('mongoose');
const { Types } = mongoose;

const {
  Place,
  Situation,
  LearningUnit,
  ListeningLesson,
  TranscriptLine,
  Level,
} = models;

@Injectable()
export class ListeningService {
  async getAllPlaces() {
    const places = await Place.find().sort({ created_at: 1 });
    return places.map((place) => this.mapPlace(place));
  }

  async getSituationsByPlaceId(placeId: string) {
    const placeObjectId = this.toObjectId(placeId);
    const place = await Place.findById(placeObjectId);
    if (!place) {
      throw new NotFoundException('Không tìm thấy địa điểm.');
    }

    const situations = await Situation.find({ place_id: placeObjectId }).sort({
      created_at: 1,
    });

    return situations.map((situation) => this.mapSituation(situation));
  }

  async getLearningUnitsBySituationId(situationId: string) {
    const situationObjectId = this.toObjectId(situationId);
    const situation = await Situation.findById(situationObjectId);
    if (!situation) {
      throw new NotFoundException('Không tìm thấy tình huống.');
    }

    const learningUnits = await LearningUnit.find({
      situation_id: situationObjectId,
    }).sort({ created_at: 1 });

    // Get level information for each learning unit
    const unitsWithLevel = await Promise.all(
      learningUnits.map(async (unit) => {
        const level = await Level.findById(unit.level_id);
        return this.mapLearningUnit(unit, level);
      }),
    );

    return unitsWithLevel;
  }

  async getAllListeningLessons() {
    return ListeningLesson.find().sort({ created_at: 1 });
  }

  async getListeningLessonById(id: string) {
    const lesson = await ListeningLesson.findById(this.toObjectId(id));
    if (!lesson) {
      throw new NotFoundException('Không tìm thấy bài nghe.');
    }

    const transcriptLines = await TranscriptLine.find({
      lesson_id: lesson._id,
    }).sort({ start_time: 1 });

    return {
      ...lesson.toObject(),
      transcriptLines,
    };
  }

  async getListeningLessonByLearningUnit(learningUnitId: string) {
    const lesson = await ListeningLesson.findOne({
      learning_unit_id: this.toObjectId(learningUnitId),
    });
    if (!lesson) {
      throw new NotFoundException(
        'Không tìm thấy bài nghe cho learningUnitId này.',
      );
    }

    const transcriptLines = await TranscriptLine.find({
      lesson_id: lesson._id,
    }).sort({ start_time: 1 });

    return {
      ...lesson.toObject(),
      transcriptLines,
    };
  }

  async createListeningLesson(createDto: CreateListeningDto) {
    const learningUnit = await LearningUnit.findById(createDto.learningUnitId);
    if (!learningUnit) {
      throw new NotFoundException('Learning unit not found');
    }

    const lesson = await ListeningLesson.create({
      learning_unit_id: createDto.learningUnitId,
      title_vi: createDto.titleVi,
      title_ja: createDto.titleJa,
      audio_url: createDto.audioUrl,
      duration_seconds: createDto.durationSeconds,
      description: createDto.description,
    });

    if (createDto.transcriptLines?.length) {
      const transcriptData = createDto.transcriptLines.map((line) => ({
        lesson_id: lesson._id,
        start_time: line.startTime,
        end_time: line.endTime,
        text_vi: line.textVi,
        text_ja: line.textJa,
      }));
      await TranscriptLine.insertMany(transcriptData);
    }

    return this.getListeningLessonById(String(lesson._id));
  }

  async updateListeningLesson(id: string, updateDto: UpdateListeningDto) {
    const updatePayload: Record<string, unknown> = {};
    if (updateDto.learningUnitId) {
      const learningUnit = await LearningUnit.findById(
        updateDto.learningUnitId,
      );
      if (!learningUnit) {
        throw new NotFoundException('Learning unit not found');
      }

      updatePayload.learning_unit_id = updateDto.learningUnitId;
    }
    if (updateDto.titleVi !== undefined) {
      updatePayload.title_vi = updateDto.titleVi;
    }
    if (updateDto.titleJa !== undefined) {
      updatePayload.title_ja = updateDto.titleJa;
    }
    if (updateDto.audioUrl !== undefined) {
      updatePayload.audio_url = updateDto.audioUrl;
    }
    if (updateDto.durationSeconds !== undefined) {
      updatePayload.duration_seconds = updateDto.durationSeconds;
    }
    if (updateDto.description !== undefined) {
      updatePayload.description = updateDto.description;
    }

    const lessonId = this.toObjectId(id);
    const lesson = await ListeningLesson.findById(lessonId);
    if (!lesson) {
      throw new NotFoundException('Không tìm thấy bài nghe để cập nhật.');
    }

    await ListeningLesson.findByIdAndUpdate(lessonId, updatePayload, {
      new: true,
    });

    if (updateDto.transcriptLines) {
      await TranscriptLine.deleteMany({ lesson_id: lessonId });
      if (updateDto.transcriptLines.length) {
        const transcriptData = updateDto.transcriptLines.map((line) => ({
          lesson_id: lessonId,
          start_time: line.startTime,
          end_time: line.endTime,
          text_vi: line.textVi,
          text_ja: line.textJa,
        }));
        await TranscriptLine.insertMany(transcriptData);
      }
    }

    return this.getListeningLessonById(id);
  }

  async deleteListeningLesson(id: string) {
    const lessonId = this.toObjectId(id);
    const lesson = await ListeningLesson.findByIdAndDelete(lessonId);
    if (!lesson) {
      throw new NotFoundException('Không tìm thấy bài nghe để xóa.');
    }

    await TranscriptLine.deleteMany({ lesson_id: lessonId });
    return { deleted: true };
  }

  private toObjectId(value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new NotFoundException('Id không hợp lệ.');
    }

    return new Types.ObjectId(value);
  }

  private mapPlace(place: any) {
    return {
      id: String(place._id),
      nameVi: place.name_vi,
      nameJa: place.name_ja,
      description: place.description ?? null,
    };
  }

  private mapSituation(situation: any) {
    return {
      id: String(situation._id),
      placeId: String(situation.place_id),
      titleVi: situation.title_vi,
      titleJa: situation.title_ja,
      description: situation.description ?? null,
    };
  }

  private mapLearningUnit(unit: any, level: any) {
    return {
      id: String(unit._id),
      situationId: String(unit.situation_id),
      levelId: String(unit.level_id),
      titleVi: unit.title_vi,
      titleJa: unit.title_ja,
      description: unit.description ?? null,
      level: level
        ? {
            id: String(level._id),
            code: level.code,
            nameVi: level.name_vi ?? null,
            nameJa: level.name_ja,
          }
        : null,
    };
  }
}
