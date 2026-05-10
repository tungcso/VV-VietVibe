const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Tải biến môi trường
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
} catch (error) {
  console.warn('Cảnh báo: Không thể tải dotenv. Vui lòng đảm bảo bạn đã đặt biến môi trường MONGO_URI.');
}

const { 
  User, 
  LearningUnit, 
  VocabularyCard, 
  ListeningLesson, 
  UserProgress 
} = require('../models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vietvibe_db';

async function seedProgressData() {
  try {
    console.log('1. Đang kết nối MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('=> Kết nối thành công MongoDB!');

    // B1: Xóa dữ liệu cũ
    console.log('\n2. [B1] Đang xóa dữ liệu cũ của collection user_progress...');
    await UserProgress.deleteMany({});
    console.log('=> Xóa dữ liệu cũ thành công!');

    // B2: Tìm hoặc tạo tài khoản Học viên
    console.log('\n3. [B2] Đang tìm hoặc tạo tài khoản Học viên...');
    let learner = await User.findOne({ email: 'learner@vietvibe.com' });
    if (!learner) {
      const hashedPassword = await bcrypt.hash('learner123', 12);
      learner = await User.create({
        role: 'learner',
        email: 'learner@vietvibe.com',
        password_hash: hashedPassword,
        user_name: 'Test Learner'
      });
      console.log(`=> Tạo mới tài khoản Học viên thành công! ID: ${learner._id}`);
    } else {
      console.log(`=> Đã tìm thấy tài khoản Học viên có sẵn! ID: ${learner._id}`);
    }

    // B3: Query lấy _id của LearningUnit
    console.log('\n4. [B3] Đang tìm kiếm LearningUnit "Bài 1: Ăn phở"...');
    const learningUnit = await LearningUnit.findOne({ title_vi: 'Bài 1: Ăn phở' });
    if (!learningUnit) {
      throw new Error('Không tìm thấy LearningUnit. Hãy chắc chắn rằng bạn đã chạy businessSeeder trước.');
    }
    console.log(`=> Tìm thấy LearningUnit thành công! ID: ${learningUnit._id}`);

    // B4: Query danh sách VocabularyCard và lấy 2 ID đầu tiên
    console.log('\n5. [B4] Đang lấy danh sách thẻ từ vựng (VocabularyCard)...');
    const cards = await VocabularyCard.find({ learning_unit_id: learningUnit._id });
    if (cards.length < 2) {
      throw new Error('Không đủ ít nhất 2 thẻ từ vựng trong LearningUnit này.');
    }
    const viewedCardIds = [cards[0]._id, cards[1]._id];
    console.log(`=> Đã lấy 2 thẻ từ vựng để giả lập tiến độ. ID: ${viewedCardIds.join(', ')}`);

    // B5: Query lấy _id của ListeningLesson
    console.log('\n6. [B5] Đang tìm kiếm bài nghe (ListeningLesson)...');
    const listeningLesson = await ListeningLesson.findOne({ learning_unit_id: learningUnit._id });
    if (!listeningLesson) {
      throw new Error('Không tìm thấy ListeningLesson thuộc LearningUnit này.');
    }
    console.log(`=> Tìm thấy ListeningLesson thành công! ID: ${listeningLesson._id}`);

    // B6: Insert bản ghi vào UserProgress
    console.log('\n7. [B6] Đang lưu tiến độ học tập (UserProgress)...');
    const progress = await UserProgress.create({
      user_id: learner._id,
      learning_unit_id: learningUnit._id,
      vocabulary_progress: {
        viewed_card_ids: viewedCardIds,
        completed: false
      },
      listening_progress: {
        lesson_id: listeningLesson._id,
        last_position_seconds: 15,
        completed: false
      }
    });
    console.log(`=> Lưu tiến độ thành công! Progress ID: ${progress._id}`);

    console.log('\n🎉 TOÀN BỘ QUÁ TRÌNH SEED DỮ LIỆU TIẾN ĐỘ ĐÃ HOÀN TẤT THÀNH CÔNG! 🎉');

  } catch (error) {
    console.error('\n❌ Lỗi trong quá trình seed progress data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('=> Đã ngắt kết nối MongoDB.');
    process.exit(0);
  }
}

seedProgressData();
