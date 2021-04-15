import { forwardRef } from 'react';

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  label?: React.ReactNode;
};

export const FormField = forwardRef<HTMLInputElement, Props>(
  ({ id, name, placeholder, label, type }, ref) => {
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
          type={type}
          className='w-full px-3 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors'
        />
      </>
    );
  },
);
