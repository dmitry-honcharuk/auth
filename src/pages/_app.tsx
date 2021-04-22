import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { AppScreen } from '../app/components/screens/AppScreen';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppScreen>
      <Component {...pageProps} />
    </AppScreen>
  );
}

export default MyApp;
