import type { Category, Product } from "@/types/sanity";

/** First category is treated as primary for URLs and SEO. */
export function getPrimaryCategory(
  product: Pick<Product, "categories">
): Category | undefined {
  return product.categories?.[0];
}

export function getPrimaryCategorySlug(
  product: Pick<Product, "categories" | "categorySlug">
): string | undefined {
  if (product.categorySlug) return product.categorySlug;
  return product.categories?.[0]?.slug?.current;
}

/**
 * Build a product detail URL. When `preferredCategorySlug` is provided and the
 * product belongs to that category, use it so category-page links stay in context.
 */
export function getProductHref(
  product: Pick<Product, "categories" | "slug" | "categorySlug">,
  preferredCategorySlug?: string | null
): string {
  const belongsToPreferred =
    preferredCategorySlug &&
    product.categories?.some(
      (cat) => cat.slug?.current === preferredCategorySlug
    );

  const categorySlug = belongsToPreferred
    ? preferredCategorySlug
    : getPrimaryCategorySlug(product);

  if (!categorySlug || !product.slug?.current) {
    return "/products";
  }

  return `/category/${categorySlug}/products/${product.slug.current}`;
}

export function getCategoryNames(product: Pick<Product, "categories">): string {
  return (product.categories || [])
    .map((cat) => cat.name)
    .filter(Boolean)
    .join(", ");
}
