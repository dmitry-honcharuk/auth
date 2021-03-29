import { castUserToPublic, PublicCustomer } from '../../entities/customer';
import { UserAuthDTO } from '../../entities/user';
import { CoreError } from '../../errors/CoreError';
import { CustomerRepository } from '../../interfaces/CustomerRepository';

export function listNamespaceUsersFactory({ userRepository }: Dependencies) {
  return async ({
    currentUser,
    namespaceId,
  }: Input): Promise<PublicCustomer[]> => {
    if (!namespaceId) {
      throw new CoreError('Namespace id is required');
    }

    const users = await userRepository.getUsersInNamespace(namespaceId);

    return users.map(castUserToPublic);
  };
}

type Dependencies = {
  userRepository: CustomerRepository;
};
type Input = {
  currentUser: UserAuthDTO;
  namespaceId?: string;
};
