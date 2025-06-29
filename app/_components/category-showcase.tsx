"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorOption {
  name: string
  value: string
  available: boolean
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  colors: ColorOption[]
  isWishlisted?: boolean
}

const products: Product[] = [
  {
    id: "1",
    name: "Luxury Three Piece Embellished Cuff Organza Abaya Set - Nude",
    price: 14400.0,
    image: "/placeholder.svg?height=600&width=400",
    colors: [
      { name: "Nude", value: "#F5E6D3", available: true },
      { name: "Pink", value: "#F4C2C2", available: true },
      { name: "Lavender", value: "#E6E6FA", available: true },
      { name: "Brown", value: "#8B4513", available: true },
    ],
    isWishlisted: false,
  },
  {
    id: "2",
    name: "Premium Three Piece Abaya Set with Balloon Sleeves - Smoky Mahogany",
    price: 12000.0,
    image: "/placeholder.svg?height=600&width=400",
    colors: [{ name: "Mahogany", value: "#8B4513", available: true }],
    isWishlisted: false,
  },
  {
    id: "3",
    name: "Premium Classic Open Abaya with Pleated Cuff Detailing - Blushed Mink",
    price: 8800.0,
    image: "/placeholder.svg?height=600&width=400",
    colors: [
      { name: "Mink", value: "#D2B48C", available: true },
      { name: "Pink", value: "#F4C2C2", available: true },
      { name: "Navy", value: "#1e3a8a", available: true },
      { name: "Black", value: "#000000", available: true },
    ],
    isWishlisted: false,
  },
  {
    id: "4",
    name: "Luxury Textured Open Abaya with Tulle Lace Detailing - Navy",
    price: 14400.0,
    image: "/placeholder.svg?height=600&width=400",
    colors: [
      { name: "Navy", value: "#1e3a8a", available: true },
      { name: "Beige", value: "#F5F5DC", available: true },
      { name: "Cream", value: "#FFFDD0", available: true },
    ],
    isWishlisted: false,
  },
]

interface ProductCardProps {
  product: Product
  onWishlistToggle: (productId: string) => void
}

function ProductCard({ product, onWishlistToggle }: ProductCardProps) {
  return (
    <div className="group relative bg-white">
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
        />

        {/* Wishlist Button */}
        <button
          onClick={() => onWishlistToggle(product.id)}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200 shadow-sm"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              product.isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-600 hover:text-red-500",
            )}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="pt-4 space-y-3">
        {/* Price */}
        <div className="text-lg font-medium text-neutral-900">
          Rs. {product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </div>

        {/* Product Name */}
        <h3 className="text-sm text-neutral-700 leading-relaxed line-clamp-2">{product.name}</h3>

        {/* Color Options */}
        <div className="flex items-center gap-2">
          {product.colors.map((color, index) => (
            <button
              key={index}
              className={cn(
                "w-6 h-6 rounded-full border-2 border-neutral-200 transition-all duration-200",
                "hover:border-neutral-400 hover:scale-110",
                index === 0 && "ring-2 ring-neutral-400 ring-offset-1",
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}

          {/* Plus Button */}
          <button className="w-6 h-6 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-neutral-400 transition-colors duration-200">
            <Plus className="w-3 h-3 text-neutral-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5 text-neutral-600" />
      </button>

      <span className="text-sm text-neutral-600 font-medium">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronRight className="w-5 h-5 text-neutral-600" />
      </button>
    </div>
  )
}

export default function TrendingAbayas() {
  const [currentPage, setCurrentPage] = useState(1)
  const [productList, setProductList] = useState(products)
  const totalPages = 5 // As shown in the image

  const handleWishlistToggle = (productId: string) => {
    setProductList((prev) =>
      prev.map((product) => (product.id === productId ? { ...product, isWishlisted: !product.isWishlisted } : product)),
    )
  }

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-medium text-neutral-800 tracking-[0.1em] uppercase">Trending Abayas</h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} onWishlistToggle={handleWishlistToggle} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </section>
  )
}
