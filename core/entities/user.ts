import { pick } from 'ramda';
import { CORE_NAMESPACE_NAME } from '../constants';

export type User = {
  id: string;
  email: string;
  password: string;
  namespace: string;
};

export type PublicUser = Omit<User, 'password'>;

export type UserAuthDTO = Pick<User, 'id' | 'namespace'>;

export function castUserToPublic(user: User): PublicUser {
  return pick(['id', 'email', 'namespace'], user);
}

export function isAdmin(user: Pick<User, 'namespace'>): boolean {
  return user.namespace === CORE_NAMESPACE_NAME;
}

export function userToAuthDTO(user: UserAuthDTO): UserAuthDTO {
  return pick(['id', 'namespace'], user);
}
