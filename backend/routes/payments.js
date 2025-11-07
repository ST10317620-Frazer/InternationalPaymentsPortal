const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

router.post(
  '/create',
  authMiddleware,
  // validation rules
  [
    body('amount', 'Payment amount must be a positive number').isFloat({ gt: 0 }),
    body('currency', 'Currency must be a 3-letter code').isISO4217(),
    body('payeeAccount', 'Payee account must be between 10 and 16 digits').isLength({ min: 10, max: 16 }).isNumeric(),
    body('swiftCode', 'Invalid SWIFT/BIC code').isBIC(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { amount, currency, payeeAccount, swiftCode } = req.body;
        const transaction = new Transaction({
            userid: req.user.id,
            amount,
            currency,
            payeeAccount,
            swiftCode,
        });
        await transaction.save();
        res.status(201).json({ msg: 'Payment created successfully', transaction });
    } catch (err) {
console.error(err.message);
res.status(500).json({ msg: 'Server error' });
    }
  }
);
module.exports = router;
