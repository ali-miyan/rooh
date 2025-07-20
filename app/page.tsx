import HeroSlider from "@/app/_components/hero-slider";
import AboutSection from "@/app/_components/about-section";
import FeaturedProducts from "@/app/_components/featured-products";
import TrendingAbayas from "@/app/_components/category-showcase";
import TestimonialCarousel from "./_components/client-slider";
import AbayaFAQ from "./_components/faq";
import { getCategories, getProductsWithCount } from "@/lib/queries";

export default async function HomePage() {
  const categories = await getCategories();
  
  const products = await getProductsWithCount(12)

  return (
    <div className="min-h-screen bg-white">
      <HeroSlider />
      <AboutSection />
      <FeaturedProducts categories={categories} />
      <TrendingAbayas products={products as any} />
      <TestimonialCarousel />
      <AbayaFAQ />
    </div>
  );
}
