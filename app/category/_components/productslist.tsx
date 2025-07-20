"use client"

import { useState } from "react"
import { Heart, ChevronDown } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/types/sanity"
import { urlFor } from "@/lib/client"
import Link from "next/link"

const filterOptions = {
  collection: ["All Collections", "Occasion", "Everyday", "Premium", "Limited Edition"],
  productType: ["All Types", "Open Abaya", "Closed Abaya", "Abaya Set", "Kimono Style"],
  material: ["All Materials", "Crepe", "Chiffon", "Silk", "Cotton", "Polyester", "Linen"],
  size: ["All Sizes", "XS", "S", "M", "L", "XL", "XXL"],
  colour: ["All Colours", "Black", "White", "Grey", "Brown", "Green", "Blue", "Pink", "Beige"],
  price: ["All Prices", "Under ₹100", "₹100 - ₹150", "₹150 - ₹200", "Over ₹200"],
  stock: ["All Stock", "In Stock", "Low Stock", "Pre-Order"],
  length: ["All Lengths", "50-52 inches", "54-56 inches", "58-60 inches", "62+ inches"],
}

const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Newest First", "Best Selling"]

export default function OccasionAbayasPage({ products }: any) {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [filters, setFilters] = useState({
    collection: "All Collections",
    productType: "All Types",
    material: "All Materials",
    size: "All Sizes",
    colour: "All Colours",
    price: "All Prices",
    stock: "All Stock",
    length: "All Lengths",
  })
  const [sortBy, setSortBy] = useState("Recommended")

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  // Filter and sort products
  const filteredAndSortedProducts = products
    ?.filter((product: any) => {
      // Apply price filter
      if (filters.price !== "All Prices") {
        const price = product.price
        switch (filters.price) {
          case "Under ₹100":
            if (price >= 100) return false
            break
          case "₹100 - ₹150":
            if (price < 100 || price > 150) return false
            break
          case "₹150 - ₹200":
            if (price < 150 || price > 200) return false
            break
          case "Over ₹200":
            if (price <= 200) return false
            break
        }
      }
      // Apply stock filter
      if (filters.stock !== "All Stock") {
        switch (filters.stock) {
          case "In Stock":
            if (!product.inStock) return false
            break
          case "Low Stock":
            if (!product.inStock || (product.stockQuantity && product.stockQuantity > 10)) return false
            break
          case "Pre-Order":
            if (product.inStock) return false
            break
        }
      }
      return true
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "Price: Low to High":
          return a.price - b.price
        case "Price: High to Low":
          return b.price - a.price
        case "Newest First":
          return new Date(b._id).getTime() - new Date(a._id).getTime()
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-white font-custom">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Occasion Abayas Collection",
            description:
              "Stunning collection of occasion abayas perfect for weddings, parties, and special events. Features intricate embellishments, luxurious fabrics, and flattering silhouettes.",
            url: "/occasion-abayas",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: filteredAndSortedProducts?.length || 0,
              itemListElement: filteredAndSortedProducts?.map((product: any, index: number) => ({
                "@type": "Product",
                position: index + 1,
                name: product.name,
                offers: {
                  "@type": "Offer",
                  price: product.price,
                  priceCurrency: "INR",
                  availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                },
                image: product.images?.[0] ? urlFor(product.images[0]).url() : "/placeholder.svg",
                url: `/products/${product.slug.current}`,
              })),
            },
          }),
        }}
      />

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-4"
      >
        <nav className="text-sm text-neutral-600">
          <span>Abayas</span>
          <span className="mx-2">/</span>
          <span>Abayas</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-800">Occasion</span>
        </nav>
      </motion.div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-custom-bold tracking-wider text-neutral-800 mb-2">OCCASION ABAYAS</h1>
          <p className="text-sm text-neutral-600 mb-4">({filteredAndSortedProducts?.length || 0} PRODUCTS)</p>
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-neutral-700 leading-relaxed">
              If you're in need of a show-stopping outfit for a special occasion, you're in the right place. At
              AbayaButh, we have a stunning collection of occasion abayas that are perfect for weddings, parties, and
              other special events. Our occasion abayas are designed to make you feel confident and elegant, with
              intricate embellishments, luxurious fabrics, and flattering silhouettes.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-neutral-200">
          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {Object.entries(filterOptions).map(([key, options], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <FilterDropdown
                  label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                  options={options}
                  value={filters[key as keyof typeof filters]}
                  onChange={(value) => setFilters((prev) => ({ ...prev, [key]: value }))}
                />
              </motion.div>
            ))}
          </div>
          {/* Sort Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="ml-auto"
          >
            <FilterDropdown label="Recommended" options={sortOptions} value={sortBy} onChange={setSortBy} />
          </motion.div>
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${JSON.stringify(filters)}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredAndSortedProducts?.map((product: any, index: number) => (
              <ProductCard
                key={product._id}
                product={product}
                isWishlisted={wishlist.includes(product._id)}
                onToggleWishlist={() => toggleWishlist(product._id)}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Filter Dropdown Component
function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 border border-neutral-300 rounded hover:border-neutral-400 transition-colors min-w-[120px] justify-between"
      >
        <span className="truncate">
          {label === "Recommended" ? value : value === `All ${label}s` || value === `All ${label}` ? label : value}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-300 rounded shadow-lg z-20 max-h-60 overflow-y-auto"
            >
              {options.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, delay: index * 0.02 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    value === option ? "bg-neutral-100 text-neutral-900" : "text-neutral-700"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Product Card Component
function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  index,
}: {
  product: Product
  isWishlisted: boolean
  onToggleWishlist: () => void
  index: number
}) {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(450).height(600).url()
    : "/placeholder.svg?height=600&width=450"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/category/${product.category.slug.current}/products/${product.slug.current}`} className="group cursor-pointer">
        {/* Product Image */}
        <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-neutral-100">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              onToggleWishlist()
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-400 hover:text-red-500"
              } transition-colors`}
            />
          </motion.button>
        </div>
        {/* Product Info */}
        <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
          <div className="text-sm font-medium text-neutral-800">₹{product.price.toFixed(2)}</div>
          <h3 className="text-sm text-neutral-700 leading-relaxed line-clamp-2">{product.name}</h3>
        </motion.div>
      </Link>
    </motion.div>
  )
}
