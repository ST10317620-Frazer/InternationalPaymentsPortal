import { pool } from '../db/index.js';

export const submitPayment = async (req, res) => {
  const { amount, currency, beneficiary, swiftCode, beneficiaryAccount } = req.body;
  const customerId = req.user.id;

  try {
    await pool.query(
      `INSERT INTO payments (customer_id, amount, currency, beneficiary, swift_code, beneficiary_account, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')`,
      [customerId, amount, currency, beneficiary, swiftCode, beneficiaryAccount]
    );
    res.json({ message: 'Payment submitted for approval' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export const getPendingPayments = async (req, res) => {
  const result = await pool.query('SELECT * FROM payments WHERE status = $1 ORDER BY created_at DESC', ['pending']);
  res.json(result.rows);
};

export const approvePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      'UPDATE payments SET status = $1, approved_at = NOW() WHERE id = $2 AND status = $3',
      ['approved', id, 'pending']
    );
    res.json({ message: 'Payment approved and sent to SWIFT' });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};