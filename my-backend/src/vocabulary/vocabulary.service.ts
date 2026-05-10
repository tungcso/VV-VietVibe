import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { GetVocabularyListQueryDto } from './dto/get-vocabulary-list.query';

const models = require(path.resolve(__dirname, '../../src/models'));
const mongoose = require('mongoose');
const { Types } = mongoose;

const {
  VocabularyCard,
  LearningUnit,
  Situation,
  Level,
} = models;

@Injectable()
export class VocabularyService {
  async getVocabularyList(query: GetVocabularyListQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const learningUnitFilter: Record<string, unknown> = {};

    if (query.learningUnitId) {
      learningUnitFilter._id = this.toObjectId(query.learningUnitId);
    }

    if (query.situationId) {
      learningUnitFilter.situation_id = this.toObjectId(query.situationId);
    }

    if (query.levelId) {
      learningUnitFilter.level_id = this.toObjectId(query.levelId);
    }

    if (query.placeId) {
      const placeObjectId = this.toObjectId(query.placeId);
      const situations = await Situation.find({ place_id: placeObjectId }).select('_id');
      const situationIds = situations.map((situation) => situation._id);

      if (situationIds.length === 0) {
        return this.buildEmptyPagination(page, limit);
      }

      if (query.situationId && !situationIds.some((id) => String(id) === String(query.situationId))) {
        return this.buildEmptyPagination(page, limit);
      }

      learningUnitFilter.situation_id = { $in: situationIds };
    }

    let learningUnitIds: string[] = [];
    let hasLearningUnitFilter = false;

    if (Object.keys(learningUnitFilter).length > 0) {
      const learningUnits = await LearningUnit.find(learningUnitFilter).select('_id');
      learningUnitIds = learningUnits.map((unit) => String(unit._id));
      hasLearningUnitFilter = true;

      if (learningUnitIds.length === 0) {
        return this.buildEmptyPagination(page, limit);
      }
    }

    const vocabularyFilter: Record<string, unknown> = {};

    if (hasLearningUnitFilter) {
      vocabularyFilter.learning_unit_id = { $in: learningUnitIds };
    }

    if (query.tag) {
      vocabularyFilter.tag = { $regex: this.escapeRegExp(query.tag), $options: 'i' };
    }

    if (query.search) {
      const searchRegex = new RegExp(this.escapeRegExp(query.search), 'i');
      vocabularyFilter.$or = [
        { word_vi: searchRegex },
        { meaning_ja: searchRegex },
        { example_vi: searchRegex },
        { example_ja: searchRegex },
        { note: searchRegex },
        { tag: searchRegex },
      ];
    }

    const total = await VocabularyCard.countDocuments(vocabularyFilter);
    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    const sortDirection = query.sortOrder === 'asc' ? 1 : -1;
    const sortField = query.sortBy ?? 'created_at';

    const vocabularyCards = await VocabularyCard.find(vocabularyFilter)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'learning_unit_id',
        select: 'title_vi title_ja situation_id level_id',
        populate: [
          {
            path: 'situation_id',
            select: 'title_vi title_ja place_id',
            populate: {
              path: 'place_id',
              select: 'name_vi name_ja',
            },
          },
          {
            path: 'level_id',
            select: 'code name_vi name_ja description',
          },
        ],
      });

    return {
      data: vocabularyCards.map((card) => this.mapVocabularyCard(card)),
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async getVocabularyByLearningUnit(learningUnitId: string) {
    const learningUnit = await LearningUnit.findById(learningUnitId)
      .populate({
        path: 'situation_id',
        select: 'title_vi title_ja place_id',
        populate: {
          path: 'place_id',
          select: 'name_vi name_ja',
        },
      })
      .populate({
        path: 'level_id',
        select: 'code name_vi name_ja description',
      });

    if (!learningUnit) {
      throw new NotFoundException('Không tìm thấy bài học tương ứng với learningUnitId này.');
    }

    const vocabularyCards = await VocabularyCard.find({ learning_unit_id: learningUnitId }).sort({ created_at: 1 });

    return {
      learningUnit: this.mapLearningUnit(learningUnit),
      data: vocabularyCards.map((card) => this.mapVocabularyCard(card)),
      meta: {
        total: vocabularyCards.length,
      },
    };
  }

  private buildEmptyPagination(page: number, limit: number) {
    return {
      data: [],
      meta: {
        page,
        limit,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: page > 1,
      },
    };
  }

  private mapVocabularyCard(card: any) {
    return {
      id: String(card._id),
      learningUnitId: String(card.learning_unit_id?._id ?? card.learning_unit_id),
      wordVi: card.word_vi,
      meaningJa: card.meaning_ja,
      exampleVi: card.example_vi,
      exampleJa: card.example_ja,
      note: card.note,
      tag: card.tag,
      createdAt: card.created_at,
      updatedAt: card.updated_at,
      learningUnit: this.mapLearningUnit(card.learning_unit_id),
    };
  }

  private mapLearningUnit(learningUnit: any) {
    if (!learningUnit) {
      return null;
    }

    return {
      id: String(learningUnit._id),
      titleVi: learningUnit.title_vi,
      titleJa: learningUnit.title_ja,
      description: learningUnit.description,
      situation: this.mapSituation(learningUnit.situation_id),
      level: this.mapLevel(learningUnit.level_id),
    };
  }

  private mapSituation(situation: any) {
    if (!situation) {
      return null;
    }

    return {
      id: String(situation._id),
      titleVi: situation.title_vi,
      titleJa: situation.title_ja,
      place: this.mapPlace(situation.place_id),
    };
  }

  private mapLevel(level: any) {
    if (!level) {
      return null;
    }

    return {
      id: String(level._id),
      code: level.code,
      nameVi: level.name_vi,
      nameJa: level.name_ja,
      description: level.description,
    };
  }

  private mapPlace(place: any) {
    if (!place) {
      return null;
    }

    return {
      id: String(place._id),
      nameVi: place.name_vi,
      nameJa: place.name_ja,
    };
  }

  private toObjectId(value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new NotFoundException('Id không hợp lệ.');
    }

    return new Types.ObjectId(value);
  }

  private escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
