import { Badge } from "@/components/ui/Badge";
import {
  getCountryMeta,
  PRIORITY_COLORS,
  type CountryResearchCard,
} from "@/data/weekly-research-mission";

type CountryResearchStatusProps = {
  statuses: CountryResearchCard[];
};

export function CountryResearchStatus({ statuses }: CountryResearchStatusProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
      <h3 className="text-sm font-semibold text-gray-900">Country Research Status</h3>
      <p className="mt-1 text-xs text-gray-500">Progress and intelligence gaps by target market</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statuses.map((status) => {
          const country = getCountryMeta(status.countryId);
          return (
            <article
              key={status.countryId}
              className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{country.name}</p>
                    <p className="text-xs text-gray-500">{country.region}</p>
                  </div>
                </div>
                <span
                  className={`flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-[11px] font-bold text-white ${PRIORITY_COLORS[status.priority]}`}
                >
                  P{status.priority}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-500">Research Progress</span>
                  <span className="font-semibold tabular-nums text-blue-600">{status.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${status.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Missing Information
                </p>
                <ul className="mt-1.5 space-y-1">
                  {status.missingInfo.map((item) => (
                    <li key={item} className="text-xs leading-relaxed text-amber-700">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 border-t border-gray-100 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Latest Update
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">{status.latestUpdate}</p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <Badge
                  variant={
                    status.confidenceScore >= 75 ? "green" : status.confidenceScore >= 60 ? "amber" : "red"
                  }
                >
                  Confidence {status.confidenceScore}%
                </Badge>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
