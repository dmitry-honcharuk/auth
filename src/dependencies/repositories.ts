import { buildMemoryUserRepository } from '../implementations/repositories/MongoUserRepository';

export const userRepository = buildMemoryUserRepository();
