const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserProgressSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    learning_unit_id: { type: Schema.Types.ObjectId, ref: 'LearningUnit', required: true },
    vocabulary_progress: {
      viewed_card_ids: [{ type: Schema.Types.ObjectId, ref: 'VocabularyCard' }],
      completed: { type: Boolean, default: false },
      completed_at: { type: Date, default: null }
    },
    listening_progress: {
      lesson_id: { type: Schema.Types.ObjectId, ref: 'ListeningLesson' },
      last_position_seconds: { type: Number, default: 0 },
      completed: { type: Boolean, default: false },
      completed_at: { type: Date, default: null }
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

UserProgressSchema.index({ user_id: 1, learning_unit_id: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', UserProgressSchema);
