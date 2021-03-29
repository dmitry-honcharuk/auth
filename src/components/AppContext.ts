import { createContext } from 'react';

type Context = {
  isLoggedIn: boolean;
  fetchCurrentUser: () => Promise<void>;
};

export const AuthContext = createContext<Context>({
  isLoggedIn: false,
  fetchCurrentUser: async () => {},
});
