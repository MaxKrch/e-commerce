import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Input from '../Input';
import cn from 'clsx';
import style from './MultiDropdown.module.scss'
import ArrowDownIcon from '../icons/ArrowDownIcon';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const isNode = (element: EventTarget | null): element is Node => {
  return element !== null && element instanceof Node
}

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  getTitle,
  className
}) => {
  const inputElement = useRef<HTMLInputElement | null>(null);
  const optionsElement = useRef<HTMLUListElement | null>(null);
  const resultGetTitle = useMemo(() => getTitle(value), [value])
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [inputValue, setInputvalue] = useState(value.length > 0 ? resultGetTitle : '');

  const stateRef = useRef({
    options,
    value,
    disabled,
    isShowDropdown,
    inputValue,
    resultGetTitle
  })

  useEffect(() => {
    stateRef.current = {
      options,
      value,
      disabled,
      isShowDropdown,
      inputValue,
      resultGetTitle
    }
  }, [options, value, disabled, isShowDropdown, inputValue, resultGetTitle])

  const handleClick = useCallback((event: MouseEvent) => {
    const target = event.target;
    if (!isNode(target)) {
      return
    }

    const { value, isShowDropdown, disabled } = stateRef.current

    if (inputElement.current?.contains(target) && !disabled && !isShowDropdown) {
      setIsShowDropdown(true);
      return;
    }

    if (optionsElement.current?.contains(target) && target instanceof HTMLLIElement) {
      const isSelectedOption = value.findIndex(option => option.key === target.dataset.id) > -1

      if (isSelectedOption) {
        const indexTargetOption = value.findIndex(option => option.key === target.dataset.id);
        if (indexTargetOption > -1) {
          onChange(value.filter(option => option.key !== target.dataset.id));
        }

      } else {
        const targetOption = options.find(option => option.key === target.dataset.id)
        if (targetOption) {
          onChange([...value, targetOption])
        }
      }
      return;
    }

    if (!inputElement.current?.contains(target) && !optionsElement.current?.contains(target) && isShowDropdown) {
      setIsShowDropdown(false)
    }
  }, [])

  useEffect(() => {
    if (!isShowDropdown) {
      stateRef.current.value.length > 0 ? setInputvalue(resultGetTitle) : setInputvalue('')
    } else {
      setInputvalue('')
    }
  }, [isShowDropdown, resultGetTitle])

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <div className={cn(
      style['container'],
      className
    )}>
      <Input
        disabled={disabled}
        onChange={setInputvalue}
        value={inputValue}
        ref={inputElement}
        afterSlot={<ArrowDownIcon color='secondary' />}
        placeholder={resultGetTitle}
      >
      </Input>
      {isShowDropdown && !disabled &&
        <ul
          ref={optionsElement}
          className={cn(style['options-container'])}
        >
          {options.filter(item => item.value.toLowerCase().includes(inputValue.toLowerCase())).map(option => (
            <li
              data-id={option.key}
              key={option.key}
              className={cn(
                style['option'],
                value.find(value => value.key === option.key) && style['option_selected']
              )}
            >
              {option.value}
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default MultiDropdown;
