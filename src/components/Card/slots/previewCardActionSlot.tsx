import Button from 'components/Button';
import type { Product } from 'types/products';

const previewCardActionSlot = (id: Product['documentId']) => {
  const handleClick = (id: Product['documentId']) => {
    void id;
  };

  return <Button onClick={() => handleClick(id)}>В корзину</Button>;
};

export default previewCardActionSlot;
