const mongoose = require('mongoose');
const { Schema } = mongoose;

const LearningUnitSchema = new Schema(
  {
    situation_id: { type: Schema.Types.ObjectId, ref: 'Situation', required: true },
    level_id: { type: Schema.Types.ObjectId, ref: 'Level', required: true },
    title_vi: { type: String, required: true },
    title_ja: { type: String, required: true },
    description: { type: String, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

LearningUnitSchema.index({ situation_id: 1, level_id: 1 }, { unique: true });

module.exports = mongoose.model('LearningUnit', LearningUnitSchema);
