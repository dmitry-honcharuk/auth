import { Namespace } from '../../../core/entities/namespace';
import { EntityAlredyExistsError } from '../../../core/errors/EntityAlredyExistsError';
import { NamespaceRepository } from '../../../core/interfaces/NamespaceRepository';

export function createMemoryNamespaceRepository(): NamespaceRepository {
  const namespaces: Namespace[] = [
    { id: '1', name: 'First' },
    { id: '2', name: 'Second' },
  ];

  return {
    getNamespaces: async () => {
      log(namespaces);

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

      log(namespaces);

      return namespace;
    },
  };
}

const log = (stuf: Namespace[]) => {
  console.log('-   NAMESPACES   -');
  console.log(stuf);
  console.log('-!!!NAMESPACES!!!-');
};
