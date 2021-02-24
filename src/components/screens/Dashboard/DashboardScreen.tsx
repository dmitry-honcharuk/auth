import { FunctionComponent } from 'react';
import { useLogout } from '../../../hooks/useLogout';

export const DashboardScreen: FunctionComponent = ({ children }) => {
  const logout = useLogout();
  return (
    <>
      <h1>DASHBOARD</h1>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      {children}
    </>
  );
};
