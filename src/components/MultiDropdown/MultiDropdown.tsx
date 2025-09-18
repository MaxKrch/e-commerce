import clsx from 'clsx';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import style from './MultiDropdown.module.scss';
import type { Option } from 'types/option-dropdown';

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const isNode = (element: EventTarget | null): element is Node => {
  return element !== null && element instanceof Node;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  getTitle,
  className,
}) => {
  const inputElement = useRef<HTMLInputElement | null>(null);
  const optionsElement = useRef<HTMLUListElement | null>(null);
  const title = useMemo(() => getTitle(value), [value, getTitle]);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [inputValue, setInputvalue] = useState(value.length > 0 ? title : '');

  const stateRef = useRef({
    options,
    value,
    disabled,
    isShowDropdown,
    inputValue,
    title,
  });

  useEffect(() => {
    stateRef.current = {
      options,
      value,
      disabled,
      isShowDropdown,
      inputValue,
      title,
    };
  }, [options, value, disabled, isShowDropdown, inputValue, title]);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target;

      if (!isNode(target)) {
        return;
      }

      if (inputElement.current?.contains(target) && !stateRef.current.disabled && !stateRef.current.isShowDropdown) {
        setIsShowDropdown(true);
        return;
      }

      if (optionsElement.current?.contains(target) && target instanceof HTMLLIElement) {
        const isSelectedOption = stateRef.current.value.findIndex((option) => option.key === target.dataset.id) > -1;

        if (isSelectedOption) {
          const indexTargetOption = stateRef.current.value.findIndex((option) => option.key === target.dataset.id);
          if (indexTargetOption > -1) {
            onChange(stateRef.current.value.filter((option) => option.key !== target.dataset.id));
          }
        } else {
          const targetOption = stateRef.current.options.find((option) => option.key === target.dataset.id);
          if (targetOption) {
            onChange([...stateRef.current.value, targetOption]);
          }
        }
        return;
      }

      if (
        !inputElement.current?.contains(target) &&
        !optionsElement.current?.contains(target) &&
        stateRef.current.isShowDropdown
      ) {
        event.stopPropagation();
        setIsShowDropdown(false);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (isShowDropdown || stateRef.current.value.length === 0) {
      setInputvalue('');
    } else {
      setInputvalue(title);
    }
  }, [isShowDropdown, title]);

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <div className={clsx(style['container'], className)}>
      <Input
        disabled={disabled}
        onChange={setInputvalue}
        value={inputValue}
        ref={inputElement}
        afterSlot={<ArrowDownIcon color="secondary" />}
        placeholder={title}
        name='multiDropdownInput'
      />
      {isShowDropdown && !disabled && (
        <ul ref={optionsElement} className={clsx(style['options-container'])}>
          {options
            .filter((item) => item.value.toLowerCase().includes(inputValue.toLowerCase()))
            .map((option) => (
              <li
                data-id={option.key}
                key={option.key}
                className={clsx(
                  style['option'],
                  value.find((value) => value.key === option.key) && style['option_selected']
                )}
              >
                {option.value}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
