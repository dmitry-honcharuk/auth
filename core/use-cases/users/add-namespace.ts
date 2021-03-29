import { CustomerAuthDTO } from '../../entities/customer';
import { NamespaceEntity } from '../../entities/namespace';
import { ClientIdNotUniqueError } from '../../errors/ClientIdNotUniqueError';
import { CoreError } from '../../errors/CoreError';
import { generateSecret } from '../../hasher';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function createAddNamespaceUseCase({ namespaceRepository }: Deps) {
  return async ({ name, currentUser }: Input): Promise<Output> => {
    if (!name) {
      return new CoreError('Name is required');
    }

    const clientId = generateSecret();

    let response;

    do {
      try {
        response = await namespaceRepository.addNamespace({ name, clientId });
      } catch (error) {
        if (!(error instanceof ClientIdNotUniqueError)) {
          return new CoreError('Could not create namespace.');
        }
      }
    } while (!response);

    return response;
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
type Input = { name?: string; currentUser: CustomerAuthDTO };
type Output = NamespaceEntity | CoreError;
