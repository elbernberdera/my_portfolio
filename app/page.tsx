"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  skills,
  skillColors,
  techColors,
  projects,
  graphics,
  type ProjectCategory,
} from "./data/portfolio-data";
import ImageModal from "./components/ImageModal";
import Reveal from "./components/Reveal";
import AutomationSection from "./components/AutomationSection";
import TypingRoles from "./components/TypingRoles";
import CountUp from "./components/CountUp";
import ScrollProgress from "./components/ScrollProgress";
import TiltCard from "./components/TiltCard";

const LINKEDIN_URL = "https://www.linkedin.com/in/elbern-berdera/";
const GITHUB_URL = "https://github.com/elbernberdera";
const RESUME_URL = "/resume/Berdera_elbern_resume.pdf";

const navItems = [
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "automation", label: "Automation" },
  { id: "experience", label: "Experience" },
  { id: "design-work", label: "Design" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const featuredSkills = Array.from(
  new Set([
    "Django",
    "Laravel",
    "Next.js",
    "PostgreSQL",
    "MongoDB",
    "REST APIs",
    "Data Pipelines",
    "Workflow Automation",
    ...skills,
  ]),
);

const services = [
  {
    title: "Custom Web Applications",
    gradient: "from-indigo-500 to-violet-500",
    description:
      "Responsive, maintainable applications designed around real business workflows and long-term growth.",
  },
  {
    title: "Backend APIs & Integrations",
    gradient: "from-cyan-500 to-teal-500",
    description:
      "Secure REST APIs, authentication, database services, and third-party platform integrations.",
  },
  {
    title: "Internal Tools",
    gradient: "from-violet-500 to-fuchsia-500",
    description:
      "Administrative dashboards, task platforms, inventory systems, and operational applications.",
  },
  {
    title: "Data Pipelines & Automation",
    gradient: "from-emerald-500 to-cyan-500",
    description:
      "Extraction, validation, transformation, synchronization, retries, and automated processing workflows.",
  },
];

const experience = [
  {
    role: "Full-Stack Web Developer & Data Pipeline Engineer",
    organization: "Independent Contract",
    period: "June 2026 – Present",
    location: "Remote · Butuan City, Philippines",
    highlights: [
      "Build web applications, backend APIs, internal tools, database integrations, and automated data workflows for remote teams.",
      "Develop and troubleshoot systems using Python, Django, PostgreSQL, MongoDB, third-party APIs, and cloud platforms.",
      "Improve reliability through validation, batching, retry handling, structured logging, and idempotent database operations.",
      "Produce implementation documentation, architecture notes, deployment instructions, and asynchronous engineering handoffs.",
    ],
  },
  {
    role: "Web Development Intern",
    organization:
      "Department of Information and Communications Technology – Caraga Region",
    period: "June 2025 – August 2025",
    location: "Butuan City, Philippines",
    highlights: [
      "Developed a Django task monitoring system with assignments, statuses, attachments, administrative controls, and role-based dashboards.",
      "Contributed to a Laravel recruitment platform with employer and applicant accounts, job postings, résumé uploads, application tracking, filters, and notifications.",
      "Presented working applications to supervisors, gathered feedback, and implemented requested revisions.",
    ],
  },
  {
    role: "IT Support & Network Automation Intern",
    organization: "AFTECH IT Solution",
    period: "January 2025 – March 2025",
    location: "Butuan City, Philippines",
    highlights: [
      "Developed a Python and Selenium automation script for repetitive router and modem configuration tasks.",
      "Assisted with fiber-optic splicing, LAN planning, hardware setup, network troubleshooting, and technical documentation.",
    ],
  },
];

const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Apps" },
  { id: "automation", label: "Automation" },
  { id: "ai", label: "AI" },
];

const isLive = (status?: string) =>
  !!status &&
  (status.toLowerCase().includes("live") ||
    status.toLowerCase().includes("deployed"));

// Live demos first; otherwise keep the order from the data file
const orderedProjects = [...projects].sort(
  (a, b) => Number(isLive(b.status)) - Number(isLive(a.status)),
);

const liveCount = projects.filter((project) => isLive(project.status)).length;

const heroStats = [
  // +1 for the data-pipeline case study shown alongside the data-file projects
  { value: projects.length + 1, label: "Projects built" },
  { value: liveCount, label: "Live demos" },
  { value: "GMT+8", label: "Remote-ready" },
];

const heroRoles = [
  "Full-Stack Web Developer",
  "Automation Engineer",
  "Data Pipeline Builder",
  "Backend API Developer",
];

const getTechColor = (tech: string) =>
  techColors[tech] ?? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";

const getSkillColor = (skill: string) =>
  skillColors[skill] ?? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";

function SectionHeader({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
          {eyebrow}
        </p>
      )}

      <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
        <span className="h-7 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-500" />
        {children}
      </h2>
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

export default function Home() {
  const [activeGraphic, setActiveGraphic] = useState<{
    name: string;
    images: string[];
  } | null>(null);
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [activeSection, setActiveSection] = useState("");
  const [showTop, setShowTop] = useState(false);

  const closeModal = useCallback(() => setActiveGraphic(null), []);

  // Highlight the nav link for whichever section is in the middle of the viewport
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const visibleProjects =
    filter === "all"
      ? orderedProjects
      : orderedProjects.filter((project) => project.category === filter);
  const showPipelineCaseStudy = filter === "all" || filter === "automation";

  const automationHref =
    "mailto:elbernberdera@gmail.com" +
    "?subject=" +
    encodeURIComponent("Automation Project Inquiry") +
    "&body=" +
    encodeURIComponent(
      "Hi El Bern,\n\nI have a workflow I'd like to automate.\n\n- What happens today (manual steps):\n- Systems / data sources involved:\n- How often it runs:\n- Timeline:\n\nBest,\n",
    );

  const emailHref =
    "mailto:elbernberdera@gmail.com" +
    "?subject=" +
    encodeURIComponent("Project Inquiry from Portfolio") +
    "&body=" +
    encodeURIComponent(
      "Hi El Bern,\n\nI saw your portfolio and would like to discuss a project.\n\n- Project type:\n- Timeline:\n- Budget range:\n\nBest,\n",
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ScrollProgress />

      <nav
        aria-label="Primary navigation"
        className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="shrink-0 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-sm font-bold tracking-tight text-transparent sm:text-base"
          >
            El Bern S. Berdera
          </a>

          <div className="flex min-w-0 items-center gap-4 overflow-x-auto whitespace-nowrap py-1.5 text-sm font-medium text-slate-400 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`relative transition-colors hover:text-indigo-300 ${
                  activeSection === item.id
                    ? "text-indigo-300 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-gradient-to-r after:from-indigo-400 after:to-cyan-400"
                    : ""
                }`}
              >
                {item.label}
              </a>
            ))}

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 px-3 py-1.5 text-indigo-300 transition hover:border-indigo-400 hover:bg-indigo-500/10"
            >
              View Résumé
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </nav>

      <main
        id="top"
        className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-5 py-14 sm:px-6 sm:py-20 lg:gap-28 lg:px-8"
      >
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/35 px-6 py-10 shadow-2xl shadow-slate-950/50 sm:px-10 sm:py-14 lg:px-14"
        >
          <div className="pointer-events-none absolute -left-20 -top-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl animate-[aurora-a_18s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute right-10 top-0 h-72 w-72 rounded-full bg-cyan-600/15 blur-3xl animate-[aurora-b_22s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl animate-[aurora-c_26s_ease-in-out_infinite]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
                Available for remote contract projects
              </span>

              <div className="space-y-4">
                <h1
                  id="hero-heading"
                  className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-[length:200%_auto] bg-clip-text text-4xl font-bold tracking-tight text-transparent animate-[gradient-pan_8s_ease-in-out_infinite] sm:text-5xl lg:text-6xl"
                >
                  El Bern S. Berdera
                </h1>

                {/* min-height reserves two lines on phones so the typing never shifts the layout */}
                <p className="min-h-[3rem] text-base font-semibold uppercase tracking-[0.18em] text-slate-300 sm:min-h-[1.75rem] sm:text-lg">
                  <TypingRoles roles={heroRoles} />
                </p>
              </div>

              <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                I build reliable custom web applications, internal tools,
                backend APIs, and automated data workflows for startups and
                remote teams.
              </p>

              <p className="text-sm font-medium text-slate-400 sm:text-base">
                Django · Laravel · Next.js · PostgreSQL · MongoDB
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#projects"
                  className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40"
                >
                  View Projects
                </a>

                <a
                  href={emailHref}
                  className="rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-indigo-500/60 hover:text-indigo-200"
                >
                  Discuss a Project
                </a>

                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-500/60 hover:text-cyan-200"
                >
                  View Résumé
                  <ExternalLinkIcon />
                </a>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                <a
                  href="mailto:elbernberdera@gmail.com"
                  className="transition-colors hover:text-indigo-300"
                >
                  elbernberdera@gmail.com
                </a>

                <span aria-hidden="true">·</span>

                <a
                  href={LINKEDIN_URL}
                  className="transition-colors hover:text-indigo-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>

                <span aria-hidden="true">·</span>
                <span>Butuan City, Philippines</span>
              </div>

              <dl className="grid max-w-md grid-cols-3 gap-3 pt-2">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-800 bg-slate-950/50 px-3 py-3 text-center"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                      {typeof stat.value === "number" ? (
                        <CountUp value={stat.value} />
                      ) : (
                        stat.value
                      )}
                    </dd>
                    <dd
                      aria-hidden="true"
                      className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-500"
                    >
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative mx-auto w-56 animate-[float-soft_7s_ease-in-out_infinite] sm:w-64 lg:mx-0 lg:w-[300px]">
              <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-500/40 via-purple-500/20 to-cyan-500/40 blur-2xl" />

              <div className="relative rounded-[1.75rem] bg-gradient-to-br from-indigo-400/70 via-purple-400/40 to-cyan-400/70 p-[2px] shadow-2xl shadow-indigo-950/60">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.65rem] bg-slate-100">
                  {/* profile3.png is 1086×1448; request a high quality, retina-sized render so it stays sharp */}
                  <Image
                    src="/images/profile3.png"
                    alt="Professional portrait of El Bern S. Berdera"
                    fill
                    priority
                    quality={95}
                    sizes="(max-width: 640px) 256px, 320px"
                    className="object-cover object-[50%_12%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Reveal>
          <section id="skills" className="scroll-mt-24 space-y-7">
            <SectionHeader eyebrow="Technical foundation">
              Core Skills
            </SectionHeader>

            <p className="max-w-3xl text-base leading-8 text-slate-400">
              I work across the application lifecycle—from database architecture
              and backend services to frontend integration, deployment,
              debugging, automation, and technical documentation.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {featuredSkills.map((skill) => (
                <span
                  key={skill}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium ${getSkillColor(
                    skill,
                  )}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="services" className="scroll-mt-24 space-y-7">
            <SectionHeader eyebrow="How I help">Services</SectionHeader>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <Reveal
                  key={service.title}
                  delay={index * 110}
                  className="h-full"
                >
                  <TiltCard className="h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900">
                    <div
                      className={`mb-5 h-1 w-14 rounded-full bg-gradient-to-r ${service.gradient}`}
                    />

                    <h3 className="text-base font-semibold text-slate-100">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {service.description}
                    </p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <section id="projects" className="scroll-mt-24 space-y-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader eyebrow="Selected work">Key Projects</SectionHeader>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              Click a project image to review additional screenshots.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects"
            className="flex flex-wrap gap-2"
          >
            {projectFilters.map((option) => {
              const count =
                option.id === "all"
                  ? projects.length + 1
                  : projects.filter((p) => p.category === option.id).length +
                    (option.id === "automation" ? 1 : 0);
              const selected = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(option.id)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    selected
                      ? "border-indigo-400/60 bg-indigo-500/15 text-indigo-200"
                      : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
                >
                  {option.label}
                  <span className="ml-1.5 text-xs text-slate-500">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {visibleProjects.map((project, index) => (
              <Reveal
                key={project.name}
                delay={(index % 2) * 120}
                className="h-full"
              >
                <TiltCard className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 hover:-translate-y-1 hover:border-indigo-500/35">
                  <div>
                    {project.images?.length > 0 && (
                      <button
                        type="button"
                        aria-label={`Open screenshots for ${project.name}`}
                        onClick={() =>
                          setActiveGraphic({
                            name: project.name,
                            images: project.images,
                          })
                        }
                        className="group/image h-52 w-full overflow-hidden bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <Image
                          src={project.images[0]}
                          alt={`${project.name} interface preview`}
                          width={720}
                          height={420}
                          className="h-full w-full object-cover transition duration-300 group-hover/image:scale-105"
                        />
                      </button>
                    )}

                    <div className="space-y-4 p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-100">
                          {project.name}
                        </h3>

                        {project.status && (
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                              isLive(project.status)
                                ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                                : "border-amber-500/30 bg-amber-500/15 text-amber-300"
                            }`}
                          >
                            {project.status}
                          </span>
                        )}
                      </div>

                      <p className="text-sm leading-7 text-slate-400">
                        {project.description}
                      </p>

                      {project.highlights?.length > 0 && (
                        <ul className="space-y-2 text-sm text-slate-400">
                          {project.highlights.map((point) => (
                            <li key={point} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                              <span className="leading-6">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-slate-800/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getTechColor(
                            item,
                          )}`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {project.link ? (
                      <a
                        href={project.link}
                        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.link.includes("github.com")
                          ? "View repository"
                          : "Live Demo"}
                        <ExternalLinkIcon />
                      </a>
                    ) : (
                      <span className="text-sm text-slate-500">
                        {project.repoNote === "Repo coming soon"
                          ? "Case study in progress"
                          : (project.repoNote ?? "Private project")}
                      </span>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            ))}

            {showPipelineCaseStudy && (
              <Reveal
                delay={(visibleProjects.length % 2) * 120}
                className="h-full"
              >
                <TiltCard
                  glow="34, 211, 238"
                  className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 hover:-translate-y-1 hover:border-cyan-400/40"
                >
                  <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-slate-800/80 bg-slate-950/70 p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_65%)]" />

                    <div className="relative grid w-full max-w-md grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 text-center text-xs font-semibold text-slate-300">
                      <span className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-4">
                        Extract
                      </span>
                      <span className="text-cyan-400">→</span>
                      <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-4">
                        Validate
                      </span>
                      <span className="text-cyan-400">→</span>
                      <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-4">
                        Sync
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-100">
                        Automated Data Extraction & Enrichment Pipeline
                      </h3>

                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                        Sanitized case study
                      </span>
                    </div>

                    <p className="text-sm leading-7 text-slate-400">
                      A resilient workflow for collecting source records,
                      extracting structured information, validating outputs,
                      processing batches, retrying transient failures, and
                      synchronizing results across relational and document
                      databases.
                    </p>

                    <ul className="space-y-2 text-sm text-slate-400">
                      {[
                        "Schema validation and post-run verification",
                        "Micro-batch processing with exponential backoff",
                        "Idempotent upserts and structured error logging",
                      ].map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 border-t border-slate-800/80 px-6 py-5">
                    {[
                      "Python",
                      "PostgreSQL",
                      "MongoDB",
                      "Firecrawl",
                      "Windmill",
                    ].map((item) => (
                      <span
                        key={item}
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getTechColor(
                          item,
                        )}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            )}
          </div>
        </section>

        <section id="automation" className="scroll-mt-24 space-y-7">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader eyebrow="Work that runs itself">
                Automation
              </SectionHeader>

              <p className="max-w-md text-sm leading-6 text-slate-500">
                I turn repetitive, error-prone manual steps into scheduled,
                observable workflows that are safe to re-run.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <AutomationSection contactHref={automationHref} />
          </Reveal>
        </section>

        <Reveal>
          <section id="experience" className="scroll-mt-24 space-y-8">
            <SectionHeader eyebrow="Professional background">
              Experience
            </SectionHeader>

            <div className="relative space-y-6 before:absolute before:bottom-4 before:left-3 before:top-4 before:w-px before:bg-slate-800">
              {experience.map((item) => (
                <article
                  key={`${item.role}-${item.organization}`}
                  className="relative ml-8 rounded-2xl border border-slate-800 bg-slate-900/55 p-6"
                >
                  <span className="absolute -left-[2.05rem] top-7 h-3 w-3 rounded-full border-2 border-slate-950 bg-gradient-to-br from-indigo-400 to-cyan-400 ring-4 ring-slate-950" />

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">
                        {item.role}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-indigo-300">
                        {item.organization}
                      </p>
                    </div>

                    <div className="text-sm text-slate-500 sm:text-right">
                      <p>{item.period}</p>
                      <p>{item.location}</p>
                    </div>
                  </div>

                  <ul className="mt-5 grid gap-2 text-sm leading-6 text-slate-400">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="design-work" className="scroll-mt-24 space-y-7">
            <SectionHeader eyebrow="Supporting capability">
              Selected Design Work
            </SectionHeader>

            <p className="max-w-3xl text-base leading-8 text-slate-400">
              Selected visual-design work demonstrating supporting experience in
              branding, apparel layouts, and production-ready promotional
              graphics.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {graphics.map((item) => (
                <article
                  key={item.name}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition hover:-translate-y-1 hover:border-purple-500/35"
                >
                  {item.images?.length > 0 && (
                    <button
                      type="button"
                      aria-label={`Open images for ${item.name}`}
                      onClick={() =>
                        setActiveGraphic({
                          name: item.name,
                          images: item.images,
                        })
                      }
                      className="group/image block h-52 w-full overflow-hidden bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <Image
                        src={item.images[0]}
                        alt={`${item.name} design preview`}
                        width={520}
                        height={340}
                        className="h-full w-full object-cover transition duration-300 group-hover/image:scale-105"
                      />
                    </button>
                  )}

                  <div className="p-5">
                    <h3 className="text-base font-semibold text-slate-100">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        {activeGraphic && (
          <ImageModal
            name={activeGraphic.name}
            images={activeGraphic.images}
            onClose={closeModal}
          />
        )}

        <Reveal>
          <section id="about" className="scroll-mt-24 space-y-7">
            <SectionHeader eyebrow="Working style">About</SectionHeader>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.7fr)]">
              <div className="space-y-5 text-base leading-8 text-slate-400">
                <p>
                  I am a full-stack web developer specializing in custom web
                  applications, backend APIs, internal tools, database
                  integrations, and automated data workflows.
                </p>

                <p>
                  I work primarily with Python, PHP, JavaScript, Django,
                  Laravel, Next.js, PostgreSQL, MongoDB, and MySQL. My
                  experience includes developing role-based business
                  applications, designing database structures, integrating
                  third-party services, troubleshooting application failures,
                  and improving workflow reliability through validation,
                  batching, retries, logging, and idempotent operations.
                </p>

                <p>
                  I also have supporting experience in UI/UX and graphic design,
                  allowing me to work effectively across system functionality,
                  interface clarity, and technical documentation.
                </p>
              </div>

              <aside className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">
                  Best fit projects
                </p>

                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                  {[
                    "Custom business applications",
                    "Internal dashboards and operations tools",
                    "Backend APIs and database integrations",
                    "Automation and data-pipeline stabilization",
                    "Technical debugging and documentation",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="contact"
            className="scroll-mt-24 space-y-7 rounded-3xl border border-slate-800 bg-slate-900/55 p-6 sm:p-10"
          >
            <SectionHeader eyebrow="Start a conversation">
              Contact
            </SectionHeader>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-xl font-semibold text-slate-100 sm:text-2xl">
                  Have a web application, API, internal tool, or automation
                  project in mind?
                </p>

                <p className="text-base leading-7 text-slate-400">
                  Send a short description of the problem, preferred timeline,
                  and budget range. I will respond with the next practical
                  steps.
                </p>
              </div>

              <a
                href={emailHref}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40"
              >
                Discuss a Project
              </a>
            </div>

            <div className="grid gap-3 pt-2 md:grid-cols-3">
              {[
                {
                  href: emailHref,
                  label: "Email",
                  display: "elbernberdera@gmail.com",
                  badge: "@",
                  badgeClass: "bg-indigo-500/15 text-indigo-300",
                },
                {
                  href: GITHUB_URL,
                  label: "GitHub",
                  display: "github.com/elbernberdera",
                  badge: "GH",
                  badgeClass: "bg-slate-700/60 text-slate-300",
                  external: true,
                },
                {
                  href: LINKEDIN_URL,
                  label: "LinkedIn",
                  display: "linkedin.com/in/elbern-berdera",
                  badge: "in",
                  badgeClass: "bg-blue-500/15 text-blue-300",
                  external: true,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 transition hover:border-indigo-500/40 hover:bg-slate-950"
                >
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${item.badgeClass}`}
                  >
                    {item.badge}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">{item.label}</p>

                    <p className="truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-indigo-300">
                      {item.display}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </Reveal>

        <footer className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} El Bern S. Berdera. All rights
            reserved.
          </p>
        </footer>
      </main>

      <a
        href="#top"
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-indigo-400/40 bg-slate-900/90 text-indigo-200 shadow-lg shadow-indigo-950/50 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 ${
          showTop
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>
    </div>
  );
}
