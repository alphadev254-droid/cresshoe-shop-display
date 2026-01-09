// Product types - Ready for API integration
// These types define the shape of all product data

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  size: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "men" | "women" | "unisex" | "running";
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  description: string;
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  createdAt: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Category type for filtering
export type ProductCategory = Product["category"];

// Filter options
export interface ProductFilters {
  category?: ProductCategory;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  search?: string;
}
