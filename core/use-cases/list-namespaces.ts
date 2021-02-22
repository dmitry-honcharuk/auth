import { Namespace } from '../entities/namespace';
import { NamespaceRepository } from '../interfaces/NamespaceRepository';

export function createListNamespacesUseCase({ namespaceRepository }: Deps) {
  return async (): Promise<Output> => {
    const namespaces = await namespaceRepository.getNamespaces();

    return namespaces;
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
type Output = Namespace[];
