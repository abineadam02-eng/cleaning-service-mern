import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true, trim: true },
  service: { type: String, trim: true }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
