import { CORE_NAMESPACE_NAME } from '../../../core/constants';
import { User } from '../../../core/entities/user';
import { UserRepository } from '../../../core/interfaces/UserRepository';
import { buildPasswordManager } from '../PasswordManager';

export function buildMemoryUserRepository(): UserRepository {
  const users: User[] = [
    {
      id: '1',
      email: 'dimas@dimas.com',
      password: buildPasswordManager().hashPassword('12345a'),
      namespace: CORE_NAMESPACE_NAME,
    },
  ];

  return {
    isEmailTaken: async (email) => !!users.find((user) => user.email === email),
    saveUser: async ({ email, password, namespace }) => {
      const user: User = {
        id: `${users.length + 1}`,
        email,
        password,
        namespace,
      };

      users.push(user);

      return user;
    },
    getUserByEmail: async (email) =>
      users.find((user) => user.email === email) ?? null,
  };
}
