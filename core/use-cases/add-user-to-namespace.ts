import { Namespace } from '../entities/namespace';
import { CoreError } from '../errors/CoreError';
import { EntityAlredyExistsError } from '../errors/EntityAlredyExistsError';
import { NamespaceRepository } from '../interfaces/NamespaceRepository';

export function createAddUserToNamespaceUseCase({ namespaceRepository }: Deps) {
  return async ({ name }: { name?: string }): Promise<Output> => {
    if (!name) {
      return new CoreError('Name is required');
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
type Output = Namespace | CoreError;
