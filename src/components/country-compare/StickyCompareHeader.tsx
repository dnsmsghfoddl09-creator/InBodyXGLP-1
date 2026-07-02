import type { CountryCompareProfile } from "@/lib/intelligence";

type StickyCompareHeaderProps = {
  profiles: CountryCompareProfile[];
};

export function StickyCompareHeader({ profiles }: StickyCompareHeaderProps) {
  return (
    <div className="sticky top-14 z-20 -mx-4 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-xl lg:-mx-8 lg:px-8">
      <div className="flex items-center gap-3 overflow-x-auto">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Comparing
        </span>
        {profiles.map((p) => (
          <div
            key={p.id}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5 ring-1 ring-gray-100"
          >
            <span>{p.flag}</span>
            <span className="text-sm font-medium text-gray-900">{p.name}</span>
            <span className="rounded-md bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {p.overallScore}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
