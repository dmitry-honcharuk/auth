import {
  castUserToPublic,
  isAdmin,
  PublicUser,
  UserAuthDTO,
} from '../../entities/user';
import { CoreError } from '../../errors/CoreError';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { UserRepository } from '../../interfaces/UserRepository';

export function listNamespaceUsersFactory({ userRepository }: Dependencies) {
  return async ({ currentUser, namespaceId }: Input): Promise<PublicUser[]> => {
    if (!isAdmin(currentUser)) {
      throw new ForbiddenError();
    }

    if (!namespaceId) {
      throw new CoreError('Namespace id is required');
    }

    const users = await userRepository.getUsersInNamespace(namespaceId);

    return users.map(castUserToPublic);
  };
}

type Dependencies = {
  userRepository: UserRepository;
};
type Input = {
  currentUser: UserAuthDTO;
  namespaceId?: string;
};
