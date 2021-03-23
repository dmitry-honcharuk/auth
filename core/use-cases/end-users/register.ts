import { ValidationError } from '../../errors/ValidationError';
import { PasswordManager } from '../../interfaces/PasswordManager';
import { UserRepository } from '../../interfaces/UserRepository';
import { validateEmail, validatePassword } from '../../validation';

export function buildRegisterUseCase(deps: Dependencies) {
  const { userRepository, passwordManager } = deps;

  return async ({ email, password, clientId }: Input): Promise<Output> => {
    if (!clientId) {
      throw new ValidationError('Client id is required');
    }

    if (!email) {
      throw new ValidationError('Email is required');
    }

    if (!password) {
      throw new ValidationError('Password is required');
    }

    const emailError = validateEmail(email);
    if (emailError) {
      throw emailError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      throw passwordError;
    }

    const emailTaken = await userRepository.isEmailTaken(email);

    if (emailTaken) {
      // @TODO Redo flow as this message is bad for security reasons
      throw new ValidationError('Email is taken');
    }

    const hashedPassword = passwordManager.hashPassword(password);

    const user = await userRepository.saveUser({
      email,
      password: hashedPassword,
      // @TODO fix namespace
      namespace: clientId,
    });

    return user.id;
  };
}

type Dependencies = {
  userRepository: UserRepository;
  passwordManager: PasswordManager;
};
interface Input {
  email?: string;
  password?: string;
  clientId?: string;
}

type Output = string;
