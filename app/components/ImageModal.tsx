"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {
  name: string;
  images: string[];
  onClose: () => void;
};

export default function ImageModal({ name, images, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const hasMany = images.length > 1;

  const go = useCallback(
    (step: number) =>
      setIndex((current) => (current + step + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} screenshots`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col gap-3 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-sm font-semibold text-slate-200">
            {name}
            {hasMany && (
              <span className="ml-2 font-normal text-slate-500">
                {index + 1} / {images.length}
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="shrink-0 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
          >
            Close (Esc)
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-slate-950 p-2">
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${name} screenshot ${index + 1}`}
            width={1600}
            height={1000}
            sizes="(max-width: 896px) 100vw, 896px"
            className="h-auto max-h-[68vh] w-auto max-w-full rounded-lg object-contain animate-[log-in_0.3s_ease-out]"
          />

          {hasMany && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-900/85 text-lg text-slate-200 transition hover:border-indigo-400 hover:text-indigo-200"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-900/85 text-lg text-slate-200 transition hover:border-indigo-400 hover:text-indigo-200"
              >
                ›
              </button>
            </>
          )}
        </div>

        {hasMany && (
          <div className="flex justify-center gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Show image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition ${
                  i === index
                    ? "border-indigo-400"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  width={160}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
