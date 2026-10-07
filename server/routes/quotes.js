import express from 'express';
import Quote from '../models/Quote.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', requireAdmin, async (_req, res) => {
  const quotes = await Quote.find().sort({ createdAt: -1 });
  res.json(quotes);
});

router.patch('/:id/status', requireAdmin, async (req, res) => {
  const quote = await Quote.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!quote) return res.status(404).json({ message: 'Quote not found' });
  res.json(quote);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.json({ message: 'Quote deleted' });
});

export default router;
