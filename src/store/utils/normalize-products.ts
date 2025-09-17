import type { Product, ProductApi } from "types/products";

const normalizeProductItem = (from: ProductApi): Product => ({
    id: from.id,
    documentId: from.documentId,
    title: from.title,
    description: from.description,
    price: from.price,
    discountPercent: from.discountPercent,
    rating: from.rating,
    isInStock: from.isInStock,
    images: from.images,
    createdAt: new Date(from.createdAt),
    updatedAt: new Date(from.updatedAt),
    publishedAt: new Date(from.publishedAt),
    productCategory: from.productCategory,
})

const normalizeProductList = (from: ProductApi[]): Product[] => {
    return from.map(product => normalizeProductItem(product))
}
export {
    normalizeProductItem,
    normalizeProductList,
}