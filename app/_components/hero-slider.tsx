"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { urlFor } from "@/lib/client"

interface BannerImage {
  asset: {
    _id: string
    url: string
    metadata: {
      dimensions: {
        width: number
        height: number
      }
    }
  }
  hotspot?: {
    x: number
    y: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

interface BannerLink {
  url: string
  text: string
  openInNewTab: boolean
}

interface Banner {
  _id: string
  title: string
  subtitle?: string
  image: BannerImage
  link?: BannerLink
  displayOrder: number
  isActive: boolean
}

interface HeroSliderProps {
  banners: Banner[]
  autoPlayDuration?: number
  height?: string
}

export default function HeroSlider({ 
  banners, 
  autoPlayDuration = 5000,
  height = "h-[500px] md:h-[600px] lg:h-[700px]"
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Filter and sort active banners
  const activeBanners = banners
    .filter(banner => banner.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder)

  // If no banners, don't render anything
  if (!activeBanners.length) {
    return null
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeBanners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play functionality with pause on hover
  useEffect(() => {
    if (!isAutoPlaying || activeBanners.length <= 1) return

    const timer = setInterval(nextSlide, autoPlayDuration)
    return () => clearInterval(timer)
  }, [isAutoPlaying, autoPlayDuration, activeBanners.length])

  // Reset current slide if it exceeds banner count
  useEffect(() => {
    if (currentSlide >= activeBanners.length) {
      setCurrentSlide(0)
    }
  }, [activeBanners.length, currentSlide])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const handleButtonClick = (banner: Banner) => {
    if (banner.link?.url) {
      if (banner.link.openInNewTab) {
        window.open(banner.link.url, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = banner.link.url
      }
    }
  }

  const currentBanner = activeBanners[currentSlide]

  return (
    <div
      className={`relative ${height} overflow-hidden bg-gray-100`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Hero Collection Slider",
            description: "Featured banner collections",
            image: activeBanners.map((banner) => 
              urlFor(banner.image)?.width(1200).height(700).url() || ''
            ),
            mainEntity: activeBanners.map((banner, index) => ({
              "@type": "ImageObject",
              name: banner.title,
              description: banner.subtitle || banner.title,
              contentUrl: urlFor(banner.image)?.width(1200).height(700).url() || '',
              position: index + 1,
            })),
          }),
        }}
      />

      {/* Slides */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="relative h-full flex items-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={urlFor(currentBanner.image)?.width(1920).height(1080).url() || "/placeholder.svg"}
                    alt={currentBanner.title}
                    fill
                    className="object-cover"
                    priority={currentSlide === 0}
                    sizes="100vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-xl"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-[0.1em]"
                  >
                    {currentBanner.title}
                  </motion.h1>
                  
                  {currentBanner.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="text-lg md:text-xl text-white/90 mb-8 font-light"
                    >
                      {currentBanner.subtitle}
                    </motion.p>
                  )}
                  
                  {currentBanner.link && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      <Button
                        className="theme-secondary theme-hover-secondary text-gray-900 px-8 py-3 text-sm font-medium tracking-wide transition-all duration-200 hover:scale-105"
                        size="lg"
                        onClick={() => handleButtonClick(currentBanner)}
                      >
                        {currentBanner.link.text}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Only show if more than 1 banner */}
      {activeBanners.length > 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.2 }}>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 p-2 z-20 hover:bg-white/10 transition-all duration-200"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
              <ChevronLeft className="h-8 w-8" />
            </motion.div>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 p-2 z-20 hover:bg-white/10 transition-all duration-200"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="h-8 w-8" />
            </motion.div>
          </Button>
        </motion.div>
      )}

      {/* Dots Indicator - Only show if more than 1 banner */}
      {activeBanners.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20"
        >
          {activeBanners.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "theme-secondary scale-110" : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      )}

      {/* Progress Bar - Only show if more than 1 banner and auto-playing */}
      {activeBanners.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20"
        >
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: isAutoPlaying ? "100%" : "0%" }}
            transition={{ duration: autoPlayDuration / 1000, ease: "linear" }}
            className="h-full theme-secondary"
          />
        </motion.div>
      )}

      {/* Slide Counter - Only show if more than 1 banner */}
      {activeBanners.length > 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="absolute top-6 right-6 text-white/80 text-sm font-light z-20"
        >
          <motion.span
            key={currentSlide}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {String(currentSlide + 1).padStart(2, "0")} / {String(activeBanners.length).padStart(2, "0")}
          </motion.span>
        </motion.div>
      )}
    </div>
  )
}