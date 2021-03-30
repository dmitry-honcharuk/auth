import { NamespaceEntity } from '../../entities/namespace';
import { ValidationError } from '../../errors/ValidationError';
// import { UserAuthDTO } from '../../entities/user';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function getNamespaceFactory({ namespaceRepository }: Deps) {
  return async ({ namespaceId }: Input): Promise<NamespaceEntity | null> => {
    if (!namespaceId) {
      throw new ValidationError('Namespace id is required');
    }

    return namespaceRepository.getNamespaceById(namespaceId);
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
type Input = {
  // currentUser: UserAuthDTO,
  namespaceId?: string;
};
