import HeroSlider from "@/app/_components/hero-slider"
import AboutSection from "@/app/_components/about-section"
import FeaturedProducts from "@/app/_components/featured-products"
import TrendingAbayas from "@/app/_components/category-showcase"
import TestimonialCarousel from "./_components/client-slider"
import AbayaFAQ from "./_components/faq"
import { getActiveBanners, getCategories, getProductsWithCount } from "@/lib/queries"
import type { Metadata } from "next"

// Enable ISR with 10 second revalidation
export const revalidate = 10

export const metadata: Metadata = {
  title: "Rooh - Premium Luxury Abayas Collection",
  description:
    "Discover our premium collection of luxury abayas featuring contemporary designs and traditional elegance. Shop the finest quality abayas with modern style.",
  keywords: ["luxury abayas", "premium abayas", "contemporary abayas", "traditional elegance", "modest fashion"],
  openGraph: {
    title: "Rooh - Premium Luxury Abayas Collection",
    description:
      "Discover our premium collection of luxury abayas featuring contemporary designs and traditional elegance.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rooh - Premium Luxury Abayas Collection",
    description:
      "Discover our premium collection of luxury abayas featuring contemporary designs and traditional elegance.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function HomePage() {
  const categories = await getCategories()
  const products = await getProductsWithCount(12)
  const banners = await getActiveBanners()

  return (
    <div className="min-h-screen bg-white">
      <HeroSlider banners={banners} />
      <AboutSection />
      <FeaturedProducts categories={categories} />
      <TrendingAbayas products={products as any} />
      <TestimonialCarousel />
      <AbayaFAQ />
    </div>
  )
}
