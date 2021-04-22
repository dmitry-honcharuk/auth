import { mongoCustomerRepositoryFactory } from '../implementations/repositories/MongoCustomerRepository';
import { buildMongoNamespaceRepository } from '../implementations/repositories/MongoNamespaceRepository';
import { mongoUserRepositoryFactory } from '../implementations/repositories/MongoUserRepository';

export const customerRepository = mongoCustomerRepositoryFactory();
export const userRepository = mongoUserRepositoryFactory();

export const namespaceRepository = buildMongoNamespaceRepository();
