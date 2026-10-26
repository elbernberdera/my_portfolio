"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";

const OWNER_EMAIL = "elbernberdera@gmail.com";

// Submissions go straight to OWNER_EMAIL through FormSubmit (no account needed).
// The very first submission makes FormSubmit email an "Activate form" link to
// OWNER_EMAIL; nothing is delivered until that link is clicked once.
// NEXT_PUBLIC_TESTIMONIAL_ENDPOINT can override this (e.g. a Formspree URL).
const ENDPOINT =
  process.env.NEXT_PUBLIC_TESTIMONIAL_ENDPOINT ||
  `https://formsubmit.co/ajax/${OWNER_EMAIL}`;

const QUOTE_MIN = 30;
const QUOTE_MAX = 600;

const relationships = ["Client", "Supervisor / Manager", "Colleague", "Other"];

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; name: string }
  | { state: "error"; mailtoHref: string };

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-baseline justify-between gap-3 text-sm font-medium text-slate-300">
        {label}
        {hint && (
          <span className="text-xs font-normal text-slate-500">{hint}</span>
        )}
      </span>
      {children}
    </label>
  );
}

export default function TestimonialForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [quoteLength, setQuoteLength] = useState(0);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never see or fill this field
    if (data.get("_gotcha")) return;
    data.delete("_gotcha");

    const name = String(data.get("name") ?? "").trim();
    const firstName = name.split(/\s+/)[0] || "there";
    const subject = `Portfolio testimonial from ${name}`;

    setStatus({ state: "sending" });
    data.set("_subject", subject);
    data.set("_template", "table");
    data.set("_captcha", "false");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const result = await response.json().catch(() => ({}));
      // FormSubmit answers 200 with success "false" when it did not deliver
      // (e.g. before activation), so check its flag as well as the status code.
      if (!response.ok || String(result.success ?? "true") !== "true") {
        throw new Error(
          result.message ?? `Request failed (${response.status})`,
        );
      }
      form.reset();
      setQuoteLength(0);
      setStatus({ state: "sent", name: firstName });
    } catch {
      // Fallback: let the visitor send the same content from their own email app
      const lines = [
        `Name: ${name}`,
        `Email: ${data.get("email")}`,
        `Role: ${data.get("role")}`,
        `Company: ${data.get("company") || "-"}`,
        `Relationship: ${data.get("relationship")}`,
        `Project: ${data.get("project") || "-"}`,
        "",
        "Testimonial:",
        String(data.get("testimonial")),
        "",
        "Permission to publish name, role and testimonial: yes",
      ];
      setStatus({
        state: "error",
        mailtoHref:
          `mailto:${OWNER_EMAIL}` +
          `?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(lines.join("\n"))}`,
      });
    }
  };

  if (status.state === "sent") {
    return (
      <div className="space-y-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center animate-[log-in_0.4s_ease-out]">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-2xl text-emerald-300">
          ✓
        </span>
        <h2 className="text-xl font-semibold text-slate-100">
          Thank you, {status.name}!
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          Your testimonial was sent. El Bern reviews every submission before it
          appears on the portfolio.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-indigo-500/60 hover:text-indigo-200"
        >
          Visit the portfolio
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name">
          <input
            name="name"
            required
            autoComplete="name"
            className={inputClass}
          />
        </Field>

        <Field label="Email" hint="Not published">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field label="Job title / role">
          <input
            name="role"
            required
            autoComplete="organization-title"
            placeholder="e.g. Operations Manager"
            className={inputClass}
          />
        </Field>

        <Field label="Company" hint="Optional">
          <input
            name="company"
            autoComplete="organization"
            className={inputClass}
          />
        </Field>

        <Field label="How did we work together?">
          <select
            name="relationship"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Choose one
            </option>
            {relationships.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Project" hint="Optional">
          <input
            name="project"
            placeholder="e.g. Inventory & POS system"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Your testimonial" hint={`${quoteLength} / ${QUOTE_MAX}`}>
        <textarea
          name="testimonial"
          required
          minLength={QUOTE_MIN}
          maxLength={QUOTE_MAX}
          rows={5}
          onChange={(event) => setQuoteLength(event.target.value.length)}
          placeholder="What was it like working with El Bern? What problem was solved, and what changed afterwards?"
          className={`${inputClass} resize-y leading-6`}
        />
      </Field>

      {/* Honeypot for spam bots: hidden from people and screen readers */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-sm leading-6 text-slate-300">
        <input
          type="checkbox"
          name="permission"
          value="yes"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-indigo-500"
        />
        I agree that El Bern may publish my name, job title, company and this
        testimonial on the portfolio. My email stays private.
      </label>

      {status.state === "error" && (
        <p
          role="alert"
          className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
        >
          The testimonial could not be sent right now. Please try again in a
          moment, or{" "}
          <a href={status.mailtoHref} className="font-semibold underline">
            send it from your email app
          </a>{" "}
          instead.
        </p>
      )}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status.state === "sending" ? "Sending…" : "Send testimonial"}
      </button>
    </form>
  );
}
