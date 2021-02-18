import '../styles/globals.css';

// @TODO Add typings for params
function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp;
