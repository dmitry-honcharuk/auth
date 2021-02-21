import { ValidationError } from './errors/ValidationError';

const MIN_PASSWORD_LENGTH = 5;

export function validateEmail(email: string): null | ValidationError {
  return null;
}

export function validatePassword(password: string): null | ValidationError {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return new ValidationError('Password is too short');
  }

  if (!/[A-Z|a-z]+/.test(password)) {
    return new ValidationError('Password should contain at least one letter');
  }

  return null;
}
