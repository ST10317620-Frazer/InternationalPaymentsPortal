const { Pool } = require('pg');

const pool = new Pool({
  user: 'bankuser',
  host: 'db',           // Docker service name
  database: 'bankdb',
  password: 'securepass123',
  port: 5432,
});

module.exports = { pool };