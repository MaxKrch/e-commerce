import cn from 'clsx';
import React, { memo } from 'react';

import style from './Button.module.scss';

export type AddingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  priority?: 'primary' | 'secondary';
  children: React.ReactNode;
};

const AddingButton: React.FC<AddingButtonProps> = ({
  priority = 'primary',
  className,
  children,
  loading,
  disabled,
  ...rest
}) => {
  const classes = cn(
    style['button'],
    style[priority],
    loading && style['loading'],
    disabled && style['disabled'],
    className
  );

  return (
    <button {...rest} className={classes} disabled={loading || disabled}>
      {children}
    </button>
  );
};

export default memo(AddingButton);
