import { CustomerEntity } from '../entities/customer';

export interface CustomerRepository {
  isEmailTakenInNamespace(clientId: string, email: string): Promise<boolean>;
  saveCustomer(options: SaveUserInput): Promise<CustomerEntity>;
  getCustomerByEmail(email: string): Promise<null | CustomerEntity>;
  getCustomerInNamespaceByEmail(
    namespace: string,
    email: string,
  ): Promise<null | CustomerEntity>;
  getCustomersInNamespace(namespaceId: string): Promise<CustomerEntity[]>;
  removeNamespaceCustomers(namespaceId: string): Promise<void>;
}

export type SaveUserInput = {
  email: string;
  password: string;
  namespace: string;
  displayName?: string;
};
