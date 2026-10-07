import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import quoteRoutes from './routes/quotes.js';
import testimonialRoutes from './routes/testimonials.js';
import beforeAfterRoutes from './routes/beforeAfter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'cleanpro-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/before-after', beforeAfterRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

connectDB().then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))).catch(err => {
  console.error('Database connection failed:', err.message);
  process.exit(1);
});
