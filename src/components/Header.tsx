"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            MoonSkeleton
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/collections"
            className="text-sm font-medium text-muted hover:text-accent transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted hover:text-accent transition-colors"
          >
            About
          </Link>
          <a
            href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "moonskeleton.com"}/cart`}
            className="text-sm font-medium text-muted hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cart
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-muted hover:text-foreground"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-4">
          <Link
            href="/collections"
            className="block text-sm font-medium text-muted hover:text-accent"
            onClick={() => setMobileOpen(false)}
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="block text-sm font-medium text-muted hover:text-accent"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <a
            href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "moonskeleton.com"}/cart`}
            className="block text-sm font-medium text-muted hover:text-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cart
          </a>
        </div>
      )}
    </header>
  );
}
