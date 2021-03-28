import { PublicUser } from '../../core/entities/user';
import { get } from './api';

export function getUsersInNamespace(namespaceId: string) {
  return get<PublicUser[]>(`/api/namespaces/${namespaceId}/users`);
}
