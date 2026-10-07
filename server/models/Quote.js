import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  suburb: String,
  address: String,
  preferredDate: String,
  propertyType: String,
  floors: String,
  bedrooms: String,
  bathrooms: String,
  pestControl: String,
  carpetCleaning: String,
  furnished: String,
  message: String,
  status: { type: String, enum: ['new', 'contacted', 'booked', 'completed'], default: 'new' }
}, { timestamps: true });

export default mongoose.model('Quote', quoteSchema);
