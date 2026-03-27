"use client";
import Image from "next/image";

type Props = {
  name: string;
  images: string[];
  onClose: () => void;
};

export default function ImageModal({ name, images, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
        >
          Close
        </button>

        <div className="mt-2 flex flex-col gap-3">
          <div className="relative max-h-[70vh] w-full overflow-auto rounded-xl bg-slate-950 p-3">
            {images.length === 1 ? (
              <Image
                src={images[0]}
                alt={name}
                width={1200}
                height={800}
                className="h-auto w-full rounded-lg object-contain"
              />
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {images.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt={name}
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-lg object-contain"
                  />
                ))}
              </div>
            )}
          </div>
          <p className="text-center text-sm font-medium text-slate-300">{name}</p>
        </div>
      </div>
    </div>
  );
}
