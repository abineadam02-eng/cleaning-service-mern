import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import BeforeAfter from '../models/BeforeAfter.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const uploadDir = path.resolve('uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '-');
    cb(null, `${Date.now()}-${safe}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', async (_req, res) => res.json(await BeforeAfter.find().sort({ createdAt: -1 })));

router.post('/', requireAdmin, upload.fields([{ name: 'beforeImage', maxCount: 1 }, { name: 'afterImage', maxCount: 1 }]), async (req, res) => {
  try {
    if (!req.files?.beforeImage?.[0] || !req.files?.afterImage?.[0]) {
      return res.status(400).json({ message: 'Both before and after images are required' });
    }
    const beforeImage = `/uploads/${req.files.beforeImage[0].filename}`;
    const afterImage = `/uploads/${req.files.afterImage[0].filename}`;
    const item = await BeforeAfter.create({ ...req.body, beforeImage, afterImage });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  const item = await BeforeAfter.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  for (const url of [item.beforeImage, item.afterImage]) {
    const file = path.resolve(`.${url}`);
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
  res.json({ message: 'Before/after item deleted' });
});

export default router;
