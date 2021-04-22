import { customerToPublic, PublicCustomer } from '../../entities/customer';
import { CoreError } from '../../errors/CoreError';
import { CustomerRepository } from '../../interfaces/CustomerRepository';
import { NamespaceRepository } from '../../interfaces/NamespaceRepository';

export function listNamespaceCustomersFactory({
  customerRepository,
  namespaceRepository,
}: Dependencies) {
  return async ({
    currentUserId,
    namespaceId,
  }: Input): Promise<PublicCustomer[]> => {
    if (!namespaceId) {
      throw new CoreError('Namespace id is required');
    }

    const [namespace, users] = await Promise.all([
      namespaceRepository.getNamespaceById(namespaceId),
      customerRepository.getCustomersInNamespace(namespaceId),
    ]);

    if (namespace?.creator !== currentUserId) {
      return [];
    }

    return users.map(customerToPublic);
  };
}

type Dependencies = {
  customerRepository: CustomerRepository;
  namespaceRepository: NamespaceRepository;
};
type Input = {
  currentUserId: string;
  namespaceId?: string;
};
