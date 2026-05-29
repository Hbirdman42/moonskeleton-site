import Link from "next/link";
import Image from "next/image";
import type { ShopifyCollection } from "@/lib/shopify";

export default function CollectionCard({
  collection,
}: {
  collection: ShopifyCollection;
}) {
  const coverImage =
    collection.image ??
    collection.products.edges[0]?.node.images.edges[0]?.node;

  return (
    <Link
      href={`/collections/${collection.handle}`}
      className="group block card-hover rounded-xl overflow-hidden bg-surface border border-border relative"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-surface-light">
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={coverImage.altText || collection.title}
            width={coverImage.width}
            height={coverImage.height}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-dim/20 to-accent/10">
            <span className="text-4xl font-bold text-accent/30">
              {collection.title[0]}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
          {collection.title}
        </h3>
        {collection.description && (
          <p className="mt-1 text-sm text-white/70 line-clamp-2">
            {collection.description}
          </p>
        )}
      </div>
    </Link>
  );
}
