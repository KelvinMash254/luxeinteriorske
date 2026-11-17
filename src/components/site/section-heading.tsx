import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", tone === "light" && "text-gold-light")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "mt-4 text-4xl sm:text-5xl lg:text-[3.4rem]",
          tone === "dark" ? "text-emerald" : "text-on-dark",
        )}
      >
        {title}
      </h2>
      <span className={cn("gold-rule mt-6", align === "center" && "mx-auto")} />
      {text && (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-muted-foreground" : "text-on-dark-muted",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}
