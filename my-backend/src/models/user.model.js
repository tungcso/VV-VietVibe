const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    role: { type: String, enum: ['learner', 'admin'], default: 'learner' },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password_hash: { type: String, required: true },
    user_name: { type: String, required: true, trim: true },
    full_name: { type: String, default: null },
    avatar_url: { type: String, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('User', UserSchema);
