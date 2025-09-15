import cn from 'clsx';
import React, { type ChangeEvent } from 'react';

import style from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...rest }, ref) => {
    return (
      <div className={cn(style['container'], className)}>
        <input
          {...rest}
          className={cn(style['input'], afterSlot && style['with-icon'])}
          ref={ref}
          type="text"
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        />
        {afterSlot && <div className={cn(style['icon-container'])}>{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
