import type { Product } from 'types/product';

export const appRoutes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  products: {
    list: {
      mask: '/products',
      create: () => '/products',
    },
    details: {
      mask: '/products/:id',
      create: (id: Product['documentId']) => `/products/${id}`,
    },
  },
  categories: {
    mask: '/categories',
    create: () => '/categories',
  },
  card: {
    mask: '/card',
    create: () => '/card',
  },
  my: {
    mask: '/my',
    create: () => '/my',
  },
  about: {
    mask: '/about',
    create: () => '/about',
  },
} as const;
