import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Category {
  title: string;
  href: string;
  image: string;
}

interface CategoryBannerProps {
  categories?: Category[];
  className?: string;
}

const defaultCategories: Category[] = [
  {
    title: "Men",
    href: "/men",
    image: "https://images.unsplash.com/photo-1491553895911-0055uj8d0e8?w=600&q=80",
  },
  {
    title: "Women",
    href: "/women",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
  },
  {
    title: "Running",
    href: "/running",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
  },
];

export function CategoryBanner({
  categories = defaultCategories,
  className,
}: CategoryBannerProps) {
  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.href}
              to={category.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg"
            >
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-2">
                    {category.title}
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
