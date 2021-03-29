import { userToAuthDTO } from '../../entities/end-user';
import { CoreError } from '../../errors/CoreError';
import { NoSuchUserError } from '../../errors/NoSuchUserError';
import { ValidationError } from '../../errors/ValidationError';
import { WrongPasswordError } from '../../errors/WrongPasswordError';
import { generateSecret } from '../../hasher';
import { EndUserRepository } from '../../interfaces/EndUserRepository';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';
import { PasswordManager } from '../../interfaces/PasswordManager';
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

    return getToken(userToAuthDTO(user), secret);
  };
}

type Dependencies = {
  passwordManager: PasswordManager;
  userRepository: EndUserRepository;
  namespaceRepository: NamespaceRepository;
};
interface Input {
  email?: string;
  password?: string;
  clientId?: string;
}
