import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function CtaBanner({
  title = "TIME TO MOVE",
  subtitle = "Step into style. Elevate your game with the latest drops.",
  ctaText = "SHOP COLLECTION",
  ctaLink = "/shop",
  backgroundImage = "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1974&auto=format&fit=crop",
}: CtaBannerProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      
      {/* Content */}
      <div className="container relative z-10 text-center md:text-left max-w-4xl">
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0">
          {subtitle}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-black hover:bg-white/90 font-medium px-8 h-12 group"
        >
          <Link to={ctaLink}>
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
