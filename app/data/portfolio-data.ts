export type Project = {
  name: string;
  description: string;
  link: string | null;
  tech: string[];
  images: string[];
  highlights: string[];
  status?: string;
  repoNote?: string;
};

export type Graphic = {
  name: string;
  description: string;
  images: string[];
};

export const skills = [
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

export const skillColors: Record<string, string> = {
  "Web Development": "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  Django: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Laravel: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  Python: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  PHP: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Java: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  JavaScript: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  "UI/UX Design": "bg-purple-500/15 text-purple-300 border-purple-500/30",
  "Graphic Design (Photoshop, Illustrator)":
    "bg-pink-500/15 text-pink-300 border-pink-500/30",
};

export const techColors: Record<string, string> = {
  Django: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Laravel: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  Python: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  PHP: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  MySQL: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Mysql: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  mysql: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  JavaScript: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Java: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  ESP32: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  Automation: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

export const projects: Project[] = [
  {
    name: "Task Monitoring System",
    description:
      "A web-based task monitoring system designed to help teams track work items end‑to‑end — from assignment to completion — with clear status visibility and progress reporting.",
    link: "https://github.com/elbernberdera/Task-Monitoring",
    tech: ["Django", "MySQL"],
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
    images: [
      "/images/philHealth_inventory.png",
      "/images/philHealth_inventory2.png",
    ],
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
    tech: ["Django", "MySQL"],
    images: ["/images/agila1.png", "/images/agila2.png"],
    highlights: [
      "Inventory item management and monitoring",
      "Tracks stock availability for daily operations",
      "Built for a real business workflow",
    ],
  },
];

export const graphics: Graphic[] = [
  {
    name: "Custom Warmer Jacket Design",
    description:
      "Performance sportswear warmer jacket layouts designed in Photoshop with bold gradients and sponsor branding.",
    images: ["/images/warmer.png"],
  },
  {
    name: "Custom T‑Shirt Design",
    description:
      "Performance sublimated t‑shirt layouts designed in Photoshop with bold gradients and sponsor branding.",
    images: ["/images/t-shirt.jpg", "/images/t-shirt2.jpg", "/images/sport1.jpg"],
  },
  {
    name: "Custom Polo Shirt Design",
    description:
      "Performance polo shirt layouts designed in Photoshop with clean lines and professional branding.",
    images: ["/images/polo2.jpg", "/images/polo1.jpg"],
  },
];
