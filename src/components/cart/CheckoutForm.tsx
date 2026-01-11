import { useState } from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CheckoutFormProps {
  onBack: () => void;
}

export function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { items, getTotal, clearCart, setIsOpen } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Please fill in name and phone number");
      return;
    }

    // Build WhatsApp message
    const orderDetails = items
      .map(
        (item) =>
          `• ${item.product.name} (Size: ${item.size}) x${item.quantity} - ${formatPrice(item.product.price * item.quantity, siteConfig.currency)}`
      )
      .join("\n");

    const message = `*New Order*\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\n${formData.email ? `Email: ${formData.email}\n` : ""}${formData.address ? `Address: ${formData.address}\n` : ""}${formData.notes ? `Notes: ${formData.notes}\n` : ""}\n*Order Items:*\n${orderDetails}\n\n*Total: ${formatPrice(getTotal(), siteConfig.currency)}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodedMessage}`, "_blank");
    
    toast.success("Redirecting to WhatsApp...");
    clearCart();
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <Button
        variant="ghost"
        size="sm"
        className="self-start mb-4"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Button>

      <form onSubmit={handleSubmit} className="flex-1 space-y-4 overflow-y-auto">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+254 7XX XXX XXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Delivery Address</Label>
          <Textarea
            id="address"
            placeholder="Your delivery address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Order Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any special instructions..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={2}
          />
        </div>
      </form>

      <div className="border-t pt-4 mt-4 space-y-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(getTotal(), siteConfig.currency)}</span>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white"
          onClick={handleSubmit}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Complete Order via WhatsApp
        </Button>
      </div>
    </div>
  );
}
