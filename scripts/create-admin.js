import { pool } from '../backend/src/db/index.js';
import { hashPassword } from '../backend/src/utils/hash.js';

const username = 'admin@bank.com';
const password = 'SecureBank2025!';

(async () => {
  try {
    const hashed = await hashPassword(password);
    await pool.query(
      'INSERT INTO employees (username, password_hash) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING',
      [username, hashed]
    );
    console.log(`Admin created: ${username} / ${password}`);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    process.exit();
  }
})();