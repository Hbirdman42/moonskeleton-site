const PROMO_TEXT =
  "15% with code FOV2026 on check out. Good until end of FOV";

export default function PromoBanner() {
  const items = Array.from({ length: 6 });

  return (
    <div className="overflow-hidden border-y border-border bg-accent-dim/20 py-3">
      <div className="flex w-max animate-marquee">
        {items.map((_, i) => (
          <span
            key={i}
            className="mx-8 whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-accent"
            aria-hidden={i !== 0}
          >
            {PROMO_TEXT}
            <span className="mx-8 text-foreground/40">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
