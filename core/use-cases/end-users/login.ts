import { userToAuthDTO } from '../../entities/user';
import { CoreError } from '../../errors/CoreError';
import { NoSuchUserError } from '../../errors/NoSuchUserError';
import { ValidationError } from '../../errors/ValidationError';
import { WrongPasswordError } from '../../errors/WrongPasswordError';
import { generateSecret } from '../../hasher';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';
import { PasswordManager } from '../../interfaces/PasswordManager';
import { UserRepository } from '../../interfaces/UserRepository';
import { getToken } from '../../utils/jwt';

export function buildLoginUseCase(deps: Dependencies) {
  const { userRepository, passwordManager, namespaceRepository } = deps;

  return async ({ email, password, clientId }: Input): Promise<string> => {
    if (!clientId) {
      throw new ValidationError('Client id is required');
    }

    if (!email) {
      throw new ValidationError('Email is required');
    }

    if (!password) {
      throw new ValidationError('Password is required');
    }

    const namespace = await namespaceRepository.getNamespaceByClientId(
      clientId,
    );

    if (!namespace) {
      throw new CoreError(`No namespace for client id. (${clientId})`);
    }

    const user = await userRepository.getUserInNamespaceByEmail(
      namespace.id,
      email,
    );

    if (!user) {
      throw new NoSuchUserError(email, clientId);
    }

    if (!passwordManager.isPasswordValid(password, user.password)) {
      throw new WrongPasswordError();
    }

    const secret = generateSecret();

    const token = await getToken(userToAuthDTO(user), secret);

    return token;
  };
}

type Dependencies = {
  passwordManager: PasswordManager;
  userRepository: UserRepository;
  namespaceRepository: NamespaceRepository;
};
interface Input {
  email?: string;
  password?: string;
  clientId?: string;
}
