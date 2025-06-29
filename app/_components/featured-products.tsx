"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface CategoryItem {
  id: string
  title: string
  image: string
  alt: string
  href?: string
}

const categories: CategoryItem[] = [
  {
    id: "occasion-abayas",
    title: "OCCASION ABAYAS",
    image: "/placeholder.svg?height=600&width=500",
    alt: "Two women wearing elegant silver embellished occasion abayas",
    href: "/categories/occasion-abayas",
  },
  {
    id: "hajj-umrah",
    title: "HAJJ/UMRAH CLOTHING",
    image: "/placeholder.svg?height=600&width=500",
    alt: "Woman in mauve abaya in prayer pose for Hajj/Umrah",
    href: "/categories/hajj-umrah",
  },
  {
    id: "essential-abayas",
    title: "ESSENTIAL ABAYAS",
    image: "/placeholder.svg?height=600&width=500",
    alt: "Two women wearing neutral colored essential abayas",
    href: "/categories/essential-abayas",
  },
  {
    id: "modest-wear",
    title: "MODEST WEAR",
    image: "/placeholder.svg?height=500&width=500",
    alt: "Collection of modest wear clothing",
    href: "/categories/modest-wear",
  },
  {
    id: "accessories",
    title: "ACCESSORIES",
    image: "/placeholder.svg?height=500&width=500",
    alt: "Modest fashion accessories collection",
    href: "/categories/accessories",
  },
  {
    id: "new-arrivals",
    title: "NEW ARRIVALS",
    image: "/placeholder.svg?height=500&width=500",
    alt: "Latest collection of modest fashion",
    href: "/categories/new-arrivals",
  },
]

interface CategoryCardProps {
  category: CategoryItem
  className?: string
  isMainCategory?: boolean
}

function CategoryCard({ category, className, isMainCategory = false }: CategoryCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-300",
        "bg-white shadow-sm hover:shadow-lg",
        className,
      )}
    >
      {/* Image Container */}
      <div className={cn("relative w-full overflow-hidden", isMainCategory ? "aspect-[4/5]" : "aspect-[4/4]")}>
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:bg-black/10" />
      </div>

      {/* Title Section */}
      <div className="p-6 bg-white">
        <h3
          className={cn(
            "font-medium text-center tracking-[0.1em] transition-colors duration-300",
            "text-neutral-800 group-hover:theme-text-primary",
            isMainCategory ? "text-base" : "text-sm",
          )}
        >
          {category.title}
        </h3>
      </div>
    </div>
  )
}

export default function FashionCategoryGridExact() {
  return (
    <section className="w-full py-16 px-4 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Row - 3 main categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {categories.slice(0, 3).map((category) => (
            <CategoryCard key={category.id} category={category} isMainCategory={true} className="rounded-none" />
          ))}
        </div>

        {/* Bottom Row - 3 additional categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.slice(3, 6).map((category) => (
            <CategoryCard key={category.id} category={category} isMainCategory={false} className="rounded-none" />
          ))}
        </div>
      </div>
    </section>
  )
}
