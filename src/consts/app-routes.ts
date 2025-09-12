import type { ProductResponseShort } from "types/product";

export const appRoutes = {
    main: {
        mask: '/',
        create: () => '/'
    },
    products: {
        list: {
            mask: '/products',
            create: () => '/products',
            title: 'Products'
        },
        details: {
            mask: '/products/:id',
            create: (id: ProductResponseShort['id']) => `/products/${id}`,
        },
    },
    categories: {
        mask: '/categories',
        create: () => '/categories',
        title: 'Categories',
    },
    card: {
        mask: '/card',
        create: () => '/card',
        title: 'Cart',
    },
    my: {
        mask: '/my',
        create: () => '/my',
    },
    about: {
        mask: '/about',
        create: () => '/about',
        title: 'About us'
    }
} as const