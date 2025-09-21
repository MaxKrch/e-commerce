import clsx from 'clsx';
import Card from 'components/Card';
import Text from 'components/Text';
import useRootStore from 'context/root-store/useRootStore';
import { observer } from 'mobx-react-lite';
import type React from 'react';

import InStockActionSlot from '../slots/InStockActionSlot';

import style from './InStockProducts.module.scss';

const InStockProducts: React.FC = () => {
  const { cartStore } = useRootStore();
  if (cartStore.inStockProducts.length === 0) {
    return null;
  }

  return (
    <section className={clsx(style['container'])}>
      <ul className={clsx(style['list'])}>
        {cartStore.inStockProducts.map((item) => (
          <li key={item.product.id}>
            <Card
              className={clsx(style['card'])}
              product={item?.product}
              display="cart"
              contentSlot={() => (
                <Text className={clsx(style['content-slot'])}>${item.product.price}</Text>
              )}
              ActionSlot={() => <InStockActionSlot product={item.product} />}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default observer(InStockProducts);
