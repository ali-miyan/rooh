"use client"

import { useState } from "react"
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import TopBar from "../../components/top-bar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = ["NEW ARRIVALS", "ABAYAS", "THOBES", "KIDS", "HIJABS", "ACCESSORIES", "GIFTS", "TV"]

  return (
    <header className="w-full">
      <TopBar />

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl lg:text-3xl font-light tracking-[0.2em] text-gray-900">ROOH</h1>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-200 rounded-none focus:outline-none focus:border-gray-400"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden lg:flex p-2">
                <Heart className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="hidden lg:flex p-2">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-center space-x-8 py-4">
              {navigationItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 tracking-wide"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-200 rounded-none focus:outline-none focus:border-gray-400"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-3">
                {navigationItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 tracking-wide"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* Mobile Icons */}
              <div className="flex space-x-4 pt-4 border-t border-gray-100">
                <Button variant="ghost" size="sm" className="p-2">
                  <Heart className="h-5 w-5 text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <User className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
