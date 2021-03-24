import { NamespaceEntity } from '../entities/namespace';
import { EntityAlredyExistsError } from '../errors/EntityAlredyExistsError';

export interface NamespaceRepository {
  addNamespace(
    fields: Omit<NamespaceEntity, 'id'>,
  ): Promise<NamespaceEntity | EntityAlredyExistsError>;
  getNamespaces(): Promise<NamespaceEntity[]>;
}
