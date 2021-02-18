import { UserRepository } from '../core/interfaces/UserRepository';

export function buildMongoUserRepository(): UserRepository {
  return {
    isEmailTaken: async (email) => false,
    saveUser: async ({ email, password }) => {
      return { id: '123', email, password };
    },
  };
}
