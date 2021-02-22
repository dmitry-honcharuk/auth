import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LoadingScreen } from '../components/screens/LoadingScreen';
import { useAuthState } from '../hooks/useAuthState';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { isPending, isLoggedIn } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !isLoggedIn) {
      router.push('/admin/sign-in');
    }
  }, [isPending, isLoggedIn]);

  if (isPending) {
    return <LoadingScreen />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
