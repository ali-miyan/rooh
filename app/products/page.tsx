"use client"

import { useState } from "react"
import { Heart, ChevronDown } from "lucide-react"
import Image from "next/image"

// Dummy product data
const products = [
  {
    id: 1,
    name: "Luxury Four Piece Embellished Open Abaya Set - Moonlit Whisper",
    price: 233.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 2,
    name: "Premium Dainty Rose Embellished Open Abaya - Sage Grey",
    price: 173.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 3,
    name: "Four Piece Embellished Cuff Open Abaya Set - Almond Brown",
    price: 110.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 4,
    name: "Premium Pleated Detailing Open Abaya - Olive Taupe",
    price: 130.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 5,
    name: "Elegant Lace Trim Open Abaya - Pearl White",
    price: 195.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 6,
    name: "Delicate Floral Embroidered Abaya - Dusty Rose",
    price: 158.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 7,
    name: "Premium Beaded Detail Open Abaya - Charcoal Grey",
    price: 210.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 8,
    name: "Sophisticated Pleated Sleeve Abaya - Navy Blue",
    price: 142.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 9,
    name: "Luxe Embellished Collar Abaya Set - Champagne Gold",
    price: 275.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 10,
    name: "Classic Minimalist Open Abaya - Stone Grey",
    price: 98.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 11,
    name: "Premium Silk Blend Embroidered Abaya - Burgundy",
    price: 189.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
  {
    id: 12,
    name: "Elegant Cuff Detail Open Abaya - Forest Green",
    price: 167.0,
    image: "/placeholder.svg?height=600&width=450",
    isWishlisted: false,
  },
]

const filterOptions = {
  collection: ["All Collections", "Occasion", "Everyday", "Premium", "Limited Edition"],
  productType: ["All Types", "Open Abaya", "Closed Abaya", "Abaya Set", "Kimono Style"],
  material: ["All Materials", "Crepe", "Chiffon", "Silk", "Cotton", "Polyester", "Linen"],
  size: ["All Sizes", "XS", "S", "M", "L", "XL", "XXL"],
  colour: ["All Colours", "Black", "White", "Grey", "Brown", "Green", "Blue", "Pink", "Beige"],
  price: ["All Prices", "Under £100", "£100 - £150", "£150 - £200", "Over £200"],
  stock: ["All Stock", "In Stock", "Low Stock", "Pre-Order"],
  length: ["All Lengths", "50-52 inches", "54-56 inches", "58-60 inches", "62+ inches"],
}

const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Newest First", "Best Selling"]

export default function OccasionAbayasPage() {
  const [wishlist, setWishlist] = useState<number[]>([])
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

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-white font-custom">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-neutral-600">
          <span>Abayas</span>
          <span className="mx-2">/</span>
          <span>Abayas</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-800">Occasion</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-custom-bold tracking-wider text-neutral-800 mb-2">OCCASION ABAYAS</h1>
          <p className="text-sm text-neutral-600 mb-4">(359 PRODUCTS)</p>
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-neutral-700 leading-relaxed">
              If you're in need of a show-stopping outfit for a special occasion, you're in the right place. At
              AbayaButh, we have a stunning collection of occasion abayas that are perfect for weddings, parties, and
              other special events. Our occasion abayas are designed to make you feel confident and elegant, with
              intricate embellishments, luxurious fabrics, and flattering silhouettes.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-neutral-200">
          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {Object.entries(filterOptions).map(([key, options]) => (
              <FilterDropdown
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                options={options}
                value={filters[key as keyof typeof filters]}
                onChange={(value) => setFilters((prev) => ({ ...prev, [key]: value }))}
              />
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="ml-auto">
            <FilterDropdown label="Recommended" options={sortOptions} value={sortBy} onChange={setSortBy} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
            />
          ))}
        </div>
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 border border-neutral-300 rounded hover:border-neutral-400 transition-colors min-w-[120px] justify-between"
      >
        <span className="truncate">
          {label === "Recommended" ? value : value === `All ${label}s` || value === `All ${label}` ? label : value}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-300 rounded shadow-lg z-20 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 transition-colors ${
                  value === option ? "bg-neutral-100 text-neutral-900" : "text-neutral-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Product Card Component
function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
}: {
  product: (typeof products)[0]
  isWishlisted: boolean
  onToggleWishlist: () => void
}) {
  return (
    <div className="group cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-neutral-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist Button */}
        <button
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
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-neutral-800">£{product.price.toFixed(2)}</div>
        <h3 className="text-sm text-neutral-700 leading-relaxed line-clamp-2">{product.name}</h3>
      </div>
    </div>
  )
}
