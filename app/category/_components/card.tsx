import { Heart } from "lucide-react"
import Image from "next/image"

type Product = {
  id: number
  name: string
  price: number
  image?: string
  isWishlisted?: boolean
}

// Product Card Component
export function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
}: {
  product:Product
  isWishlisted: boolean
  onToggleWishlist: () => void
}) {
  return (
    <div className="group cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-neutral-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleWishlist()
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-400 hover:text-red-500"
            } transition-colors`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-neutral-800">£{product.price.toFixed(2)}</div>
        <h3 className="text-sm text-neutral-700 leading-relaxed line-clamp-2">{product.name}</h3>
      </div>
    </div>
  )
}
