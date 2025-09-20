import clsx from 'clsx';
import Text from 'components/Text';
import { observer } from 'mobx-react-lite';
import type React from 'react';
import type { Product } from 'types/products';

import style from '../ProductCard.module.scss';

const ContentSlot: React.FC<{ product: Product }> = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <Text weight="bold" className={clsx(style['content-slot'])}>
      ${product.price}
    </Text>
  );
};

export default observer(ContentSlot);
