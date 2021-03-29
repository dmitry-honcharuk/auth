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

type Creds = {
  email: string;
  password: string;
};
