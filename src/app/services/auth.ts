import { pick } from 'ramda';
import { CustomerAuthDTO } from '../../core/entities/customer';
import { get, post } from './api';

export function login(creds: Creds) {
  return post('/api/login', creds);
}

export function register(creds: Creds) {
  return post('/api/register', creds);
}

export function logout() {
  return post('/api/logout', {});
}

export function getCurrentUser() {
  return get('/api/current');
}

export function requestPasswordReset(creds: Omit<CustomerCreds, 'password'>) {
  return post<void>(`/api/${creds.clientId}/request-password-reset`, {
    email: creds.email,
  });
}

export function loginCustomer(creds: CustomerCreds) {
  return post<{ token: string }>(
    `/api/${creds.clientId}/login`,
    pick(['email', 'password'], creds)
  );
}

export function registerCustomer(creds: CustomerRegisterCreds) {
  return post<{ token: string }>(
    `/api/${creds.clientId}/register`,
    pick(['email', 'password', 'displayName'], creds)
  );
}

export function fetchCustomerByToken(creds: {
  clientId: string;
  token: string;
}) {
  const headers = new Headers();

  headers.append('authorization', `Bearer ${creds.token}`);

  return get<CustomerAuthDTO>(`/api/${creds.clientId}/authorize`, { headers });
}

type Creds = {
  email: string;
  password: string;
};

type CustomerCreds = Creds & {
  clientId: string;
};

type CustomerRegisterCreds = CustomerCreds & {
  displayName?: string;
};
