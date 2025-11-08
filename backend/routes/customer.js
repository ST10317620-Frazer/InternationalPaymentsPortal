const express = require('express');
const router = express.Router();
const { pool } = require('../src/db');  // Correct path
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validate = (regex, value, field) => {
  if (!regex.test(value)) throw new Error(`Invalid ${field}`);
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, idNumber, accountNumber, password } = req.body;
    validate(/^[A-Za-z\s]{2,50}$/, fullName, 'name');
    validate(/^\d{13}$/, idNumber, 'ID');
    validate(/^\d{10,20}$/, accountNumber, 'account');
    if (password.length < 8) throw new Error('Password too short');

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO customers (full_name, id_number, account_number, password_hash) VALUES ($1,$2,$3,$4)',
      [fullName, idNumber, accountNumber, hash]
    );
    res.status(201).json({ message: 'Registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    const { rows } = await pool.query('SELECT * FROM customers WHERE account_number = $1', [accountNumber]);
    const user = rows[0];
    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, 'your-jwt-secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;