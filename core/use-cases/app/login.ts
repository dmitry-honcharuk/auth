import { castUserToPublic, PublicUser } from '../../entities/user';
import { CoreError } from '../../errors/CoreError';
import { NoSuchUserError } from '../../errors/NoSuchUserError';
import { ValidationError } from '../../errors/ValidationError';
import { WrongPasswordError } from '../../errors/WrongPasswordError';
import { PasswordManager } from '../../interfaces/PasswordManager';
import { UserRepository } from '../../interfaces/UserRepository';

export function buildLoginUseCase(deps: Dependencies) {
  const { userRepository, passwordManager } = deps;

  return async ({ email, password }: Input): Promise<Output> => {
    if (!email) {
      throw new ValidationError('Email is required');
    }

    if (!password) {
      throw new ValidationError('Password is required');
    }

    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new NoSuchUserError(email);
    }

    if (!passwordManager.isPasswordValid(password, user.password)) {
      throw new WrongPasswordError();
    }

    return castUserToPublic(user);
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
type Output = PublicUser | CoreError;
