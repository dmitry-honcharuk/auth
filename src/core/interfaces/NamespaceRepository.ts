import { NamespaceEntity } from '../entities/namespace';

export interface NamespaceRepository {
  addNamespace(
    creatorId: string,
    fields: AddNamespaceInput,
  ): Promise<NamespaceEntity>;
  getUserNamespaces(creatorId: string): Promise<GetNamespacesOutDTO[]>;
  getNamespaceById(namespaceId: string): Promise<NamespaceEntity | null>;
  getNamespaceByClientId(clientId: string): Promise<NamespaceEntity | null>;
  removeNamespaceById(namespaceId: string): Promise<void>;
}

export type GetNamespacesOutDTO = Omit<NamespaceEntity, 'creator'>;
export type AddNamespaceInput = Omit<NamespaceEntity, 'id' | 'creator'>;
