import Link from "next/link";
import { getCollections } from "@/lib/data";

async function getShopLinks(): Promise<Array<{ href: string; label: string }>> {
  try {
    const collections = await getCollections();
    return collections.map((collection) => ({
      href: `/collections/${collection.handle}`,
      label: collection.title,
    }));
  } catch {
    return [{ href: "/collections", label: "All Collections" }];
  }
}

export default async function Footer() {
  const shopLinks = await getShopLinks();

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
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
                <Link
                  href="/shipping-policy"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns-refunds"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Returns & Refunds
                </Link>
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
