"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-16 theme-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">STAY IN TOUCH</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and styling tips.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 border-0 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <Button
              type="submit"
              className="theme-secondary theme-hover-secondary text-gray-900 px-8 py-3 font-medium tracking-wide"
            >
              SUBSCRIBE
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
