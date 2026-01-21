import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProduct, useBestSellers } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/config/site";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug || "");
  const { data: relatedProducts = [] } = useBestSellers(4);
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedSize2, setSelectedSize2] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-heading font-semibold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select at least one size");
      return;
    }
    
    const referenceLink = `${window.location.origin}/product/${slug}?img=${selectedImageIndex}&size1=${selectedSize}${selectedSize2 ? `&size2=${selectedSize2}` : ''}`;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[selectedImageIndex]?.url || product.images[0]?.url,
      size: selectedSize,
      size2: selectedSize2,
      referenceLink,
      quantity
    });
    
    toast.success("Added to cart!", {
      description: `${product.name} - Size ${selectedSize}${selectedSize2 ? ` & ${selectedSize2}` : ''}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container py-8">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images with multiple angles */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
                <img
                  src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
                  alt={product.images[selectedImageIndex]?.alt || product.name}
                  className="h-full w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => {
                    // Cycle through images on tap
                    setSelectedImageIndex((prev) => 
                      prev === product.images.length - 1 ? 0 : prev + 1
                    );
                  }}
                />
              </div>
              
              {/* Image thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all",
                        selectedImageIndex === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `${product.name} angle ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:py-4">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  {product.brand}
                </p>
                {product.isNew && (
                  <Badge className="bg-accent text-accent-foreground text-xs">
                    NEW
                  </Badge>
                )}
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-semibold">
                  {formatPrice(product.price, siteConfig.currency)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice!, siteConfig.currency)}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-8">
                {product.description}
              </p>

              {/* Size selectors */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Select Size(s)</p>
                
                {/* First size */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Primary Size *</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={`size1-${variant.id}`}
                        disabled={!variant.inStock}
                        onClick={() => setSelectedSize(variant.size)}
                        className={cn(
                          "h-12 min-w-[3rem] px-4 rounded-md border text-sm font-medium transition-colors",
                          selectedSize === variant.size
                            ? "border-primary bg-primary text-primary-foreground"
                            : variant.inStock
                            ? "border-border hover:border-foreground"
                            : "border-border text-muted-foreground opacity-50 cursor-not-allowed"
                        )}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Second size (optional) */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Second Size (Optional)</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSize2(null)}
                      className={cn(
                        "h-12 px-4 rounded-md border text-sm font-medium transition-colors",
                        selectedSize2 === null
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-foreground"
                      )}
                    >
                      None
                    </button>
                    {product.variants.map((variant) => (
                      <button
                        key={`size2-${variant.id}`}
                        disabled={!variant.inStock || variant.size === selectedSize}
                        onClick={() => setSelectedSize2(variant.size)}
                        className={cn(
                          "h-12 min-w-[3rem] px-4 rounded-md border text-sm font-medium transition-colors",
                          selectedSize2 === variant.size
                            ? "border-primary bg-primary text-primary-foreground"
                            : variant.inStock && variant.size !== selectedSize
                            ? "border-border hover:border-foreground"
                            : "border-border text-muted-foreground opacity-50 cursor-not-allowed"
                        )}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-3">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-md border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <Button
                size="lg"
                className="w-full h-14 text-base"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <ProductGrid
          title="You May Also Like"
          products={relatedProducts.filter(p => p.id !== product.id).slice(0, 4)}
          columns={4}
          className="bg-secondary/30"
        />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
