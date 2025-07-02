"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"

// Dummy product data with more images to demonstrate scrolling
const productData = {
  id: 1,
  name: "ABAYA WITH FRILL DETAILED KHIMAR SET - BLACK",
  price: 102.0,
  colors: [
    { name: "Black", value: "black", hex: "#000000" },
    { name: "Beige", value: "beige", hex: "#F5F5DC" },
  ],
  lengths: ["52", "54", "56", "58", "60", "62"],
  images: [
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600", // 9 images (odd number) to demonstrate the layout
  ],
  description: `This elegant abaya with frill detailed khimar set is perfect for any occasion. Made from high-quality fabric with beautiful frill detailing, this set combines modesty with style.

Features:
• Premium quality fabric
• Frill detailed khimar included
• Comfortable loose fit
• Available in multiple lengths
• Easy care instructions

Perfect for daily wear, special occasions, or prayer time. The flowing design ensures comfort while maintaining an elegant silhouette.`,
  deliveryInfo: `FREE UK SHIPPING OVER £150

Standard Delivery (3-5 working days): £4.99
Express Delivery (1-2 working days): £9.99
Next Day Delivery: £14.99

International shipping available.

RETURNS
30-day return policy
Items must be unworn and in original condition
Return shipping costs apply unless item is faulty`,
}

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedLength, setSelectedLength] = useState("52")
  const [quantity, setQuantity] = useState(1)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})
  const [showNextSections, setShowNextSections] = useState(false)
  const [isRightSectionSticky, setIsRightSectionSticky] = useState(true)
  const imagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (imagesEndRef.current) {
        const rect = imagesEndRef.current.getBoundingClientRect()
        const hasScrolledPastImages = rect.top <= window.innerHeight

        setShowNextSections(hasScrolledPastImages)
        setIsRightSectionSticky(!hasScrolledPastImages)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const updateQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

  // Group images into rows of 2
  const imageRows = []
  for (let i = 0; i < productData.images.length; i += 2) {
    imageRows.push(productData.images.slice(i, i + 2))
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
          <span>Back in Stock</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-800">Abaya with Frill Detailed Khimar Set - Black</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images - Left Side */}
          <div className="space-y-6">
            {imageRows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 gap-4">
                {row.map((image, imageIndex) => {
                  const globalIndex = rowIndex * 2 + imageIndex
                  return (
                    <div key={globalIndex} className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${productData.name} - View ${globalIndex + 1}`}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )
                })}
                {/* If this is the last row and has only 1 image, add empty space */}
                {row.length === 1 && <div className="w-full aspect-[3/4] bg-transparent"></div>}
              </div>
            ))}
            {/* Invisible marker to detect when images end */}
            <div ref={imagesEndRef} className="h-1" />
          </div>

          {/* Product Details - Right Side */}
          <div className={`${isRightSectionSticky ? "lg:sticky lg:top-4 lg:h-fit" : ""} transition-all duration-300`}>
            <div className="space-y-6">
              {/* Product Title and Price */}
              <div>
                <h1 className="text-2xl font-custom-bold text-neutral-800 mb-4 tracking-wide">{productData.name}</h1>
                <div className="text-2xl font-medium text-neutral-800">£{productData.price.toFixed(2)}</div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium text-neutral-800 mb-3">
                  Colour: {productData.colors.find((c) => c.value === selectedColor)?.name}
                </h3>
                <div className="flex gap-3">
                  {productData.colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.value
                          ? "border-neutral-800 ring-2 ring-neutral-300"
                          : "border-neutral-300 hover:border-neutral-400"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Length Selection */}
              <div>
                <h3 className="text-sm font-medium text-neutral-800 mb-3">Length (Inches)</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.lengths.map((length) => (
                    <button
                      key={length}
                      onClick={() => setSelectedLength(length)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        selectedLength === length
                          ? "bg-neutral-800 text-white border-neutral-800"
                          : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                      }`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
                <button className="text-sm text-neutral-600 underline mt-2 hover:text-neutral-800 transition-colors">
                  📏 Size Guide
                </button>
              </div>

              {/* Quantity and Add to Bag */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-neutral-300">
                    <button
                      onClick={() => updateQuantity(-1)}
                      className="p-2 hover:bg-neutral-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                    <button onClick={() => updateQuantity(1)} className="p-2 hover:bg-neutral-50 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button className="w-full bg-neutral-800 text-white py-3 px-6 font-medium tracking-wide hover:bg-neutral-900 transition-colors">
                  ADD TO BAG
                </button>

                {/* Payment Info */}
                <div className="text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-medium">clearpay</span>
                    <span>Pay in 4 interest-free instalments of £25.50.</span>
                    <button className="underline hover:no-underline">Learn more</button>
                  </div>
                </div>
              </div>

              {/* Expandable Sections */}
              <div className="space-y-4 pt-6">
                {/* Product Description */}
                <div className="border-t border-neutral-200 pt-4">
                  <button
                    onClick={() => toggleSection("description")}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-sm font-medium text-neutral-800 tracking-wide">PRODUCT DESCRIPTION</h3>
                    <Plus
                      className={`w-4 h-4 transition-transform ${expandedSections.description ? "rotate-45" : ""}`}
                    />
                  </button>
                  {expandedSections.description && (
                    <div className="mt-4 text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                      {productData.description}
                    </div>
                  )}
                </div>

                {/* Delivery & Returns */}
                <div className="border-t border-neutral-200 pt-4">
                  <button
                    onClick={() => toggleSection("delivery")}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-sm font-medium text-neutral-800 tracking-wide">DELIVERY & RETURNS</h3>
                    <Plus className={`w-4 h-4 transition-transform ${expandedSections.delivery ? "rotate-45" : ""}`} />
                  </button>
                  {expandedSections.delivery && (
                    <div className="mt-4 text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                      {productData.deliveryInfo}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Sections - Only show after all images are scrolled */}
      <div
        className={`transition-all duration-500 ${
          showNextSections ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="border-t border-neutral-200 pt-16">
            {/* Reviews Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-custom-bold text-neutral-800 mb-8">Customer Reviews</h2>
              <div className="bg-neutral-50 p-8 text-center">
                <p className="text-neutral-600">No reviews yet. Be the first to review this product!</p>
                <button className="mt-4 bg-neutral-800 text-white px-6 py-2 text-sm hover:bg-neutral-900 transition-colors">
                  Write a Review
                </button>
              </div>
            </div>

            {/* Related Products */}
            <div>
              <h2 className="text-2xl font-custom-bold text-neutral-800 mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="group cursor-pointer">
                    <div className="aspect-[3/4] bg-neutral-100 mb-4 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=600&width=450"
                        alt={`Related Product ${item}`}
                        width={450}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-neutral-800">
                        £{(Math.random() * 200 + 50).toFixed(2)}
                      </div>
                      <h3 className="text-sm text-neutral-700">Premium Abaya Set - Style {item}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
