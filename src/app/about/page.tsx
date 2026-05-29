import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about MoonSkeleton - fan-made merch inspired by King Gizzard & the Lizard Wizard.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground font-sans mb-8 glow-text text-accent">
        About Moon Skeleton
      </h1>

      <div className="space-y-6 text-foreground/80 leading-relaxed font-body">
        <p className="text-lg">
          MoonSkeleton was born out of a simple love for music, art, and the
          endlessly creative universe of King Gizzard &amp; the Lizard Wizard.
        </p>

        <p>
          What started as a few designs scribbled at shows and in late-night
          listening sessions has grown into a small collection of fan-made gear
          that we hope does justice to the wild, genre-defying spirit of the
          band.
        </p>

        <p>
          Every t-shirt, every woven blanket, every original design is made with
          the same energy that goes into a 3-hour Gizz set: relentless,
          psychedelic, and a little bit unhinged. We draw from album art, song
          lyrics, and the general cosmic chaos of the Gizzverse to create merch
          that fans actually want to wear and live with.
        </p>

        <h2 className="text-2xl font-bold text-foreground font-sans mt-10 mb-4">
          What We Make
        </h2>

        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold mt-0.5">&#9670;</span>
            <span>
              <strong className="text-foreground">Gizz Gear</strong> &mdash;
              Parody tees, tribute designs, and deep-cut references that only
              real fans will get.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold mt-0.5">&#9670;</span>
            <span>
              <strong className="text-foreground">Moon Skeleton Originals</strong>{" "}
              &mdash; Our own original artwork and designs, still rooted in the
              same psychedelic aesthetic.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold mt-0.5">&#9670;</span>
            <span>
              <strong className="text-foreground">Big Ass Blankets</strong>{" "}
              &mdash; Large woven throw blankets featuring our most popular
              designs. Perfect for festivals, the couch, or hanging on your
              wall.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground font-sans mt-10 mb-4">
          A Note on the Name
        </h2>

        <p>
          Moon Skeleton Loves You. That&apos;s it. That&apos;s the vibe. We&apos;re just
          skeletons floating through space, vibing to microtonal banana jams and
          thrash metal about climate change. If you get it, you get it.
        </p>

        <div className="mt-12 p-6 rounded-xl bg-surface border border-border text-center">
          <p className="text-lg font-semibold text-foreground mb-2">
            Ready to explore?
          </p>
          <p className="text-sm text-muted mb-4">
            Check out our latest drops and find something that speaks to your
            inner lizard wizard.
          </p>
          <Link
            href="/collections"
            className="inline-block px-8 py-3 rounded-lg bg-accent-dim text-white font-semibold hover:bg-accent transition-colors text-sm"
          >
            Browse Collections
          </Link>
        </div>

        <p className="text-xs text-muted mt-8 border-t border-border pt-6">
          MoonSkeleton is an independent fan project and is not affiliated with,
          endorsed by, or connected to King Gizzard &amp; the Lizard Wizard or
          their management. All designs are original fan art.
        </p>
      </div>
    </div>
  );
}
