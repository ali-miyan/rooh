import { getProducts, getProductsByCategory } from "@/lib/queries"
import ProductsList from "../_components/productslist"

interface ProductPageProps {
  params: {
    id: string
  }
}
export default async function ProductsPage({ params }: ProductPageProps) {
  const { id } = params

  const products = await getProductsByCategory(id)
  
  return <ProductsList products={products} />
}