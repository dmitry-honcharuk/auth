import { NamespaceEntity } from '../../core/entities/namespace';
import { del, post } from './api';

export function createNamespace(name: string) {
  return post<{ name: string }, NamespaceEntity>(`/api/namespaces`, { name });
}

export function deleteNamespace(namespaceId: string) {
  return del<void>(`/api/namespaces/${namespaceId}`);
}
