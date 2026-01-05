import { getProductsByCategory, getCategories } from "@/lib/queries";
import ProductsList from "../_components/productslist";
import type { Metadata } from "next";

export const revalidate = 3600

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({
    id: category.slug.current,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const categories = await getCategories();
  const category = categories.find((cat) => cat.slug.current === id);

  if (!category) {
    return {
      title: "Products - Rooh",
      description: "Browse our collection of premium abayas",
    };
  }

  return {
    title: `${category.name} - Premium Abayas Collection | Rooh`,
    description: `Explore our ${category.name.toLowerCase()} collection featuring luxury abayas with contemporary designs and traditional elegance.`,
    keywords: [
      `${category.name.toLowerCase()} abayas`,
      "luxury abayas",
      "premium collection",
      "modest fashion",
    ],
    openGraph: {
      title: `${category.name} - Premium Abayas Collection | Rooh`,
      description: `Explore our ${category.name.toLowerCase()} collection featuring luxury abayas with contemporary designs and traditional elegance.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} - Premium Abayas Collection | Rooh`,
      description: `Explore our ${category.name.toLowerCase()} collection featuring luxury abayas.`,
    },
  };
}

export default async function ProductsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const products = await getProductsByCategory(decodeURIComponent(id));
  const categories = await getCategories();
  const category = categories.find((cat) => {
    return cat.slug.current === decodeURIComponent(id);
  });

  return (
    <ProductsList
      products={products}
      categories={categories}
      categoryName={category?.name as string}
      categoryDescription={category?.description as object}
    />
  );
}
