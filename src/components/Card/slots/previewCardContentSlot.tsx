import Text from 'components/Text';
import type { ProductResponseShort } from 'types/product';

const previewCardContentSlot = (product: ProductResponseShort) => {
  return (
    <Text color="primary" view="p-18" weight="bold">
      ${product.price}
    </Text>
  );
};

export default previewCardContentSlot;
