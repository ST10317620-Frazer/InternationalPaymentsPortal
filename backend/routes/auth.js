// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { accountNumber, password, isEmployee } = req.body;

  try {
    let user, role;

    if (isEmployee) {
      // Employee Login
      const { rows } = await pool.query(
        'SELECT * FROM employee WHERE username = $1',
        [accountNumber]
      );
      if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
      user = rows[0];
      role = 'employee';
    } else {
      // Customer Login
      const { rows } = await pool.query(
        'SELECT * FROM "user" WHERE account_number = $1',
        [accountNumber]
      );
      if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
      user = rows[0];
      role = 'customer';
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;