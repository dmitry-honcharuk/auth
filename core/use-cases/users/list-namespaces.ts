import { NamespaceEntity } from '../../entities/namespace';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function createListNamespacesUseCase({ namespaceRepository }: Deps) {
  return async (): Promise<NamespaceEntity[]> => {
    return namespaceRepository.getNamespaces();
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
