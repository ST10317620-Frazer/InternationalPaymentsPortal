// === WHITELISTING WITH REGEX ===
const nameRegex = /^[A-Za-z\s]{2,50}$/;
const idRegex = /^\d{13}$/;
const accountRegex = /^\d{8,12}$/;
const amountRegex = /^\d+(\.\d{1,2})?$/;
const swiftRegex = /^[A-Z]{4}ZA[A-Z0-9]{2}$/;
const currencyRegex = /^(ZAR|USD|EUR|GBP)$/;

export const validateRegister = (req, res, next) => {
  const { fullName, idNumber, accountNumber, password } = req.body;
  if (!nameRegex.test(fullName)) return res.status(400).json({ error: 'Invalid name' });
  if (!idRegex.test(idNumber)) return res.status(400).json({ error: 'ID must be 13 digits' });
  if (!accountRegex.test(accountNumber)) return res.status(400).json({ error: 'Invalid account number' });
  if (password.length < 8) return res.status(400).json({ error: 'Password too weak' });
  next();
};

export const validatePayment = (req, res, next) => {
  const { amount, currency, beneficiary, swiftCode, beneficiaryAccount } = req.body;
  if (!amountRegex.test(amount)) return res.status(400).json({ error: 'Invalid amount' });
  if (!currencyRegex.test(currency)) return res.status(400).json({ error: 'Invalid currency' });
  if (!nameRegex.test(beneficiary)) return res.status(400).json({ error: 'Invalid beneficiary' });
  if (!swiftRegex.test(swiftCode)) return res.status(400).json({ error: 'Invalid SWIFT code' });
  if (!accountRegex.test(beneficiaryAccount)) return res.status(400).json({ error: 'Invalid beneficiary account' });
  next();
};