import { PasswordManager } from '../../core/backend/interfaces/PasswordManager';

export function buildPasswordManager(): PasswordManager {
  return {
    hashPassword,
    isPasswordValid: (attempt, hashed) => hashPassword(attempt) === hashed,
  };
}

function hashPassword(password: string) {
  return `HASHED_${password}`;
}
