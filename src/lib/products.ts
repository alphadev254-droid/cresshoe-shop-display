// Product data service - Currently uses JSON, easily replaceable with API calls
import type { Product, ProductFilters, ProductsResponse } from "@/types/product";
import productsData from "@/data/products.json";

// Simulates API delay for realistic feel
const simulateDelay = (ms: number = 0) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Get all products with optional filters
export async function getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
  await simulateDelay();
  
  let products = productsData.products as Product[];
  
  if (filters) {
    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }
    if (filters.brand) {
      products = products.filter(p => p.brand.toLowerCase() === filters.brand?.toLowerCase());
    }
    if (filters.isNew !== undefined) {
      products = products.filter(p => p.isNew === filters.isNew);
    }
    if (filters.isBestSeller !== undefined) {
      products = products.filter(p => p.isBestSeller === filters.isBestSeller);
    }
    if (filters.minPrice !== undefined) {
      products = products.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.tags.some(t => t.toLowerCase().includes(search))
      );
    }
  }
  
  return {
    products,
    total: products.length,
    page: 1,
    limit: products.length,
  };
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await simulateDelay();
  
  const products = productsData.products as Product[];
  return products.find(p => p.slug === slug) || null;
}

// Get best sellers
export async function getBestSellers(limit?: number): Promise<Product[]> {
  const { products } = await getProducts({ isBestSeller: true });
  return limit ? products.slice(0, limit) : products;
}

// Get new arrivals
export async function getNewArrivals(limit?: number): Promise<Product[]> {
  const { products } = await getProducts({ isNew: true });
  return limit ? products.slice(0, limit) : products;
}

// Get products by category
export async function getProductsByCategory(category: Product["category"]): Promise<Product[]> {
  const { products } = await getProducts({ category });
  return products;
}

// Format price with currency
export function formatPrice(price: number, currency: string = "KSh"): string {
  return `${currency}${price.toLocaleString()}`;
}
