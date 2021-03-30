import { NamespaceEntity } from '../../core/entities/namespace';
import { post } from './api';

export function createNamespace(name: string) {
  return post<{ name: string }, NamespaceEntity>(`/api/namespaces`, { name });
}
