import { PublicCustomer } from '../../core/entities/customer';
import { get } from './api';

export function getUsersInNamespace(namespaceId: string) {
  return get<PublicCustomer[]>(`/api/namespaces/${namespaceId}/users`);
}
