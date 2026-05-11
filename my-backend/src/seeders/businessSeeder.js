const path = require('path');
const mongoose = require('mongoose');

// Tải biến môi trường
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
} catch (error) {
  console.warn('Cảnh báo: Không thể tải dotenv. Vui lòng đảm bảo bạn đã đặt biến môi trường MONGO_URI.');
}

const { 
  Place, 
  Level, 
  Situation, 
  LearningUnit, 
  VocabularyCard, 
  ListeningLesson, 
  TranscriptLine 
} = require('../models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vietvibe_db';

async function seedBusinessData() {
  try {
    console.log('1. Đang kết nối MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('=> Kết nối thành công MongoDB!');

    // Xóa dữ liệu cũ
    console.log('\n2. Đang xóa dữ liệu cũ của các collection business...');
    await Situation.deleteMany({});
    await LearningUnit.deleteMany({});
    await VocabularyCard.deleteMany({});
    await ListeningLesson.deleteMany({});
    await TranscriptLine.deleteMany({});
    console.log('=> Xóa dữ liệu cũ thành công!');

    // B1: Query lấy _id của Place và Level
    console.log('\n3. [B1] Đang tìm kiếm Place "Nhà hàng" và Level "A2"...');
    const place = await Place.findOne({ name_vi: 'Nhà hàng' });
    const level = await Level.findOne({ code: 'A2' });

    if (!place) throw new Error('Không tìm thấy Place "Nhà hàng". Bạn cần chạy masterSeeder trước.');
    if (!level) throw new Error('Không tìm thấy Level "A2". Bạn cần chạy masterSeeder trước.');
    console.log(`=> Tìm thấy thành công! Place ID: ${place._id}, Level ID: ${level._id}`);

    // B2: Tạo Situation
    console.log('\n4. [B2] Đang tạo Situation (Tình huống)...');
    const situation = await Situation.create({
      title_vi: 'Gọi món cơ bản',
      title_ja: '基本的な注文',
      description: 'Cách gọi món tại quán ăn bình dân.',
      place_id: place._id
    });
    console.log(`=> Tạo Situation thành công! ID: ${situation._id}`);

    // B3: Tạo LearningUnit
    console.log('\n5. [B3] Đang tạo LearningUnit (Bài học)...');
    const learningUnit = await LearningUnit.create({
      title_vi: 'Bài 1: Ăn phở',
      title_ja: '第1課：フォーを食べる',
      situation_id: situation._id,
      level_id: level._id
    });
    console.log(`=> Tạo LearningUnit thành công! ID: ${learningUnit._id}`);

    // B4: Tạo VocabularyCards
    console.log('\n6. [B4] Đang tạo VocabularyCards (Từ vựng)...');
    const cardsData = [
      {
        word_vi: 'Cho em...',
        meaning_ja: '私に...をください',
        note: 'Dùng khi gọi món',
        tag: 'daily',
        learning_unit_id: learningUnit._id
      },
      {
        word_vi: 'Bát',
        meaning_ja: 'お椀/杯',
        example_vi: 'Cho em một bát phở',
        example_ja: 'フォーを一杯ください',
        learning_unit_id: learningUnit._id
      },
      {
        word_vi: 'Quẩy',
        meaning_ja: '揚げパン (Quẩy)',
        note: 'Đồ ăn kèm phở',
        learning_unit_id: learningUnit._id
      }
    ];
    await VocabularyCard.insertMany(cardsData);
    console.log(`=> Tạo thành công ${cardsData.length} VocabularyCards!`);

    // B5: Tạo ListeningLesson
    console.log('\n7. [B5] Đang tạo ListeningLesson (Bài nghe)...');
    const listeningLesson = await ListeningLesson.create({
      title_vi: 'Hội thoại gọi phở',
      title_ja: 'フォーを注文する会話',
      audio_url: '/audios/pho_order.mp3',
      duration_seconds: 45,
      learning_unit_id: learningUnit._id
    });
    console.log(`=> Tạo ListeningLesson thành công! ID: ${listeningLesson._id}`);

    // B6: Tạo TranscriptLines
    console.log('\n8. [B6] Đang tạo TranscriptLines (Phụ đề)...');
    const transcriptData = [
      {
        start_time: 0,
        end_time: 3,
        text_vi: 'Em ơi!',
        text_ja: 'すみません！',
        lesson_id: listeningLesson._id
      },
      {
        start_time: 4,
        end_time: 7,
        text_vi: 'Dạ, anh gọi gì ạ?',
        text_ja: 'はい、何をご注文されますか？',
        lesson_id: listeningLesson._id
      },
      {
        start_time: 8,
        end_time: 12,
        text_vi: 'Cho anh một phở bò chín nhé.',
        text_ja: '牛肉のフォー（火が通ったもの）を一つください。',
        lesson_id: listeningLesson._id
      }
    ];
    await TranscriptLine.insertMany(transcriptData);
    console.log(`=> Tạo thành công ${transcriptData.length} TranscriptLines!`);

    console.log('\n🎉 TOÀN BỘ QUÁ TRÌNH SEED DỮ LIỆU NGHIỆP VỤ ĐÃ HOÀN TẤT THÀNH CÔNG! 🎉');

  } catch (error) {
    console.error('\n❌ Lỗi trong quá trình seed data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('=> Đã ngắt kết nối MongoDB.');
    process.exit(0);
  }
}

seedBusinessData();
