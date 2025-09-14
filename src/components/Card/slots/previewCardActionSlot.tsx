import Button from 'components/Button';
import type { ProductResponseShort } from 'types/product';

const previewCardActionSlot = (id: ProductResponseShort['documentId']) => {
  const handleClick = (id: ProductResponseShort['documentId']) => {
    void id;
  };

  return <Button onClick={() => handleClick(id)}>Add to Cart</Button>;
};

export default previewCardActionSlot;
