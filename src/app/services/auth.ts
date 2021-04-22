import { pick } from 'ramda';
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

export function loginCustomer(creds: CustomerCreds) {
  return post<{ token: string }>(
    `/api/${creds.clientId}/login`,
    pick(['email', 'password'], creds),
  );
}

export function registerCustomer(creds: CustomerCreds) {
  return post<{ token: string }>(
    `/api/${creds.clientId}/register`,
    pick(['email', 'password'], creds),
  );
}

export function fetchCustomerByToken(creds: {
  clientId: string;
  token: string;
}) {
  const headers = new Headers();

  headers.append('authorization', `Bearer ${creds.token}`);

  return get<{ id: string }>(`/api/${creds.clientId}/authorize`, { headers });
}

type Creds = {
  email: string;
  password: string;
};

type CustomerCreds = Creds & {
  clientId: string;
};
