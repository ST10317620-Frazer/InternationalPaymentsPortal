import express from 'express';
import { submitPayment, getPendingPayments, approvePayment } from '../controllers/payment.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.js';
import { validatePayment } from '../middleware/validate.js';

const router = express.Router();

router.post('/submit', verifyToken, requireRole('customer'), validatePayment, submitPayment);
router.get('/pending', verifyToken, requireRole('employee'), getPendingPayments);
router.post('/approve/:id', verifyToken, requireRole('employee'), approvePayment);

export default router;