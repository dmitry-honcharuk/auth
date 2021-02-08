import Link from 'next/link';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/test'>Test page</Link>
        </li>
      </ul>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
