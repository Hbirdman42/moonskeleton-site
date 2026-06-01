import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import CollectionCard from "@/components/CollectionCard";
import NewsletterForm from "@/components/NewsletterForm";
import PromoBanner from "@/components/PromoBanner";
import { getCollections, getFeaturedProducts } from "@/lib/data";

export default async function Home() {
  const [collections, featuredProducts] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background text-foreground bg-grid">
        <div className="bg-radial-fade absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
          <div className="flex justify-center animate-slide-up">
            <Image
              src="/logo.png"
              alt="Moon Skeleton"
              width={320}
              height={320}
              priority
              className="glow-moon h-48 w-48 md:h-72 md:w-72 object-contain"
            />
          </div>
          <p className="mt-6 max-w-lg mx-auto text-sm md:text-base text-foreground/70 animate-slide-up font-body" style={{ animationDelay: "0.3s" }}>
            Fan-made merch inspired by the cosmic sounds of King Gizzard &amp;
            the Lizard Wizard. Tees, blankets, and original designs crafted with
            love.
          </p>
          <div className="mt-8 flex gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <Link
              href="/collections"
              className="px-8 py-3 rounded-lg bg-accent-dim text-white font-semibold hover:bg-accent transition-colors text-sm"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <PromoBanner />

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
            Browse Our Swag
          </h2>
          <Link
            href="/collections"
            className="text-sm text-accent hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
            Featured Gear
          </h2>
          <Link
            href="/collections"
            className="text-sm text-accent hover:underline"
          >
            Shop all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-sans mb-6">
            Follow the Madness
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/moonsskeleton/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border border-border px-6 py-3 text-foreground font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-10.41a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
              </svg>
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@moonskeleton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border border-border px-6 py-3 text-foreground font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1Z" />
              </svg>
              TikTok
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterForm />
    </>
  );
}
