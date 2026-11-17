export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        width={1600}
        height={900}
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="container-luxe flex min-h-[26rem] flex-col justify-end pb-16 pt-32 sm:min-h-[32rem] lg:pb-24">
        <p className="eyebrow animate-fade-up text-gold-light">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl animate-fade-up text-5xl text-on-dark [animation-delay:120ms] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <span className="gold-rule mt-8 origin-left animate-line-grow [animation-delay:300ms]" />
        {text && (
          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-on-dark-muted [animation-delay:240ms] sm:text-lg">
            {text}
          </p>
        )}
      </div>
    </section>
  );
}
