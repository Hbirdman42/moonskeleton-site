import type { Metadata } from "next";
import CollectionCard from "@/components/CollectionCard";
import { getCollections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse all MoonSkeleton collections - Gizz Gear, Originals, and Big Ass Blankets.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground font-sans mb-8">
        Collections
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}
