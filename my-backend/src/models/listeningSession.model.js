const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListeningSessionSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lesson_id: {
      type: Schema.Types.ObjectId,
      ref: 'ListeningLesson',
      required: true,
    },
    learning_unit_id: {
      type: Schema.Types.ObjectId,
      ref: 'LearningUnit',
      required: true,
    },
    playback_speed: { type: Number, enum: [0.75, 1], default: 1 },
    playback_mode: {
      type: String,
      enum: ['study', 'continuous'],
      default: 'study',
    },
    ambient_sound: {
      type: String,
      enum: ['cafe', 'road', 'market', 'office', null],
      default: null,
    },
    ambient_volume: { type: Number, min: 0, max: 100, default: 40 },
    last_position_seconds: { type: Number, default: 0 },
    current_transcript_line_id: {
      type: Schema.Types.ObjectId,
      ref: 'TranscriptLine',
      default: null,
    },
    completed: { type: Boolean, default: false },
    completed_at: { type: Date, default: null },
    ended_at: { type: Date, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

ListeningSessionSchema.index({ user_id: 1, lesson_id: 1, created_at: -1 });

module.exports = mongoose.model('ListeningSession', ListeningSessionSchema);
