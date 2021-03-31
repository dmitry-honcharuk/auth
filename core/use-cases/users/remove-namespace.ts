import { ValidationError } from '../../errors/ValidationError';
import { CustomerRepository } from '../../interfaces/CustomerRepository';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function removeNamespaceFactory(deps: Dependencies) {
  const { customerRepository, namespaceRepository } = deps;

  return async ({ namespaceId }: Input) => {
    if (!namespaceId) {
      throw new ValidationError('Namespace id is required');
    }

    await Promise.all([
      customerRepository.removeNamespaceCustomers(namespaceId),
      namespaceRepository.removeNamespaceById(namespaceId),
    ]);
  };
}

type Dependencies = {
  customerRepository: CustomerRepository;
  namespaceRepository: NamespaceRepository;
};
type Input = { namespaceId?: string };
