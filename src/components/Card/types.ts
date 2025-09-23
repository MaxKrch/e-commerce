import type React from 'react';
import type { Product } from 'types/products';

export type ActionSlot = React.FC<{
  product: Product;
}>;
