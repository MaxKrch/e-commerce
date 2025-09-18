import { buildQueryString } from 'utils/build-query-string';

const populate = {
  products: ['images', 'productCategory'],
  categories: ['image']
} as const

export type ApiProductsArgs = {
  ProductsList: {
    page?: number;
    pageSize?: number;
    categories?: number[],
  };

  ProductsDetails: {
    id: string;
  };
};


export const apiRoutes = {
  categories: {
    list: () => {
      const queryString = buildQueryString({
        populate: populate['categories']
      });

      return `/product-categories?${queryString}`;
    },
  },
  products: {
    list: (args: ApiProductsArgs['ProductsList']) => {
      const queryString = buildQueryString({
        ...args,
        populate: populate['products'],
      });

      return `/products?${queryString}`;
    },

    details: ({ id }: ApiProductsArgs['ProductsDetails']) => {
      const queryString = buildQueryString({ populate: populate['products'] });

      return `/products/${id}?${queryString}`;
    },
  },
  cart: {
    details: () => {
      return `/card`;
    },
    add: () => {
      return `/card/add`;
    },
    remove: () => {
      return `/card/remove`;
    },
  },
} as const;
