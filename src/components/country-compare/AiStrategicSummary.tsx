import { countryProvider, type CountryCompareProfile } from "@/lib/intelligence";

type AiStrategicSummaryProps = {
  profiles: CountryCompareProfile[];
};

export function AiStrategicSummary({ profiles }: AiStrategicSummaryProps) {
  const insights = countryProvider.generateCompareInsights(profiles);

  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg lg:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">
        AI Strategic Summary
      </p>
      <h3 className="mt-1 text-lg font-semibold">Cross-Country Strategy Recommendations</h3>
      <ul className="mt-6 space-y-4">
        {insights.map((insight) => (
          <li
            key={insight}
            className="flex gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
          >
            <span className="mt-0.5 shrink-0 text-blue-200">✦</span>
            <p className="text-sm leading-relaxed text-blue-50">{insight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
