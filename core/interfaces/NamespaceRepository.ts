import { Namespace } from '../entities/namespace';
import { EntityAlredyExistsError } from '../errors/EntityAlredyExistsError';

export interface NamespaceRepository {
  addNamespace(
    options: AddNamespaceOptions,
  ): Promise<Namespace | EntityAlredyExistsError>;
  getNamespaces(): Promise<Namespace[]>;
}

type AddNamespaceOptions = {
  name: string;
};
