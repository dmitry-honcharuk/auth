import { randomBytes } from 'crypto';

export const generateSecret = () => {
  return randomBytes(32).toString('hex');
};
