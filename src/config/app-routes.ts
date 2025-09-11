export const appRoutes = {
    main: {
        mask: '/',
        create: () => '/'
    },
    products: {
        list: {
            mask: '/products',
            create: () => '/products'
        },
        details: {
            mask: '/products/:id',
            create: (id: string) => `/products/${id}`
        },
    },
    card: {
        mask: '/card',
        create: () => '/card'
    },
    my: {
        mask: '/my',
        create: () => '/my'
    },
    about: {
        mask: '/about',
        create: () => '/about'
    }
} as const