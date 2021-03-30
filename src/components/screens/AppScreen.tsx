import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { PublicCustomer } from '../../../core/entities/customer';
import { NamespaceEntity } from '../../../core/entities/namespace';
import { useAuthState } from '../../hooks/useAuthState';
import { getUsersInNamespace } from '../../services/users';
import { AppContext } from '../AppContext';
import { LoadingScreen } from './LoadingScreen';

const AUTH_PAGES = ['/admin/sign-in', '/admin/sign-up'];

export const AppScreen: FC = ({ children }) => {
  const { isPending, isLoggedIn, fetchUser } = useAuthState();
  const router = useRouter();
  const [selectedNamespace, selectNamespace] = useState<NamespaceEntity | null>(
    null,
  );
  const [users, setUsers] = useState<PublicCustomer[]>([]);

  useEffect(() => {
    const isAuthPage = AUTH_PAGES.some((path) =>
      router.pathname.startsWith(path),
    );

    if (
      !isPending &&
      !isLoggedIn &&
      router.pathname.startsWith('/admin') &&
      !isAuthPage
    ) {
      router.push('/admin/sign-in');
    }
  }, [isLoggedIn, isPending, router]);

  useEffect(() => {
    if (isLoggedIn && selectedNamespace) {
      getUsersInNamespace(selectedNamespace.id).then(setUsers);
    }
  }, [isLoggedIn, selectedNamespace]);

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        fetchCurrentUser: fetchUser,
        selectedNamespace: selectedNamespace,
        selectNamespace,
        users,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
