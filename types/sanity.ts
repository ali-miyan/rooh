export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
    url:string
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Category {
  _id: string
  _type: "category"
  name: string
  slug: {
    current: string
  }
  image: SanityImage
  description?: any[]
}

export interface Product {
  _id: string
  _type: "product"
  name: string
  slug: {
    current: string
  }
  images: SanityImage[]
  category: Category
  sizes:any[]
  price: number
  originalPrice?: number
  description: any[]
  productSize?: string
  features?: string[]
  inStock: boolean
  stockQuantity?: number
  list: boolean
  _createdAt: string
}
