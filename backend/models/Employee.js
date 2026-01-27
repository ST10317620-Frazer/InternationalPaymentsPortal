const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, 'Invalid username']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, 'Password must be strong']
  },
  role: {
    type: String,
    default: 'employee',
    enum: ['employee', 'admin'] // For scalability
  }
});

// Hash password
employeeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const SALT_ROUNDS = 12;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

employeeSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Employee', employeeSchema);
