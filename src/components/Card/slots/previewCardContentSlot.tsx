import Text from 'components/Text';
import type { Product } from 'types/product';

const previewCardContentSlot = (product: Product) => {
  return (
    <Text color="primary" view="p-18" weight="bold">
      ${product.price}
    </Text>
  );
};

export default previewCardContentSlot;
