\c bankdb

INSERT INTO "user" (full_name, id_number, account_number, password_hash, created_at)
VALUES (
  'John Doe',
  '0012345678901',
  '1234567890',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  NOW()
)
ON CONFLICT (account_number) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  id_number = EXCLUDED.id_number,
  password_hash = EXCLUDED.password_hash;

INSERT INTO employee (username, password_hash, created_at)
VALUES (
  'emp001',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  NOW()
)
ON CONFLICT (username) DO NOTHING;
