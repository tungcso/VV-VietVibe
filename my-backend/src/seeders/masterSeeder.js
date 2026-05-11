const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

try {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
} catch (error) {
  console.warn('dotenv not installed. Please install dotenv or set MONGO_URI in the environment.');
}

const { User, Place, Level } = require('../models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vietvibe_db';

const levels = [
  {
    code: 'A1',
    name_ja: '初級',
    name_vi: 'Sơ cấp',
    description: 'Dành cho người mới bắt đầu',
  },
  {
    code: 'A2',
    name_ja: '初級後半',
    name_vi: 'Sơ cấp mở rộng',
    description: 'Có thể hiểu các mẫu câu đơn giản',
  },
  {
    code: 'B1',
    name_ja: '中級',
    name_vi: 'Trung cấp',
    description: 'Có thể hiểu hội thoại thường ngày',
  },
  {
    code: 'B2',
    name_ja: '中上級',
    name_vi: 'Trung cao cấp',
    description: 'Có thể hiểu hội thoại tự nhiên hơn',
  },
  {
    code: 'C1',
    name_ja: '上級',
    name_vi: 'Cao cấp',
    description: 'Có thể hiểu nội dung phức tạp',
  },
];

const places = [
  {
    name_vi: 'Siêu thị',
    name_ja: 'スーパー',
    description: 'Các tình huống mua sắm tại siêu thị.',
  },
  {
    name_vi: 'Nhà hàng',
    name_ja: 'レストラン',
    description: 'Giao tiếp tại quán ăn, nhà hàng.',
  },
  {
    name_vi: 'Bệnh viện',
    name_ja: '病院',
    description: 'Hỏi đáp về sức khỏe và thủ tục bệnh viện.',
  },
  {
    name_vi: 'Bến xe',
    name_ja: 'バス停',
    description: 'Hỏi đường và di chuyển bằng phương tiện công cộng.',
  },
    {
    name_vi: 'Tiệm làm đẹp',
    name_ja: '美容室',
    description: 'Giao tiếp khi cắt tóc và dịch vụ chăm sóc tại tiệm.',
  },
  {
    name_vi: 'Ngân hàng',
    name_ja: '銀行',
    description: 'Các giao dịch tài chính và hành chính tại ngân hàng.',
  },
  {
    name_vi: 'Taxi',
    name_ja: 'タクシー',
    description: 'Giao tiếp với tài xế taxi và di chuyển trong thành phố.',
  },
];

const adminUser = {
  role: 'admin',
  email: 'admin@vietvibe.com',
  password: 'admin123',
  user_name: 'SystemAdmin',
};

async function seedMasterData() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB.');

  console.log('Clearing existing data in levels, places, users...');
  await Promise.all([Level.deleteMany({}), Place.deleteMany({}), User.deleteMany({})]);

  console.log('Seeding levels and places...');
  await Level.create(levels);
  await Place.create(places);

  console.log('Creating admin user...');
  const hashedPassword = await bcrypt.hash(adminUser.password, 12);
  await User.create({
    role: adminUser.role,
    email: adminUser.email,
    password_hash: hashedPassword,
    user_name: adminUser.user_name,
  });

  console.log('Master data seeded successfully.');
}

seedMasterData()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  });
