

"use client";
import Image from "next/image";
import { useState } from "react";


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

const projects = [
  {
    name: "Task Monitoring System",
    description:
      "Web-based task monitoring application to track work items, status, and progress for teams and projects.",
    link: "https://github.com/elbernberdera/Task-Monitoring",
    tech: ["Django", "Mysql"],
    image: "/images/Task_Monitoring.png",
  },
  {
    name: "Smart Home Monitoring System",
    description:
      "Django and ESP32-based web application to remotely control home appliances, lighting, and security systems.",
    link: "https://github.com/elbernberdera/Smart_home_monitoring",
    tech: ["Django", "MySQL", "ESP32"],
    image: "/images/Smart_home_monitoring.png",
  },
  {
    name: "PhilHealth Inventory System",
    description:
      "Web-based inventory management system using a FIFO method to efficiently track and manage physical assets.",
    link: "https://github.com/elbernberdera/PhilHealth_inventory",
    tech: ["PHP", "MySQL"],
    image: "/images/PhilHealth_inventory.png",
  },
  {
    name: "DICT Job Portal",
    description:
      "Laravel web application to manage job postings, employer accounts, and applicant submissions.",
    link: "https://github.com/elbernberdera/Job-Portal",
    tech: ["Laravel", "MySQL"],
    image: "/images/job_portal1.png",
  },
  {
    name: "Network Automation Script",
    description:
      "Python script to automate and speed up manual configuration of network modems.",
    link: "https://github.com/elbernberdera/script",
    tech: ["Python", "Automation"],
    image: "/images/network_automation.png",
  },
];

const graphics = [
  {
    name: "Custom Warmer Jacket Design",
    description:
      "Performance sportswear jersey layout designed in Photoshop with bold gradients and sponsor branding.",
    image: "/images/Loongsleeve With Hoodie1.png",
  },
];














export default function Home() {
  const [activeGraphic, setActiveGraphic] = useState<{
    name: string;
    image: string;
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
                alt="Elbern Berdera"
                width={96}
                height={96}
              />
            </div>
            <div className="space-y-4">
            <p className="text-sm font-medium tracking-wide text-zinc-500">
              Portfolio
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Elbern Berdera
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
              <p className="max-w-xl text-sm leading-relaxed text-zinc-600">
                A multi‑disciplinary developer with a passion for building clean
                web experiences, crafting reliable software, and designing
                visuals that communicate clearly.
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
          <p className="max-w-2xl text-sm text-zinc-600">
            A mix of development and design skills that allow me to handle an
            entire project from concept to deployment.
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
                {project.image && (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveGraphic({ name: project.name, image: project.image })
                            }
                            className="h-32 w-full overflow-hidden rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:ring-offset-white"
                          >
                            <Image
                              src={project.image}
                              alt={project.name}
                              width={400}
                              height={200}
                              className="h-full w-full object-cover transition hover:scale-105"
                            />
                          </button>
                        )}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold">{project.name}</h3>
                    <p className="text-xs leading-relaxed text-zinc-600">
                      {project.description}
                    </p>
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
                  <a
                    href={project.link}
                    className="text-xs font-medium text-zinc-800 underline underline-offset-4 hover:text-zinc-950"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub
                  </a>
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
                {item.image && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveGraphic({ name: item.name, image: item.image })
                    }
                    className="mb-3 block h-40 w-full overflow-hidden rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    <Image
                      src={item.image}
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
                <div className="relative max-h-[70vh] w-full overflow-auto rounded-xl bg-zinc-900">
                  <Image
                    src={activeGraphic.image}
                    alt={activeGraphic.name}
                    width={1200}
                    height={800}
                    className="h-auto w-full object-contain"
                  />
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
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">
            I specialize in web development using Django and Laravel, and I am
            proficient in Python, PHP, Java, and JavaScript. Alongside backend
            and frontend development, I create UI/UX and graphic design work
            using tools like Photoshop and Illustrator, allowing me to build
            both functional and visually polished experiences.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="space-y-4 border-t border-zinc-200 pt-8">
          <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
          <div className="space-y-1 text-sm text-zinc-700">
            <p>
              Email:{" "}
              <a
                href="mailto:elbernberdera@gmail.com"
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
