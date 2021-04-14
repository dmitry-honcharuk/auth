import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

export default function Authorize() {
  return (
    <Auth0Provider
      domain='dimahon.eu.auth0.com'
      clientId='UmBLKgs2F5gzq0SYGxWo9yRJryqXyeeE'
      redirectUri={window.location.origin + '/auth-test'}
    >
      <App />
    </Auth0Provider>
  );
}

const App = () => {
  const { user } = useAuth0();

  return <h1>Hello {JSON.stringify(user)}</h1>;
};
