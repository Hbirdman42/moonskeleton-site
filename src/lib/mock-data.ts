import type { ShopifyProduct, ShopifyCollection } from "./shopify";

const placeholderImage = {
  url: "/placeholder.svg",
  altText: "Product image",
  width: 600,
  height: 600,
};

function makeProduct(
  id: string,
  title: string,
  handle: string,
  price: string,
  description: string
): ShopifyProduct {
  return {
    id: `gid://shopify/Product/${id}`,
    title,
    handle,
    description,
    descriptionHtml: `<p>${description}</p>`,
    priceRange: {
      minVariantPrice: { amount: price, currencyCode: "USD" },
      maxVariantPrice: { amount: price, currencyCode: "USD" },
    },
    images: { edges: [{ node: placeholderImage }] },
    variants: {
      edges: [
        {
          node: {
            id: `gid://shopify/ProductVariant/${id}01`,
            title: "S",
            availableForSale: true,
            price: { amount: price, currencyCode: "USD" },
            selectedOptions: [{ name: "Size", value: "S" }],
            image: placeholderImage,
          },
        },
        {
          node: {
            id: `gid://shopify/ProductVariant/${id}02`,
            title: "M",
            availableForSale: true,
            price: { amount: price, currencyCode: "USD" },
            selectedOptions: [{ name: "Size", value: "M" }],
            image: placeholderImage,
          },
        },
        {
          node: {
            id: `gid://shopify/ProductVariant/${id}03`,
            title: "L",
            availableForSale: true,
            price: { amount: price, currencyCode: "USD" },
            selectedOptions: [{ name: "Size", value: "L" }],
            image: placeholderImage,
          },
        },
        {
          node: {
            id: `gid://shopify/ProductVariant/${id}04`,
            title: "XL",
            availableForSale: true,
            price: { amount: price, currencyCode: "USD" },
            selectedOptions: [{ name: "Size", value: "XL" }],
            image: placeholderImage,
          },
        },
      ],
    },
    options: [{ name: "Size", values: ["S", "M", "L", "XL"] }],
  };
}

export const MOCK_PRODUCTS: ShopifyProduct[] = [
  makeProduct("1", "Dark Side of the Gizz T Shirt", "dark-side-of-the-gizz-t-shirt", "25.00", "A psychedelic tribute to the dark side. Premium cotton tee with custom artwork."),
  makeProduct("2", "Yer A Gizzard Harry Shirt", "yer-a-gizzard-harry-shirt", "25.00", "A magical mashup of wizards and lizards. Soft cotton blend."),
  makeProduct("3", "Pulp Fiction Gator Fishes Parody Shirt", "pulp-fiction-gator-fishes-parody-shirt", "29.99", "Gator meets Tarantino in this wild parody tee."),
  makeProduct("4", "Gila Monster T-Rex Shirt", "gila-monster-t-rex-shirt", "30.00", "Prehistoric meets psychedelic in this kaiju-inspired design."),
  makeProduct("5", "Lizard Knight Holding Sword Shirt", "lizard-knight-holding-sword-shirt", "30.00", "A noble lizard knight ready for battle. Heavy cotton."),
  makeProduct("6", "King Gizzard Retro Knight T-Shirt", "king-gizzard-retro-knight-t-shirt", "30.00", "Retro vibes meet medieval might. Screen-printed design."),
  makeProduct("7", "Big Fig Wasp Woven Blanket", "big-fig-wasp-woven-blanket", "44.98", "Cozy up with this woven blanket featuring the Big Fig Wasp design. 100% cotton."),
  makeProduct("8", "Rattlesnake Repeat Woven Blanket", "rattlesnake-repeat-woven-blanket", "44.98", "Repeating rattlesnake pattern woven blanket. Large throw size."),
  makeProduct("9", "Nonagon Infinity Woven Blanket", "nonagon-infinity-woven-blanket", "44.98", "Nonagon Infinity opens the door. Woven cotton throw blanket."),
  makeProduct("10", "Misfits Ghost Gizzard Shirt", "misfits-ghost-gizzard-shirt", "28.99", "A Misfits x Gizzard crossover tee. Punk meets psych-rock."),
  makeProduct("11", "Sea Witch Shirt", "sea-witch-shirt", "25.98", "Deep sea psychedelia on a premium cotton tee."),
  makeProduct("12", "Infest the Rats Nest Vol4 T Shirt", "infest-the-rats-nest-vol4-t-shirt", "28.99", "Thrash metal vibes from the Gizzverse. Heavy cotton."),
];

export const MOCK_COLLECTIONS: ShopifyCollection[] = [
  {
    id: "gid://shopify/Collection/1",
    title: "Gizz Gear",
    handle: "gizz-gear",
    description: "King Gizzard & the Lizard Wizard inspired merch",
    image: null,
    products: {
      edges: MOCK_PRODUCTS.slice(0, 6).map((p) => ({ node: p })),
    },
  },
  {
    id: "gid://shopify/Collection/2",
    title: "Moon Skeleton Originals",
    handle: "moon-skeleton-originals",
    description: "Original designs by Moon Skeleton",
    image: null,
    products: {
      edges: [MOCK_PRODUCTS[10], MOCK_PRODUCTS[11]].map((p) => ({ node: p })),
    },
  },
  {
    id: "gid://shopify/Collection/3",
    title: "Big Ass Blankets",
    handle: "big-ass-blankets",
    description: "Large woven blankets with psychedelic designs",
    image: null,
    products: {
      edges: MOCK_PRODUCTS.slice(6, 9).map((p) => ({ node: p })),
    },
  },
];
