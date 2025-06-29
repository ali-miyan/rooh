import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const footerLinks = {
    SHOP: ["New Arrivals", "Abayas", "Thobes", "Kids", "Hijabs", "Accessories", "Gifts"],
    "CUSTOMER CARE": ["Contact Us", "Size Guide", "Shipping Info", "Returns", "FAQ", "Track Order"],
    COMPANY: ["About Us", "Careers", "Press", "Wholesale", "Privacy Policy", "Terms of Service"],
  }

  return (
    <footer className="theme-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-light tracking-[0.2em] mb-4">ROOH</h3>
            <p className="text-white mb-6 max-w-md">
              Your premier destination for elegant and modest fashion. We offer the finest collection of abayas, hijabs,
              and accessories for the modern Muslim woman.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 theme-text-secondary" />
                <span className="text-sm">020 3161 0087</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 theme-text-secondary" />
                <span className="text-sm">orders@ROOH.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 theme-text-secondary" />
                <span className="text-sm">London, United Kingdom</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 text-white hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-white hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-white hover:text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-white hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-4 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white mb-4 md:mb-0">© 2024 ROOH. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-white hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-white hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-white hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
