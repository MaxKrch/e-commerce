import clsx from 'clsx';
import Button from 'components/Button';
import useRootStore from 'context/root-store/useRootStore';
import { observer } from 'mobx-react-lite';
import type { Product } from 'types/products';

import style from '../../Cart.module.scss';

const OutOfActionSlot: React.FC<{ product: Product }> = ({ product }) => {
  const { cartStore } = useRootStore();

  return (
    <div className={clsx(style['action-slot'])}>
      <Button priority="secondary" onClick={() => cartStore.removeFromCart(product)}>
        Удалить
      </Button>
    </div>
  );
};

export default observer(OutOfActionSlot);
