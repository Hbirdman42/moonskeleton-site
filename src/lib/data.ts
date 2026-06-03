import {
  getCollections as shopifyGetCollections,
  getCollectionByHandle as shopifyGetCollectionByHandle,
  getProductByHandle as shopifyGetProductByHandle,
  getAllProducts as shopifyGetAllProducts,
  type ShopifyProduct,
  type ShopifyCollection,
} from "./shopify";
import { MOCK_COLLECTIONS, MOCK_PRODUCTS } from "./mock-data";

const isConfigured =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

export async function getCollections(): Promise<ShopifyCollection[]> {
  if (!isConfigured) return MOCK_COLLECTIONS;
  return shopifyGetCollections();
}

export async function getCollectionByHandle(
  handle: string
): Promise<ShopifyCollection | null> {
  if (!isConfigured) {
    return MOCK_COLLECTIONS.find((c) => c.handle === handle) ?? null;
  }
  return shopifyGetCollectionByHandle(handle);
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  if (!isConfigured) {
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }
  return shopifyGetProductByHandle(handle);
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  if (!isConfigured) return MOCK_PRODUCTS;
  return shopifyGetAllProducts();
}

const FEATURED_COLLECTION_HANDLE = "featured";

export async function getFeaturedProducts(): Promise<ShopifyProduct[]> {
  const featured = await getCollectionByHandle(FEATURED_COLLECTION_HANDLE);
  const featuredProducts =
    featured?.products.edges.map((e) => e.node) ?? [];
  if (featuredProducts.length > 0) return featuredProducts.slice(0, 8);

  const products = await getAllProducts();
  return products.slice(0, 6);
}
