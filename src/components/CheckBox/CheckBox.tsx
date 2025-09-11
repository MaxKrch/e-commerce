import React, { useCallback, type ChangeEvent } from 'react';
import CheckIcon from '../icons/CheckIcon';
import cn from 'clsx';
import style from './CheckBox.module.scss'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {

  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  disabled,
  checked,
  className,
  ...rest
}) => {
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    onChange(event.target.checked)
  }, [onChange])

  return (
    <label
      htmlFor='checkbox'
      className={cn(
        style['container'],
        disabled && style['disabled'],
        className
      )}
    >
      <input
        {...rest}
        type="checkbox"
        id='checkbox'
        checked={checked}
        disabled={disabled}
        className={style['input']}
        onChange={handleChange}
      />
      {checked && <CheckIcon width={40} height={40} className={cn(style['icon'])} />}
    </label>
  )
};

export default CheckBox;
