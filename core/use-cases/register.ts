import { CoreError } from '../errors/CoreError';
import { ValidationError } from '../errors/ValidationError';
import { PasswordManager } from '../interfaces/PasswordManager';
import { UserRepository } from '../interfaces/UserRepository';
import { validateEmail, validatePassword } from '../validation';

export function buildRegisterUseCase(deps: Dependencies) {
  const { userRepository, passwordManager } = deps;

  return async ({ email, password }: Input): Promise<Output> => {
    if (!email) {
      return new ValidationError('Email is required');
    }

    if (!password) {
      return new ValidationError('Password is required');
    }

    const emailError = validateEmail(email);
    if (emailError) {
      return emailError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return passwordError;
    }

    const emailTaken = await userRepository.isEmailTaken(email);

    if (emailTaken) {
      // @TODO Redo flow as this message is bad for security reasons
      return new ValidationError('Email is taken');
    }

    const hashedPassword = passwordManager.hashPassword(password);

    const user = await userRepository.saveUser({
      email,
      password: hashedPassword,
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
}

type Output = Promise<string | CoreError>;
