import { CoreError } from '../../errors/CoreError';
import { ValidationError } from '../../errors/ValidationError';
import { CustomerRepository } from '../../interfaces/CustomerRepository';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';
import { PasswordManager } from '../../interfaces/PasswordManager';
import { getCustomerToken } from '../../utils/jwt';
import { validateEmail, validatePassword } from '../../validation';

export function buildRegisterUseCase(deps: Dependencies) {
  const { customerRepository, passwordManager, namespaceRepository } = deps;

  return async ({
    email,
    password,
    clientId,
    displayName,
  }: Input): Promise<string> => {
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

    const emailTaken = await customerRepository.isEmailTakenInNamespace(
      namespace.id,
      email,
    );

    if (emailTaken) {
      throw new ValidationError('Email is taken');
    }

    const hashedPassword = passwordManager.hashPassword(password);

    const customer = await customerRepository.saveCustomer({
      email,
      password: hashedPassword,
      namespace: namespace.id,
      displayName,
    });

    return getCustomerToken(
      {
        id: customer.id,
        displayName: customer.displayName || customer.email,
      },
      clientId,
    );
  };
}

type Dependencies = {
  customerRepository: CustomerRepository;
  namespaceRepository: NamespaceRepository;
  passwordManager: PasswordManager;
};
interface Input {
  email?: string;
  password?: string;
  clientId?: string;
  displayName?: string;
}
