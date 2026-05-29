import Link from "next/link";
import Image from "next/image";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block card-hover rounded-xl overflow-hidden bg-surface border border-border"
    >
      <div className="aspect-square relative overflow-hidden bg-surface-light">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            width={image.width}
            height={image.height}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-accent font-medium">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}
