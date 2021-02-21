import { pick } from 'ramda';

export type User = {
  id: string;
  email: string;
  password: string;
};

export type PublicUser = Omit<User, 'password'>;

export function castUserToPublic(user: User): PublicUser {
  return pick(['id', 'email'], user);
}
