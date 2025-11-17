import { getProduct, getRelatedProducts, getProducts } from "../../../../../lib/queries"
import { notFound } from "next/navigation"
import ProductDetailPage from "../../../_components/productDetails"
import type { Metadata } from "next"

export const revalidate = 3600

interface ProductPageProps {
  params: {
    slug: string
    category: string
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getProducts()

  return products.map((product) => ({
    category: product.category.slug.current,
    slug: product.slug.current,
  }))
}

// Generate metadata dynamically
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = params

  try {
    const product = await getProduct(decodeURIComponent(slug))

    if (!product) {
      return {
        title: "Product Not Found - Rooh",
        description: "The requested product could not be found.",
      }
    }

    const price = product.originalPrice ? `$${product.price} (was $${product.originalPrice})` : `$${product.price}`

    return {
      title: `${product.name} - ${product.category.name} | Rooh`,
      description: `${product.name} - Premium ${product.category.name.toLowerCase()} starting at ${price}. ${product.features?.join(", ") || "Luxury abaya with contemporary design and traditional elegance."}`,
      keywords: [
        product.name.toLowerCase(),
        product.category.name.toLowerCase(),
        "luxury abaya",
        "premium quality",
        "modest fashion",
        ...(product.features || []),
      ],
      twitter: {
        card: "summary_large_image",
        title: `${product.name} - ${product.category.name} | Rooh`,
        description: `${product.name} - Premium ${product.category.name.toLowerCase()} starting at ${price}.`,
        images: product.images?.length > 0 ? [product.images[0].asset.url] : [],
      },
      alternates: {
        canonical: `/products/${product.category.slug.current}/${product.slug.current}`,
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
  const { slug } = params

  try {
    const product = await getProduct(decodeURIComponent(slug))

    if (!product) {
      notFound()
    }

    const relatedProducts = product.category?._id ? await getRelatedProducts(product.category._id, product._id) : []

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
