const {
  Place,
  Situation,
  LearningUnit,
  VocabularyCard,
  ListeningLesson,
  TranscriptLine,
  UserProgress
} = require('../models');

/**
 * 1. Lấy danh sách địa điểm (places) sắp xếp theo created_at 
 * và danh sách tình huống (situations) thuộc về placeId đó.
 */
const getHomeData = async (placeId) => {
  try {
    const places = await Place.find().sort({ created_at: 1 });
    const situations = await Situation.find({ place_id: placeId });
    return { places, situations };
  } catch (error) {
    console.error('Error in getHomeData:', error);
    throw error;
  }
};

/**
 * 2. Lấy danh sách bài học (learning_units) theo situationId, 
 * có populate thông tin của bảng levels.
 */
const getLevelsBySituation = async (situationId) => {
  try {
    const learningUnits = await LearningUnit.find({ situation_id: situationId })
      .populate('level_id');
    return learningUnits;
  } catch (error) {
    console.error('Error in getLevelsBySituation:', error);
    throw error;
  }
};

/**
 * 3. Lấy danh sách flashcard (vocabulary_cards) của một bài học, 
 * sắp xếp theo created_at.
 */
const getVocabularyByUnit = async (learningUnitId) => {
  try {
    const vocabularyCards = await VocabularyCard.find({ learning_unit_id: learningUnitId })
      .sort({ created_at: 1 });
    return vocabularyCards;
  } catch (error) {
    console.error('Error in getVocabularyByUnit:', error);
    throw error;
  }
};

/**
 * 4. Lấy thông tin bài nghe (listening_lessons) của bài học đó, 
 * và lấy toàn bộ dòng phụ đề (transcript_lines) tương ứng, sắp xếp theo start_time.
 */
const getListeningLessonData = async (learningUnitId) => {
  try {
    const listeningLesson = await ListeningLesson.findOne({ learning_unit_id: learningUnitId });
    
    if (!listeningLesson) {
      return null;
    }
    
    const transcriptLines = await TranscriptLine.find({ lesson_id: listeningLesson._id })
      .sort({ start_time: 1 });
      
    return { listeningLesson, transcriptLines };
  } catch (error) {
    console.error('Error in getListeningLessonData:', error);
    throw error;
  }
};

/**
 * 5. Sử dụng updateOne với toán tử $addToSet để đẩy vocabularyCardId 
 * vào mảng 'vocabulary_progress.viewed_card_ids' trong bảng user_progress, 
 * kết hợp { upsert: true }.
 */
const updateVocabularyProgress = async (userId, learningUnitId, vocabularyCardId) => {
  try {
    const result = await UserProgress.updateOne(
      { user_id: userId, learning_unit_id: learningUnitId },
      {
        $addToSet: { 'vocabulary_progress.viewed_card_ids': vocabularyCardId }
      },
      { upsert: true }
    );
    return result;
  } catch (error) {
    console.error('Error in updateVocabularyProgress:', error);
    throw error;
  }
};

/**
 * 6. Sử dụng updateOne với $set để cập nhật 'listening_progress.lesson_id' 
 * và 'listening_progress.last_position_seconds' trong user_progress, 
 * kết hợp { upsert: true }.
 */
const updateListeningProgress = async (userId, learningUnitId, lessonId, currentSecond) => {
  try {
    const result = await UserProgress.updateOne(
      { user_id: userId, learning_unit_id: learningUnitId },
      {
        $set: {
          'listening_progress.lesson_id': lessonId,
          'listening_progress.last_position_seconds': currentSecond
        }
      },
      { upsert: true }
    );
    return result;
  } catch (error) {
    console.error('Error in updateListeningProgress:', error);
    throw error;
  }
};

module.exports = {
  getHomeData,
  getLevelsBySituation,
  getVocabularyByUnit,
  getListeningLessonData,
  updateVocabularyProgress,
  updateListeningProgress
};
