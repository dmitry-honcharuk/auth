import { forwardRef } from 'react';

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  label?: React.ReactNode;
};

export const FormField = forwardRef<HTMLInputElement, Props>(
  ({ id, name, placeholder, label }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={id} className='block mb-2 cursor-pointer'>
            {label}
          </label>
        )}
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          ref={ref}
          className='w-full px-3 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors'
        />
      </>
    );
  },
);
