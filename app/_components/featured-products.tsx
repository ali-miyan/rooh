"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/sanity";
import { urlFor } from "@/lib/client";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
  className?: string;
  isMainCategory?: boolean;
  index: number;
}

function CategoryCard({
  category,
  className,
  isMainCategory = false,
  index,
}: CategoryCardProps) {
  const imageUrl = category.image
    ? urlFor(category.image).url()
    : "/placeholder.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-300",
        "bg-white shadow-sm hover:shadow-lg",
        className
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          isMainCategory ? "aspect-[4/5]" : "aspect-[4/4]"
        )}
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={category.image.asset._type}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:bg-black/10" />
      </div>
      {/* Title Section */}
      <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-white">
        <h3
          className={cn(
            "font-medium text-center tracking-[0.1em] transition-colors duration-300",
            "text-neutral-800 group-hover:theme-text-primary",
            isMainCategory ? "text-base" : "text-sm"
          )}
        >
          {category.name}
        </h3>
      </motion.div>
    </motion.div>
  );
}

export default function FashionCategoryGridExact({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="w-full py-16 px-4 bg-neutral-50">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Fashion Categories",
            description:
              "Browse our collection of fashion categories featuring premium clothing and accessories",
            numberOfItems: categories.length,
            itemListElement: categories.map((category, index) => ({
              "@type": "Thing",
              position: index + 1,
              name: category.name,
              image: category.image
                ? urlFor(category.image).url()
                : "/placeholder.svg",
              url: `#${category.name.toLowerCase().replace(/\s+/g, "-")}`,
            })),
          }),
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Top Row - 3 main categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          {categories.slice(0, 3).map((category, index) => (
            <Link key={index} href={`/category/${category.slug.current}`}>
              <CategoryCard
                key={category._id}
                category={category}
                isMainCategory={true}
                className="rounded-none"
                index={index}
              />
            </Link>
          ))}
        </motion.div>
        {/* Bottom Row - 3 additional categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {categories.slice(3, 6).map((category, index) => (
            <CategoryCard
              key={category._id}
              category={category}
              isMainCategory={false}
              className="rounded-none"
              index={index + 3}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
