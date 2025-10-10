const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be positive'],
    validate: {
      validator: function(v) {
        return /^\d+(\.\d{1,2})?$/.test(v); // RegEx for decimal (e.g., 100.00)
      },
      message: 'Invalid amount format'
    }
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['ZAR', 'USD', 'EUR', 'GBP'] // Restrict to valid currencies
  },
  provider: {
    type: String,
    default: 'SWIFT',
    enum: ['SWIFT'] // Only SWIFT per task
  },
  payeeAccount: {
    type: String,
    required: [true, 'Payee account is required'],
    match: [/^\d{10,16}$/, 'Invalid payee account number']
  },
  swiftCode: {
    type: String,
    required: [true, 'SWIFT code is required'],
    match: [/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Invalid SWIFT code'] // Standard SWIFT format
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'verified', 'submitted'] // For employee portal
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);