const mongoose = require('mongoose');
const { Schema } = mongoose;

const SituationSchema = new Schema(
  {
    place_id: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    title_vi: { type: String, required: true },
    title_ja: { type: String, required: true },
    description: { type: String, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Situation', SituationSchema);
