import type { CountryCompareProfile } from "@/lib/intelligence";

type SwotSummaryProps = {
  profiles: CountryCompareProfile[];
};

const SWOT_STYLES = {
  strengths: { label: "Strengths", box: "border-emerald-200 bg-emerald-50", title: "text-emerald-700" },
  weaknesses: { label: "Weaknesses", box: "border-red-200 bg-red-50", title: "text-red-700" },
  opportunities: { label: "Opportunities", box: "border-blue-200 bg-blue-50", title: "text-blue-700" },
  threats: { label: "Threats", box: "border-amber-200 bg-amber-50", title: "text-amber-700" },
} as const;

export function SwotSummary({ profiles }: SwotSummaryProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">SWOT Summary</h3>
      <div className="space-y-6">
        {profiles.map((p) => (
          <div key={p.id}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">{p.flag}</span>
              <span className="text-sm font-semibold text-gray-900">{p.name}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(SWOT_STYLES) as (keyof typeof SWOT_STYLES)[]).map((key) => {
                const style = SWOT_STYLES[key];
                return (
                  <div key={key} className={`rounded-xl border p-3 ${style.box}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${style.title}`}>
                      {style.label}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {p.swot[key].map((item) => (
                        <li key={item} className="text-xs leading-relaxed text-gray-700">
                          · {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
