"use client";
import Image from "next/image";
import { useState } from "react";
import {
  skills,
  skillColors,
  techColors,
  projects,
  graphics,
} from "./data/portfolio-data";
import ImageModal from "./components/ImageModal";

const getTechColor = (tech: string) =>
  techColors[tech] ?? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";

const getSkillColor = (skill: string) =>
  skillColors[skill] ?? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-100">
      <span className="h-5 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-500" />
      {children}
    </h2>
  );
}

export default function Home() {
  const [activeGraphic, setActiveGraphic] = useState<{
    name: string;
    images: string[];
  } | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 sm:px-10">
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-sm font-bold tracking-tight text-transparent">
           
          </span>
          <div className="flex gap-5 text-xs font-medium text-slate-400">
            {["skills", "projects", "graphics", "about", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="capitalize transition-colors hover:text-indigo-400"
              >
                {id}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto flex max-w-4xl flex-col gap-20 px-6 py-16 sm:px-10 sm:py-20">
        {/* Hero */}
        <section className="relative flex flex-col gap-8">
          <div className="pointer-events-none absolute -left-16 -top-24 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="pointer-events-none absolute left-64 top-0 h-56 w-56 rounded-full bg-cyan-600/10 blur-3xl" />

          <div className="relative flex items-start gap-6">
            <div className="hidden h-28 w-28 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-indigo-500/40 ring-offset-2 ring-offset-slate-950 sm:block">
              <Image
                src="/images/profile.jpg"
                alt="El Bern S. Berdera"
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
                Available for hire
              </span>

              <h1 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                El Bern S. Berdera
              </h1>

              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Web Developer · Software Developer · Graphic Designer
              </p>

              <p className="text-xs text-slate-500">
                <a
                  href="mailto:elbernberdera@gmail.com"
                  className="transition-colors hover:text-indigo-400"
                >
                  elbernberdera@gmail.com
                </a>{" "}
                |{" "}
                <a
                  href="https://linkedin.com/in/elbern-berdera-7ab345377"
                  className="transition-colors hover:text-indigo-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>{" "}
                | Butuan City, Philippines
              </p>

              <p className="max-w-xl text-justify text-sm leading-relaxed text-slate-400">
                A multi-disciplinary creator dedicated to building responsive web applications,
                robust APIs, and intuitive user interfaces. I combine strong technical
                problem-solving with creative design to deliver complete, polished digital
                experiences.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#projects"
                  className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:shadow-indigo-500/40"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-slate-700 px-5 py-2 text-sm font-medium text-slate-300 transition hover:border-indigo-500/50 hover:text-indigo-300"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-5">
          <SectionHeader>Skills</SectionHeader>
          <p className="max-w-2xl text-justify text-sm leading-relaxed text-slate-400">
            Specializing in full-stack web development, I build responsive, user-centric
            frontends and architect robust, secure backend systems. From designing database
            schemas and developing APIs to polishing the final user interface, I manage the
            entire application lifecycle.
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getSkillColor(skill)}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="space-y-5">
          <SectionHeader>What I Can Do for You</SectionHeader>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Web Applications",
                gradient: "from-indigo-500 to-violet-500",
                desc: "Build responsive, maintainable web apps using modern frameworks and clean architecture.",
              },
              {
                title: "Backend & APIs",
                gradient: "from-cyan-500 to-teal-500",
                desc: "Design and implement secure, well-documented APIs with Django or Laravel, ready to power your products.",
              },
              {
                title: "UI/UX & Branding",
                gradient: "from-purple-500 to-pink-500",
                desc: "Create clean interfaces, graphics, and layouts that match your brand and make your product easy to use.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-slate-700"
              >
                <div
                  className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${service.gradient}`}
                />
                <h3 className="text-sm font-semibold text-slate-100">{service.title}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="space-y-5">
          <SectionHeader>Key Projects</SectionHeader>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-indigo-500/30"
              >
                <div className="space-y-3">
                  {project.images?.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveGraphic({ name: project.name, images: project.images })
                      }
                      className="h-36 w-full overflow-hidden rounded-lg bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      <Image
                        src={project.images[0]}
                        alt={project.name}
                        width={400}
                        height={200}
                        className="h-full w-full object-cover transition hover:scale-105"
                      />
                    </button>
                  )}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-100">{project.name}</h3>
                      {project.status && (
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">{project.description}</p>
                    {project.highlights?.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-slate-400">
                        {project.highlights.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${getTechColor(item)}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      className="text-xs font-medium text-indigo-400 underline underline-offset-4 transition-colors hover:text-indigo-300"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  ) : (
                    <span className="text-xs text-slate-600">
                      {project.repoNote ?? "Repo coming soon"}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Graphic Design */}
        <section id="graphics" className="space-y-5">
          <SectionHeader>Graphic Design</SectionHeader>
          <p className="max-w-2xl text-sm text-slate-400">
            Selected graphic design work focusing on apparel, branding, and promotional materials.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {graphics.map((item) => (
              <article
                key={item.name}
                className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-purple-500/30"
              >
                {item.images?.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveGraphic({ name: item.name, images: item.images })
                    }
                    className="mb-3 block h-44 w-full overflow-hidden rounded-lg bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={400}
                      height={240}
                      className="h-full w-full object-cover transition hover:scale-105"
                    />
                  </button>
                )}
                <h3 className="text-sm font-semibold text-slate-100">{item.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Image Lightbox Modal */}
        {activeGraphic && (
          <ImageModal
            name={activeGraphic.name}
            images={activeGraphic.images}
            onClose={() => setActiveGraphic(null)}
          />
        )}

        {/* About */}
        <section id="about" className="space-y-5">
          <SectionHeader>About</SectionHeader>
          <p className="max-w-2xl text-justify text-sm leading-relaxed text-slate-400">
            I am a full-stack web developer and designer dedicated to building reliable,
            end-to-end digital solutions. I specialize in leveraging frameworks like Django and
            Laravel to engineer secure backend systems, while using JavaScript to create dynamic,
            responsive frontends. Beyond standard web development, I enjoy tackling unique
            technical challenges — whether that means scripting network automations, integrating
            IoT components, or developing efficient management platforms. By combining this
            technical depth with a sharp eye for UI/UX and graphic design using Photoshop and
            Illustrator, I bridge the gap between complex functionality and polished,
            user-friendly experiences.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="space-y-5 border-t border-slate-800 pt-10">
          <SectionHeader>Contact</SectionHeader>
          <p className="text-sm text-slate-400">Have a project in mind? I would love to hear from you.</p>
          <div className="flex flex-col gap-3">
            {[
              {
                href:
                  "mailto:elbernberdera@gmail.com" +
                  "?subject=" +
                  encodeURIComponent("Project Inquiry from Portfolio") +
                  "&body=" +
                  encodeURIComponent(
                    "Hi Elbern,\n\nI saw your portfolio and would like to discuss a project.\n\n- Project type:\n- Timeline:\n- Budget (range):\n\nBest,\n"
                  ),
                label: "Email",
                display: "elbernberdera@gmail.com",
                badge: "@",
                badgeClass: "bg-indigo-500/15 text-indigo-400",
              },
              {
                href: "https://github.com/elbernberdera",
                label: "GitHub",
                display: "github.com/elbernberdera",
                badge: "GH",
                badgeClass: "bg-slate-700/60 text-slate-300",
                external: true,
              },
              {
                href: "https://linkedin.com/in/elbern-berdera-7ab345377",
                label: "LinkedIn",
                display: "linkedin.com/in/elbern-berdera-7ab345377",
                badge: "in",
                badgeClass: "bg-blue-500/15 text-blue-400",
                external: true,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 transition hover:border-indigo-500/40 hover:bg-slate-900"
              >
                <span
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${item.badgeClass}`}
                >
                  {item.badge}
                </span>
                <div>
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-sm font-medium text-slate-200 transition-colors group-hover:text-indigo-300">
                    {item.display}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
          © 2025 El Bern S. Berdera
        </footer>
      </main>
    </div>
  );
}
