export type User = {
  id: string;
  email: string;
  password: string;
};

export type PublicUser = Omit<User, 'password'>;
