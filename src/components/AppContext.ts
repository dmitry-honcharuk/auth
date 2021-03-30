import { createContext } from 'react';
import { PublicCustomer } from '../../core/entities/customer';
import { NamespaceEntity } from '../../core/entities/namespace';

type Context = {
  isLoggedIn: boolean;
  fetchCurrentUser: () => Promise<void>;
  selectedNamespace: null | NamespaceEntity;
  selectNamespace: (namespace: NamespaceEntity) => void;
  users: PublicCustomer[];
};

export const AppContext = createContext<Context>({
  isLoggedIn: false,
  fetchCurrentUser: async () => {},
  selectedNamespace: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  selectNamespace: () => {},
  users: [],
});
