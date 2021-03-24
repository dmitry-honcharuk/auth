import { NamespaceEntity } from '../../../core/entities/namespace';
import { EntityAlredyExistsError } from '../../../core/errors/EntityAlredyExistsError';
import { NamespaceRepository } from '../../../core/interfaces/NamespaceRepository';

export function createMemoryNamespaceRepository(): NamespaceRepository {
  const namespaces: NamespaceEntity[] = [];

  return {
    getNamespaces: async () => {
      log(namespaces);

      return namespaces;
    },
    addNamespace: async ({ name, clientId }) => {
      const existing = namespaces.find((n) => n.name === name);

      if (existing) {
        return new EntityAlredyExistsError();
      }

      const namespace: NamespaceEntity = {
        id: `${namespaces.length + 1}`,
        name,
        clientId,
      };

      namespaces.push(namespace);

      log(namespaces);

      return namespace;
    },
  };
}

const log = (stuf: NamespaceEntity[]) => {
  console.log('-   NAMESPACES   -');
  console.log(stuf);
  console.log('-!!!NAMESPACES!!!-');
};
