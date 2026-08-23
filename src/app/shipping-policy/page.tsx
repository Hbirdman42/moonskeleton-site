import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Shipping information for MoonSkeleton orders — processing times, carriers, and tracking.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground font-sans mb-8 glow-text text-accent">
        Shipping Policy
      </h1>

      <ul className="space-y-4 text-foreground/80 leading-relaxed font-body">
        <li className="flex items-start gap-3">
          <span className="text-accent font-bold mt-1">&#9670;</span>
          <span>
            Orders are processed within 2&ndash;5 business days. Cancelations
            cannot be processed after the item has been shipped.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-accent font-bold mt-1">&#9670;</span>
          <span>
            Orders are shipped via major carriers such as USPS, UPS, or FedEx.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-accent font-bold mt-1">&#9670;</span>
          <span>Tracking information will be provided once the order ships.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-accent font-bold mt-1">&#9670;</span>
          <span>
            Customers are responsible for providing accurate shipping
            information.
          </span>
        </li>
      </ul>

      <p className="text-sm text-muted mt-10 border-t border-border pt-6">
        Questions about your order? See our{" "}
        <Link href="/returns-refunds" className="text-accent hover:underline">
          Returns &amp; Refunds
        </Link>{" "}
        policy or reach out any time.
      </p>
    </div>
  );
}
