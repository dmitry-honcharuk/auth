import { createContext } from 'react';
import { PublicCustomer } from '../../../../core/entities/customer';
import { NamespaceEntity } from '../../../../core/entities/namespace';

type Context = {
  selectedNamespace: null | NamespaceEntity;
  selectNamespace: (namespace: NamespaceEntity) => void;
  users: PublicCustomer[];
};

export const DashboardContext = createContext<Context>({
  selectedNamespace: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  selectNamespace: () => {},
  users: [],
});
