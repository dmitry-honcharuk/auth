import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

export default function Authorize() {
  return (
    <Auth0Provider
      domain='dimahon.eu.auth0.com'
      clientId='UmBLKgs2F5gzq0SYGxWo9yRJryqXyeeE'
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  );
}

const App = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};
