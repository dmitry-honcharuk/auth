import { Namespace } from '../entities/namespace';
import { isAdmin, UserAuthDTO } from '../entities/user';
import { CoreError } from '../errors/CoreError';
import { EntityAlredyExistsError } from '../errors/EntityAlredyExistsError';
import { ForbiddenError } from '../errors/ForbiddenError';
import { NamespaceRepository } from '../interfaces/NamespaceRepository';

export function createAddNamespaceUseCase({ namespaceRepository }: Deps) {
  return async ({ name, currentUser }: Input): Promise<Output> => {
    if (!name) {
      return new CoreError('Name is required');
    }

    if (!isAdmin(currentUser)) {
      return new ForbiddenError();
    }

    const response = await namespaceRepository.addNamespace({ name });

    if (response instanceof EntityAlredyExistsError) {
      return new CoreError(`Namespace already exists. (${name})`);
    }

    return response;
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
type Input = { name?: string; currentUser: UserAuthDTO };
type Output = Namespace | CoreError;
