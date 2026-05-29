const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: ShopifyPrice;
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: Array<{ node: ShopifyProduct }>;
  };
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      edges {
        node { url altText width height }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
    options {
      name
      values
    }
  }
`;

export async function getCollections(): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{
    collections: { edges: Array<{ node: ShopifyCollection }> };
  }>(`
    {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            image { url altText width height }
            products(first: 1) {
              edges {
                node {
                  images(first: 1) {
                    edges { node { url altText width height } }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.collections.edges.map((e) => e.node);
}

export async function getCollectionByHandle(
  handle: string
): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<{
    collection: ShopifyCollection | null;
  }>(
    `
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        image { url altText width height }
        products(first: 50) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `,
    { handle }
  );

  return data.collection;
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    product: ShopifyProduct | null;
  }>(
    `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
    ${PRODUCT_FRAGMENT}
  `,
    { handle }
  );

  return data.product;
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(`
    {
      products(first: 50) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `);

  return data.products.edges.map((e) => e.node);
}

export function formatPrice(price: ShopifyPrice): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));
}

export function getCheckoutUrl(variantId: string): string {
  const id = variantId.replace("gid://shopify/ProductVariant/", "");
  return `https://${SHOPIFY_STORE_DOMAIN}/cart/${id}:1`;
}
