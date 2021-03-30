import Link from 'next/link';
import { FC } from 'react';
import { useLogout } from '../../../hooks/useLogout';
import { Button } from '../../common/Button';

type Props = {
  header?: React.ReactNode;
};

export const DashboardScreen: FC<Props> = ({ header, children }) => {
  const logout = useLogout();

  return (
    <>
      <header className='flex items-center px-4 py-2 border-b-2 border-gray-700'>
        <Link href='/admin'>
          <a className='text-2xl tracking-wider font-thin'>AUTH</a>
        </Link>
        <main className='flex-grow mx-2'>{header}</main>
        <Button onClick={logout}>Logout</Button>
      </header>
      <main>{children}</main>
    </>
  );
};
