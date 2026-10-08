// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import BeforeAfter from '../models/BeforeAfter.js';
// import { requireAdmin } from '../middleware/auth.js';

// const router = express.Router();
// const uploadDir = path.resolve('uploads');
// fs.mkdirSync(uploadDir, { recursive: true });
// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => cb(null, uploadDir),
//   filename: (_req, file, cb) => {
//     const safe = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '-');
//     cb(null, `${Date.now()}-${safe}`);
//   }
// });
// const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// router.get('/', async (_req, res) => res.json(await BeforeAfter.find().sort({ createdAt: -1 })));

// router.post('/', requireAdmin, upload.fields([{ name: 'beforeImage', maxCount: 1 }, { name: 'afterImage', maxCount: 1 }]), async (req, res) => {
//   try {
//     if (!req.files?.beforeImage?.[0] || !req.files?.afterImage?.[0]) {
//       return res.status(400).json({ message: 'Both before and after images are required' });
//     }
//     const beforeImage = `/uploads/${req.files.beforeImage[0].filename}`;
//     const afterImage = `/uploads/${req.files.afterImage[0].filename}`;
//     const item = await BeforeAfter.create({ ...req.body, beforeImage, afterImage });
//     res.status(201).json(item);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// router.delete('/:id', requireAdmin, async (req, res) => {
//   const item = await BeforeAfter.findByIdAndDelete(req.params.id);
//   if (!item) return res.status(404).json({ message: 'Item not found' });
//   for (const url of [item.beforeImage, item.afterImage]) {
//     const file = path.resolve(`.${url}`);
//     if (fs.existsSync(file)) fs.unlinkSync(file);
//   }
//   res.json({ message: 'Before/after item deleted' });
// });

// export default router;







import express from 'express';
import multer from 'multer';
import BeforeAfter from '../models/BeforeAfter.js';
import { requireAdmin } from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Store uploaded files temporarily in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Upload a buffer to Cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(buffer);
  });
};

// GET all Before & After items
router.get('/', async (_req, res) => {
  try {
    const items = await BeforeAfter.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE Before & After item
router.post(
  '/',
  requireAdmin,
  upload.fields([
    { name: 'beforeImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (
        !req.files?.beforeImage?.[0] ||
        !req.files?.afterImage?.[0]
      ) {
        return res.status(400).json({
          message: 'Both before and after images are required',
        });
      }

      // Upload both images to Cloudinary
      const beforeResult = await uploadToCloudinary(
        req.files.beforeImage[0].buffer,
        'cleanpro/before-after'
      );

      const afterResult = await uploadToCloudinary(
        req.files.afterImage[0].buffer,
        'cleanpro/before-after'
      );

      // Save Cloudinary URLs in MongoDB
      const item = await BeforeAfter.create({
        ...req.body,
        beforeImage: beforeResult.secure_url,
        afterImage: afterResult.secure_url,
      });

      res.status(201).json(item);
    } catch (err) {
      console.error('Before/After upload error:', err);

      res.status(400).json({
        message: err.message || 'Failed to upload images',
      });
    }
  }
);

// DELETE Before & After item
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const item = await BeforeAfter.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: 'Item not found',
      });
    }

    // Delete images from Cloudinary
    for (const url of [item.beforeImage, item.afterImage]) {
      if (!url || !url.includes('res.cloudinary.com')) continue;

      try {
        const parts = url.split('/upload/')[1];

        if (!parts) continue;

        const publicIdWithExtension = parts
          .split('/')
          .slice(1)
          .join('/');

        const publicId = publicIdWithExtension
          .replace(/\.[^/.]+$/, '');

        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error(
          'Cloudinary delete error:',
          cloudinaryError.message
        );
      }
    }

    res.json({
      message: 'Before/after item deleted',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;