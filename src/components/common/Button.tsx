import cn from 'classnames';
import { FunctionComponent } from 'react';

type Props = {
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  className?: string;
};

export const Button: FunctionComponent<Props> = ({
  children,
  type = 'button',
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        className,
        'border-2 border-black focus:outline-none px-3 py-1.5 hover:bg-gray-500 hover:text-white transition-colors',
      )}
    >
      {children}
    </button>
  );
};
