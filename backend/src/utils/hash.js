import bcrypt from 'bcrypt';

// Use CommonJS export style for Node ESM compatibility
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Also export as default for fallback
export default { hashPassword, comparePassword };