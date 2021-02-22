import { Namespace } from '../../../core/entities/namespace';
import { EntityAlredyExistsError } from '../../../core/errors/EntityAlredyExistsError';
import { NamespaceRepository } from '../../../core/interfaces/NamespaceRepository';

export function createMemoryNamespaceRepository(): NamespaceRepository {
  const namespaces: Namespace[] = [];

  return {
    getNamespaces: async () => {
      console.log('-   NAMESPACES   -');
      console.log(namespaces);
      console.log('-!!!NAMESPACES!!!-');

      return namespaces;
    },
    addNamespace: async ({ name }) => {
      const existing = namespaces.find((n) => n.name === name);

      if (existing) {
        return new EntityAlredyExistsError();
      }

      const namespace: Namespace = {
        id: `${namespaces.length + 1}`,
        name,
      };

      namespaces.push(namespace);

      console.log('-   NAMESPACES   -');
      console.log(namespaces);
      console.log('-!!!NAMESPACES!!!-');

      return namespace;
    },
  };
}
