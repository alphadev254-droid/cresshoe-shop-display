import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { BannerImage } from "@/services/bannerService";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

// Local carousel images - all images from couresel folder
const localImages: BannerImage[] = [
  { url: "/couresel_images/sport.png", alt_text: "Premium Sports Collection" },
  { url: "/couresel_images/sport1.png", alt_text: "Athletic Performance" },
  { url: "/couresel_images/sport2.png", alt_text: "Style Meets Function" },
  { url: "/couresel_images/sport3.png", alt_text: "Next Level Comfort" },
  { url: "/couresel_images/sport4.png", alt_text: "Elite Sports Gear" },
  { url: "/couresel_images/sport5.png", alt_text: "Championship Quality" },
  { url: "/couresel_images/trail1.png", alt_text: "Trail Adventures" },
  { url: "/couresel_images/trail2.png", alt_text: "Outdoor Performance" },
  { url: "/couresel_images/trail3.png", alt_text: "Mountain Ready" },
  { url: "/couresel_images/trail4.png", alt_text: "Trail Excellence" },
];

export function HeroSection({
  title = "NEW ARRIVALS",
  subtitle = "Shop our latest collection",
  ctaText = "SHOP NOW",
  ctaLink = "/new-arrivals",
}: HeroSectionProps) {
  const [heroImages] = useState<BannerImage[]>(localImages);



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
        {/* Magical gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-pink-600/30 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="animate-slide-up">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-black text-white mb-6 tracking-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
            {title}
          </h1>
          <p className="font-body text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-semibold">
            {subtitle}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 px-12 py-6 text-xl font-bold font-body rounded-full shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300"
          >
            <Link to={ctaLink} className="flex items-center gap-3">
              {ctaText}
              <ArrowRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
