import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', verifyToken, requireRole('employee'), (req, res) => {
  res.json({ message: 'Welcome to Employee Dashboard' });
});

export default router;