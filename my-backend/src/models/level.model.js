const mongoose = require('mongoose');
const { Schema } = mongoose;

const LevelSchema = new Schema(
  {
    code: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1'], unique: true, required: true },
    name_ja: { type: String, required: true },
    name_vi: { type: String, default: null },
    description: { type: String, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Level', LevelSchema);
