"use client";

import { Fragment, useEffect, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

const steps = [
  {
    label: "Trigger",
    detail: "Schedule, webhook, or event",
    log: "[trigger]   scheduled run started",
    icon: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
  },
  {
    label: "Extract",
    detail: "APIs, websites, devices",
    log: "[extract]   fetched source records in micro-batches",
    icon: "M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  },
  {
    label: "Validate",
    detail: "Schema checks & dedupe",
    log: "[validate]  schema passed · invalid rows quarantined",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    label: "Transform",
    detail: "Clean, enrich, normalize",
    log: "[transform] records enriched and normalized",
    icon: "M4 4h6v6H4zM14 14h6v6h-6zM17 4v6m-3-3h6M7 14v6m-3-3h6",
  },
  {
    label: "Sync",
    detail: "Idempotent upserts",
    log: "[sync]      upserted to PostgreSQL + MongoDB · 1 retry on timeout ✓",
    icon: "M4 4v5h5M20 20v-5h-5M5.5 15a7 7 0 0 0 12.9 1.5M18.5 9A7 7 0 0 0 5.6 7.5",
  },
  {
    label: "Notify",
    detail: "Logs, reports, alerts",
    log: "[notify]    run summary sent · status=success",
    icon: "M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9",
  },
];

const capabilities = [
  {
    title: "Browser & device automation",
    description:
      "Python + Selenium scripts that configure routers and modems, replacing repetitive manual setup.",
    accent: "bg-indigo-400",
  },
  {
    title: "Data extraction & enrichment",
    description:
      "Pipelines that collect, structure, and validate records from websites and third-party APIs.",
    accent: "bg-cyan-400",
  },
  {
    title: "Workflow orchestration",
    description:
      "Scheduled flows with micro-batching, retry handling, exponential backoff, and structured logs.",
    accent: "bg-violet-400",
  },
  {
    title: "Database synchronization",
    description:
      "Idempotent upserts that keep relational and document databases in step without duplicates.",
    accent: "bg-emerald-400",
  },
  {
    title: "IoT automation",
    description:
      "ESP32-connected appliances monitored and controlled remotely through a Django dashboard.",
    accent: "bg-teal-400",
  },
];

const toolkit = [
  "Python",
  "Selenium",
  "Windmill",
  "Firecrawl",
  "REST APIs",
  "PostgreSQL",
  "MongoDB",
  "Django",
  "ESP32",
];

const STEP_MS = 1400;

function StepIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export default function AutomationSection({
  contactHref,
}: {
  contactHref: string;
}) {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  // -1 means "show every step at once"
  const active = reducedMotion ? -1 : step;

  useEffect(() => {
    if (reducedMotion) return;

    // One extra tick on the last step so the finished log stays readable before restarting
    const id = window.setInterval(
      () => setStep((current) => (current + 1) % (steps.length + 1)),
      STEP_MS,
    );
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const shownUpTo =
    active === -1 ? steps.length - 1 : Math.min(active, steps.length - 1);
  const isDone = (index: number) => active === -1 || index <= shownUpTo;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.10),transparent_60%)]" />

        <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-200">
            How a typical pipeline I build runs
          </p>

          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Illustrative run
          </span>
        </div>

        <ol className="relative flex flex-col items-stretch lg:flex-row lg:items-center">
          {steps.map((step, index) => {
            const current = active !== -1 && index === shownUpTo;
            return (
              <Fragment key={step.label}>
                {index > 0 && (
                  <li
                    aria-hidden="true"
                    className="relative mx-auto h-6 w-px overflow-hidden bg-slate-700/70 lg:mx-0 lg:h-px lg:w-auto lg:flex-1"
                  >
                    <span className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)] animate-[flow-y_1.4s_linear_infinite] lg:left-auto lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:animate-[flow-x_1.4s_linear_infinite]" />
                  </li>
                )}

                <li
                  className={`flex items-center gap-4 rounded-2xl border px-4 py-3 transition-all duration-500 lg:w-[8.75rem] lg:shrink-0 lg:flex-col lg:gap-2 lg:px-3 lg:py-4 lg:text-center ${
                    current
                      ? "border-cyan-400/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/10 lg:-translate-y-1"
                      : isDone(index)
                        ? "border-slate-700 bg-slate-900/80"
                        : "border-slate-800 bg-slate-950/60 opacity-60"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500 ${
                      isDone(index)
                        ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-300"
                        : "border-slate-700 bg-slate-800/60 text-slate-500"
                    }`}
                  >
                    <StepIcon path={step.icon} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-100">
                      {step.label}
                    </span>
                    <span className="block text-xs leading-5 text-slate-400">
                      {step.detail}
                    </span>
                  </span>
                </li>
              </Fragment>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 font-mono shadow-xl shadow-slate-950/40">
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-xs text-slate-500">pipeline.log</span>
          </div>

          <div
            aria-label="Example pipeline log"
            className="min-h-[15rem] space-y-2 p-5 text-[12px] leading-6 sm:text-[13px]"
          >
            {steps.map((step, index) =>
              isDone(index) ? (
                <p
                  key={step.label}
                  className="animate-[log-in_0.35s_ease-out] whitespace-pre-wrap break-words text-slate-300"
                >
                  <span className="text-slate-600">
                    {String(index + 1).padStart(2, "0")}{" "}
                  </span>
                  {step.log}
                </p>
              ) : null,
            )}

            {active !== -1 && active < steps.length && (
              <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-cyan-300/80" />
            )}

            {(active === -1 || active === steps.length) && (
              <p className="pt-1 font-semibold text-emerald-300">
                ✓ completed — safe to re-run, no duplicates written
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:-translate-y-0.5 hover:border-cyan-500/30 hover:bg-slate-900"
            >
              <span
                className={`mt-2 h-2 w-2 shrink-0 rounded-full ${item.accent}`}
              />
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {toolkit.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300"
            >
              {tool}
            </span>
          ))}
        </div>

        <a
          href={contactHref}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/40"
        >
          Automate a workflow
        </a>
      </div>
    </div>
  );
}
