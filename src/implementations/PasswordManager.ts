import { PasswordManager } from '../../core/interfaces/PasswordManager';
import { createHmac } from 'crypto';
import { PASSWORD_SECRET } from '../config/env';

export function buildPasswordManager(): PasswordManager {
  return {
    hashPassword,
    isPasswordValid: (attempt: string, hashed: string) =>
      hashPassword(attempt) === hashed,
  };
}

function hashPassword(password: string) {
  return createHmac('sha256', PASSWORD_SECRET).update(password).digest('hex');
}
