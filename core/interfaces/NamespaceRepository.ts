import { NamespaceEntity } from '../entities/namespace';

export interface NamespaceRepository {
  addNamespace(fields: AddNamespaceInput): Promise<NamespaceEntity>;
  getNamespaces(): Promise<NamespaceEntity[]>;
  getNamespaceByClientId(clientId: string): Promise<NamespaceEntity | null>;
}

export type AddNamespaceInput = Omit<NamespaceEntity, 'id'>;
