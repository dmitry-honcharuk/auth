import { pick } from 'ramda';

export type CustomerEntity = {
  id: string;
  email: string;
  password: string;
  namespace: string;
};

export type PublicCustomer = Omit<CustomerEntity, 'password'>;

export type CustomerAuthDTO = Pick<CustomerEntity, 'id' | 'namespace'>;

export function castUserToPublic(user: CustomerEntity): PublicCustomer {
  return pick(['id', 'email', 'namespace'], user);
}

export function customerToAuthDTO(user: CustomerAuthDTO): CustomerAuthDTO {
  return pick(['id', 'namespace'], user);
}
