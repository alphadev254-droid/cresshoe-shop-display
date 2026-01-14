// Site configuration - Single source of truth for brand info
// This can be replaced with environment variables or API calls later

export const siteConfig = {
  name: "WHITELIGHT",
  tagline: "Step Into Style",
  description: "Premium footwear for every occasion",
  currency: "KSh",
  contact: {
    email: "hello@whitelight.com",
    phone: "+254 700 000 000",
    whatsapp: "+254113765336",
  },
  social: {
    instagram: "https://instagram.com/whitelight",
    twitter: "https://twitter.com/whitelight",
    facebook: "https://facebook.com/whitelight",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Running", href: "/category/running" },
    { label: "Trail", href: "/category/trail" },
    { label: "Gym", href: "/category/gym" },
    { label: "Basketball", href: "/category/basketball" },
    { label: "Contact", href: "/contact" },
  ],
  categories: [
    { id: "running", label: "Running Shoes", href: "/category/running" },
    { id: "trail", label: "Trail Shoes", href: "/category/trail" },
    { id: "gym", label: "Gym Shoes", href: "/category/gym" },
    { id: "basketball", label: "Basketball Shoes", href: "/category/basketball" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
