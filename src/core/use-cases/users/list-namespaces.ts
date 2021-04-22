import { NamespaceEntity } from '../../entities/namespace';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function createListNamespacesUseCase({ namespaceRepository }: Deps) {
  return async ({ currentUserId }: Input): Promise<Output[]> => {
    return namespaceRepository.getUserNamespaces(currentUserId);
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
type Input = {
  currentUserId: string;
};
type Output = Omit<NamespaceEntity, 'creator'>;
