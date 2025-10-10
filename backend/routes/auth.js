const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { fullName, idNumber, accountNumber, password } = req.body;
    let user = await User.findOne({ accountNumber });
    if (user) return res.status(400).json({ msg: 'User exists' });

    user = new User({ fullName, idNumber, accountNumber, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { accountNumber, password } = req.body;
  const user = await User.findOne({ accountNumber });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
