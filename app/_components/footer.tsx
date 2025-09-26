"use client";

import {
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Category as SanityCategory } from "@/types/sanity";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Footer({
  categories,
}: {
  categories: SanityCategory[];
}) {
  const whatsappNumber = "+96876429013";
  const whatsappMessage = "Hi! I'm interested in your products.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
    "+",
    ""
  )}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleWhatsAppInquiry = () => {
    const message =
      "Hi! I'd like to know more about your products. Can you help me?";
    const phoneNumber = "+96876429013"; // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <footer className="theme-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="bg-transparent max-w-24 mb-2 flex justify-center"> {/* mb-5 → mb-2 (less space) */}
                <Image
                  src={"/rooh-logo-white.png"}
                  alt="rooh"
                  className="h-26 w-26" // Increased from h-20 w-20
                  width={120} // Increased from 120
                  height={120} // Increased from 120
                />
              </div>
              <p className="text-white mb-6 max-w-md text-sm md:text-base leading-relaxed">
                At Rooh, every piece tells a story - inspired by deen, shaped for modesty, and made with purpose. We design with heart for women with grace and purpose.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 theme-text-secondary" />
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    +968 76429013 (WhatsApp)
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 theme-text-secondary" />
                  <a
                    href="mailto:roohbyreja@gmail.com"
                    className="text-sm hover:underline"
                  >
                    roohbyreja@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 theme-text-secondary" />
                  <span className="text-sm">India</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-white hover:text-white hover:bg-white/10"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/roohby.reja"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-white hover:text-white hover:bg-white/10"
                  asChild
                >
                  <a
                    href="https://www.facebook.com/profile.php?id=61581334205733"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </Button>
                {/* <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-white hover:text-white hover:bg-white/10"
                  asChild
                >
                  <a href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button> */}
                {/* <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-white hover:text-white hover:bg-white/10"
                  asChild
                >
                  <a href="#" aria-label="YouTube">
                    <Youtube className="h-5 w-5" />
                  </a>
                </Button> */}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wide">
                QUICK LINKS
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/products"}
                    className="text-sm text-white hover:text-white/80 transition-colors duration-200"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href={`${whatsappUrl}&text=${encodeURIComponent(
                      "Hi! I need help with sizing."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wide">
                CATEGORIES
              </h4>
              <ul className="space-y-3">
                {categories.slice(0, 6).map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/category/${category.slug.current}`}
                      className="text-sm text-white hover:text-white/80 transition-colors duration-200 capitalize"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-white/80 mb-4 md:mb-0">
                © {new Date().getFullYear()} ROOH. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href={`${whatsappUrl}&text=${encodeURIComponent(
                    "Hi! I have questions about shipping and returns."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  Shipping & Returns
                </a>
                <a
                  href={`${whatsappUrl}&text=${encodeURIComponent(
                    "Hi! I need help with my order."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  Help & Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppInquiry}
          className="w-16 h-16 bg-[#25d366] animate-bounce hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-1000 flex items-center justify-center group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
          </svg>
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-3 py-2 bg-neutral-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat with us
            <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-4 border-l-neutral-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </motion.button>

        {/* Pulse Animation */}
      </motion.div>
    </>
  );
}

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
