import { ReactNode } from 'react';

export const Button = ({
  children,
  onClick,
  className,
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-downriver-600 hover:bg-robin-s-egg-blue-300 hover:text-downriver-600 rounded-lg font-semibold transition-colors ${
        disabled && 'cursor-not-allowed'
      } ${className}`}
    >
      {children}
    </button>
  );
};
