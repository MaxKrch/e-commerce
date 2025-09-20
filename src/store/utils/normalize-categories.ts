import type { ProductCategory, ProductCategoryApi } from 'types/products';

const normalizeCategoriesItem = (from: ProductCategoryApi): ProductCategory => ({
  id: from.id,
  documentId: from.documentId,
  title: from.title,
  image: from.image,
});

const normalizeCategoriesList = (from: ProductCategoryApi[]): ProductCategory[] => {
  return from.map((product) => normalizeCategoriesItem(product));
};
export { normalizeCategoriesItem, normalizeCategoriesList };
