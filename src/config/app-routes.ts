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
    }
} as const