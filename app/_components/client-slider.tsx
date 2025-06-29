"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  title: string
  content: string
  author: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    title: "PERFECT FIT",
    content:
      "The quality is exceptional and the fit is perfect. I've received so many compliments wearing this abaya. Highly recommend!",
    author: "SARAH",
    rating: 5,
  },
  {
    id: "2",
    title: "AWESOME",
    content:
      "I love it I feel so beautiful and pure in it. I use it for prayer everyday. Very good quality. Thank you so much.",
    author: "JOLANDA",
    rating: 5,
  },
  {
    id: "3",
    title: "BEAUTIFUL DESIGN",
    content:
      "The embroidery work is stunning and the fabric feels luxurious. This has become my favorite piece in my wardrobe.",
    author: "AMINA",
    rating: 5,
  },
  {
    id: "4",
    title: "EXCELLENT SERVICE",
    content:
      "Fast delivery and amazing customer service. The abaya exceeded my expectations in every way. Will definitely order again.",
    author: "FATIMA",
    rating: 5,
  },
  {
    id: "5",
    title: "HIGHLY RECOMMENDED",
    content:
      "The attention to detail is remarkable. The quality of the fabric and the craftsmanship is outstanding. Worth every penny!",
    author: "KHADIJA",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            "w-5 h-5",
            index < rating ? "fill-secondary-400 text-secondary-400" : "fill-neutral-200 text-white",
          )}
        />
      ))}
    </div>
  )
}

function DecorativePattern({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "absolute top-0 bottom-0 w-64 pointer-events-none opacity-30",
        side === "left" ? "left-0" : "right-0",
      )}
    >
      <svg viewBox="0 0 200 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {side === "left" ? (
          <>
            <path
              d="M0 50C50 50 100 100 100 150C100 200 50 250 0 250"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M20 80C70 80 120 130 120 180C120 230 70 280 20 280"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M40 110C90 110 140 160 140 210C140 260 90 310 40 310"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
          </>
        ) : (
          <>
            <path
              d="M200 50C150 50 100 100 100 150C100 200 150 250 200 250"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M180 80C130 80 80 130 80 180C80 230 130 280 180 280"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M160 110C110 110 60 160 60 210C60 260 110 310 160 310"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
          </>
        )}
      </svg>
    </div>
  )
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1) // Start at index 1 to match "2 / 5"

  const currentTestimonial = testimonials[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="relative w-full py-20 px-4 theme-primary overflow-hidden">
      {/* Decorative Patterns */}
      <DecorativePattern side="left" />
      <DecorativePattern side="right" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Testimonial Content */}
        <div className="text-center space-y-8">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-medium text-white tracking-[0.1em] uppercase">
            {currentTestimonial.title}
          </h2>

          {/* Testimonial Text */}
          <div className="max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-white leading-relaxed">{currentTestimonial.content}</p>
          </div>

          {/* Author */}
          <div className="space-y-4">
            <p className="text-sm md:text-base font-medium text-white tracking-[0.15em] uppercase">
              {currentTestimonial.author}
            </p>

            {/* Star Rating */}
            <StarRating rating={currentTestimonial.rating} />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-16">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full hover:bg-white/50 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <span className="text-sm text-white font-medium">
            {currentIndex + 1} / {testimonials.length}
          </span>

          <button
            onClick={goToNext}
            className="p-2 rounded-full hover:bg-white/50 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}
