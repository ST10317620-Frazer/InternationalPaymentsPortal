-- seed.sql
\c bankdb

-- Customer (auto-registered via /register or pre-seeded)
INSERT INTO customers (full_name, id_number, account_number, password_hash)
VALUES (
  'John Doe',
  '9901015800081',
  '1234567890',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'  -- bcrypt hash for "Password123!"
)
ON CONFLICT (account_number) DO NOTHING;

-- Employee
INSERT INTO employees (username, password_hash)
VALUES (
  'emp001',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'  -- bcrypt hash for "Admin123!"
)
ON CONFLICT (username) DO NOTHING;