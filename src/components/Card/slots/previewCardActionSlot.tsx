import Button from 'components/Button';
import type { Product } from 'types/product';

const previewCardActionSlot = (id: Product['documentId']) => {
  const handleClick = (id: Product['documentId']) => {
    void id;
  };

  return <Button onClick={() => handleClick(id)}>Add to Cart</Button>;
};

export default previewCardActionSlot;
