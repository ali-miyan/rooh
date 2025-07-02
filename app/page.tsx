import Header from "@/app/_components/header"
import HeroSlider from "@/app/_components/hero-slider"
import AboutSection from "@/app/_components/about-section"
import FeaturedProducts from "@/app/_components/featured-products"
import CategoryShowcase from "@/app/_components/category-showcase"
import Features from "@/app/_components/features"
import Newsletter from "@/app/_components/newsletter"
import Footer from "@/app/_components/footer"
import TestimonialCarousel from "./_components/client-slider"
import AbayaFAQ from "./_components/faq"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSlider />
      <AboutSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <TestimonialCarousel />
      <AbayaFAQ />
    </div>
  )
}
