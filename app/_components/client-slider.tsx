"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
      "Alhamdulillah recieved the best…Abaya fits so well.. So happy to buy this from Rooh.",
    author: "MARYAM",
    rating: 5,
  },
  {
    id: "2",
    title: "AWESOME",
    content:
      "No words to explain, it was more than i expected, Especially the material and the designs, design looks so gorgeos.",
    author: "SANA",
    rating: 5,
  },
  {
    id: "3",
    title: "BEAUTIFUL DESIGN",
    content:
      "No words to explain, it was more than i expected, Especially the material and the designs, design looks so gorgeos.",
    author: "MINHA",
    rating: 5,
  },
  {
    id: "4",
    title: "EXCELLENT SERVICE",
    content:
      "No words to explain, it was more than i expected, Especially the material and the designs, design looks so gorgeos.",
    author: "FATIMA",
    rating: 5,
  },
  {
    id: "5",
    title: "HIGHLY RECOMMENDED",
    content:
      "No words to explain, it was more than i expected, Especially the material and the designs, design looks so gorgeos.",
    author: "HUDHA",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Star
            className={cn(
              "w-5 h-5",
              index < rating ? "fill-secondary-400 text-secondary-400" : "fill-neutral-200 text-white",
            )}
          />
        </motion.div>
      ))}
    </div>
  )
}

function DecorativePattern({ side }: { side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      animate={{ opacity: 0.3, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={cn("absolute top-0 bottom-0 w-64 pointer-events-none", side === "left" ? "left-0" : "right-0")}
    >
      <svg viewBox="0 0 200 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {side === "left" ? (
          <>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
              d="M0 50C50 50 100 100 100 150C100 200 50 250 0 250"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.2 }}
              d="M20 80C70 80 120 130 120 180C120 230 70 280 20 280"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.4 }}
              d="M40 110C90 110 140 160 140 210C140 260 90 310 40 310"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
          </>
        ) : (
          <>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
              d="M200 50C150 50 100 100 100 150C100 200 150 250 200 250"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.2 }}
              d="M180 80C130 80 80 130 80 180C80 230 130 280 180 280"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.4 }}
              d="M160 110C110 110 60 160 60 210C60 260 110 310 160 310"
              stroke="var(--color-secondary-400)"
              strokeWidth="2"
              fill="none"
            />
          </>
        )}
      </svg>
    </motion.div>
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
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Customer Testimonials",
            description: "Customer reviews and testimonials for our abaya collection",
            numberOfItems: testimonials.length,
            itemListElement: testimonials.map((testimonial, index) => ({
              "@type": "Review",
              position: index + 1,
              reviewRating: {
                "@type": "Rating",
                ratingValue: testimonial.rating,
                bestRating: 5,
              },
              author: {
                "@type": "Person",
                name: testimonial.author,
              },
              reviewBody: testimonial.content,
              name: testimonial.title,
            })),
          }),
        }}
      />

      {/* Decorative Patterns */}
      <DecorativePattern side="left" />
      <DecorativePattern side="right" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Testimonial Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl font-medium text-white tracking-[0.1em] uppercase"
            >
              {currentTestimonial.title}
            </motion.h2>

            {/* Testimonial Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-base md:text-lg text-white leading-relaxed">{currentTestimonial.content}</p>
            </motion.div>

            {/* Author */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-sm md:text-base font-medium text-white tracking-[0.15em] uppercase">
                {currentTestimonial.author}
              </p>
              {/* Star Rating */}
              <StarRating rating={currentTestimonial.rating} />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-8 mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPrevious}
            className="p-2 rounded-full hover:bg-white/50 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          <motion.span
            key={currentIndex}
            initial={{ scale: 1.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-white font-medium"
          >
            {currentIndex + 1} / {testimonials.length}
          </motion.span>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNext}
            className="p-2 rounded-full hover:bg-white/50 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </motion.div>

        {/* Testimonial Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60",
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
