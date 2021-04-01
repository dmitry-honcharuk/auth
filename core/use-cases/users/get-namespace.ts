import { NamespaceEntity } from '../../entities/namespace';
import { ValidationError } from '../../errors/ValidationError';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function getNamespaceFactory({ namespaceRepository }: Deps) {
  return async ({
    namespaceId,
    currentUserId,
  }: Input): Promise<NamespaceEntity | null> => {
    if (!namespaceId) {
      throw new ValidationError('Namespace id is required');
    }

    const namespace = await namespaceRepository.getNamespaceById(namespaceId);

    if (namespace?.creator !== currentUserId) {
      return null;
    }

    return namespace;
  };
}

type Deps = {
  namespaceRepository: NamespaceRepository;
};
type Input = {
  currentUserId: string;
  namespaceId?: string;
};
