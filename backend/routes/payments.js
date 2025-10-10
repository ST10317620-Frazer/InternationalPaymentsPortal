const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { amount, currency, payeeAccount, swiftCode } = req.body;
    const transaction = new Transaction({
      userId: req.user.id,
      amount,
      currency,
      payeeAccount,
      swiftCode
    });
    await transaction.save();
    res.json({ msg: 'Payment created', transaction });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
