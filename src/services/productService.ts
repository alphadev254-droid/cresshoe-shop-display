// Product Service - Modular for API replacement
// Currently uses localStorage to persist changes to products

import { Product } from "@/types/product";
import productsData from "@/data/products.json";

const STORAGE_KEY = "admin_products";

// Initialize products from JSON or localStorage
const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with JSON data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData.products));
  return productsData.products as Product[];
};

const saveProducts = (products: Product[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// TODO: Replace these with API calls
// Example: return await fetch('/api/products', { ... })

export const productService = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getStoredProducts();
  },

  // Get single product by ID
  getById: async (id: string): Promise<Product | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const products = getStoredProducts();
    return products.find((p) => p.id === id) || null;
  },

  // Create new product
  create: async (product: Omit<Product, "id" | "createdAt">): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const products = getStoredProducts();
    
    const newProduct: Product = {
      ...product,
      id: String(Date.now()),
      slug: product.name.toLowerCase().replace(/\s+/g, "-"),
      createdAt: new Date().toISOString().split("T")[0],
    };
    
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
  },

  // Update product
  update: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const products = getStoredProducts();
    const index = products.findIndex((p) => p.id === id);
    
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    return products[index];
  },

  // Delete product
  delete: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const products = getStoredProducts();
    const filtered = products.filter((p) => p.id !== id);
    
    if (filtered.length === products.length) return false;
    
    saveProducts(filtered);
    return true;
  },

  // Reset to original data
  resetToDefault: async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
