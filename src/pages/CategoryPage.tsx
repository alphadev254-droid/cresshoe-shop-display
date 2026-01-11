import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { useProductsByCategory } from "@/hooks/useProducts";
import type { ProductCategory } from "@/types/product";
import { siteConfig } from "@/config/site";

const categoryTitles: Record<ProductCategory, string> = {
  running: "Running Shoes",
  trail: "Trail Shoes",
  gym: "Gym Shoes",
  basketball: "Basketball Shoes",
};

const categoryDescriptions: Record<ProductCategory, string> = {
  running: "Engineered for speed and comfort on every run",
  trail: "Built for rugged terrain and outdoor adventures",
  gym: "Designed for training, lifting, and high-intensity workouts",
  basketball: "Performance footwear for the court",
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const validCategory = category as ProductCategory;
  
  const { data: products = [], isLoading } = useProductsByCategory(validCategory);
  
  const title = categoryTitles[validCategory] || "Products";
  const description = categoryDescriptions[validCategory] || "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Category Header */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          </div>
        </section>

        {/* Products */}
        {isLoading ? (
          <div className="container py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-secondary rounded-lg mb-3" />
                  <div className="h-4 bg-secondary rounded w-1/3 mb-2" />
                  <div className="h-5 bg-secondary rounded w-2/3 mb-2" />
                  <div className="h-4 bg-secondary rounded w-1/4" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ProductGrid products={products} columns={4} />
        )}
      </main>

      <Footer />
    </div>
  );
}
