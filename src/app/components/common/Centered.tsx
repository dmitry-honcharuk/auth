import { FunctionComponent } from 'react';

export const Centered: FunctionComponent = ({ children }) => {
  return (
    <div className='h-screen flex items-center'>
      <div className='w-full flex justify-center -translate-y-1/2'>
        {children}
      </div>
    </div>
  );
};
