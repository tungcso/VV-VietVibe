const mongoose = require('mongoose');
const { Schema } = mongoose;

const VocabularyCardSchema = new Schema(
  {
    learning_unit_id: { type: Schema.Types.ObjectId, ref: 'LearningUnit', required: true },
    word_vi: { type: String, required: true },
    meaning_ja: { type: String, required: true },
    example_vi: { type: String, default: null },
    example_ja: { type: String, default: null },
    note: { type: String, default: null },
    tag: { type: String, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('VocabularyCard', VocabularyCardSchema);
