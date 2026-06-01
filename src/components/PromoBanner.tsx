const PROMO_TEXT =
  "15% with code FOV2026 on check out. Good until end of FOV";

export default function PromoBanner() {
  const items = Array.from({ length: 8 });

  return (
    <div className="overflow-hidden border-y border-foreground/20 bg-foreground py-5">
      <div className="flex w-max animate-marquee">
        {items.map((_, i) => (
          <span
            key={i}
            className="mx-10 whitespace-nowrap text-base md:text-xl font-semibold uppercase tracking-wider text-background"
            aria-hidden={i !== 0}
          >
            {PROMO_TEXT}
            <span className="mx-10 text-background/40">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
