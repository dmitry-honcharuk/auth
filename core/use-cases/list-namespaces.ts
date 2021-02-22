import { Namespace } from '../entities/namespace';
import { isAdmin, UserAuthDTO } from '../entities/user';
import { CoreError } from '../errors/CoreError';
import { ForbiddenError } from '../errors/ForbiddenError';
import { NamespaceRepository } from '../interfaces/NamespaceRepository';

export function createListNamespacesUseCase({ namespaceRepository }: Deps) {
  return async ({ currentUser }: Input): Promise<Output> => {
    if (!isAdmin(currentUser)) {
      return new ForbiddenError();
    }

    const namespaces = await namespaceRepository.getNamespaces();

    return namespaces;
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
type Input = { currentUser: UserAuthDTO };
type Output = Namespace[] | CoreError;
