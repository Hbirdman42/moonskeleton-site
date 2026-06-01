const PROMO_TEXT =
  "15% with code FOV2026 on check out. Good until end of FOV";

export default function PromoBanner() {
  const items = Array.from({ length: 8 });

  return (
    <div className="overflow-hidden border-y border-border bg-surface py-5">
      <div className="flex w-max items-center animate-marquee">
        {items.map((_, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap text-base md:text-xl font-semibold uppercase tracking-wider text-foreground"
            aria-hidden={i !== 0}
          >
            {PROMO_TEXT}
            <span className="mx-10 leading-none text-foreground/40">
              &#9670;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
