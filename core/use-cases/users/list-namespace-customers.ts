import { castUserToPublic, PublicCustomer } from '../../entities/customer';
// import { UserAuthDTO } from '../../entities/user';
import { CoreError } from '../../errors/CoreError';
import { CustomerRepository } from '../../interfaces/CustomerRepository';

export function listNamespaceCustomersFactory({
  customerRepository,
}: Dependencies) {
  return async ({
    // currentUser,
    namespaceId,
  }: Input): Promise<PublicCustomer[]> => {
    if (!namespaceId) {
      throw new CoreError('Namespace id is required');
    }

    const users = await customerRepository.getUsersInNamespace(namespaceId);

    return users.map(castUserToPublic);
  };
}

type Dependencies = {
  customerRepository: CustomerRepository;
};
type Input = {
  // currentUser: UserAuthDTO;
  namespaceId?: string;
};
