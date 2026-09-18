import { getProduct, getRelatedProducts, getProducts } from "../../../../../lib/queries"
import { notFound } from "next/navigation"
import ProductDetailPage from "../../../_components/productDetails"
import type { Metadata } from "next"
import {
  getCategoryNames,
  getPrimaryCategory,
  getPrimaryCategorySlug,
} from "../../../../../lib/product-category"

export const revalidate = 3600

interface ProductPageProps {
  params: Promise<{
    slug: string
    id: string
  }>
}

// Generate static params for all products (one path per category membership)
export async function generateStaticParams() {
  const products = await getProducts()

  return products.flatMap((product) => {
    if (!product.categories?.length || !product.slug?.current) return []

    return product.categories
      .filter((category) => category?.slug?.current)
      .map((category) => ({
        id: category.slug.current,
        slug: product.slug.current,
      }))
  })
}

// Generate metadata dynamically
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug, id } = await params

  try {
    const product = await getProduct(decodeURIComponent(slug))

    if (!product) {
      return {
        title: "Product Not Found - Rooh",
        description: "The requested product could not be found.",
      }
    }

    const primaryCategory =
      product.categories?.find((cat) => cat.slug.current === decodeURIComponent(id)) ||
      getPrimaryCategory(product)
    const categoryLabel = primaryCategory?.name || getCategoryNames(product) || "Collection"
    const categorySlug = primaryCategory?.slug.current || getPrimaryCategorySlug(product)
    const price = product.originalPrice ? `$${product.price} (was $${product.originalPrice})` : `$${product.price}`

    return {
      title: `${product.name} - ${categoryLabel} | Rooh`,
      description: `${product.name} - Premium ${categoryLabel.toLowerCase()} starting at ${price}. ${product.features?.join(", ") || "Luxury abaya with contemporary design and traditional elegance."}`,
      keywords: [
        product.name.toLowerCase(),
        ...((product.categories || []).map((cat) => cat.name.toLowerCase())),
        "luxury abaya",
        "premium quality",
        "modest fashion",
        ...(product.features || []),
      ],
      twitter: {
        card: "summary_large_image",
        title: `${product.name} - ${categoryLabel} | Rooh`,
        description: `${product.name} - Premium ${categoryLabel.toLowerCase()} starting at ${price}.`,
        images: product.images?.length > 0 ? [product.images[0].asset.url] : [],
      },
      alternates: {
        canonical: categorySlug
          ? `/category/${categorySlug}/products/${product.slug.current}`
          : `/products`,
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Product - Rooh",
      description: "Premium abaya collection with contemporary designs.",
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  try {
    const product = await getProduct(decodeURIComponent(slug))

    if (!product) {
      notFound()
    }

    const categoryIds = (product.categories || []).map((cat) => cat._id).filter(Boolean)
    const relatedProducts = await getRelatedProducts(categoryIds, product._id)

    return <ProductDetailPage product={product} relatedProducts={relatedProducts} />
  } catch (error) {
    console.error("Error fetching product:", error)
    return (
      <div className="min-h-screen bg-white font-custom flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">Error Loading Product</h1>
          <p className="text-neutral-600">Please try again later.</p>
        </div>
      </div>
    )
  }
}
