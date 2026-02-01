import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/lib/data";

const formatColors = (colors: string[]) =>
  colors.length ? `linear-gradient(135deg, ${colors.join(", ")})` : "";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brand/${brand.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 focus-ring"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{ background: formatColors(brand.dominantColors) }}
      />
      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {brand.categorySlug.replace(/-/g, " ")}
          </span>
          <span className="text-xs text-slate-400">{brand.country}</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
          <Image
            src={brand.logoUrl}
            alt={`${brand.name} logo`}
            width={320}
            height={180}
            className="h-20 w-full object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {brand.name}
          </h3>
          <p className="text-sm text-slate-300">{brand.description}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {brand.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
