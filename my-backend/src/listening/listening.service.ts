import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { CreateListeningDto } from './dto/create-listening.dto';
import { UpdateListeningDto } from './dto/update-listening.dto';

const models = require(path.resolve(__dirname, '../../src/models'));
const mongoose = require('mongoose');
const { Types } = mongoose;

const { ListeningLesson, TranscriptLine } = models;

@Injectable()
export class ListeningService {
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
}
