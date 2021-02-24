import { FunctionComponent } from 'react';
import { useLogout } from '../../../hooks/useLogout';
import { Button } from '../../common/Button';

export const Header: FunctionComponent = () => {
  const logout = useLogout();

  return (
    <header className='flex items-center justify-between px-4 py-2 border-b-2 border-gray-700'>
      Header
      <Button onClick={logout}>Logout</Button>
    </header>
  );
};
