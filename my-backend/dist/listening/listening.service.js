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
exports.ListeningService = void 0;
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const listening_session_constants_1 = require("./listening-session.constants");
const models = require(path.resolve(__dirname, '../../src/models'));
const mongoose = require('mongoose');
const { Types } = mongoose;
const { Place, Situation, Level, LearningUnit, ListeningLesson, ListeningSession, TranscriptLine, User, UserProgress, VocabularyCard, } = models;
const COMPLETION_THRESHOLD_SECONDS = 1;
let ListeningService = class ListeningService {
    async getAllPlaces() {
        const places = await Place.find().sort({ created_at: 1 });
        return places.map((place) => this.mapPlace(place));
    }
    async getSituationsByPlaceId(placeId) {
        const placeObjectId = this.toObjectId(placeId);
        const place = await Place.findById(placeObjectId);
        if (!place) {
            throw new common_1.NotFoundException('Không tìm thấy địa điểm.');
        }
        const situations = await Situation.find({ place_id: placeObjectId }).sort({
            created_at: 1,
        });
        return situations.map((situation) => this.mapSituation(situation));
    }
    async getPlaceFull(placeId) {
        const placeObjectId = this.toObjectId(placeId);
        const place = await Place.findById(placeObjectId);
        if (!place) {
            throw new common_1.NotFoundException('Không tìm thấy địa điểm.');
        }
        const situations = await Situation.find({ place_id: placeObjectId }).sort({
            created_at: 1,
        });
        const situationIds = situations.map((situation) => situation._id);
        const learningUnits = await LearningUnit.find({
            situation_id: { $in: situationIds },
        })
            .populate('level_id')
            .sort({ created_at: 1 });
        const unitsBySituation = new Map();
        for (const unit of learningUnits) {
            const sitId = String(unit.situation_id);
            let arr = unitsBySituation.get(sitId);
            if (!arr) {
                arr = [];
                unitsBySituation.set(sitId, arr);
            }
            arr.push(this.mapLearningUnit(unit, unit.level_id));
        }
        const situationsWithUnits = situations.map((situation) => {
            const sitId = String(situation._id);
            return {
                ...this.mapSituation(situation),
                learningUnits: unitsBySituation.get(sitId) ?? [],
            };
        });
        return {
            ...this.mapPlace(place),
            situations: situationsWithUnits,
        };
    }
    async getLearningUnitsBySituationId(situationId) {
        const situationObjectId = this.toObjectId(situationId);
        const situation = await Situation.findById(situationObjectId);
        if (!situation) {
            throw new common_1.NotFoundException('Không tìm thấy tình huống.');
        }
        const learningUnits = await LearningUnit.find({
            situation_id: situationObjectId,
        })
            .populate('level_id')
            .sort({ created_at: 1 });
        return learningUnits.map((unit) => this.mapLearningUnit(unit, unit.level_id));
    }
    async getAllListeningLessons() {
        return ListeningLesson.find().sort({ created_at: 1 });
    }
    async getAllSituations() {
        const situations = await Situation.find().sort({ created_at: 1 });
        return situations.map((situation) => this.mapSituation(situation));
    }
    async getAllLearningUnits() {
        const units = await LearningUnit.find()
            .populate('level_id')
            .sort({ created_at: 1 });
        return units.map((unit) => this.mapLearningUnit(unit, unit.level_id));
    }
    async getAllLevels() {
        const levels = await Level.find().sort({ code: 1, created_at: 1 });
        return levels.map((level) => this.mapLevel(level));
    }
    async createPlace(createDto) {
        const place = await Place.create({
            name_vi: createDto.nameVi,
            name_ja: createDto.nameJa,
            description: createDto.description ?? null,
            avatar_url: createDto.avatarUrl ?? null,
        });
        return this.mapPlace(place);
    }
    async updatePlace(id, updateDto) {
        const placeId = this.toObjectId(id);
        const place = await Place.findById(placeId);
        if (!place) {
            throw new common_1.NotFoundException('Không tìm thấy địa điểm để cập nhật.');
        }
        const updatePayload = {};
        if (updateDto.nameVi !== undefined) {
            updatePayload.name_vi = updateDto.nameVi;
        }
        if (updateDto.nameJa !== undefined) {
            updatePayload.name_ja = updateDto.nameJa;
        }
        if (updateDto.description !== undefined) {
            updatePayload.description = updateDto.description;
        }
        if (updateDto.avatarUrl !== undefined) {
            updatePayload.avatar_url = updateDto.avatarUrl;
        }
        const updatedPlace = await Place.findByIdAndUpdate(placeId, updatePayload, {
            returnDocument: 'after',
        });
        return this.mapPlace(updatedPlace);
    }
    async deletePlace(id) {
        const placeId = this.toObjectId(id);
        const place = await Place.findByIdAndDelete(placeId);
        if (!place) {
            throw new common_1.NotFoundException('Không tìm thấy địa điểm để xóa.');
        }
        const situations = await Situation.find({ place_id: placeId });
        const situationIds = situations.map((situation) => situation._id);
        const learningUnits = await LearningUnit.find({
            situation_id: { $in: situationIds },
        });
        const learningUnitIds = learningUnits.map((unit) => unit._id);
        await this.deleteLearningUnitDependencies(learningUnitIds);
        await LearningUnit.deleteMany({ situation_id: { $in: situationIds } });
        await Situation.deleteMany({ place_id: placeId });
        return { deleted: true };
    }
    async createSituation(createDto) {
        const place = await Place.findById(this.toObjectId(createDto.placeId));
        if (!place) {
            throw new common_1.NotFoundException('Không tìm thấy địa điểm.');
        }
        const situation = await Situation.create({
            place_id: createDto.placeId,
            title_vi: createDto.titleVi,
            title_ja: createDto.titleJa,
            description: createDto.description ?? null,
        });
        return this.mapSituation(situation);
    }
    async updateSituation(id, updateDto) {
        const situationId = this.toObjectId(id);
        const situation = await Situation.findById(situationId);
        if (!situation) {
            throw new common_1.NotFoundException('Không tìm thấy tình huống để cập nhật.');
        }
        if (updateDto.placeId) {
            const place = await Place.findById(this.toObjectId(updateDto.placeId));
            if (!place) {
                throw new common_1.NotFoundException('Không tìm thấy địa điểm.');
            }
        }
        const updatePayload = {};
        if (updateDto.placeId !== undefined) {
            updatePayload.place_id = updateDto.placeId;
        }
        if (updateDto.titleVi !== undefined) {
            updatePayload.title_vi = updateDto.titleVi;
        }
        if (updateDto.titleJa !== undefined) {
            updatePayload.title_ja = updateDto.titleJa;
        }
        if (updateDto.description !== undefined) {
            updatePayload.description = updateDto.description;
        }
        const updatedSituation = await Situation.findByIdAndUpdate(situationId, updatePayload, { returnDocument: 'after' });
        return this.mapSituation(updatedSituation);
    }
    async deleteSituation(id) {
        const situationId = this.toObjectId(id);
        const situation = await Situation.findByIdAndDelete(situationId);
        if (!situation) {
            throw new common_1.NotFoundException('Không tìm thấy tình huống để xóa.');
        }
        const learningUnits = await LearningUnit.find({
            situation_id: situationId,
        });
        const learningUnitIds = learningUnits.map((unit) => unit._id);
        await this.deleteLearningUnitDependencies(learningUnitIds);
        await LearningUnit.deleteMany({ situation_id: situationId });
        return { deleted: true };
    }
    async createLearningUnit(createDto) {
        const situation = await Situation.findById(this.toObjectId(createDto.situationId));
        if (!situation) {
            throw new common_1.NotFoundException('Không tìm thấy tình huống.');
        }
        const level = await Level.findById(this.toObjectId(createDto.levelId));
        if (!level) {
            throw new common_1.NotFoundException('Không tìm thấy level.');
        }
        const existingUnit = await LearningUnit.findOne({
            situation_id: createDto.situationId,
            level_id: createDto.levelId,
        });
        if (existingUnit) {
            throw new common_1.BadRequestException('Learning unit đã tồn tại cho tình huống và level này.');
        }
        const learningUnit = await LearningUnit.create({
            situation_id: createDto.situationId,
            level_id: createDto.levelId,
            title_vi: createDto.titleVi,
            title_ja: createDto.titleJa,
            description: createDto.description ?? null,
        });
        return this.mapLearningUnit(learningUnit, level);
    }
    async updateLearningUnit(id, updateDto) {
        const unitId = this.toObjectId(id);
        const learningUnit = await LearningUnit.findById(unitId);
        if (!learningUnit) {
            throw new common_1.NotFoundException('Không tìm thấy learning unit để cập nhật.');
        }
        const nextSituationId = updateDto.situationId ?? String(learningUnit.situation_id);
        const nextLevelId = updateDto.levelId ?? String(learningUnit.level_id);
        if (updateDto.situationId) {
            const situation = await Situation.findById(this.toObjectId(updateDto.situationId));
            if (!situation) {
                throw new common_1.NotFoundException('Không tìm thấy tình huống.');
            }
        }
        if (updateDto.levelId) {
            const level = await Level.findById(this.toObjectId(updateDto.levelId));
            if (!level) {
                throw new common_1.NotFoundException('Không tìm thấy level.');
            }
        }
        const duplicate = await LearningUnit.findOne({
            _id: { $ne: unitId },
            situation_id: nextSituationId,
            level_id: nextLevelId,
        });
        if (duplicate) {
            throw new common_1.BadRequestException('Learning unit đã tồn tại cho tình huống và level này.');
        }
        const updatePayload = {};
        if (updateDto.situationId !== undefined) {
            updatePayload.situation_id = updateDto.situationId;
        }
        if (updateDto.levelId !== undefined) {
            updatePayload.level_id = updateDto.levelId;
        }
        if (updateDto.titleVi !== undefined) {
            updatePayload.title_vi = updateDto.titleVi;
        }
        if (updateDto.titleJa !== undefined) {
            updatePayload.title_ja = updateDto.titleJa;
        }
        if (updateDto.description !== undefined) {
            updatePayload.description = updateDto.description;
        }
        const updatedLearningUnit = await LearningUnit.findByIdAndUpdate(unitId, updatePayload, { returnDocument: 'after' });
        const level = await Level.findById(updatedLearningUnit.level_id);
        return this.mapLearningUnit(updatedLearningUnit, level);
    }
    async deleteLearningUnit(id) {
        const unitId = this.toObjectId(id);
        const learningUnit = await LearningUnit.findByIdAndDelete(unitId);
        if (!learningUnit) {
            throw new common_1.NotFoundException('Không tìm thấy learning unit để xóa.');
        }
        await this.deleteLearningUnitDependencies([unitId]);
        return { deleted: true };
    }
    async getListeningLessonById(id) {
        const lesson = await this.findLessonOrThrow(id);
        const transcriptLines = await this.getTranscriptLines(lesson._id);
        return {
            ...lesson.toObject(),
            ambientSoundIds: (lesson.ambient_sound_ids || []).map(String),
            transcriptLines,
        };
    }
    async getListeningLessonByLearningUnit(learningUnitId) {
        const lesson = await ListeningLesson.findOne({
            learning_unit_id: this.toObjectId(learningUnitId),
        });
        if (!lesson) {
            throw new common_1.NotFoundException('Không tìm thấy bài nghe cho learningUnitId này.');
        }
        const transcriptLines = await this.getTranscriptLines(lesson._id);
        return {
            ...lesson.toObject(),
            ambientSoundIds: (lesson.ambient_sound_ids || []).map(String),
            transcriptLines,
        };
    }
    async createListeningLesson(createDto) {
        const learningUnit = await LearningUnit.findById(createDto.learningUnitId);
        if (!learningUnit) {
            throw new common_1.NotFoundException('Learning unit not found');
        }
        const lesson = await ListeningLesson.create({
            learning_unit_id: createDto.learningUnitId,
            title_vi: createDto.titleVi,
            title_ja: createDto.titleJa,
            audio_url: createDto.audioUrl,
            duration_seconds: createDto.durationSeconds,
            description: createDto.description,
            ambient_sound_ids: createDto.ambientSoundIds || [],
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
    async updateListeningLesson(id, updateDto) {
        const updatePayload = {};
        if (updateDto.learningUnitId) {
            const learningUnit = await LearningUnit.findById(updateDto.learningUnitId);
            if (!learningUnit) {
                throw new common_1.NotFoundException('Learning unit not found');
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
        if (updateDto.ambientSoundIds !== undefined) {
            updatePayload.ambient_sound_ids = updateDto.ambientSoundIds;
        }
        const lessonId = this.toObjectId(id);
        const lesson = await ListeningLesson.findById(lessonId);
        if (!lesson) {
            throw new common_1.NotFoundException('Không tìm thấy bài nghe để cập nhật.');
        }
        await ListeningLesson.findByIdAndUpdate(lessonId, updatePayload, {
            returnDocument: 'after',
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
    async deleteListeningLesson(id) {
        const lessonId = this.toObjectId(id);
        const lesson = await ListeningLesson.findByIdAndDelete(lessonId);
        if (!lesson) {
            throw new common_1.NotFoundException('Không tìm thấy bài nghe để xóa.');
        }
        await TranscriptLine.deleteMany({ lesson_id: lessonId });
        await ListeningSession.deleteMany({ lesson_id: lessonId });
        return { deleted: true };
    }
    async getAudioProcessingPlan(id, query) {
        const lesson = await this.findLessonOrThrow(id);
        const transcriptLines = await this.getTranscriptLines(lesson._id);
        const settings = this.resolveSessionSettings(query);
        const currentPositionSeconds = this.resolvePlaybackPosition({
            durationSeconds: lesson.duration_seconds,
            transcriptLineId: query.transcriptLineId,
            transcriptLines,
            fallbackPositionSeconds: 0,
            requestedPositionSeconds: query.currentPositionSeconds,
        });
        return this.buildAudioProcessingPlan(lesson, transcriptLines, currentPositionSeconds, settings);
    }
    async startListeningSession(id, userIdString, startDto) {
        const lesson = await this.findLessonOrThrow(id);
        const userId = this.toObjectId(userIdString);
        await this.findUserOrThrow(userId);
        const existingProgress = await UserProgress.findOne({
            user_id: userId,
            learning_unit_id: lesson.learning_unit_id,
        });
        const savedPositionSeconds = existingProgress?.listening_progress?.last_position_seconds ?? 0;
        const transcriptLines = await this.getTranscriptLines(lesson._id);
        const currentPositionSeconds = this.resolvePlaybackPosition({
            durationSeconds: lesson.duration_seconds,
            transcriptLines,
            fallbackPositionSeconds: savedPositionSeconds,
            requestedPositionSeconds: startDto.currentPositionSeconds,
        });
        const currentLine = this.findCurrentTranscriptLine(transcriptLines, currentPositionSeconds);
        const settings = this.resolveSessionSettings(startDto);
        const session = await ListeningSession.create({
            user_id: userId,
            lesson_id: lesson._id,
            learning_unit_id: lesson.learning_unit_id,
            playback_speed: settings.playbackSpeed,
            playback_mode: settings.playbackMode,
            ambient_sound: settings.ambientSound,
            ambient_volume: settings.ambientVolume,
            last_position_seconds: currentPositionSeconds,
            current_transcript_line_id: currentLine?._id ?? null,
        });
        await this.persistListeningProgress({
            userId,
            learningUnitId: lesson.learning_unit_id,
            lessonId: lesson._id,
            currentPositionSeconds,
            completed: false,
        });
        return this.buildSessionResponse(session, lesson, transcriptLines);
    }
    async getLatestListeningSession(id, userIdValue) {
        const lesson = await this.findLessonOrThrow(id);
        const userId = this.toObjectId(userIdValue);
        await this.findUserOrThrow(userId);
        const session = await ListeningSession.findOne({
            user_id: userId,
            lesson_id: lesson._id,
        }).sort({ created_at: -1 });
        if (!session) {
            throw new common_1.NotFoundException('Không tìm thấy phiên nghe gần nhất.');
        }
        const transcriptLines = await this.getTranscriptLines(lesson._id);
        return this.buildSessionResponse(session, lesson, transcriptLines);
    }
    async getListeningSessionById(sessionId, userIdString) {
        const session = await this.findSessionOrThrow(sessionId, userIdString);
        const lesson = await this.findLessonOrThrow(String(session.lesson_id));
        const transcriptLines = await this.getTranscriptLines(lesson._id);
        return this.buildSessionResponse(session, lesson, transcriptLines);
    }
    async updateListeningSession(sessionId, userIdString, updateDto) {
        const session = await this.findSessionOrThrow(sessionId, userIdString);
        const lesson = await this.findLessonOrThrow(String(session.lesson_id));
        const transcriptLines = await this.getTranscriptLines(lesson._id);
        const settings = this.resolveSessionSettings(updateDto, {
            playbackSpeed: session.playback_speed,
            playbackMode: session.playback_mode,
            ambientSound: session.ambient_sound,
            ambientVolume: session.ambient_volume,
        });
        let currentPositionSeconds = this.resolvePlaybackPosition({
            durationSeconds: lesson.duration_seconds,
            transcriptLineId: updateDto.transcriptLineId,
            transcriptLines,
            fallbackPositionSeconds: session.last_position_seconds ?? 0,
            requestedPositionSeconds: updateDto.currentPositionSeconds,
        });
        const completed = updateDto.completed === true ||
            this.isLessonCompleted(currentPositionSeconds, lesson.duration_seconds);
        if (completed) {
            currentPositionSeconds = lesson.duration_seconds;
        }
        const currentLine = this.findCurrentTranscriptLine(transcriptLines, currentPositionSeconds);
        session.playback_speed = settings.playbackSpeed;
        session.playback_mode = settings.playbackMode;
        session.ambient_sound = settings.ambientSound;
        session.ambient_volume = settings.ambientVolume;
        session.last_position_seconds = currentPositionSeconds;
        session.current_transcript_line_id = currentLine?._id ?? null;
        if (completed) {
            session.completed = true;
            session.completed_at = session.completed_at ?? new Date();
            session.ended_at = session.ended_at ?? new Date();
        }
        await session.save();
        await this.persistListeningProgress({
            userId: session.user_id,
            learningUnitId: lesson.learning_unit_id,
            lessonId: lesson._id,
            currentPositionSeconds,
            completed,
        });
        return this.buildSessionResponse(session, lesson, transcriptLines);
    }
    async completeListeningSession(sessionId, userIdString) {
        const session = await this.findSessionOrThrow(sessionId, userIdString);
        const lesson = await this.findLessonOrThrow(String(session.lesson_id));
        const transcriptLines = await this.getTranscriptLines(lesson._id);
        const now = new Date();
        session.last_position_seconds = lesson.duration_seconds;
        session.current_transcript_line_id = null;
        session.completed = true;
        session.completed_at = session.completed_at ?? now;
        session.ended_at = session.ended_at ?? now;
        await session.save();
        await this.persistListeningProgress({
            userId: session.user_id,
            learningUnitId: lesson.learning_unit_id,
            lessonId: lesson._id,
            currentPositionSeconds: lesson.duration_seconds,
            completed: true,
        });
        return this.buildSessionResponse(session, lesson, transcriptLines);
    }
    async findLessonOrThrow(id) {
        const lesson = await ListeningLesson.findById(this.toObjectId(id));
        if (!lesson) {
            throw new common_1.NotFoundException('Không tìm thấy bài nghe.');
        }
        return lesson;
    }
    async findSessionOrThrow(id, userIdString) {
        const session = await ListeningSession.findById(this.toObjectId(id));
        if (!session) {
            throw new common_1.NotFoundException('Không tìm thấy phiên nghe.');
        }
        if (userIdString && String(session.user_id) !== userIdString) {
            throw new common_1.ForbiddenException('Bạn không có quyền truy cập phiên nghe này.');
        }
        return session;
    }
    async findUserOrThrow(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng.');
        }
        return user;
    }
    getTranscriptLines(lessonId) {
        return TranscriptLine.find({ lesson_id: lessonId }).sort({ start_time: 1 });
    }
    resolveSessionSettings(input, fallback) {
        return {
            playbackSpeed: this.resolvePlaybackSpeed(input.playbackSpeed, fallback?.playbackSpeed ?? listening_session_constants_1.DEFAULT_PLAYBACK_SPEED),
            playbackMode: this.resolvePlaybackMode(input.playbackMode, fallback?.playbackMode ?? listening_session_constants_1.DEFAULT_PLAYBACK_MODE),
            ambientSound: this.resolveAmbientSound(input.ambientSound, fallback?.ambientSound ?? listening_session_constants_1.DEFAULT_AMBIENT_SOUND),
            ambientVolume: this.resolveAmbientVolume(input.ambientVolume, fallback?.ambientVolume ?? listening_session_constants_1.DEFAULT_AMBIENT_VOLUME),
        };
    }
    resolvePlaybackSpeed(value, fallback) {
        const normalized = (0, listening_session_constants_1.normalizePlaybackSpeed)(value);
        if (normalized === undefined) {
            return fallback;
        }
        if (!listening_session_constants_1.PLAYBACK_SPEEDS.includes(normalized)) {
            throw new common_1.BadRequestException('Tốc độ phát không hợp lệ.');
        }
        return normalized;
    }
    resolvePlaybackMode(value, fallback) {
        const normalized = (0, listening_session_constants_1.normalizePlaybackMode)(value);
        if (normalized === undefined) {
            return fallback;
        }
        if (!listening_session_constants_1.PLAYBACK_MODES.includes(normalized)) {
            throw new common_1.BadRequestException('Chế độ phát không hợp lệ.');
        }
        return normalized;
    }
    resolveAmbientSound(value, fallback) {
        const normalized = (0, listening_session_constants_1.normalizeAmbientSound)(value);
        if (normalized === undefined) {
            return fallback;
        }
        if (normalized !== null && !listening_session_constants_1.AMBIENT_SOUNDS.includes(normalized)) {
            throw new common_1.BadRequestException('Âm thanh môi trường không hợp lệ.');
        }
        return normalized;
    }
    resolveAmbientVolume(value, fallback) {
        const normalized = (0, listening_session_constants_1.normalizeAmbientVolume)(value);
        if (normalized === undefined) {
            return fallback;
        }
        if (!Number.isFinite(normalized)) {
            throw new common_1.BadRequestException('Âm lượng môi trường không hợp lệ.');
        }
        return Math.min(Math.max(normalized, 0), 100);
    }
    resolvePlaybackPosition({ durationSeconds, fallbackPositionSeconds, requestedPositionSeconds, transcriptLineId, transcriptLines, }) {
        if (transcriptLineId !== undefined) {
            if (!Types.ObjectId.isValid(transcriptLineId)) {
                throw new common_1.BadRequestException('Transcript line id không hợp lệ.');
            }
            const selectedLine = transcriptLines.find((line) => String(line._id) === transcriptLineId);
            if (!selectedLine) {
                throw new common_1.NotFoundException('Không tìm thấy transcript line trong bài nghe này.');
            }
            return this.clampPosition(selectedLine.start_time, durationSeconds);
        }
        return this.clampPosition(requestedPositionSeconds ?? fallbackPositionSeconds, durationSeconds);
    }
    buildSessionResponse(session, lesson, transcriptLines) {
        const settings = {
            playbackSpeed: session.playback_speed,
            playbackMode: session.playback_mode,
            ambientSound: session.ambient_sound,
            ambientVolume: session.ambient_volume,
        };
        return {
            session: {
                id: String(session._id),
                userId: String(session.user_id),
                lessonId: String(session.lesson_id),
                learningUnitId: String(session.learning_unit_id),
                playbackSpeed: settings.playbackSpeed,
                playbackMode: settings.playbackMode,
                ambientSound: settings.ambientSound ?? 'off',
                ambientVolume: settings.ambientVolume,
                lastPositionSeconds: session.last_position_seconds,
                currentTranscriptLineId: session.current_transcript_line_id
                    ? String(session.current_transcript_line_id)
                    : null,
                completed: session.completed,
                completedAt: session.completed_at,
                endedAt: session.ended_at,
                createdAt: session.created_at,
                updatedAt: session.updated_at,
            },
            lesson: this.buildLessonResponse(lesson, transcriptLines),
            audioProcessing: this.buildAudioProcessingPlan(lesson, transcriptLines, session.last_position_seconds, settings),
        };
    }
    buildLessonResponse(lesson, transcriptLines) {
        return {
            id: String(lesson._id),
            learningUnitId: String(lesson.learning_unit_id),
            titleVi: lesson.title_vi,
            titleJa: lesson.title_ja,
            audioUrl: lesson.audio_url,
            durationSeconds: lesson.duration_seconds,
            description: lesson.description,
            ambientSoundIds: (lesson.ambient_sound_ids || []).map(String),
            createdAt: lesson.created_at,
            updatedAt: lesson.updated_at,
            transcriptLines: transcriptLines.map((line, index) => this.mapTranscriptLine(line, index)),
        };
    }
    buildAudioProcessingPlan(lesson, transcriptLines, currentPositionSeconds, settings) {
        const currentLine = this.findCurrentTranscriptLine(transcriptLines, currentPositionSeconds);
        const currentLineIndex = currentLine
            ? transcriptLines.findIndex((line) => String(line._id) === String(currentLine._id))
            : -1;
        const ambientEnabled = settings.ambientSound !== null && settings.ambientVolume > 0;
        return {
            lessonId: String(lesson._id),
            learningUnitId: String(lesson.learning_unit_id),
            titleVi: lesson.title_vi,
            titleJa: lesson.title_ja,
            audioUrl: lesson.audio_url,
            durationSeconds: lesson.duration_seconds,
            currentPositionSeconds,
            playbackSpeed: settings.playbackSpeed,
            playbackRate: settings.playbackSpeed,
            playbackMode: settings.playbackMode,
            shouldAutoStop: settings.playbackMode === 'study',
            nextStopAtSeconds: settings.playbackMode === 'study' && currentLine
                ? currentLine.end_time
                : null,
            ambientSound: settings.ambientSound ?? 'off',
            ambientVolume: settings.ambientVolume,
            shouldMixAmbientSound: ambientEnabled,
            ambientMix: {
                enabled: ambientEnabled,
                sound: settings.ambientSound,
                volume: settings.ambientVolume / 100,
            },
            currentTranscriptLineIndex: currentLineIndex,
            currentTranscriptLine: currentLine
                ? this.mapTranscriptLine(currentLine, currentLineIndex)
                : null,
            segments: transcriptLines.map((line, index) => this.mapTranscriptLine(line, index)),
        };
    }
    mapTranscriptLine(line, index) {
        return {
            id: String(line._id),
            index,
            startTime: line.start_time,
            endTime: line.end_time,
            textVi: line.text_vi,
            textJa: line.text_ja,
        };
    }
    findCurrentTranscriptLine(transcriptLines, currentPositionSeconds) {
        return (transcriptLines.find((line) => line.start_time <= currentPositionSeconds &&
            currentPositionSeconds < line.end_time) ?? null);
    }
    clampPosition(position, durationSeconds) {
        if (!Number.isFinite(position)) {
            return 0;
        }
        return Math.min(Math.max(position, 0), durationSeconds);
    }
    isLessonCompleted(position, durationSeconds) {
        return (position >= Math.max(durationSeconds - COMPLETION_THRESHOLD_SECONDS, 0));
    }
    async persistListeningProgress({ userId, learningUnitId, lessonId, currentPositionSeconds, completed, }) {
        const $set = {
            'listening_progress.lesson_id': lessonId,
            'listening_progress.last_position_seconds': currentPositionSeconds,
        };
        if (completed) {
            $set['listening_progress.completed'] = true;
            $set['listening_progress.completed_at'] = new Date();
        }
        const update = { $set };
        if (!completed) {
            update.$setOnInsert = {
                'listening_progress.completed': false,
                'listening_progress.completed_at': null,
            };
        }
        await UserProgress.updateOne({ user_id: userId, learning_unit_id: learningUnitId }, update, { upsert: true });
    }
    async deleteLearningUnitDependencies(learningUnitIds) {
        if (!learningUnitIds.length) {
            return;
        }
        const lessons = await ListeningLesson.find({
            learning_unit_id: { $in: learningUnitIds },
        });
        const lessonIds = lessons.map((lesson) => lesson._id);
        await TranscriptLine.deleteMany({ lesson_id: { $in: lessonIds } });
        await ListeningSession.deleteMany({ lesson_id: { $in: lessonIds } });
        await UserProgress.deleteMany({
            learning_unit_id: { $in: learningUnitIds },
        });
        await VocabularyCard.deleteMany({
            learning_unit_id: { $in: learningUnitIds },
        });
        await ListeningLesson.deleteMany({
            learning_unit_id: { $in: learningUnitIds },
        });
    }
    toObjectId(value) {
        if (!Types.ObjectId.isValid(value)) {
            throw new common_1.NotFoundException('Id không hợp lệ.');
        }
        return new Types.ObjectId(value);
    }
    mapPlace(place) {
        return {
            id: String(place._id),
            nameVi: place.name_vi,
            nameJa: place.name_ja,
            description: place.description ?? null,
            avatarUrl: place.avatar_url ?? null,
        };
    }
    mapSituation(situation) {
        return {
            id: String(situation._id),
            placeId: String(situation.place_id),
            titleVi: situation.title_vi,
            titleJa: situation.title_ja,
            description: situation.description ?? null,
        };
    }
    mapLearningUnit(unit, level) {
        return {
            id: String(unit._id),
            situationId: String(unit.situation_id),
            levelId: String(unit.level_id),
            titleVi: unit.title_vi,
            titleJa: unit.title_ja,
            description: unit.description ?? null,
            level: level
                ? this.mapLevel(level)
                : null,
        };
    }
    mapLevel(level) {
        return {
            id: String(level._id),
            code: level.code,
            nameVi: level.name_vi ?? null,
            nameJa: level.name_ja,
            description: level.description ?? null,
        };
    }
};
exports.ListeningService = ListeningService;
exports.ListeningService = ListeningService = __decorate([
    (0, common_1.Injectable)()
], ListeningService);
//# sourceMappingURL=listening.service.js.map