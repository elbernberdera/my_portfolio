

"use client";
import Image from "next/image";
import { useState } from "react";

type Project = {
  name: string;
  description: string;
  link: string | null;
  tech: string[];
  images: string[];
  highlights: string[];
  status?: string;
  repoNote?: string;
};

const skills = [
  "Web Development",
  "Django",
  "Laravel",
  "Python",
  "PHP",
  "Java",
  "JavaScript",
  "UI/UX Design",
  "Graphic Design (Photoshop, Illustrator)",
];

const projects: Project[] = [
  {
    name: "Task Monitoring System",
    description:
      "A web-based task monitoring system designed to help teams track work items end‑to‑end — from assignment to completion — with clear status visibility and progress reporting.",
    link: "https://github.com/elbernberdera/Task-Monitoring",
    tech: ["Django", "Mysql"],
    images: ["/images/task_monitoring.png"],
    highlights: [
      "Create and assign tasks with status tracking",
      "Progress monitoring dashboard for teams",
      "Organized workflow to reduce missed work items",
    ],
  },
  {
    name: "Smart Home Monitoring System",
    description:
      "A Django + ESP32 smart home web app that lets you monitor and control connected appliances, lighting, and security features remotely with a simple, user-friendly interface.",
    link: "https://github.com/elbernberdera/Smart_home_monitoring",
    tech: ["Django", "MySQL", "ESP32"],
    images: ["/images/Smart_home_monitoring.png"],
    highlights: [
      "Remote device control and monitoring",
      "ESP32 integration for real-time automation",
      "Centralized controls for home systems",
    ],
  },
  {
    name: "PhilHealth Inventory System",
    description:
      "A web-based inventory management system built around a FIFO process to keep stock movement accurate, auditable, and easy to manage for day-to-day operations.",
    link: "https://github.com/elbernberdera/PhilHealth_inventory",
    tech: ["PHP", "MySQL"],
    images: ["/images/philHealth_inventory.png","/images/philHealth_inventory2.png"],
    highlights: [
      "FIFO-based stock movement tracking",
      "Asset/stock monitoring for day-to-day operations",
      "Improves accuracy and inventory visibility",
    ],
  },
  {
    name: "DICT Job Portal",
    description:
      "A full-featured Laravel job portal that manages job listings, employer accounts, and applicant submissions — built to support recruitment workflows with a clean and accessible UI.",
    link: "https://github.com/elbernberdera/Job-Portal",
    tech: ["Laravel", "MySQL"],
    images: ["/images/job_portal1.png"],
    highlights: [
      "Job posting and search experience",
      "Employer and applicant account flows",
      "Application submission and basic management",
    ],
  },
  {
    name: "Network Automation Script",
    description:
      "A Python automation tool that speeds up repetitive modem configuration tasks by standardizing steps and reducing manual setup time.",
    link: "https://github.com/elbernberdera/script",
    tech: ["Python", "Automation"],
    images: ["/images/network_automation.png"],
    highlights: [
      "Automates repetitive configuration steps",
      "Reduces manual errors during setup",
      "Improves setup time and consistency",
    ],
  },
  {
    name: "Agila Autosupply Inventory System",
    description:
      "A Django-based inventory system for an auto supply business, designed to manage items, track stock movement, and support faster day-to-day inventory operations.",
    status: "Under development",
    link: null,
    tech: ["Django", "mysql"],
    images: ["/images/agila1.png","/images/agila2.png"],
    highlights: [
      "Inventory item management and monitoring",
      "Tracks stock availability for daily operations",
      "Built for a real business workflow",
    ],
  },
];




const graphics = [
  {
    name: "Custom Warmer Jacket Design",
    description:
      "Performance sportswear warmer jacket layouts designed in Photoshop with bold gradients and sponsor branding.",
    images: [
      "/images/warmer.png"
    ],
  },
  {
    name: "Custom T‑Shirt Design",
    description:
      "Performance sublimated t‑shirt layouts designed in Photoshop with bold gradients and sponsor branding.",
    images: [
      "/images/t-shirt.jpg",
      "/images/t-shirt2.jpg",
      "/images/sport1.jpg",
    ],
  },
  {
    name: "Custom Polo Shirt Design",
    description:
      "Performance polo shirt layouts designed in Photoshop with clean lines and professional branding.",
    images: [
      "/images/polo2.jpg",
      "/images/polo1.jpg",
    ],
  },
];














export default function Home() {
  const [activeGraphic, setActiveGraphic] = useState<{
    name: string;
    images: string[];
  } | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-16 px-6 py-16 sm:px-10 sm:py-20">
        {/* Hero */}
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-6">
            <div className="hidden h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 sm:block">
              <Image
                src="/images/profile.jpg"
                alt="El Bern S. Berdera"
                width={96}
                height={96}
              />
            </div>
            <div className="space-y-4">
            <p className="text-sm font-medium tracking-wide text-zinc-500">
              Portfolio
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                El Bern S. Berdera
            </h1>
            <p className="text-lg font-medium text-zinc-700">
                WEB DEVELOPER, SOFTWARE DEVELOPER, AND GRAPHIC DESIGNER
            </p>
              <p className="max-w-xl text-xs leading-relaxed text-zinc-600">
                <span className="block">
                  <a
                    href="mailto:elbernberdera@gmail.com"
                    className="underline underline-offset-4"
                  >
                    elbernberdera@gmail.com
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://linkedin.com/in/elbern-berdera-7ab345377"
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/elbern-berdera-7ab345377
                  </a>{" "}
                  | Brgy. Obrero, Butuan City, Philippines
                </span>
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-600 text-justify">
              A multi-disciplinary creator dedicated to building responsive web applications, 
              robust APIs, and intuitive user interfaces. I combine strong technical problem-solving 
              with creative design to deliver complete, highly polished digital experiences.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#projects"
                  className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition hover:bg-zinc-800"
                >
                  View projects
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-800 hover:text-zinc-900"
                >
                  Contact me
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
          <p className="max-w-2xl text-sm text-zinc-600 text-justify">
          Specializing in full-stack web development, I build responsive, user-centric frontends 
          and architect robust, secure backend systems. From designing database schemas and developing APIs to
           polishing the final user interface, 
          I have the technical depth to manage the entire application lifecycle.
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold tracking-tight">
            What I can do for you
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Web Applications</h3>
              <p className="text-xs leading-relaxed text-zinc-600">
                Build responsive, maintainable web apps using modern frameworks
                and clean architecture.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Backend & APIs</h3>
              <p className="text-xs leading-relaxed text-zinc-600">
                Design and implement secure, well-documented APIs with Django or
                Laravel, ready to power your products.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">UI/UX & Branding</h3>
              <p className="text-xs leading-relaxed text-zinc-600">
                Create clean interfaces, graphics, and layouts that match your
                brand and make your product easy to use.
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Key Projects</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <div className="space-y-2">
                  {project.images?.length > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveGraphic({
                          name: project.name,
                          images: project.images,
                        })
                      }
                      className="h-32 w-full overflow-hidden rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:ring-offset-white"
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
                      <h3 className="text-sm font-semibold">{project.name}</h3>
                      {project.status ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-900">
                          {project.status}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-600">
                      {project.description}
                    </p>
                    {project.highlights?.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-zinc-600">
                        {project.highlights.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      className="text-xs font-medium text-zinc-800 underline underline-offset-4 hover:text-zinc-950"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on GitHub
                    </a>
                  ) : (
                    <span className="text-xs font-medium text-zinc-500">
                      {project.repoNote ?? "GitHub repository coming soon."}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Graphics */}
        <section id="graphics" className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Graphic Design</h2>
          <p className="max-w-2xl text-sm text-zinc-600">
            Selected graphic design work focusing on apparel, branding, and
            promotional materials.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {graphics.map((item) => (
              <article
                key={item.name}
                className="flex flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                {item.images?.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveGraphic({ name: item.name, images: item.images })
                    }
                    className="mb-3 block h-40 w-full overflow-hidden rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:ring-offset-white"
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
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {activeGraphic && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={() => setActiveGraphic(null)}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white p-3 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveGraphic(null)}
                className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white hover:bg-black"
              >
                Close
              </button>
              <div className="flex flex-col gap-3">
                <div className="relative max-h-[70vh] w-full overflow-auto rounded-xl bg-zinc-900 p-3">
                  {activeGraphic.images.length === 1 ? (
                    <div className="relative w-full overflow-hidden rounded-lg bg-black">
                      <Image
                        src={activeGraphic.images[0]}
                        alt={activeGraphic.name}
                        width={1200}
                        height={800}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="grid gap-3 md:grid-cols-2">
                      {activeGraphic.images.map((src) => (
                        <div
                          key={src}
                          className="relative w-full overflow-hidden rounded-lg bg-black"
                        >
                          <Image
                            src={src}
                            alt={activeGraphic.name}
                            width={1200}
                            height={800}
                            className="h-auto w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-center text-sm font-medium text-zinc-900">
                  {activeGraphic.name}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* About */}
        <section id="about" className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">About</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 text-justify">
          I am a full-stack web developer and designer dedicated to building reliable, end-to-end digital solutions. 
          I specialize in leveraging frameworks like Django and Laravel to engineer secure backend systems, while 
           using JavaScript to create dynamic, responsive frontends. Beyond standard web development, 
           I enjoy tackling unique technical challenges—whether that means scripting network automations, 
           integrating IoT components, or developing efficient management platforms. By combining this technical 
           depth with a sharp eye for UI/UX and graphic design using Photoshop and Illustrator, I bridge the gap 
           between complex functionality and polished, user-friendly experiences.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="space-y-4 border-t border-zinc-200 pt-8">
          <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
          <div className="space-y-1 text-sm text-zinc-700">
            <p>
              Email:{" "}
              <a
                href={
                  "mailto:elbernberdera@gmail.com" +
                  "?subject=" +
                  encodeURIComponent("Project Inquiry from Portfolio") +
                  "&body=" +
                  encodeURIComponent(
                    "Hi Elbern,\n\nI saw your portfolio and would like to discuss a project. Here are some details:\n\n- Project type:\n- Timeline:\n- Budget (range):\n\nBest,\n"
                  )
                }
                className="font-medium underline underline-offset-4"
              >
                elbernberdera@gmail.com
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/elbernberdera"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                github.com/elbernberdera
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/elbern-berdera-7ab345377"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                linkedin.com/in/elbern-berdera-7ab345377
              </a>
            </p>
          </div>


        </section>
      </main>
    </div>
  );
}
