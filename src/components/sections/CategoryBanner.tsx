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
    title: "Running Shoes",
    href: "/category/running",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  },
  {
    title: "Trail Shoes",
    href: "/category/trail",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
  },
  {
    title: "Gym Shoes",
    href: "/category/gym",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
  },
  {
    title: "Basketball Shoes",
    href: "/category/basketball",
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&q=80",
  },
];

export function CategoryBanner({
  categories = defaultCategories,
  className,
}: CategoryBannerProps) {
  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
