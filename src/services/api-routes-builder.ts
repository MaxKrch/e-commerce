import qs from 'qs';

const populate = ['images', 'productCategory'];

export type ApiProductsArgs = {
  Categories: {
    page?: number;
    pageSize?: number;
  };
  ProductsList: {
    page?: number;
    pageSize?: number;
  };
  ProductsDetails: {
    id: string;
  };
};

export const apiRoutes = {
  categories: {
    list: ({ page = 1, pageSize = 25 }: ApiProductsArgs['Categories']) => {
      const queryString = qs.stringify({
        populate,
        pagination: { page, pageSize },
      });

      return `/product-categories?${queryString}`;
    },
  },
  products: {
    list: ({ page = 1, pageSize = 25 }: ApiProductsArgs['ProductsList']) => {
      const queryString = qs.stringify({
        populate,
        pagination: { page, pageSize },
      });

      return `/products?${queryString}`;
    },

    details: ({ id }: ApiProductsArgs['ProductsDetails']) => {
      const queryString = qs.stringify({ populate });

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
