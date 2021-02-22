import { createMemoryNamespaceRepository } from '../implementations/repositories/MemoryNamespaceRepository';
import { buildMemoryUserRepository } from '../implementations/repositories/MemoryUserRepository';

export const userRepository = buildMemoryUserRepository();

export const namespaceRepository = createMemoryNamespaceRepository();
