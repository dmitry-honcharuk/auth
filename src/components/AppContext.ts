import { createContext } from 'react';

type Context = {
  fetchCurrentUser: () => Promise<void>;
};

export const AppContext = createContext<Context>({
  fetchCurrentUser: async () => {},
});
