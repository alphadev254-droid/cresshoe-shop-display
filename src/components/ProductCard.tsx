import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const availableSizes = product.variants.filter((v) => v.inStock);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const size = selectedSize || availableSizes[0]?.size;
    if (!size) {
      toast.error("No sizes available");
      return;
    }

    addToCart(product, size, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className={cn("group block product-card", className)}>
      <Link to={`/product/${product.slug}`}>
        {/* Image container with green border */}
        <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-primary bg-white mb-3">
          <img
            src={product.images[0]?.url}
            alt={product.images[0]?.alt || product.name}
            className="product-image h-full w-full object-cover transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                NEW
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="destructive" className="text-xs px-2 py-0.5">
                -{discountPercent}%
              </Badge>
            )}
          </div>
        </div>
      </Link>

      {/* Product info */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.brand}
        </p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        {/* Price */}
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

        {/* Sizes */}
        <div className="flex flex-wrap gap-1">
          {availableSizes.slice(0, 5).map((variant) => (
            <button
              key={variant.id}
              onClick={(e) => {
                e.preventDefault();
                setSelectedSize(variant.size);
              }}
              className={cn(
                "text-xs px-2 py-1 border rounded transition-colors",
                selectedSize === variant.size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              )}
            >
              {variant.size}
            </button>
          ))}
          {availableSizes.length > 5 && (
            <span className="text-xs px-2 py-1 text-muted-foreground">
              +{availableSizes.length - 5}
            </span>
          )}
        </div>

        {/* Add to Cart button */}
        <Button
          size="sm"
          className="w-full mt-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
