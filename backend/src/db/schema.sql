-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  id_number VARCHAR(13) UNIQUE NOT NULL,
  account_number VARCHAR(12) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Employees (Pre-registered)
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  swift_code VARCHAR(11) NOT NULL,
  payee_account VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed employee
INSERT INTO employees (username, password_hash) VALUES 
('emp001', '$2a$10$z8K3f9x5v7b9n1m3p5q7r9t1u3w5y7e9r0t2y4u6i8o0p2a4s6d8f'); -- pass: secure123