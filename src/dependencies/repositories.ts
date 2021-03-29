import { mongoUserRepositoryFactory } from '../implementations/repositories/MongoAppUserRepository';
import { mongoCustomerRepositoryFactory } from '../implementations/repositories/MongoEndUserRepository';
import { buildMongoNamespaceRepository } from '../implementations/repositories/MongoNamespaceRepository';

export const customerRepository = mongoCustomerRepositoryFactory();
export const userRepository = mongoUserRepositoryFactory();

export const namespaceRepository = buildMongoNamespaceRepository();
