import { client } from "./client";
import type { Product, Category } from "../types/sanity";

// GROQ queries
const PRODUCT_QUERY = `
  *[_type == "product" && list == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    images,
    category->{
      _id,
      name,
      slug
    },
    price,
    originalPrice,
    sizes,
    _createdAt,
    description,
    features,
    inStock,
    stockQuantity,
    list
  }
`;

const SINGLE_PRODUCT_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    images,
    category->{
      _id,
      name,
      slug,
      image,
      description
    },
    price,
    sizes,
    _createdAt,
    originalPrice,
    description,
    features,
    inStock,
    stockQuantity,
    list
  }
`;
const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && list == true && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id,
    name,
    slug,
    images,
    category->{
      _id,
      name,
      slug,
      image,
      description
    },
    price,
    sizes,
    _createdAt,
    originalPrice,
    description,
    features,
    inStock,
    stockQuantity,
    list
  }
`;

const CATEGORIES_QUERY = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    image,
    description
  }
`;

const RELATED_PRODUCTS_QUERY = `
  *[_type == "product" && list == true && category._ref == $categoryId && _id != $productId][0...4] {
    _id,
    name,
    slug,
    sizes,
    _createdAt,
    images,
    price,
    originalPrice
  }
`;
const PRODUCTS_WITH_COUNT_QUERY = `
  *[_type == "product" && list == true] | order(_createdAt desc) [0...$count] {
    _id,
    name,
    slug,
    images,
    sizes,
    _createdAt,
    category->{
      _id,
      name,
      slug
    },
    price,
    originalPrice,
    description,
    features,
    inStock,
    stockQuantity,
    list
  }
`;


const activeBanners = `*[_type == "banner" && isActive == true]{
  _id,
  title,
  subtitle,
  image {
    asset->{
      _id,
      url,
    },
    hotspot,
    crop
  },
  link {
    url,
    text,
    openInNewTab
  },
  displayOrder,
  isActive
}`

export async function getProductsWithCount(count: number): Promise<Product[]> {
  return await client.fetch(PRODUCTS_WITH_COUNT_QUERY, { count: count - 1 });
}
export async function getProducts(): Promise<Product[]> {
  return await client.fetch(PRODUCT_QUERY);
}

export async function getProduct(slug: string): Promise<Product | null> {
  return await client.fetch(SINGLE_PRODUCT_QUERY, { slug });
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return await client.fetch(PRODUCTS_BY_CATEGORY_QUERY, { categorySlug });
}
export async function getCategories(): Promise<Category[]> {
  return await client.fetch(CATEGORIES_QUERY);
}
export async function getCategoriesById(): Promise<Category[]> {
  return await client.fetch(CATEGORIES_QUERY);
}
export async function getActiveBanners(): Promise<any[]> {
  return await client.fetch(activeBanners);
}

export async function getRelatedProducts(
  categoryId: string,
  productId: string
): Promise<Product[]> {
  return await client.fetch(RELATED_PRODUCTS_QUERY, { categoryId, productId });
}
