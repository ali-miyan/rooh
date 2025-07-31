"use client"

import { useState } from "react"
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import TopBar from "../../components/top-bar"

export default function Header({ categories }: { categories: object[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="w-full">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ROOH",
            url: "https://rooh.com",
            logo: "https://rooh.com/logo.png",
            sameAs: ["https://facebook.com/rooh", "https://instagram.com/rooh"],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: "English",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: "https://rooh.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <TopBar />

      {/* Main Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-shrink-0"
            >
              <motion.h1
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="text-2xl lg:text-3xl font-light tracking-[0.2em] text-gray-900 cursor-pointer"
              >
                ROOH
              </motion.h1>
            </motion.div>

            {/* Search Bar - Desktop */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex flex-1 max-w-lg mx-8"
            >
              <div className="relative w-full">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-200 rounded-none focus:outline-none focus:border-gray-400 transition-all duration-200"
                />
                <motion.div
                  animate={{ scale: isSearchFocused ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Icons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="hidden lg:flex p-2">
                  <Heart className="h-5 w-5 text-gray-600" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="hidden lg:flex p-2">
                  <User className="h-5 w-5 text-gray-600" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="p-2">
                  <ShoppingBag className="h-5 w-5 text-gray-600" />
                </Button>
              </motion.div>
              {/* Mobile Menu Button */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isMenuOpen ? "close" : "menu"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:block border-t border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-center space-x-8 py-4">
              {categories.map((item:any, index) => (
                <motion.a
                  key={item._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  href={`/category/${item.slug.current}`}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 tracking-wide relative"
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-100 overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="px-4 py-4 space-y-4"
              >
                {/* Mobile Search */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 pr-10 text-sm border border-gray-200 rounded-none focus:outline-none focus:border-gray-400 transition-colors duration-200"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </motion.div>

                {/* Mobile Navigation */}
                <nav className="space-y-3">
                  {categories.map((item:any, index) => (
                    <motion.a
                      key={item._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`/category/${item.slug.current}`}
                      className="block text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 tracking-wide"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="flex space-x-4 pt-4 border-t border-gray-100"
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" className="p-2">
                      <User className="h-5 w-5 text-gray-600" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
