export interface PasswordManager {
  hashPassword(password: string): string;
  isPasswordValid(passwordAttempt: string, hashedPassword: string): boolean;
}
