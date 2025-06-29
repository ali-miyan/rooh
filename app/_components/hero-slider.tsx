"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "TIMELESS ELEGANCE",
      subtitle: "For Your Perfect Day",
      image: "/placeholder.svg?height=700&width=1200&text=Elegant+Woman+in+White+Abaya",
      buttonText: "SHOP NOW",
    },
    {
      id: 2,
      title: "MODERN MODEST",
      subtitle: "Contemporary Designs",
      image: "/placeholder.svg?height=700&width=1200&text=Modern+Abaya+Collection",
      buttonText: "EXPLORE",
    },
    {
      id: 3,
      title: "LUXURY COLLECTION",
      subtitle: "Premium Quality",
      image: "/placeholder.svg?height=700&width=1200&text=Luxury+Modest+Fashion",
      buttonText: "DISCOVER",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-100">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full flex items-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-[0.1em]">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8 font-light">{slide.subtitle}</p>
                  <Button
                    className="theme-secondary theme-hover-secondary text-gray-900 px-8 py-3 text-sm font-medium tracking-wide transition-colors duration-200"
                    size="lg"
                  >
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 p-2 z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 p-2 z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? "theme-secondary" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
