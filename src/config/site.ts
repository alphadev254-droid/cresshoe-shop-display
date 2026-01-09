// Site configuration - Single source of truth for brand info
// This can be replaced with environment variables or API calls later

export const siteConfig = {
  name: "CRESSHOE",
  tagline: "Step Into Style",
  description: "Premium footwear for every occasion",
  currency: "KSh",
  contact: {
    email: "hello@cresshoe.com",
    phone: "+254 700 000 000",
    whatsapp: "+254700000000",
  },
  social: {
    instagram: "https://instagram.com/cresshoe",
    twitter: "https://twitter.com/cresshoe",
    facebook: "https://facebook.com/cresshoe",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "Running", href: "/running" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
