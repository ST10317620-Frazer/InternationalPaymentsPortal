-- schema.sql
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  id_number VARCHAR(13) UNIQUE NOT NULL,
  account_number VARCHAR(20) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS employee (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user"(id),
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  payee_account VARCHAR(50) NOT NULL,
  swift_code VARCHAR(11) NOT NULL,
  purpose TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
