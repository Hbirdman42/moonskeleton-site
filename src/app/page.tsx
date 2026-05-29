import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CollectionCard from "@/components/CollectionCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getCollections, getFeaturedProducts } from "@/lib/data";

export default async function Home() {
  const [collections, featuredProducts] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="bg-radial-fade absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40 text-center">
          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight glow-text text-accent animate-slide-up">
            Moon Skeleton
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-foreground/70 animate-slide-up font-body" style={{ animationDelay: "0.2s" }}>
            Loves You
          </p>
          <p className="mt-6 max-w-lg mx-auto text-sm md:text-base text-muted animate-slide-up font-body" style={{ animationDelay: "0.4s" }}>
            Fan-made merch inspired by the cosmic sounds of King Gizzard &amp;
            the Lizard Wizard. Tees, blankets, and original designs crafted with
            love.
          </p>
          <div className="mt-8 flex gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <Link
              href="/collections"
              className="px-8 py-3 rounded-lg bg-accent-dim text-white font-semibold hover:bg-accent transition-colors text-sm"
            >
              Browse Collections
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-accent hover:text-accent transition-colors text-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-sans">
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
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-sans">
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

      {/* About teaser */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-sans mb-4">
            Who is Moon Skeleton?
          </h2>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed font-body">
            Just a fan making things for fans. MoonSkeleton started with a
            simple idea: the Gizzverse deserves gear as wild as the music. Every
            design is a labor of love, inspired by the psychedelic, thrash,
            microtonal, jazz-infused madness of King Gizzard &amp; the Lizard
            Wizard.
          </p>
          <Link
            href="/about"
            className="inline-block mt-6 text-sm text-accent hover:underline"
          >
            Read more about us &rarr;
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterForm />
    </>
  );
}
