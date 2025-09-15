import clsx from 'clsx';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { memo, useCallback, type ButtonHTMLAttributes, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './StepButton.module.scss';

export type StepButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'back' | 'go';
  children: React.ReactNode;
  className?: string;
};

const StepButton: FC<StepButtonProps> = ({ direction, children, className, ...rest }) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    if (direction === 'back') {
      navigate(-1);
    } else {
      navigate(1);
    }
  }, [direction, navigate]);

  return (
    <button className={clsx(style['button'], className)} onClick={handleClick} {...rest}>
      <ArrowRightIcon className={clsx(direction === 'back' && style['back'])} />
      <Text view="p-20">{children}</Text>
    </button>
  );
};


export default memo(StepButton);
