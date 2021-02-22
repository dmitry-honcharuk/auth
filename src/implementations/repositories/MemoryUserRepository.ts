import { User } from '../../../core/entities/user';
import { UserRepository } from '../../../core/interfaces/UserRepository';
import { buildPasswordManager } from '../PasswordManager';

export function buildMemoryUserRepository(): UserRepository {
  const users: User[] = [
    {
      id: '1',
      email: 'dimas@dimas.com',
      password: buildPasswordManager().hashPassword('12345a'),
    },
  ];

  return {
    isEmailTaken: async (email) => !!users.find((user) => user.email === email),
    saveUser: async ({ email, password }) => {
      const user: User = { id: `${users.length + 1}`, email, password };

      users.push(user);

      return user;
    },
    getUserByEmail: async (email) =>
      users.find((user) => user.email === email) ?? null,
  };
}
