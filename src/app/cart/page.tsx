"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, buildShopifyCheckoutUrl } from "@/lib/cart-context";

function formatMoney(amount: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export default function CartPage() {
  const { items, subtotal, currencyCode, updateQuantity, removeItem, mounted } =
    useCart();

  function handleCheckout() {
    if (items.length === 0) return;
    window.location.href = buildShopifyCheckoutUrl(items);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-sans mb-8">
        Your Cart
      </h1>

      {!mounted ? (
        <p className="text-muted py-12 text-center">Loading your cart&hellip;</p>
      ) : items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-muted mb-6">Your cart is empty.</p>
          <Link
            href="/collections"
            className="inline-block px-8 py-3 rounded-lg bg-accent-dim text-white font-semibold hover:bg-accent transition-colors text-sm"
          >
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <ul className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <li
                key={item.variantId}
                className="flex gap-4 rounded-xl border border-border bg-surface p-4"
              >
                <Link
                  href={`/products/${item.productHandle}`}
                  className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-surface-light"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.productTitle}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted text-xs">
                      No image
                    </div>
                  )}
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/products/${item.productHandle}`}
                        className="font-semibold text-foreground hover:text-accent transition-colors"
                      >
                        {item.productTitle}
                      </Link>
                      {item.variantTitle && (
                        <p className="mt-0.5 text-sm text-muted">
                          {item.variantTitle}
                        </p>
                      )}
                    </div>
                    <p className="font-semibold text-foreground whitespace-nowrap">
                      {formatMoney(
                        parseFloat(item.price.amount) * item.quantity,
                        item.price.currencyCode
                      )}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="px-3 py-1 text-foreground hover:text-accent"
                        aria-label="Decrease quantity"
                      >
                        &minus;
                      </button>
                      <span className="min-w-8 text-center text-sm text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        className="px-3 py-1 text-foreground hover:text-accent"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.variantId)}
                      className="text-sm text-muted hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-surface p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Order Summary
              </h2>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatMoney(subtotal, currencyCode)}
                </span>
              </div>
              <p className="text-xs text-muted mb-5">
                Shipping &amp; taxes calculated at checkout. Use code{" "}
                <span className="font-semibold text-accent">FOV2026</span> for
                15% off (good until end of FOV).
              </p>
              <button
                type="button"
                onClick={handleCheckout}
                className="inline-flex w-full items-center justify-center rounded-lg bg-accent-dim px-8 py-4 text-lg font-bold text-white hover:bg-accent transition-colors"
              >
                Checkout
              </button>
              <p className="mt-3 text-center text-xs text-muted">
                Secure payment handled by Shopify.
              </p>
              <Link
                href="/collections"
                className="mt-4 block text-center text-sm text-accent hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
