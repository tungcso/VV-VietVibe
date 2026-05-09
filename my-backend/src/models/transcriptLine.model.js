const mongoose = require('mongoose');
const { Schema } = mongoose;

const TranscriptLineSchema = new Schema(
  {
    lesson_id: { type: Schema.Types.ObjectId, ref: 'ListeningLesson', required: true },
    start_time: { type: Number, required: true },
    end_time: { type: Number, required: true },
    text_vi: { type: String, required: true },
    text_ja: { type: String, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('TranscriptLine', TranscriptLineSchema);
