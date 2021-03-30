import { NamespaceEntity } from '../entities/namespace';

export interface NamespaceRepository {
  addNamespace(fields: AddNamespaceInput): Promise<NamespaceEntity>;
  getNamespaces(): Promise<NamespaceEntity[]>;
  getNamespaceById(namespaceId: string): Promise<NamespaceEntity | null>;
  getNamespaceByClientId(clientId: string): Promise<NamespaceEntity | null>;
}

export type AddNamespaceInput = Omit<NamespaceEntity, 'id'>;
