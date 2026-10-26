import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TestimonialForm from "../components/TestimonialForm";

// Private page: shared directly with past clients, kept out of search results.
export const metadata: Metadata = {
  title: "Leave a Testimonial",
  description: "Share your experience working with El Bern S. Berdera.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/testimonial" },
};

export default function TestimonialPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-5 py-12 text-slate-100 sm:py-20">
      <main className="mx-auto w-full max-w-2xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-indigo-300"
        >
          ← Back to portfolio
        </Link>

        <header className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 p-[2px]">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-100">
              <Image
                src="/images/profile3.png"
                alt="El Bern S. Berdera"
                fill
                quality={95}
                sizes="64px"
                className="object-cover object-[50%_8%]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              Leave a testimonial
            </h1>
            <p className="text-sm leading-6 text-slate-400">
              Thanks for working with me! A few honest sentences help future
              clients know what to expect. I read every submission and only
              publish it with your permission.
            </p>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/55 p-6 shadow-2xl shadow-slate-950/50 sm:p-8">
          <TestimonialForm />
        </section>
      </main>
    </div>
  );
}
