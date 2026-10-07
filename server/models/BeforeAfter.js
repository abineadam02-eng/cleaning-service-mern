import mongoose from 'mongoose';

const beforeAfterSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  service: { type: String, trim: true },
  location: { type: String, trim: true },
  beforeImage: { type: String, required: true },
  afterImage: { type: String, required: true },
  description: String
}, { timestamps: true });

export default mongoose.model('BeforeAfter', beforeAfterSchema);
