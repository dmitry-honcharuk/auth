import { buildMongoNamespaceRepository } from '../implementations/repositories/MongoNamespaceRepository';
import { buildMongoUserRepository } from '../implementations/repositories/MongoUserRepository';

export const userRepository = buildMongoUserRepository();

export const namespaceRepository = buildMongoNamespaceRepository();
