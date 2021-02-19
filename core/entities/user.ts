export interface PublicUser {
  id: string;
  email: string;
}

export interface User extends PublicUser {
  password: string;
}
