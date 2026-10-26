import type { Testimonial } from "../data/portfolio-data";
import Reveal from "./Reveal";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const avatarGradients = [
  "from-indigo-500 to-violet-500",
  "from-cyan-500 to-teal-500",
  "from-violet-500 to-fuchsia-500",
  "from-emerald-500 to-cyan-500",
];

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((item, index) => (
        <Reveal
          key={`${item.name}-${index}`}
          delay={(index % 3) * 110}
          className="h-full"
        >
          <figure className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/35">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 right-4 select-none font-serif text-8xl leading-none text-indigo-500/15"
            >
              &ldquo;
            </span>

            <blockquote className="relative text-sm leading-7 text-slate-300">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <figcaption className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${
                  avatarGradients[index % avatarGradients.length]
                }`}
              >
                {initials(item.name)}
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-100">
                  {item.name}
                </span>
                <span className="block text-xs text-slate-400">
                  {[item.role, item.company].filter(Boolean).join(" · ")}
                </span>
              </span>

              {item.relationship && (
                <span className="ml-auto shrink-0 rounded-full border border-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                  {item.relationship}
                </span>
              )}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
