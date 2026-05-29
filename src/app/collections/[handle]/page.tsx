import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCollectionByHandle } from "@/lib/data";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) return { title: "Not Found" };

  return {
    title: collection.title,
    description: collection.description || `Shop ${collection.title} at MoonSkeleton.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  const products = collection.products.edges.map((e) => e.node);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-sans">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="mt-2 text-muted max-w-2xl">{collection.description}</p>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-muted py-12 text-center">
          No products in this collection yet. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
