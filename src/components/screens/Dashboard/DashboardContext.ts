import { createContext } from 'react';
import { PublicUser } from '../../../../core/entities/end-user';
import { NamespaceEntity } from '../../../../core/entities/namespace';

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
