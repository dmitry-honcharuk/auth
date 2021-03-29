import { pick } from 'ramda';
import { CORE_NAMESPACE_NAME } from '../constants';

export type EndUserEntity = {
  id: string;
  email: string;
  password: string;
  namespace: string;
};

export type PublicUser = Omit<EndUserEntity, 'password'>;

export type UserAuthDTO = Pick<EndUserEntity, 'id' | 'namespace'>;

export function castUserToPublic(user: EndUserEntity): PublicUser {
  return pick(['id', 'email', 'namespace'], user);
}

export function isAdmin(user: Pick<EndUserEntity, 'namespace'>): boolean {
  return user.namespace === CORE_NAMESPACE_NAME;
}

export function userToAuthDTO(user: UserAuthDTO): UserAuthDTO {
  return pick(['id', 'namespace'], user);
}
