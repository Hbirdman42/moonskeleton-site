"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getCheckoutUrl, type ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/lib/cart-context";

export default function ProductDetails({
  product,
}: {
  product: ShopifyProduct;
}) {
  const images = product.images.edges.map((e) => e.node);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => {
      const defaults: Record<string, string> = {};
      for (const option of product.options) {
        defaults[option.name] = option.values[0];
      }
      return defaults;
    }
  );

  const selectedVariant = product.variants.edges.find((e) =>
    e.node.selectedOptions.every(
      (opt) => selectedOptions[opt.name] === opt.value
    )
  )?.node;

  const storeDomain =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "moonskeleton.com";
  const buyUrl = selectedVariant
    ? getCheckoutUrl(selectedVariant.id)
    : `https://${storeDomain}/products/${product.handle}`;

  const currentImage = images[selectedImageIdx];

  function selectOption(name: string, value: string) {
    const next = { ...selectedOptions, [name]: value };
    setSelectedOptions(next);
    const variant = product.variants.edges.find((e) =>
      e.node.selectedOptions.every((opt) => next[opt.name] === opt.value)
    )?.node;
    const variantImageUrl = variant?.image?.url;
    if (variantImageUrl) {
      const idx = images.findIndex((img) => img.url === variantImageUrl);
      if (idx >= 0) setSelectedImageIdx(idx);
    }
  }

  function handleAddToCart() {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: selectedVariant.selectedOptions
        .map((o) => o.value)
        .join(" / "),
      price: selectedVariant.price,
      image: selectedVariant.image?.url ?? currentImage?.url ?? images[0]?.url ?? null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Image gallery */}
      <div className="space-y-4">
        <div className="aspect-square rounded-xl overflow-hidden bg-surface-light border border-border">
          {currentImage ? (
            <Image
              src={currentImage.url}
              alt={currentImage.altText || product.title}
              width={currentImage.width}
              height={currentImage.height}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              No image
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIdx(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                  idx === selectedImageIdx
                    ? "border-accent"
                    : "border-border hover:border-muted"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText || `View ${idx + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {product.title}
          </h1>
          <p className="mt-2 text-2xl font-semibold text-accent">
            {selectedVariant
              ? formatPrice(selectedVariant.price)
              : `From ${formatPrice(product.priceRange.minVariantPrice)}`}
          </p>
        </div>

        {/* Options */}
        {product.options.map((option) => (
          <div key={option.name}>
            <label className="text-sm font-medium text-muted uppercase tracking-wider block mb-2">
              {option.name}
            </label>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <button
                  key={value}
                  onClick={() => selectOption(option.name, value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    selectedOptions[option.name] === value
                      ? "bg-accent-dim text-white border-accent"
                      : "bg-surface border-border text-foreground hover:border-accent"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Add to cart + checkout */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!selectedVariant || !selectedVariant.availableForSale}
            className="inline-flex items-center justify-center w-full px-8 py-4 rounded-lg bg-accent-dim text-white text-lg font-bold hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {added ? "Added to cart \u2713" : "Add to Cart"}
          </button>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center w-full px-8 py-3 rounded-lg border border-foreground/30 text-foreground text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
          >
            View Cart
          </Link>
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs text-muted hover:text-accent transition-colors"
          >
            or buy this item now &rarr;
          </a>
        </div>

        {selectedVariant && !selectedVariant.availableForSale && (
          <p className="text-red-500 text-sm font-medium">
            This variant is currently sold out.
          </p>
        )}

        {/* Description */}
        <div className="border-t border-border pt-6">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
            Description
          </h2>
          <div
            className="prose prose-invert prose-sm max-w-none text-foreground/80"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </div>
      </div>
    </div>
  );
}
