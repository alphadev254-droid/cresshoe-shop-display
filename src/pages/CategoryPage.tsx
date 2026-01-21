import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { useProductsByCategory } from "@/hooks/useProducts";
import type { ProductCategory } from "@/types/product";
import { siteConfig } from "@/config/site";

const categoryTitles: Record<ProductCategory, string> = {
  running: "Running Shoes",
  trail: "Trail Shoes",
  gym: "Gym Shoes",
  basketball: "Basketball Shoes",
  orthopedic: "Orthopedic Shoes",
};

const categoryDescriptions: Record<ProductCategory, string> = {
  running: "Engineered for speed and comfort on every run",
  trail: "Built for rugged terrain and outdoor adventures",
  gym: "Designed for training, lifting, and high-intensity workouts",
  basketball: "Performance footwear for the court",
  orthopedic: "Medical-grade comfort and support for your feet",
};

// Pinterest-style high-quality images for each category
const categoryImages: Record<ProductCategory, string[]> = {
  running: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80",
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1920&q=80",
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&q=80",
  ],
  trail: [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=1920&q=80",
  ],
  gym: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80",
    "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1920&q=80",
  ],
  basketball: [
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&q=80",
    "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=1920&q=80",
    "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=1920&q=80",
  ],
  orthopedic: [
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1920&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1920&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1920&q=80",
  ],
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const validCategory = category as ProductCategory;
  
  const { data: products = [], isLoading } = useProductsByCategory(validCategory);
  
  const title = categoryTitles[validCategory] || "Products";
  const description = categoryDescriptions[validCategory] || "";
  const backgroundImages = categoryImages[validCategory] || [];
  
  const carouselImages = backgroundImages.map((url, index) => ({
    url,
    alt_text: `${title} ${index + 1}`
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Category Header with Carousel Background */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <ImageCarousel 
              images={carouselImages}
              className="w-full h-full"
              showControls={false}
              showDots={true}
              autoPlay={true}
              interval={5000}
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
          </div>
          <div className="container relative z-10 text-center">
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-white bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
              {title.toUpperCase()}
            </h1>
            <p className="text-white/90 font-body text-xl md:text-2xl max-w-2xl mx-auto font-semibold">
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
