import qs from 'qs'

const POPULATE_PRODUCT = {
    populate: ['images', 'productCategory']
}

export type ApiRoutesArgs = {
    ProductsList: {
        page: number,
        pageSize: number
    },
    ProductsDetails: {
        id: string
    }
}

export const apiRoutes = {
    products: {
        list: ({
            page = 1,
            pageSize = 25
        }: ApiRoutesArgs['ProductsList']) => {
            const queryString = qs.stringify({
                populate: POPULATE_PRODUCT,
                pagination: { page, pageSize }
            })

            return `/products?${queryString}`
        },

        details: ({ id }: ApiRoutesArgs['ProductsDetails']) => {
            const queryString = qs.stringify({ populate: POPULATE_PRODUCT });

            return `/products/${id}?${queryString}`
        },
    },
    cart: {
        details: () => {
            return `/card`
        },
        add: () => {
            return `/card/add`
        },
        remove: () => {
            return `/card/remove`
        }
    }
} as const;
