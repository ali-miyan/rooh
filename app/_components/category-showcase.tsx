"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { urlFor } from "@/lib/client";

interface ColorOption {
  name: string;
  value: string;
  available: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  images: string;
  colors?: ColorOption[];
  isWishlisted?: boolean;
}

interface ProductCardProps {
  product: Product;
  onWishlistToggle: (productId: string) => void;
  index: number;
}

function ProductCard({ product, onWishlistToggle, index }: ProductCardProps) {
   const imageUrl = product.images[0]
      ? urlFor(product.images[0]).url()
      : "/placeholder.svg";
      
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white"
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
        />
        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onWishlistToggle(product.id)}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200 shadow-sm"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              product.isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-neutral-600 hover:text-red-500"
            )}
          />
        </motion.button>
      </div>
      {/* Product Info */}
      <div className="pt-4 space-y-3">
        {/* Price */}
        <div className="text-lg font-medium text-neutral-900">
          Rs.{" "}
          {product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </div>
        {/* Product Name */}
        <h3 className="text-sm text-neutral-700 leading-relaxed line-clamp-2">
          {product.name}
        </h3>
        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2">
            {product.colors.map((color, colorIndex) => (
              <motion.button
                key={colorIndex}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-6 h-6 rounded-full border-2 border-neutral-200 transition-all duration-200",
                  "hover:border-neutral-400",
                  colorIndex === 0 && "ring-2 ring-neutral-400 ring-offset-1"
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            {/* Plus Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-6 h-6 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-neutral-400 transition-colors duration-200"
            >
              <Plus className="w-3 h-3 text-neutral-500" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5 text-neutral-600" />
      </motion.button>
      <span className="text-sm text-neutral-600 font-medium">
        {currentPage} / {totalPages}
      </span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronRight className="w-5 h-5 text-neutral-600" />
      </motion.button>
    </div>
  );
}

export default function TrendingAbayas({ products }: { products: Product[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState(products || []);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  // Get current page products
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productList.slice(startIndex, endIndex);
  };

  const handleWishlistToggle = (productId: string) => {
    setProductList((prev: Product[]) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isWishlisted: !product.isWishlisted }
          : product
      )
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentProducts = getCurrentPageProducts();

  return (
    <section className="w-full py-16 px-4 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Trending Abayas Collection",
            description:
              "Premium collection of luxury abayas featuring contemporary designs and traditional elegance",
            numberOfItems: productList.length,
            itemListElement: productList.map(
              (product: Product, index: number) => ({
                "@type": "Product",
                position: index + 1,
                name: product.name,
                offers: {
                  "@type": "Offer",
                  price: product.price,
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                },
                image: product.images[0],
              })
            ),
          }),
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl font-medium text-neutral-800 tracking-[0.1em] uppercase">
            Trending Abayas
          </h1>
        </motion.div>
        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          >
            {currentProducts.map((product: Product, index: number) => (
              <Link key={index} href={`/category/${(product as any)?.category.slug.current}/products/${(product as any)?.slug?.current}`}>
                <ProductCard
                  key={product.id}
                  product={product}
                  onWishlistToggle={handleWishlistToggle}
                  index={index}
                />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}
