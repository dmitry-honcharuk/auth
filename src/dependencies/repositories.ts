import { createMemoryNamespaceRepository } from '../implementations/repositories/MemoryNamespaceRepository';
import { buildMongoUserRepository } from '../implementations/repositories/MongoUserRepository';

export const userRepository = buildMongoUserRepository();

export const namespaceRepository = createMemoryNamespaceRepository();
