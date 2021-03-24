import { pick } from 'ramda';
import { CORE_NAMESPACE_NAME } from '../constants';

export type UserEntity = {
  id: string;
  email: string;
  password: string;
  namespace: string;
};

export type PublicUser = Omit<UserEntity, 'password'>;

export type UserAuthDTO = Pick<UserEntity, 'id' | 'namespace'>;

export function castUserToPublic(user: UserEntity): PublicUser {
  return pick(['id', 'email', 'namespace'], user);
}

export function isAdmin(user: Pick<UserEntity, 'namespace'>): boolean {
  return user.namespace === CORE_NAMESPACE_NAME;
}

export function userToAuthDTO(user: UserAuthDTO): UserAuthDTO {
  return pick(['id', 'namespace'], user);
}
