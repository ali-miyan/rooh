"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "../../components/top-bar";
import Image from "next/image";
import Link from "next/link";

// Define a type for combined search results
interface SearchSuggestion {
  id: string;
  name: string;
  slug: string;
  categoryName: string;
  type: "product" | "category";
}

export default function Header({
  categories,
}: {
  categories: any[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const response = await fetch('/api/products'); 
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const lowerQuery = query.toLowerCase();

      const filteredProducts = products
        .filter((product: any) =>
          product.name.toLowerCase().includes(lowerQuery)
        )
        .map((product: any) => ({
          id: product._id,
          name: product.name,
          slug: product.slug.current,
          categoryName: product.category.slug.current,
          type: "product",
        }));

      const filteredCategories = categories
        .filter((category: any) =>
          category.name.toLowerCase().includes(lowerQuery)
        )
        .map((category: any) => ({
          id: category._id,
          name: category.name,
          slug: category.slug.current,
          type: "category",
        }));

      setSearchResults([...(filteredProducts as any), ...filteredCategories]);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0 || searchResults.length > 0) {
      setShowSuggestions(true);
    }
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow click on suggestion links
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
    setIsSearchFocused(false);
  };

  // Helper function to highlight the search query within the text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) {
      return text;
    }

    const pre = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const post = text.substring(index + query.length);

    return (
      <>
        {pre}
        <span className=" text-gray-900 bg-yellow-300">{match}</span>
        {post}
      </>
    );
  };

  return (
    <header className="w-full">
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
                <Link href={"/"}>
                  <Image
                    src={"/ROOH LOGO.png"}
                    alt="rooh"
                    width={180}
                    height={180}
                  />
                </Link>
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
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  onChange={handleSearchChange}
                  value={searchQuery}
                  type="text"
                  placeholder="Search products or categories..."
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-200 rounded-none focus:outline-none focus:border-gray-400 transition-all duration-200"
                  disabled={isLoadingProducts}
                />
                <motion.div
                  animate={{ scale: isSearchFocused ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="h-4 w-4 -mt-2 text-gray-400" />
                </motion.div>

                <AnimatePresence>
                  {showSuggestions && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg mt-1 max-h-60 overflow-y-auto"
                    >
                      {searchResults.map((item) => (
                        <a
                          key={item.id}
                          href={
                            item.type === "product"
                              ? `/category/${item.categoryName}/products/${item.slug}`
                              : `/category/${item.slug}`
                          }
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                          // Prevent blur from hiding suggestions before click registers
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {highlightText(item.name, searchQuery)} ({item.type})
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            {/* Right Icons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex p-2"
                >
                  <Heart className="h-5 w-5 text-gray-600" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex p-2"
                >
                  <User className="h-5 w-5 text-gray-600" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="sm" className="p-2">
                  <ShoppingBag className="h-5 w-5 text-gray-600" />
                </Button>
              </motion.div>
              {/* Mobile Menu Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isMenuOpen ? "close" : "menu"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMenuOpen ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Menu className="h-5 w-5" />
                      )}
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
              <motion.a
                key={"ALL PRODUCTS"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 * 0.05 }}
                whileHover={{ y: -2, scale: 1.05 }}
                href={`/products`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 tracking-wide relative"
              >
                {"ALL PRODUCTS"}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
              {categories.map((item: any, index) => (
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
                    placeholder="Search products or categories..."
                    className="w-full px-4 py-2 pr-10 text-sm border border-gray-200 rounded-none focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    onChange={handleSearchChange}
                    value={searchQuery}
                    disabled={isLoadingProducts}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <AnimatePresence>
                    {showSuggestions && searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg mt-1 max-h-60 overflow-y-auto"
                      >
                        {searchResults.map((item) => (
                          <a
                            key={item.id}
                            href={
                              item.type === "product"
                                ? `/category/${item.categoryName}/products/${item.slug}`
                                : `/category/${item.slug}`
                            }
                            className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {highlightText(item.name, searchQuery)} ({item.type}
                            )
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                {/* Mobile Navigation */}
                <nav className="space-y-3">
                  {categories.map((item: any, index) => (
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
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="sm" className="p-2">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
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
  );
}
