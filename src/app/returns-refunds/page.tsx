import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description:
    "Returns and refunds policy for MoonSkeleton — defective or incorrect product help.",
};

export default function ReturnsRefundsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground font-sans mb-8 glow-text text-accent">
        Returns &amp; Refunds
      </h1>

      <div className="space-y-6 text-foreground/80 leading-relaxed font-body">
        <p className="text-lg">
          If you received a defective or incorrect product, please email{" "}
          <a
            href="mailto:moonskeleton@gmail.com"
            className="text-accent hover:underline"
          >
            moonskeleton@gmail.com
          </a>{" "}
          within 30 days.
        </p>
        <p>
          Include photos of the item and packaging &mdash; we&apos;ll quickly
          investigate and send a replacement or refund.
        </p>
      </div>

      <p className="text-sm text-muted mt-10 border-t border-border pt-6">
        Looking for delivery details? See our{" "}
        <Link href="/shipping-policy" className="text-accent hover:underline">
          Shipping Policy
        </Link>
        .
      </p>
    </div>
  );
}
