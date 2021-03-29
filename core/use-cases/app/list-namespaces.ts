import { isAdmin, UserAuthDTO } from '../../entities/end-user';
import { NamespaceEntity } from '../../entities/namespace';
import { CoreError } from '../../errors/CoreError';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function createListNamespacesUseCase({ namespaceRepository }: Deps) {
  return async ({ currentUser }: Input): Promise<Output> => {
    if (!isAdmin(currentUser)) {
      return new ForbiddenError();
    }

    return namespaceRepository.getNamespaces();
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
type Input = { currentUser: UserAuthDTO };
type Output = NamespaceEntity[] | CoreError;
