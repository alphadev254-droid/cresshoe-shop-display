import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { bannerService, CategoryImage } from "@/services/bannerService";
import { cn } from "@/lib/utils";

interface CategoryBannerProps {
  className?: string;
}

const categoryLabels: Record<string, string> = {
  running: "Running Shoes",
  trail: "Trail Shoes", 
  gym: "Gym Shoes",
  basketball: "Basketball Shoes",
};

// Fallback images if backend is not available
const fallbackCategories: CategoryImage[] = [
  {
    category: "running",
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    alt_text: "Running Shoes"
  },
  {
    category: "trail",
    url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
    alt_text: "Trail Shoes"
  },
  {
    category: "gym",
    url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    alt_text: "Gym Shoes"
  },
  {
    category: "basketball",
    url: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&q=80",
    alt_text: "Basketball Shoes"
  }
];

export function CategoryBanner({ className }: CategoryBannerProps) {
  const [categories, setCategories] = useState<CategoryImage[]>(fallbackCategories);

  useEffect(() => {
    bannerService.getCategoryImages().then(images => {
      if (images.length > 0) {
        setCategories(images);
      }
    });
  }, []);

  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.category}
              to={`/category/${category.category}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg"
            >
              <img
                src={category.url}
                alt={category.alt_text}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-2">
                    {categoryLabels[category.category] || category.category}
                  </h3>
                  <span className="text-white/80 text-sm font-medium inline-flex items-center gap-1 group-hover:underline">
                    Shop Now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
