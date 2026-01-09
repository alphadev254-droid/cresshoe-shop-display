import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { CategoryBanner } from "@/components/sections/CategoryBanner";
import { Newsletter } from "@/components/sections/Newsletter";
import { useBestSellers, useNewArrivals } from "@/hooks/useProducts";
import { siteConfig } from "@/config/site";

const Index = () => {
  const { data: bestSellers = [], isLoading: loadingBestSellers } = useBestSellers(4);
  const { data: newArrivals = [], isLoading: loadingNewArrivals } = useNewArrivals(4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <HeroSection
          title="NEW ARRIVALS"
          subtitle="Shop our latest collection"
          ctaText="SHOP NOW"
          ctaLink="/new-arrivals"
        />

        {/* Best Sellers */}
        <ProductGrid
          title="Best Selling"
          products={bestSellers}
          columns={4}
        />

        {/* Category Banners */}
        <CategoryBanner />

        {/* New Arrivals */}
        <ProductGrid
          title="New In"
          products={newArrivals}
          columns={4}
          className="bg-secondary/30"
        />

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
