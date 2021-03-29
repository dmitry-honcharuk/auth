import { NamespaceEntity } from '../../entities/namespace';
import { UserAuthDTO } from '../../entities/user';
import { CoreError } from '../../errors/CoreError';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function createListNamespacesUseCase({ namespaceRepository }: Deps) {
  return async ({ currentUser }: Input): Promise<Output> => {
    return namespaceRepository.getNamespaces();
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
type Input = { currentUser: UserAuthDTO };
type Output = NamespaceEntity[] | CoreError;
