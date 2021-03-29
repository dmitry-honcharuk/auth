import { FunctionComponent, useEffect, useState } from 'react';
import { NamespaceEntity } from '../../../../core/entities/namespace';
import { PublicUser } from '../../../../core/entities/user';
import { getUsersInNamespace } from '../../../services/users';
import { DashboardContext } from './DashboardContext';
import { Header } from './Header';

export const DashboardScreen: FunctionComponent = ({ children }) => {
  const [selectedNamespace, selectNamespace] = useState<NamespaceEntity | null>(
    null,
  );
  const [users, setUsers] = useState<PublicUser[]>([]);

  useEffect(() => {
    if (selectedNamespace) {
      getUsersInNamespace(selectedNamespace.id).then(setUsers);
    }
  }, [selectedNamespace]);

  return (
    <DashboardContext.Provider
      value={{
        selectedNamespace: selectedNamespace,
        selectNamespace,
        users,
      }}
    >
      <Header />
      <main>{children}</main>
    </DashboardContext.Provider>
  );
};
