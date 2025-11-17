import { getCategories, getProducts } from "@/lib/queries";
import type { Metadata } from "next";
import OccasionAbayasPage from "../category/_components/productslist";

export const revalidate = 3600

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Products - Premium Collection | Rooh`,
    description: `Discover our exclusive Products collection, featuring elegant designs perfect for special events and celebrations.`,
    keywords: [
      `Products`,
      "luxury abayas",
      "premium collection",
      "modest fashion",
    ],
  };
}

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();
  const category = {
    name: "Products",
    description: {},
  };
  return (
    <OccasionAbayasPage
      products={products}
      categories={categories}
      categoryName={category?.name as string}
      categoryDescription={category?.description as object}
    />
  );
}
