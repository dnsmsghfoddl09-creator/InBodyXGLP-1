import type { CountryCompareProfile } from "@/lib/intelligence";

type ExecutiveInsightPanelProps = {
  profiles: CountryCompareProfile[];
};

export function ExecutiveInsightPanel({ profiles }: ExecutiveInsightPanelProps) {
  const top = [...profiles].sort((a, b) => b.overallScore - a.overallScore)[0];
  const highestGrowth = [...profiles].sort(
    (a, b) => parseInt(b.market.marketGrowth.replace(/\D/g, "")) - parseInt(a.market.marketGrowth.replace(/\D/g, "")),
  )[0];
  const lowestPenetration = [...profiles].find(
    (p) => p.businessOpportunity.inbodyPenetration === "Very Low",
  ) ?? profiles[0];

  const insights = [
    {
      title: "Priority Market",
      value: `${top.flag} ${top.name}`,
      detail: `Highest opportunity score (${top.overallScore}/100) with ${top.businessOpportunity.hospitalOpportunity.toLowerCase()} hospital potential.`,
    },
    {
      title: "Fastest Growth",
      value: `${highestGrowth.flag} ${highestGrowth.name}`,
      detail: `${highestGrowth.market.marketGrowth} GLP-1 market growth — ${highestGrowth.market.forecast} forecast.`,
    },
    {
      title: "Greenfield Opportunity",
      value: `${lowestPenetration.flag} ${lowestPenetration.name}`,
      detail: `InBody penetration is ${lowestPenetration.businessOpportunity.inbodyPenetration.toLowerCase()} — first-mover advantage available.`,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm lg:p-6">
      <h3 className="text-sm font-semibold text-gray-900">Executive Insight Panel</h3>
      <p className="mt-1 text-xs text-gray-500">Cross-market synthesis for strategy leadership</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {insights.map((item) => (
          <div key={item.title} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
              {item.title}
            </p>
            <p className="mt-2 text-base font-semibold text-gray-900">{item.value}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
