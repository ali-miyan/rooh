import { client } from "./client";
import type { Product, Category } from "../types/sanity";

const CATEGORY_PROJECTION = `
  _id,
  name,
  slug,
  image{
    asset->{
      _id,
      url
    }
  },
  description
`;

const CATEGORY_SUMMARY_PROJECTION = `
  _id,
  name,
  slug
`;

/**
 * Prefer `categories[]`; fall back to legacy single `category` until migration runs.
 * Uses count() so an empty categories array does not block the legacy fallback.
 */
const CATEGORIES_FIELD = `
  "categories": select(
    count(categories) > 0 => categories[]->{ ${CATEGORY_SUMMARY_PROJECTION} },
    defined(category) => [category->{ ${CATEGORY_SUMMARY_PROJECTION} }],
    []
  )
`;

const CATEGORIES_FIELD_FULL = `
  "categories": select(
    count(categories) > 0 => categories[]->{ ${CATEGORY_PROJECTION} },
    defined(category) => [category->{ ${CATEGORY_PROJECTION} }],
    []
  )
`;

const IN_CATEGORY_FILTER = `(
  $categorySlug in categories[]->slug.current
  || category->slug.current == $categorySlug
)`;

const SHARES_CATEGORY_FILTER = `(
  count((categories[]._ref)[@ in $categoryIds]) > 0
  || category._ref in $categoryIds
)`;

// GROQ queries
const PRODUCT_QUERY = `
  *[_type == "product" && list == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    images[] {
    asset->{
      _id,
      url,
    },
    hotspot,
    crop
    },
    ${CATEGORIES_FIELD},
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
    images[] {
    asset->{
      _id,
      url,
    },
    hotspot,
    crop
    },
    ${CATEGORIES_FIELD_FULL},
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
  *[_type == "product" && list == true && ${IN_CATEGORY_FILTER}] | order(_createdAt desc) {
    _id,
    name,
    slug,
    images[] {
      asset->{
        _id,
        url,
      },
      hotspot,
      crop
    },
    ${CATEGORIES_FIELD_FULL},
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
    ${CATEGORY_PROJECTION}
  }
`;

const RELATED_PRODUCTS_QUERY = `
  *[_type == "product" && list == true && _id != $productId && ${SHARES_CATEGORY_FILTER}][0...4] {
    _id,
    name,
    slug,
    sizes,
    _createdAt,
    images [] {
      asset->{
        _id,
        url,
      },
      hotspot,
      crop
    },
    price,
    originalPrice,
    ${CATEGORIES_FIELD},
    "categorySlug": coalesce(categories[0]->slug.current, category->slug.current),
  }
`;

const PRODUCTS_WITH_COUNT_QUERY = `
  *[_type == "product" && list == true] | order(_createdAt desc) [0...$count] {
    _id,
    name,
    slug,
    images[] {
      asset->{
        _id,
        url,
      },
      hotspot,
      crop
    },
    sizes,
    _createdAt,
    ${CATEGORIES_FIELD},
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
}`;

export async function getProductsWithCount(count: number): Promise<Product[]> {
  return await client.fetch(PRODUCTS_WITH_COUNT_QUERY, { count: count - 1 });
}
export async function getProducts(): Promise<Product[]> {
  return await client.fetch(PRODUCT_QUERY);
}

export async function getProduct(slug: string): Promise<Product | null> {
  return await client.fetch(SINGLE_PRODUCT_QUERY, { slug });
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
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
  categoryIds: string[],
  productId: string
): Promise<Product[]> {
  if (!categoryIds.length) return [];
  return await client.fetch(RELATED_PRODUCTS_QUERY, { categoryIds, productId });
}
