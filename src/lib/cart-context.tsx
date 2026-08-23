"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export interface CartItem {
  variantId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  image: string | null;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  currencyCode: string;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clear: () => void;
  mounted: boolean;
}

const STORAGE_KEY = "moonskeleton-cart";
const EMPTY: CartItem[] = [];

/* ----------------------------- external store ----------------------------- */

let items: CartItem[] = EMPTY;
let initialized = false;
let listeners: Array<() => void> = [];

function loadOnce() {
  if (initialized) return;
  initialized = true;
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) items = JSON.parse(stored) as CartItem[];
  } catch {
    // ignore malformed storage
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore storage write failures
  }
}

function emit() {
  persist();
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): CartItem[] {
  loadOnce();
  return items;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function getMountedSnapshot() {
  return true;
}

function getMountedServerSnapshot() {
  return false;
}

function addItem(item: Omit<CartItem, "quantity">, quantity = 1) {
  loadOnce();
  const existing = items.find((i) => i.variantId === item.variantId);
  items = existing
    ? items.map((i) =>
        i.variantId === item.variantId
          ? { ...i, quantity: i.quantity + quantity }
          : i
      )
    : [...items, { ...item, quantity }];
  emit();
}

function removeItem(variantId: string) {
  loadOnce();
  items = items.filter((i) => i.variantId !== variantId);
  emit();
}

function updateQuantity(variantId: string, quantity: number) {
  loadOnce();
  items =
    quantity <= 0
      ? items.filter((i) => i.variantId !== variantId)
      : items.map((i) =>
          i.variantId === variantId ? { ...i, quantity } : i
        );
  emit();
}

function clear() {
  items = EMPTY;
  emit();
}

/* ------------------------------- React API -------------------------------- */

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const currentItems = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const mounted = useSyncExternalStore(
    subscribe,
    getMountedSnapshot,
    getMountedServerSnapshot
  );

  const value = useMemo<CartContextValue>(() => {
    const itemCount = currentItems.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = currentItems.reduce(
      (sum, i) => sum + parseFloat(i.price.amount) * i.quantity,
      0
    );
    const currencyCode = currentItems[0]?.price.currencyCode || "USD";
    return {
      items: currentItems,
      itemCount,
      subtotal,
      currencyCode,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      mounted,
    };
  }, [currentItems, mounted]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

/**
 * Build a Shopify cart permalink for all items so the customer only leaves
 * the site at the final payment step.
 * Format: https://{domain}/cart/{variantId}:{qty},{variantId}:{qty}
 */
export function buildShopifyCheckoutUrl(cartItems: CartItem[]): string {
  const domain =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "moonskeleton.com";
  const parts = cartItems.map((i) => {
    const id = i.variantId.replace("gid://shopify/ProductVariant/", "");
    return `${id}:${i.quantity}`;
  });
  return `https://${domain}/cart/${parts.join(",")}`;
}
