import { ValidationError } from '../errors/ValidationError';
import { UserRepository } from '../interfaces/UserRepository';
import { validateEmail, validatePassword } from '../validation';

export function buildRegisterUseCase({ userRepository }: Dependencies) {
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

    const user = await userRepository.saveUser({ email, password });

    return user.id;
  };
}

type Dependencies = {
  userRepository: UserRepository;
};
interface Input {
  email?: string;
  password?: string;
}

type Output = Promise<string | ValidationError>;
