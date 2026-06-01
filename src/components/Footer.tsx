import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              MoonSkeleton
            </h3>
            <p className="text-sm text-muted max-w-xs">
              Moon Skeleton Loves You. Fan-made merch inspired by the cosmic
              sounds of King Gizzard & the Lizard Wizard.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections/gizz-gear"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Gizz Gear
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/moon-skeleton-original-designs"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Originals
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/big-ass-blankets"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Big Ass Blankets
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Info
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "moonskeleton.com"}/policies/shipping-policy`}
                  className="text-sm text-muted hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "moonskeleton.com"}/policies/refund-policy`}
                  className="text-sm text-muted hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} MoonSkeleton. Not affiliated with
            King Gizzard & the Lizard Wizard. Fan-made with love.
          </p>
        </div>
      </div>
    </footer>
  );
}
