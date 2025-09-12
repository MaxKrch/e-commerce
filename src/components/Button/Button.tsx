import cn from 'clsx';
import React from 'react';
import style from './Button.module.scss';
import Loader from 'components/Loader'
import Text from 'components/Text';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  priority?: 'primary' | 'secondary';
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
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
  )

  return (
    <button
      {...rest}
      className={classes}
      disabled={loading || disabled}
    >
      {loading &&
        <Loader
          size='s'
          className={cn(style['loader'])}
        />
      }
      <Text
        view='button'
      >
        {children}
      </Text>
    </button>
  )
};

export default Button;


