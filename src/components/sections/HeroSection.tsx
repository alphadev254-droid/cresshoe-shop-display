import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { bannerService, BannerImage } from "@/services/bannerService";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

// Fallback images if backend is not available
const fallbackImages: BannerImage[] = [
  {
    url: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&q=80",
    alt_text: "New Arrivals"
  }
];

export function HeroSection({
  title = "NEW ARRIVALS",
  subtitle = "Shop our latest collection",
  ctaText = "SHOP NOW",
  ctaLink = "/new-arrivals",
}: HeroSectionProps) {
  const [heroImages, setHeroImages] = useState<BannerImage[]>(fallbackImages);

  useEffect(() => {
    bannerService.getHeroImages().then(images => {
      if (images.length > 0) {
        setHeroImages(images);
      }
    });
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0">
        <ImageCarousel 
          images={heroImages}
          className="w-full h-full"
          showControls={false}
          showDots={true}
          autoPlay={true}
          interval={6000}
          objectFit="cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="animate-slide-up">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg mx-auto">
            {subtitle}
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-foreground transition-all duration-300 px-8"
          >
            <Link to={ctaLink} className="flex items-center gap-2">
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
