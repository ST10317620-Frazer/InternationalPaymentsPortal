const express = require('express');
const router = express.Router();
const { pool } = require('../src/db');
const jwt = require('jsonwebtoken');

const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM employees WHERE username = $1', [username]);
  const emp = rows[0];
  if (!emp || !await bcrypt.compare(password, emp.password_hash)) {
    return res.status(401).json({ error: 'Invalid' });
  }
  const token = jwt.sign(
  { id: emp.id, role: 'employee' },
  process.env.JWT_SECRET || 'your-jwt-secret',
  { expiresIn: '1h' }
);
  res.json({ token });
});

router.get(
  '/transactions',
  authenticate,
  authorize('employee', 'admin'),
  async (req, res) => {
    const { rows } = await pool.query(
      'SELECT * FROM transactions WHERE status = $1',
      ['pending']
    );
    res.json(rows);
  }
);

router.post(
  '/verify/:id',
  authenticate,
  authorize('employee', 'admin'),
  async (req, res) => {
    await pool.query(
      'UPDATE transactions SET verified = true WHERE id = $1',
      [req.params.id]
    );
    res.json({ message: 'Verified' });
  }
);

module.exports = router;