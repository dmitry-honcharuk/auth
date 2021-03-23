import { FunctionComponent } from 'react';
import { Header } from './Header';

export const DashboardScreen: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <div className='px-4 pt-5'>{children}</div>
    </>
  );
};
