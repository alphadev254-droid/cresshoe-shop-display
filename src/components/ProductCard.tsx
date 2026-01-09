import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cn("group block product-card", className)}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-3">
        <img
          src={product.images[0]?.url}
          alt={product.images[0]?.alt || product.name}
          className="product-image h-full w-full object-cover transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <Badge variant="default" className="bg-accent text-accent-foreground text-xs px-2 py-0.5">
              NEW
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive" className="text-xs px-2 py-0.5">
              -{discountPercent}%
            </Badge>
          )}
        </div>

        {/* Quick action overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-primary text-primary-foreground text-sm font-medium px-6 py-2 rounded-full">
            View Details
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.brand}
        </p>
        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {formatPrice(product.price, siteConfig.currency)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice!, siteConfig.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
