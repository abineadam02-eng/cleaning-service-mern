import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!email || !password || email !== adminEmail) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }
  const valid = password === adminPassword;
  if (!valid) return res.status(401).json({ message: 'Invalid admin credentials' });
  const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, admin: { email, role: 'admin' } });
});

export default router;
