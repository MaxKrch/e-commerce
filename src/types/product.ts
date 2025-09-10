type Image = {
    id: number,
    documentId: string,
    url: string,
    name?: string,
    alternativeText?: string,
    caption?: string,
    width?: number;
    height?: number;
    [key: string]: unknown
}



export type ProductCategory = {
    id: number,
    documentId: string,
    title: string,
    image: Image
}


export type ProductRequest = {

}

export type ProductResponseShort = {
    id: number,
    documentId: string,
    title: string,
    description: string,
    price: number,
    discountPercent: number,
    rating: number,
    isInStock: boolean,
    createdAt: string,
    updatedAt: string,
    publishedAt: string
}

export type ProductResponseFull = {
    id: number,
    documentId: string,
    title: string,
    description: string,
    price: number,
    discountPercent: number,
    rating: number,
    isInStock: boolean,
    images: Image[],
    productCategory: ProductCategory,
    createdAt: string,
    updatedAt: string,
}

