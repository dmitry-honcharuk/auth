import { createContext } from 'react';
import { NamespaceEntity } from '../../../../core/entities/namespace';
import { PublicUser } from '../../../../core/entities/user';

type Context = {
  selectedNamespace: null | NamespaceEntity;
  selectNamespace: (namespace: NamespaceEntity) => void;
  users: PublicUser[];
};

export const DashboardContext = createContext<Context>({
  selectedNamespace: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  selectNamespace: () => {},
  users: [],
});
