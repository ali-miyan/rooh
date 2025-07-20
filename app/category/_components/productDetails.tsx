"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { PortableText } from "@portabletext/react"
import type { Product } from "@/types/sanity"
import { urlFor } from "@/lib/client"

interface ProductDetailPageProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedLength, setSelectedLength] = useState("52")
  const [quantity, setQuantity] = useState(1)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})
  const [showNextSections, setShowNextSections] = useState(false)
  const [isRightSectionSticky, setIsRightSectionSticky] = useState(true)
  const imagesEndRef = useRef<HTMLDivElement>(null)

  // Dummy data for colors and lengths (you can add these to your Sanity schema later)
  const colors = [
    { name: "Black", value: "black", hex: "#000000" },
    { name: "Beige", value: "beige", hex: "#F5F5DC" },
  ]

  const lengths = ["52", "54", "56", "58", "60", "62"]

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
    handleScroll()
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
  for (let i = 0; i < product.images.length; i += 2) {
    imageRows.push(product.images.slice(i, i + 2))
  }

  return (
    <div className="min-h-screen bg-white font-custom">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.images?.map((img) => urlFor(img).url()),
            brand: {
              "@type": "Brand",
              name: "AbayaButh",
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "GBP",
              availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              seller: {
                "@type": "Organization",
                name: "AbayaButh",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: "0",
            },
            category: product.category?.name,
            sku: product._id,
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
          <span>{product.category?.name}</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-800">{product.name}</span>
        </nav>
      </motion.div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {imageRows.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                {row.map((image, imageIndex) => {
                  const globalIndex = rowIndex * 2 + imageIndex
                  const imageUrl = urlFor(image).width(600).height(800).url()
                  return (
                    <motion.div
                      key={globalIndex}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden"
                    >
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`${product.name} - View ${globalIndex + 1}`}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  )
                })}
                {/* If this is the last row and has only 1 image, add empty space */}
                {row.length === 1 && <div className="w-full aspect-[3/4] bg-transparent"></div>}
              </motion.div>
            ))}
            {/* Invisible marker to detect when images end */}
            <div ref={imagesEndRef} className="h-1" />
          </motion.div>

          {/* Product Details - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${isRightSectionSticky ? "lg:sticky lg:top-4 lg:h-fit" : ""} transition-all duration-300`}
          >
            <div className="space-y-6">
              {/* Product Title and Price */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h1 className="text-2xl font-custom-bold text-neutral-800 mb-4 tracking-wide">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-medium text-neutral-800">£{product.price.toFixed(2)}</div>
                  {product.originalPrice && (
                    <div className="text-xl text-neutral-500 line-through">£{product.originalPrice.toFixed(2)}</div>
                  )}
                </div>
                {!product.inStock && <p className="text-red-600 font-medium mt-2">Out of Stock</p>}
              </motion.div>

              {/* Color Selection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-sm font-medium text-neutral-800 mb-3">
                  Colour: {colors.find((c) => c.value === selectedColor)?.name}
                </h3>
                <div className="flex gap-3">
                  {colors.map((color, index) => (
                    <motion.button
                      key={color.value}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
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
              </motion.div>

              {/* Length Selection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-sm font-medium text-neutral-800 mb-3">Length (Inches)</h3>
                <div className="flex flex-wrap gap-2">
                  {lengths.map((length, index) => (
                    <motion.button
                      key={length}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedLength(length)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        selectedLength === length
                          ? "bg-neutral-800 text-white border-neutral-800"
                          : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                      }`}
                    >
                      {length}
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="text-sm text-neutral-600 underline mt-2 hover:text-neutral-800 transition-colors"
                >
                  📏 Size Guide
                </motion.button>
              </motion.div>

              {/* Quantity and Add to Bag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-neutral-300">
                    <motion.button
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateQuantity(-1)}
                      className="p-2 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <motion.span
                      key={quantity}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 py-2 text-center min-w-[60px]"
                    >
                      {quantity}
                    </motion.span>
                    <motion.button
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateQuantity(1)}
                      className="p-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 font-medium tracking-wide transition-colors ${
                    product.inStock
                      ? "bg-neutral-800 text-white hover:bg-neutral-900"
                      : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  }`}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "ADD TO BAG" : "OUT OF STOCK"}
                </motion.button>
                {/* Payment Info */}
                {product.inStock && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-sm text-neutral-600"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-medium">clearpay</span>
                      <span>Pay in 4 interest-free instalments of £{(product.price / 4).toFixed(2)}.</span>
                      <motion.button whileHover={{ scale: 1.02 }} className="underline hover:no-underline">
                        Learn more
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Expandable Sections */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="space-y-4 pt-6"
              >
                {/* Product Description */}
                <div className="border-t border-neutral-200 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => toggleSection("description")}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-sm font-medium text-neutral-800 tracking-wide">PRODUCT DESCRIPTION</h3>
                    <motion.div
                      animate={{ rotate: expandedSections.description ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {expandedSections.description && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 text-sm text-neutral-700 leading-relaxed">
                          <PortableText value={product.description} />
                          {product.features && product.features.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">Features:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {product.features.map((feature, index) => (
                                  <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                  >
                                    {feature}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Delivery & Returns */}
                <div className="border-t border-neutral-200 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => toggleSection("delivery")}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-sm font-medium text-neutral-800 tracking-wide">DELIVERY & RETURNS</h3>
                    <motion.div animate={{ rotate: expandedSections.delivery ? 45 : 0 }} transition={{ duration: 0.2 }}>
                      <Plus className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {expandedSections.delivery && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {`FREE UK SHIPPING OVER £150

Standard Delivery (3-5 working days): £4.99
Express Delivery (1-2 working days): £9.99
Next Day Delivery: £14.99

International shipping available.

RETURNS
30-day return policy
Items must be unworn and in original condition
Return shipping costs apply unless item is faulty`}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Next Sections - Only show after all images are scrolled */}
      <AnimatePresence>
        {showNextSections && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 py-16"
          >
            <div className="border-t border-neutral-200 pt-16">
              {/* Reviews Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-custom-bold text-neutral-800 mb-8">Customer Reviews</h2>
                <div className="bg-neutral-50 p-8 text-center">
                  <p className="text-neutral-600">No reviews yet. Be the first to review this product!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-neutral-800 text-white px-6 py-2 text-sm hover:bg-neutral-900 transition-colors"
                  >
                    Write a Review
                  </motion.button>
                </div>
              </motion.div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-custom-bold text-neutral-800 mb-8">You May Also Like</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((relatedProduct, index) => {
                      const imageUrl = relatedProduct.images?.[0]
                        ? urlFor(relatedProduct.images[0]).width(450).height(600).url()
                        : "/placeholder.svg"
                      return (
                        <motion.div
                          key={relatedProduct._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          whileHover={{ y: -5 }}
                          className="group cursor-pointer"
                        >
                          <div className="aspect-[3/4] bg-neutral-100 mb-4 overflow-hidden">
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={relatedProduct.name}
                              width={450}
                              height={600}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                            <div className="text-sm font-medium text-neutral-800">
                              £{relatedProduct.price.toFixed(2)}
                            </div>
                            <h3 className="text-sm text-neutral-700">{relatedProduct.name}</h3>
                          </motion.div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
