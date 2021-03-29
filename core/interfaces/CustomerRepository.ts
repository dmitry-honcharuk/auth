import { CustomerEntity } from '../entities/customer';

export interface CustomerRepository {
  isEmailTakenInNamespace(clientId: string, email: string): Promise<boolean>;
  saveUser(options: SaveUserInput): Promise<CustomerEntity>;
  getUserByEmail(email: string): Promise<null | CustomerEntity>;
  getUserInNamespaceByEmail(
    namespace: string,
    email: string,
  ): Promise<null | CustomerEntity>;
  getUsersInNamespace(namespaceId: string): Promise<CustomerEntity[]>;
}

export type SaveUserInput = {
  email: string;
  password: string;
  namespace: string;
};
