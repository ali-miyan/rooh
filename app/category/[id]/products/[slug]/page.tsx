import { getProduct, getRelatedProducts } from "../../../../../lib/queries"
import { notFound } from "next/navigation"
import ProductDetailPage from "../../../_components/productDetails"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params

  try {
    const product = await getProduct(slug)

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
