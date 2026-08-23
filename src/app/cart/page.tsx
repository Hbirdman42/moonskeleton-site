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
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-end justify-between mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
          Your Cart
        </h1>
        <Link
          href="/collections"
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          Continue shopping
        </Link>
      </div>

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
        <>
          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-6 border-b border-border pb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            <span>Product</span>
            <span className="w-32 text-center">Quantity</span>
            <span className="w-24 text-right">Total</span>
          </div>

          {/* Items */}
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li
                key={item.variantId}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 md:gap-6 py-6 items-center"
              >
                {/* Product */}
                <div className="flex gap-4">
                  <Link
                    href={`/products/${item.productHandle}`}
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-surface-light border border-border"
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
                  <div className="flex flex-col">
                    <Link
                      href={`/products/${item.productHandle}`}
                      className="font-semibold text-foreground hover:text-accent transition-colors"
                    >
                      {item.productTitle}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted">
                      {formatMoney(
                        parseFloat(item.price.amount),
                        item.price.currencyCode
                      )}
                    </p>
                    {item.variantTitle && (
                      <p className="mt-0.5 text-sm text-muted">
                        {item.variantTitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 md:w-32 md:justify-center">
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
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>

                {/* Line total */}
                <p className="font-semibold text-foreground whitespace-nowrap md:w-24 md:text-right">
                  {formatMoney(
                    parseFloat(item.price.amount) * item.quantity,
                    item.price.currencyCode
                  )}
                </p>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <div className="border-t border-border pt-6 flex flex-col items-end gap-2">
            <div className="flex items-center gap-6">
              <span className="text-lg font-semibold text-foreground">
                Estimated total
              </span>
              <span className="text-lg font-semibold text-foreground">
                {formatMoney(subtotal, currencyCode)} {currencyCode}
              </span>
            </div>
            <p className="text-sm text-muted">
              Taxes, discounts and shipping calculated at checkout.
            </p>
            <p className="text-sm text-muted">
              Use code{" "}
              <span className="font-semibold text-accent">FOV2026</span> for 15%
              off (good until end of FOV).
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-3 w-full md:w-80 inline-flex items-center justify-center rounded-lg bg-accent-dim px-8 py-4 text-lg font-bold text-white hover:bg-accent transition-colors"
            >
              Check out
            </button>
            <p className="text-center text-xs text-muted w-full md:w-80">
              Secure payment handled by Shopify.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
