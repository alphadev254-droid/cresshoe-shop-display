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

const categoryImages: Record<ProductCategory, string> = {
  running: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&q=80",
  trail: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
  basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&q=80",
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const validCategory = category as ProductCategory;
  
  const { data: products = [], isLoading } = useProductsByCategory(validCategory);
  
  const title = categoryTitles[validCategory] || "Products";
  const description = categoryDescriptions[validCategory] || "";
  const backgroundImage = categoryImages[validCategory] || "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Category Header with Background Image */}
        <section 
          className="relative py-20 md:py-28 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container relative z-10">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3 text-white">
              {title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl">
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
