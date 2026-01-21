import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Magical glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse" />
      
      <div className="container relative py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <img 
                src={siteConfig.logo} 
                alt={siteConfig.name} 
                className="h-16 w-16 object-cover rounded-full ring-2 ring-white/20"
              />
              <span className="font-heading text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-gray-300 max-w-xs font-body text-lg">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <TikTokIcon className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-bold mb-6 text-xl text-white">CATEGORIES</h3>
            <ul className="space-y-3 font-body text-lg">
              <li>
                <Link to="/category/running" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Running
                </Link>
              </li>
              <li>
                <Link to="/category/trail" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Trail
                </Link>
              </li>
              <li>
                <Link to="/category/gym" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Gym
                </Link>
              </li>
              <li>
                <Link to="/category/basketball" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Basketball
                </Link>
              </li>
              <li>
                <Link to="/category/orthopedic" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Orthopedic
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold mb-6 text-xl text-white">CONTACT</h3>
            <ul className="space-y-4 font-body text-lg">
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-blue-400" />
                {siteConfig.contact.email}
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 text-green-400" />
                {siteConfig.contact.phone}
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-heading font-bold mb-6 text-xl text-white">LOCATION</h3>
            <div className="space-y-4 font-body text-lg">
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <p>{siteConfig.contact.address}</p>
                  <p className="text-sm text-gray-400">{siteConfig.contact.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="h-5 w-5 text-yellow-400" />
                <div>
                  <p>Mon - Sat: 9AM - 8PM</p>
                  <p className="text-sm text-gray-400">Sun: 10AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 font-body text-lg">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-8 font-body text-lg">
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
