"use client";

import { useMemo, useState } from "react";
import { CompetitorCard as ExplorerCompetitorCard } from "@/components/country-explorer/ResearchCards";
import { Badge } from "@/components/ui/Badge";
import { COUNTRY_LIST, type CountryId } from "@/data/countries";
import type { CompetitorRecord } from "@/data/country-research-workspace";
import {
  COMPETITOR_COMPANY_IDS,
  COMPETITOR_SORT_OPTIONS,
  getCompetitorActivities,
  getCompetitorClinicalUpdates,
  getCompetitorPartnerships,
  getCompetitorProfile,
  getCompetitorProfiles,
  getCompetitorWatchItems,
  getCountryCompetitorPresence,
  getCountryCompetitorRecords,
  getPipelineItems,
  PIPELINE_STATUS_OPTIONS,
  THREAT_LEVEL_OPTIONS,
  type CompetitorCompanyProfile,
  type CompetitorPlatformFilter,
  type CompetitorPlatformSort,
  type PipelineItem,
} from "@/lib/intelligence/competitorProvider";

type CompetitorIntelligenceModuleProps = {
  variant?: "center" | "compare" | "explorer";
  countryId?: CountryId;
  countryIds?: CountryId[];
  limit?: number;
};

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {children}
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</dt>
      <dd className="mt-1 text-sm text-gray-700">{value}</dd>
    </div>
  );
}

function threatVariant(level: string): "red" | "amber" | "green" {
  if (level === "High") return "red";
  if (level === "Medium") return "amber";
  return "green";
}

export function CompetitorCard({ profile }: { profile: CompetitorCompanyProfile }) {
  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{profile.company}</h3>
          <p className="mt-1 text-xs text-gray-500">{profile.marketFocus}</p>
        </div>
        <Badge variant={threatVariant(profile.threatLevel)}>{profile.threatLevel} Threat</Badge>
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetaRow label="Latest Activity" value={profile.latestActivity} />
        <MetaRow label="Opportunity Score" value={`${profile.opportunityScore}/100`} />
        <MetaRow label="Headquarters" value={profile.headquarters} />
        <MetaRow label="Market Status" value={profile.marketStatus} />
      </dl>
    </CardShell>
  );
}

export function PipelineCard({ item }: { item: PipelineItem }) {
  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
        <Badge variant="blue">{item.status}</Badge>
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetaRow label="Phase" value={item.phase} />
        <MetaRow label="Indication" value={item.indication} />
        <MetaRow label="Country" value={COUNTRY_LIST.find((c) => c.id === item.country)?.name ?? item.country} />
      </dl>
    </CardShell>
  );
}

export function SWOTCard({ profile }: { profile: CompetitorCompanyProfile }) {
  const sections = [
    { label: "Strengths", items: profile.swot.strengths, tone: "text-green-700 bg-green-50 border-green-100" },
    { label: "Weaknesses", items: profile.swot.weaknesses, tone: "text-amber-700 bg-amber-50 border-amber-100" },
    { label: "Opportunities", items: profile.swot.opportunities, tone: "text-blue-700 bg-blue-50 border-blue-100" },
    { label: "Threats", items: profile.swot.threats, tone: "text-red-700 bg-red-50 border-red-100" },
  ];

  return (
    <CardShell>
      <h3 className="text-sm font-semibold text-gray-900">SWOT Analysis · {profile.company}</h3>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {sections.map((section) => (
          <div key={section.label} className={`rounded-lg border p-3 ${section.tone}`}>
            <p className="text-[11px] font-semibold uppercase tracking-wider">{section.label}</p>
            <ul className="mt-2 space-y-1 text-sm">
              {section.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

export function OpportunityCard({ profile }: { profile: CompetitorCompanyProfile }) {
  return (
    <CardShell>
      <h3 className="text-sm font-semibold text-gray-900">Business Opportunities · {profile.company}</h3>
      <ul className="mt-4 space-y-2">
        {profile.businessOpportunities.map((item) => (
          <li key={item} className="rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 text-sm text-gray-800">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">Recommended Action</p>
        <p className="mt-1 text-sm font-medium text-gray-900">{profile.recommendedAction}</p>
      </div>
    </CardShell>
  );
}

export function CompetitorProfile({ profile }: { profile: CompetitorCompanyProfile }) {
  const pipeline = getPipelineItems({ companyId: profile.id });
  const activities = getCompetitorActivities({ companyId: profile.id }, "most-active").slice(0, 4);
  const clinical = getCompetitorClinicalUpdates({ companyId: profile.id }).slice(0, 4);
  const partnerships = getCompetitorPartnerships({ companyId: profile.id }).slice(0, 4);

  return (
    <div className="space-y-6">
      <CardShell>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{profile.company}</h2>
            <p className="mt-1 text-sm text-gray-500">{profile.headquarters}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={threatVariant(profile.threatLevel)}>{profile.threatLevel} Threat</Badge>
            <Badge variant="blue">Opportunity {profile.opportunityScore}/100</Badge>
          </div>
        </div>
        <dl className="mt-5 grid gap-4 md:grid-cols-2">
          <MetaRow label="Company Overview" value={profile.companyOverview} />
          <MetaRow label="Market Focus" value={profile.marketFocus} />
          <MetaRow label="GLP-1 Pipeline" value={profile.glp1Pipeline} />
          <MetaRow label="Financial Highlights" value={profile.financialHighlights} />
          <MetaRow label="Market Expansion" value={profile.marketExpansion} />
          <MetaRow label="Strategic Partnerships" value={profile.strategicPartnerships} />
        </dl>
      </CardShell>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Products</h3>
        <div className="flex flex-wrap gap-2">
          {profile.approvedProducts.map((product) => (
            <span key={product} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700">
              {product}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Pipeline</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {pipeline.map((item) => (
            <PipelineCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Clinical Trials</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {clinical.map((item) => (
            <CardShell key={item.id}>
              <h4 className="text-sm font-semibold text-gray-900">{item.trialName}</h4>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                <MetaRow label="Phase" value={item.phase} />
                <MetaRow label="Status" value={item.status} />
                <MetaRow label="Enrollment" value={item.enrollment} />
                <MetaRow label="Update" value={item.update} />
              </dl>
            </CardShell>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">News</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {activities.map((item) => (
            <CardShell key={item.id}>
              <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
              <p className="mt-2 text-sm text-gray-600">{item.summary}</p>
            </CardShell>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Countries</h3>
        <div className="flex flex-wrap gap-2">
          {profile.activeCountries.map((countryId) => (
            <span key={countryId} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700">
              {COUNTRY_LIST.find((entry) => entry.id === countryId)?.name ?? countryId}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SWOTCard profile={profile} />
        <OpportunityCard profile={profile} />
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Partnerships</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {partnerships.map((item) => (
            <CardShell key={item.id}>
              <h4 className="text-sm font-semibold text-gray-900">{item.partner}</h4>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                <MetaRow label="Focus" value={item.focus} />
                <MetaRow label="Region" value={item.region} />
                <MetaRow label="Status" value={item.status} />
              </dl>
            </CardShell>
          ))}
        </div>
      </section>
    </div>
  );
}

export function CompetitorWatchWidget() {
  const items = getCompetitorWatchItems(5);

  return (
    <section className="rounded-2xl border border-gray-100/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
      <div className="border-b border-gray-100 px-5 py-4 lg:px-6 lg:py-5">
        <div className="flex items-start gap-3">
          <span className="text-xl leading-none">🏢</span>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-900">Competitor Watch</h2>
            <p className="mt-0.5 text-sm text-gray-500">Latest activity, threat level, and opportunity scores</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            <tr>
              <th className="px-5 py-3 lg:px-6">Company</th>
              <th className="px-5 py-3 lg:px-6">Latest Activity</th>
              <th className="px-5 py-3 lg:px-6">Threat</th>
              <th className="px-5 py-3 lg:px-6">Opportunity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.company} className="border-b border-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900 lg:px-6">{item.company}</td>
                <td className="px-5 py-3 text-gray-600 lg:px-6">{item.latestActivity}</td>
                <td className="px-5 py-3 lg:px-6">
                  <Badge variant={threatVariant(item.threatLevel)}>{item.threatLevel}</Badge>
                </td>
                <td className="px-5 py-3 font-semibold text-blue-700 lg:px-6">{item.opportunityScore}/100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function CompetitorIntelligenceModule({
  variant = "center",
  countryId,
  countryIds = [],
  limit,
}: CompetitorIntelligenceModuleProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState<string>("All");
  const [countryFilter, setCountryFilter] = useState<string>("All");
  const [threatFilter, setThreatFilter] = useState<string>("All");
  const [pipelineFilter, setPipelineFilter] = useState<string>("All");
  const [sort, setSort] = useState<CompetitorPlatformSort>("most-active");
  const [selectedId, setSelectedId] = useState<string>(COMPETITOR_COMPANY_IDS[0]!);

  const filter = useMemo<CompetitorPlatformFilter>(
    () => ({
      keyword: searchQuery.trim() || undefined,
      companyId: companyFilter === "All" ? "All" : (companyFilter as CompetitorPlatformFilter["companyId"]),
      country:
        variant === "compare"
          ? countryIds
          : variant === "explorer" && countryId
            ? countryId
            : countryFilter !== "All"
              ? (countryFilter as CountryId)
              : "All",
      threatLevel: threatFilter === "All" ? "All" : (threatFilter as CompetitorPlatformFilter["threatLevel"]),
      pipelineStatus:
        pipelineFilter === "All" ? "All" : (pipelineFilter as CompetitorPlatformFilter["pipelineStatus"]),
    }),
    [searchQuery, companyFilter, countryFilter, threatFilter, pipelineFilter, variant, countryId, countryIds],
  );

  const profiles = useMemo(() => {
    const items = getCompetitorProfiles(filter, sort);
    return limit ? items.slice(0, limit) : items;
  }, [filter, sort, limit]);

  const selectedProfile = getCompetitorProfile(selectedId as (typeof COMPETITOR_COMPANY_IDS)[number]);

  if (variant === "compare") {
    const presence = getCountryCompetitorPresence(countryIds);
    return (
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Competitor Presence Comparison</h3>
            <p className="mt-1 text-xs text-gray-500">Active competitors across selected compare markets</p>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-3 py-2">Country</th>
                <th className="px-3 py-2">Active Competitors</th>
                <th className="px-3 py-2">High Threat</th>
                <th className="px-3 py-2">Top Opportunity</th>
              </tr>
            </thead>
            <tbody>
              {presence.map((row) => (
                <tr key={row.countryId} className="border-b border-gray-50 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">{row.country}</td>
                  <td className="px-3 py-3 text-gray-600">{row.activeCompanies.join(", ")}</td>
                  <td className="px-3 py-3 text-gray-700">{row.highThreatCount}</td>
                  <td className="px-3 py-3 font-semibold text-blue-700">{row.topOpportunityScore}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (variant === "explorer" && countryId) {
    const records: CompetitorRecord[] = getCountryCompetitorRecords(
      countryId,
      {
        keyword: filter.keyword,
        companyId: filter.companyId,
        threatLevel: filter.threatLevel,
        pipelineStatus: filter.pipelineStatus,
      },
      sort,
    );

    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {records.length === 0 ? (
          <p className="text-sm text-gray-500">No competitors active in this country matched your filters.</p>
        ) : (
          records.map((item) => <ExplorerCompetitorCard key={item.id} item={item} />)
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative flex-1 xl:max-w-md">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search companies, pipeline, activity…"
            className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={companyFilter}
            onChange={(event) => setCompanyFilter(event.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Companies</option>
            {COMPETITOR_COMPANY_IDS.map((id) => (
              <option key={id} value={id}>
                {getCompetitorProfile(id)?.company ?? id}
              </option>
            ))}
          </select>
          <select
            value={countryFilter}
            onChange={(event) => setCountryFilter(event.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Countries</option>
            {COUNTRY_LIST.filter((country) =>
              ["south-korea", "japan", "thailand", "indonesia", "singapore", "china", "usa", "uk", "germany", "france"].includes(
                country.id,
              ),
            ).map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <select
            value={threatFilter}
            onChange={(event) => setThreatFilter(event.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Threat Levels</option>
            {THREAT_LEVEL_OPTIONS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <select
            value={pipelineFilter}
            onChange={(event) => setPipelineFilter(event.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Pipeline Status</option>
            {PIPELINE_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as CompetitorPlatformSort)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          >
            {COMPETITOR_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-4 text-xs text-gray-500">{profiles.length} competitor profiles</p>

      <div className="grid gap-4 lg:grid-cols-2">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            type="button"
            onClick={() => setSelectedId(profile.id)}
            className={`text-left ${selectedId === profile.id ? "ring-2 ring-blue-200 rounded-xl" : ""}`}
          >
            <CompetitorCard profile={profile} />
          </button>
        ))}
      </div>

      {selectedProfile ? (
        <div className="mt-8">
          <CompetitorProfile profile={selectedProfile} />
        </div>
      ) : null}
    </>
  );
}
