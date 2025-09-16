import Text from 'components/Text';
import type { Product } from 'types/product';

const previewCardCaptionSlot = (product: Product) => {
  return (
    <Text color="secondary" weight="bold">
      {product.productCategory.title}
    </Text>
  );
};

export default previewCardCaptionSlot;
