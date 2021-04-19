import cn from 'classnames';
import { forwardRef } from 'react';

type Props = {
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  color?: 'default' | 'primary';
  children: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      disabled,
      type = 'button',
      onClick,
      className,
      color = 'default',
    },
    ref,
  ) => {
    return (
      <button
        type={type}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={cn(
          className,
          'border-2',
          'focus:outline-none',
          'px-3',
          'py-1.5',
          'transition-colors',
          {
            'opacity-50': disabled,
            'border-black hover:bg-gray-500 hover:text-white':
              color === 'default' && !disabled,
            'border-pink-500 bg-pink-500 hover:bg-pink-600 text-white':
              color === 'primary' && !disabled,
          },
        )}
      >
        {children}
      </button>
    );
  },
);
