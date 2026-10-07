import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();
router.get('/', async (_req, res) => res.json(await Testimonial.find().sort({ createdAt: -1 })));
router.post('/', requireAdmin, async (req, res) => {
  try { res.status(201).json(await Testimonial.create(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.delete('/:id', requireAdmin, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: 'Testimonial deleted' });
});
export default router;
