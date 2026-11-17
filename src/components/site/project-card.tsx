import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectCardData = {
  slug: string;
  title: string;
  category: string;
  location: string | null;
  cover_image: string | null;
  is_sample: boolean;
};

export function ProjectCard({
  project,
  className,
  imageClassName,
}: {
  project: ProjectCardData;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: project.slug }}
      className={cn("group relative block overflow-hidden bg-soft", className)}
    >
      {project.cover_image ? (
        <img
          src={project.cover_image}
          alt={`${project.title} — ${project.category} interior`}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]",
            imageClassName,
          )}
        />
      ) : (
        <div className={cn("h-full min-h-64 w-full bg-soft", imageClassName)} />
      )}
      <div className="absolute inset-0 bg-card-overlay opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/60" />
      {project.is_sample && (
        <span className="absolute left-4 top-4 bg-ivory/90 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-forest">
          Sample project
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold-light">
            {project.category}
            {project.location ? ` · ${project.location}` : ""}
          </p>
          <h3 className="mt-2 truncate text-2xl text-on-dark sm:text-3xl">{project.title}</h3>
        </div>
        <span className="grid size-10 shrink-0 place-items-center border border-gold/60 text-gold-light transition-all duration-500 group-hover:bg-gold group-hover:text-forest">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
