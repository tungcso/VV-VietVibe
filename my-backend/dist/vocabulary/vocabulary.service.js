"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyService = void 0;
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const models = require(path.resolve(__dirname, '../../src/models'));
const mongoose = require('mongoose');
const { Types } = mongoose;
const { VocabularyCard, LearningUnit, Situation, Level, } = models;
let VocabularyService = class VocabularyService {
    async getVocabularyList(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        const learningUnitFilter = {};
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
        let learningUnitIds = [];
        let hasLearningUnitFilter = false;
        if (Object.keys(learningUnitFilter).length > 0) {
            const learningUnits = await LearningUnit.find(learningUnitFilter).select('_id');
            learningUnitIds = learningUnits.map((unit) => String(unit._id));
            hasLearningUnitFilter = true;
            if (learningUnitIds.length === 0) {
                return this.buildEmptyPagination(page, limit);
            }
        }
        const vocabularyFilter = {};
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
    async getVocabularyByLearningUnit(learningUnitId) {
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
            throw new common_1.NotFoundException('Không tìm thấy bài học tương ứng với learningUnitId này.');
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
    async createVocabulary(createDto) {
        const learningUnit = await LearningUnit.findById(createDto.learning_unit_id);
        if (!learningUnit) {
            throw new common_1.NotFoundException('Learning unit not found');
        }
        const newCard = await VocabularyCard.create({
            learning_unit_id: createDto.learning_unit_id,
            word_vi: createDto.word_vi.trim(),
            meaning_ja: createDto.meaning_ja.trim(),
            example_vi: createDto.example_vi?.trim() || null,
            example_ja: createDto.example_ja?.trim() || null,
            note: createDto.note?.trim() || null,
            tag: createDto.tag?.trim() || null,
        });
        return {
            success: true,
            message: '新しい単語カードが正常に作成されました',
            data: this.mapVocabularyCard(newCard),
        };
    }
    async getVocabularyById(id) {
        if (!Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('無効な ID です');
        }
        const card = await VocabularyCard.findById(id)
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
        if (!card) {
            throw new common_1.NotFoundException('単語カードが見つかりません');
        }
        return {
            success: true,
            data: this.mapVocabularyCard(card),
        };
    }
    async updateVocabulary(id, updateDto) {
        if (!Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('無効な ID です');
        }
        if (updateDto.learning_unit_id) {
            const learningUnit = await LearningUnit.findById(updateDto.learning_unit_id);
            if (!learningUnit) {
                throw new common_1.NotFoundException('Learning unit not found');
            }
        }
        const updatedCard = await VocabularyCard.findByIdAndUpdate(id, {
            ...(updateDto.learning_unit_id && { learning_unit_id: updateDto.learning_unit_id }),
            ...(updateDto.word_vi && { word_vi: updateDto.word_vi.trim() }),
            ...(updateDto.meaning_ja && { meaning_ja: updateDto.meaning_ja.trim() }),
            ...(updateDto.example_vi !== undefined && { example_vi: updateDto.example_vi?.trim() || null }),
            ...(updateDto.example_ja !== undefined && { example_ja: updateDto.example_ja?.trim() || null }),
            ...(updateDto.note !== undefined && { note: updateDto.note?.trim() || null }),
            ...(updateDto.tag !== undefined && { tag: updateDto.tag?.trim() || null }),
        }, { returnDocument: 'after' }).populate({
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
        if (!updatedCard) {
            throw new common_1.NotFoundException('単語カードが見つかりません');
        }
        return {
            success: true,
            message: '単語カードが正常に更新されました',
            data: this.mapVocabularyCard(updatedCard),
        };
    }
    async deleteVocabulary(id) {
        if (!Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('無効な ID です');
        }
        const card = await VocabularyCard.findByIdAndDelete(id);
        if (!card) {
            throw new common_1.NotFoundException('単語カードが見つかりません');
        }
        return {
            success: true,
            message: '単語カードが正常に削除されました',
            deletedId: id,
        };
    }
    async getAllVocabulary() {
        const cards = await VocabularyCard.find()
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
        })
            .sort({ created_at: -1 });
        return {
            success: true,
            data: cards.map((card) => this.mapVocabularyCard(card)),
            meta: {
                total: cards.length,
            },
        };
    }
    buildEmptyPagination(page, limit) {
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
    mapVocabularyCard(card) {
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
    mapLearningUnit(learningUnit) {
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
    mapSituation(situation) {
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
    mapLevel(level) {
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
    mapPlace(place) {
        if (!place) {
            return null;
        }
        return {
            id: String(place._id),
            nameVi: place.name_vi,
            nameJa: place.name_ja,
            avatarUrl: place.avatar_url,
        };
    }
    toObjectId(value) {
        if (!Types.ObjectId.isValid(value)) {
            throw new common_1.NotFoundException('Id không hợp lệ.');
        }
        return new Types.ObjectId(value);
    }
    escapeRegExp(value) {
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
};
exports.VocabularyService = VocabularyService;
exports.VocabularyService = VocabularyService = __decorate([
    (0, common_1.Injectable)()
], VocabularyService);
//# sourceMappingURL=vocabulary.service.js.map