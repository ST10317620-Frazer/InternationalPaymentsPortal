const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    match: [/^[a-zA-Z\s]+$/, 'Invalid name format'] // RegEx for letters and spaces
  },
  idNumber: {
    type: String,
    required: [true, 'ID number is required'],
    unique: true,
    match: [/^\d{9,13}$/, 'Invalid ID number'] // 9-13 digits
  },
  accountNumber: {
    type: String,
    required: [true, 'Account number is required'],
    unique: true,
    match: [/^\d{10,16}$/, 'Invalid account number'] // 10-16 digits
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, 'Password must be strong'] // Strong password
  }
});

// Hash password before saving (Requirement 1)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);