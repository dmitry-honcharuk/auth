import { post } from './api';

export function login(creds: Creds) {
  return post('/api/login', creds);
}

type Creds = {
  email: string;
  password: string;
};
