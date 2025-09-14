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

export type ProductCategory = {
  id: number;
  documentId: string;
  title: string;
  image: Image;
};

export type ProductResponseShort = {
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
};

export type ProductResponseFull = ProductResponseShort & {
  productCategory: ProductCategory;
};
