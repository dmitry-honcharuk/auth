import { userToAuthDTO } from '../../entities/user';
import { CoreError } from '../../errors/CoreError';
import { ValidationError } from '../../errors/ValidationError';
import { generateSecret } from '../../hasher';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';
import { PasswordManager } from '../../interfaces/PasswordManager';
import { UserRepository } from '../../interfaces/UserRepository';
import { getToken } from '../../utils/jwt';
import { validateEmail, validatePassword } from '../../validation';

export function buildRegisterUseCase(deps: Dependencies) {
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

    const emailError = validateEmail(email);
    if (emailError) {
      throw emailError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      throw passwordError;
    }

    const namespace = await namespaceRepository.getNamespaceByClientId(
      clientId,
    );

    if (!namespace) {
      throw new CoreError(`No namespace for client id. (${clientId})`);
    }

    const emailTaken = await userRepository.isEmailTakenInNamespace(
      namespace.id,
      email,
    );

    if (emailTaken) {
      throw new ValidationError('Email is taken');
    }

    const hashedPassword = passwordManager.hashPassword(password);

    const user = await userRepository.saveUser({
      email,
      password: hashedPassword,
      namespace: namespace.id,
    });

    const token = await getToken(userToAuthDTO(user), generateSecret());

    return token;
  };
}

type Dependencies = {
  userRepository: UserRepository;
  namespaceRepository: NamespaceRepository;
  passwordManager: PasswordManager;
};
interface Input {
  email?: string;
  password?: string;
  clientId?: string;
}
