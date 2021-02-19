import { User } from '../../../core/entities/user';
import { UserRepository } from '../../../core/interfaces/UserRepository';

export function buildMemoryUserRepository(): UserRepository {
  const users: User[] = [];

  return {
    isEmailTaken: async (email) => !!users.find((user) => user.email === email),
    saveUser: async ({ email, password }) => {
      const user: User = { id: `${users.length + 1}`, email, password };

      users.push(user);

      console.log('USERS');
      console.log(users);

      return user;
    },
    getUserByEmail: async (email) =>
      users.find((user) => user.email === email) ?? null,
  };
}
