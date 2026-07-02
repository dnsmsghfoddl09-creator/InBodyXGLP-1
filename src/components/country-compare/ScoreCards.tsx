import { Badge } from "@/components/ui/Badge";
import type { CountryCompareProfile } from "@/lib/intelligence";

type ScoreCardsProps = {
  profiles: CountryCompareProfile[];
};

export function ScoreCards({ profiles }: ScoreCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {profiles.map((p) => (
        <div
          key={p.id}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{p.flag}</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">{p.name}</p>
              <p className="text-xs text-gray-500">Opportunity Score</p>
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold tabular-nums text-blue-600">{p.overallScore}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="blue">{p.market.marketGrowth}</Badge>
            <Badge variant="green">{p.businessOpportunity.partnershipPotential}</Badge>
          </div>
          <dl className="mt-4 space-y-1.5 text-xs text-gray-500">
            <div className="flex justify-between">
              <dt>Market Size</dt>
              <dd className="font-medium text-gray-700">{p.market.glp1MarketSize}</dd>
            </div>
            <div className="flex justify-between">
              <dt>InBody Penetration</dt>
              <dd className="font-medium text-gray-700">{p.businessOpportunity.inbodyPenetration}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
