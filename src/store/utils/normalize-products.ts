import type { Product, ProductApi } from "types/product";

const normalizeProducts = (products: ProductApi[]): Product[] => {
    return products.map(from => ({
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
    }))
}

export default normalizeProducts;