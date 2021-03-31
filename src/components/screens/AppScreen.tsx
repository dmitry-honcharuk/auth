import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useAuthState } from '../../hooks/useAuthState';
import { AppContext } from '../AppContext';
import { LoadingScreen } from './LoadingScreen';

const AUTH_PAGES = ['/admin/sign-in', '/admin/sign-up'];

export const AppScreen: FC = ({ children }) => {
  const { isPending, isLoggedIn, fetchUser } = useAuthState();
  const router = useRouter();

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

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <AppContext.Provider value={{ fetchCurrentUser: fetchUser }}>
      {children}
    </AppContext.Provider>
  );
};
