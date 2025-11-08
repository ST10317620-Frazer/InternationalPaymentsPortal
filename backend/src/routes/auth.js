import express from 'express';
// backend/src/routes/auth.js
router.post('/login', async (req, res) => {
  const { accountNumber, password, isEmployee } = req.body;  // ADD THIS LINE

  if (!accountNumber || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});