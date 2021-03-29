import { isAdmin, UserAuthDTO } from '../../entities/end-user';
import { NamespaceEntity } from '../../entities/namespace';
import { ClientIdNotUniqueError } from '../../errors/ClientIdNotUniqueError';
import { CoreError } from '../../errors/CoreError';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { generateSecret } from '../../hasher';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function createAddNamespaceUseCase({ namespaceRepository }: Deps) {
  return async ({ name, currentUser }: Input): Promise<Output> => {
    if (!name) {
      return new CoreError('Name is required');
    }

    if (!isAdmin(currentUser)) {
      return new ForbiddenError();
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
type Input = { name?: string; currentUser: UserAuthDTO };
type Output = NamespaceEntity | CoreError;
