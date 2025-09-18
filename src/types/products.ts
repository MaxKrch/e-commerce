type Image = {
  id: number;
  documentId: string;
  url: string;
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
};

export type ProductCategoryApi = {
  id: number;
  documentId: string;
  title: string;
  image: Image;
};

export type ProductCategory = {
  id: number;
  documentId: string;
  title: string;
  image: Image;
};

export type ProductApi = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  rating: number;
  isInStock: boolean;
  images: Image[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  productCategory: ProductCategory;
};

export type Product = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  rating: number;
  isInStock: boolean;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  productCategory: ProductCategory;
}
