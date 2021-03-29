import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { AuthContext } from '../components/AppContext';
import { LoadingScreen } from '../components/screens/LoadingScreen';
import { useAuthState } from '../hooks/useAuthState';

const AUTH_PAGES = ['/admin/sign-in', '/admin/sign-up'];

function MyApp({ Component, pageProps }: AppProps) {
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
    <AuthContext.Provider value={{ isLoggedIn, fetchCurrentUser: fetchUser }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
