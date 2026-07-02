import type { CountryCompareProfile } from "@/lib/intelligence";

type OpportunityRankingProps = {
  profiles: CountryCompareProfile[];
};

export function OpportunityRanking({ profiles }: OpportunityRankingProps) {
  const ranked = [...profiles].sort((a, b) => b.overallScore - a.overallScore);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">Opportunity Ranking</h3>
      <ol className="space-y-3">
        {ranked.map((p, index) => (
          <li
            key={p.id}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : index === 1
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </span>
            <span className="text-xl">{p.flag}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">{p.name}</p>
              <p className="text-xs text-gray-500">
                {p.businessOpportunity.hospitalOpportunity} hospital ·{" "}
                {p.businessOpportunity.pharmacyOpportunity} pharmacy
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-600">{p.overallScore}</p>
              <p className="text-[10px] uppercase text-gray-400">Score</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
