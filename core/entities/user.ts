import { pick } from 'ramda';

export type UserEntity = {
  id: string;
  email: string;
  password: string;
};

export type UserAuthDTO = Pick<UserEntity, 'id'>;

export type PublicUser = Omit<UserEntity, 'password'>;

export function userToAuthDTO(user: UserAuthDTO): UserAuthDTO {
  return pick(['id'], user);
}
