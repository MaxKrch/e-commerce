import clsx from 'clsx';
import Text from 'components/Text';
import { memo, type FC } from 'react';

import style from './SectionHeader.module.scss';

export type SectionHeaderProps = {
  title: string;
  content: string;
  className?: string;
};

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  content,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={clsx(style['section-header'], className)}>
      <Text tag="h1" view="title" color="primary" weight="bold" className={clsx(style['title'])}>
        {title}
      </Text>
      <Text color="secondary" view="p-20" className={clsx(style['content'])}>
        {content}
      </Text>
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';
export default memo(SectionHeader);
