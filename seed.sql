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

INSERT INTO customers (full_name, id_number, account_number, password_hash)
VALUES (
  'Steve Hockens',
  '0987678923451',
  '7584936026',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'  -- bcrypt hash for "Password123!"
)
ON CONFLICT (account_number) DO NOTHING;

INSERT INTO customers (full_name, id_number, account_number, password_hash)
VALUES (
  'Zoe nelson',
  '7483920164737',
  '9786057841',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'  -- bcrypt hash for "Password123!"
)

INSERT INTO customers (full_name, id_number, account_number, password_hash)
VALUES (
  'Aiden Low',
  '0898967554872',
  '8787960083',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'  -- bcrypt hash for "Password123!"
)
ON CONFLICT (account_number) DO NOTHING;

-- Customer
INSERT INTO customers (full_name, id_number, account_number, password_hash)
VALUES (
  'Anthony Johnson',
  '6835193639162',
  '2468103429',
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

-- Employee
INSERT INTO employees (username, password_hash)
VALUES (
  'emp003',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'  -- bcrypt hash for "Admin123!"
)
ON CONFLICT (username) DO NOTHING;
-- Employee
INSERT INTO employees (username, password_hash)
VALUES (
  'emp004',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'  -- bcrypt hash for "Admin123!"
)
ON CONFLICT (username) DO NOTHING;

-- Employee
INSERT INTO employees (username, password_hash)
VALUES (
  'emp002',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'  -- bcrypt hash for "Admin123!"
)
ON CONFLICT (username) DO NOTHING;

-- Employee
INSERT INTO employees (username, password_hash)
VALUES (
  'emp005',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'  -- bcrypt hash for "Admin123!"
)
ON CONFLICT (username) DO NOTHING;
