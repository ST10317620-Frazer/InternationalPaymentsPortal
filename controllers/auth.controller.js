import { pool } from '../backend/src/db/index.js';
import { hashPassword, comparePassword } from '../backend/src/utils/hash.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const registerCustomer = async (req, res) => {
  const { fullName, idNumber, accountNumber, password } = req.body;
  try {
    const hashed = await hashPassword(password);
    await pool.query(
      'INSERT INTO customers (full_name, id_number, account_number, password_hash) VALUES ($1,$2,$3,$4)',
      [fullName, idNumber, accountNumber, hashed]
    );
    res.status(201).json({ message: 'Customer registered' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
};

export const loginCustomer = async (req, res) => {
  const { accountNumber, password } = req.body;
  const result = await pool.query('SELECT * FROM customers WHERE account_number = $1', [accountNumber]);
  const user = result.rows[0];
  if (!user || !(await comparePassword(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: 'customer' }, JWT_SECRET, { expiresIn: '15m' });
  res.json({ token, message: 'Login successful' });
};

export const loginEmployee = async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM employees WHERE username = $1', [username]);
  const user = result.rows[0];
  if (!user || !(await comparePassword(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: 'employee' }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, message: 'Employee login successful' });
};