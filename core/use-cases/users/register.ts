import { PublicUser } from '../../entities/user';
import { ValidationError } from '../../errors/ValidationError';
import { PasswordManager } from '../../interfaces/PasswordManager';
import { UserRepository } from '../../interfaces/UserRepository';
import { validateEmail, validatePassword } from '../../validation';

export function registerUseCaseFactory(deps: Dependencies) {
  const { userRepository, passwordManager } = deps;

  return async ({ email, password }: Input): Promise<PublicUser> => {
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
      throw new ValidationError('Email is taken');
    }

    const hashedPassword = passwordManager.hashPassword(password);

    const user = await userRepository.saveUser({
      email,
      password: hashedPassword,
    });

    return user;
  };
}

type Dependencies = {
  userRepository: UserRepository;
  passwordManager: PasswordManager;
};
interface Input {
  email?: string;
  password?: string;
}
