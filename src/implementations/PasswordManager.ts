import { PasswordManager } from '../../core/interfaces/PasswordManager';

export function buildPasswordManager(): PasswordManager {
  return {
    hashPassword,
    isPasswordValid: (attempt: string, hashed: string) =>
      hashPassword(attempt) === hashed,
  };
}

function hashPassword(password: string) {
  return `HASHED_${password}`;
}
