import { pick } from 'ramda';

export type CustomerEntity = {
  id: string;
  email: string;
  password: string;
  namespace: string;
  displayName?: string | null;
};

export type PublicCustomer = Omit<CustomerEntity, 'password'>;

export type CustomerAuthDTO = Pick<CustomerEntity, 'id' | 'displayName'>;

export function customerToPublic(user: CustomerEntity): PublicCustomer {
  return pick(['id', 'email', 'namespace'], user);
}

export function customerToAuthDTO(user: CustomerAuthDTO): CustomerAuthDTO {
  return pick(['id', 'displayName'], user);
}
