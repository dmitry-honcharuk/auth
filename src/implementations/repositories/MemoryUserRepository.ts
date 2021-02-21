import { UserRepository } from '../../../core/backend/interfaces/UserRepository';
import { User } from '../../../core/entities/user';

export function buildMemoryUserRepository(): UserRepository {
  const users: User[] = [];

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
