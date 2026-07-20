"use client";

import { useMemo, useState } from "react";
import { PaperCard } from "@/components/country-explorer/ResearchCards";
import { Badge } from "@/components/ui/Badge";
import { COUNTRY_LIST, type CountryId } from "@/data/countries";
import type { PaperRecord } from "@/data/country-research-workspace";
import {
  EVIDENCE_LEVELS,
  getCountryPaperRecords,
  getCountryResearchComparison,
  getLatestResearchItems,
  getPublicationYears,
  getResearchPaper,
  getResearchPapers,
  RESEARCH_JOURNALS,
  RESEARCH_SORT_OPTIONS,
  RESEARCH_STUDY_TYPES,
  RESEARCH_TOPICS,
  RESEARCH_COUNTRIES,
  type EvidenceLevel,
  type ResearchPaperItem,
  type ResearchPlatformFilter,
  type ResearchPlatformSort,
} from "@/lib/intelligence/paperProvider";

type ResearchIntelligenceModuleProps = {
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

export function JournalBadge({ journal }: { journal: string }) {
  return <Badge variant="blue">{journal}</Badge>;
}

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const variant = level === "Level 1" || level === "Level 2" ? "red" : level === "Level 3" ? "amber" : "blue";
  return <Badge variant={variant}>{level}</Badge>;
}

export function ResearchSummaryCard({ paper }: { paper: ResearchPaperItem }) {
  return (
    <CardShell>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">AI Executive Summary</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-800">{paper.aiExecutiveSummary}</p>
    </CardShell>
  );
}

export function ClinicalImpactCard({ paper }: { paper: ResearchPaperItem }) {
  return (
    <CardShell>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-green-700">Clinical Implications</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-800">{paper.clinicalImplications}</p>
      <div className="mt-4 rounded-lg border border-green-100 bg-green-50/50 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-green-700">Key Findings</p>
        <p className="mt-1 text-sm text-gray-800">{paper.keyFindings}</p>
      </div>
    </CardShell>
  );
}

export function BusinessImpactCard({ paper }: { paper: ResearchPaperItem }) {
  return (
    <CardShell>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">Business Implications</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-800">{paper.businessImplications}</p>
      <ul className="mt-4 space-y-2">
        {paper.recommendedActions.map((action) => (
          <li key={action} className="rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 text-sm text-gray-900">
            {action}
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

export function ResearchCard({ paper, onSelect }: { paper: ResearchPaperItem; onSelect?: () => void }) {
  const content = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-gray-900">{paper.title}</h3>
        <div className="flex flex-wrap gap-2">
          <JournalBadge journal={paper.journal} />
          <EvidenceBadge level={paper.evidenceLevel} />
        </div>
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetaRow label="Authors" value={paper.authors} />
        <MetaRow label="Publication Date" value={paper.publicationDate} />
        <MetaRow label="Study Type" value={paper.studyType} />
        <MetaRow label="Institution" value={paper.institution} />
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{paper.aiExecutiveSummary}</p>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" onClick={onSelect} className="w-full text-left">
        <CardShell>{content}</CardShell>
      </button>
    );
  }

  return <CardShell>{content}</CardShell>;
}

export function ResearchDetail({ paper }: { paper: ResearchPaperItem }) {
  return (
    <div className="space-y-6">
      <CardShell>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{paper.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{paper.authors}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <JournalBadge journal={paper.journal} />
            <EvidenceBadge level={paper.evidenceLevel} />
          </div>
        </div>
        <dl className="mt-5 grid gap-4 md:grid-cols-2">
          <MetaRow label="Publication Date" value={paper.publicationDate} />
          <MetaRow label="DOI" value={paper.doi} />
          <MetaRow label="Country" value={COUNTRY_LIST.find((c) => c.id === paper.country)?.name ?? paper.country} />
          <MetaRow label="Institution" value={paper.institution} />
          <MetaRow label="Study Type" value={paper.studyType} />
          <MetaRow label="Sample Size" value={paper.sampleSize} />
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          {paper.keywords.map((keyword) => (
            <span key={keyword} className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
              {keyword}
            </span>
          ))}
        </div>
      </CardShell>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Abstract</h3>
        <CardShell>
          <p className="text-sm leading-relaxed text-gray-700">{paper.abstract}</p>
        </CardShell>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ResearchSummaryCard paper={paper} />
        <ClinicalImpactCard paper={paper} />
        <BusinessImpactCard paper={paper} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <CardShell>
          <h4 className="text-sm font-semibold text-gray-900">Related News</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {paper.relatedNews.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </CardShell>
        <CardShell>
          <h4 className="text-sm font-semibold text-gray-900">Related Competitors</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {paper.relatedCompetitors.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </CardShell>
        <CardShell>
          <h4 className="text-sm font-semibold text-gray-900">Related Conferences</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {paper.relatedConferences.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </CardShell>
      </section>
    </div>
  );
}

export function LatestResearchWidget() {
  const items = getLatestResearchItems(5);

  return (
    <section className="rounded-2xl border border-gray-100/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
      <div className="border-b border-gray-100 px-5 py-4 lg:px-6 lg:py-5">
        <div className="flex items-start gap-3">
          <span className="text-xl leading-none">📚</span>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-900">Latest Research</h2>
            <p className="mt-0.5 text-sm text-gray-500">Recent publications with evidence level and journal</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            <tr>
              <th className="px-5 py-3 lg:px-6">Title</th>
              <th className="px-5 py-3 lg:px-6">Journal</th>
              <th className="px-5 py-3 lg:px-6">Evidence</th>
              <th className="px-5 py-3 lg:px-6">Published</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.title} className="border-b border-gray-50 align-top">
                <td className="px-5 py-3 font-medium text-gray-900 lg:px-6">{item.title}</td>
                <td className="px-5 py-3 text-gray-600 lg:px-6">{item.journal}</td>
                <td className="px-5 py-3 lg:px-6">
                  <EvidenceBadge level={item.evidenceLevel} />
                </td>
                <td className="px-5 py-3 text-gray-600 lg:px-6">{item.publicationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ResearchIntelligenceModule({
  variant = "center",
  countryId,
  countryIds = [],
  limit,
}: ResearchIntelligenceModuleProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState<string>("All");
  const [journalFilter, setJournalFilter] = useState<string>("All");
  const [studyTypeFilter, setStudyTypeFilter] = useState<string>("All");
  const [evidenceFilter, setEvidenceFilter] = useState<string>("All");
  const [yearFilter, setYearFilter] = useState<string>("All");
  const [topicFilter, setTopicFilter] = useState<string>("All");
  const [sort, setSort] = useState<ResearchPlatformSort>("newest");
  const [selectedId, setSelectedId] = useState<string>("research-paper-1");

  const filter = useMemo<ResearchPlatformFilter>(
    () => ({
      keyword: searchQuery.trim() || undefined,
      country:
        variant === "compare"
          ? countryIds
          : variant === "explorer" && countryId
            ? countryId
            : countryFilter !== "All"
              ? (countryFilter as CountryId)
              : "All",
      journal: journalFilter !== "All" ? journalFilter : "All",
      studyType: studyTypeFilter !== "All" ? (studyTypeFilter as ResearchPlatformFilter["studyType"]) : "All",
      evidenceLevel: evidenceFilter !== "All" ? (evidenceFilter as EvidenceLevel) : "All",
      publicationYear: yearFilter !== "All" ? Number(yearFilter) : "All",
      topic: topicFilter !== "All" ? topicFilter : "All",
    }),
    [
      searchQuery,
      countryFilter,
      journalFilter,
      studyTypeFilter,
      evidenceFilter,
      yearFilter,
      topicFilter,
      variant,
      countryId,
      countryIds,
    ],
  );

  const papers = useMemo(() => {
    const items = getResearchPapers(filter, sort);
    return limit ? items.slice(0, limit) : items;
  }, [filter, sort, limit]);

  const selectedPaper = getResearchPaper(selectedId);

  if (variant === "compare") {
    const comparison = getCountryResearchComparison(countryIds);
    return (
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
        <h3 className="text-sm font-semibold text-gray-900">Research Intelligence Comparison</h3>
        <p className="mt-1 text-xs text-gray-500">Publications, institutions, topics, and latest papers by country</p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-3 py-2">Country</th>
                <th className="px-3 py-2">Publications</th>
                <th className="px-3 py-2">Top Institutions</th>
                <th className="px-3 py-2">Research Topics</th>
                <th className="px-3 py-2">Latest Publications</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.countryId} className="border-b border-gray-50 align-top">
                  <td className="px-3 py-3 font-medium text-gray-900">{row.country}</td>
                  <td className="px-3 py-3 text-gray-700">{row.publicationCount}</td>
                  <td className="px-3 py-3 text-gray-600">{row.topInstitutions.join(", ")}</td>
                  <td className="px-3 py-3 text-gray-600">{row.researchTopics.join(", ")}</td>
                  <td className="px-3 py-3 text-gray-600">
                    {row.latestPublications.map((paper) => paper.title).join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (variant === "explorer" && countryId) {
    const records: PaperRecord[] = getCountryPaperRecords(countryId, filter, sort);
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {records.length === 0 ? (
          <p className="text-sm text-gray-500">No research papers matched this country and filters.</p>
        ) : (
          records.map((item) => <PaperCard key={item.id} item={item} />)
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search papers, authors, journals, keywords…"
          className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 xl:max-w-md"
        />
        <div className="flex flex-wrap items-center gap-2">
          <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm">
            <option value="All">All Countries</option>
            {RESEARCH_COUNTRIES.map((id) => (
              <option key={id} value={id}>{COUNTRY_LIST.find((c) => c.id === id)?.name ?? id}</option>
            ))}
          </select>
          <select value={journalFilter} onChange={(e) => setJournalFilter(e.target.value)} className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm">
            <option value="All">All Journals</option>
            {RESEARCH_JOURNALS.map((journal) => (
              <option key={journal} value={journal}>{journal}</option>
            ))}
          </select>
          <select value={studyTypeFilter} onChange={(e) => setStudyTypeFilter(e.target.value)} className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm">
            <option value="All">All Study Types</option>
            {RESEARCH_STUDY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select value={evidenceFilter} onChange={(e) => setEvidenceFilter(e.target.value)} className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm">
            <option value="All">All Evidence Levels</option>
            {EVIDENCE_LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm">
            <option value="All">All Years</option>
            {getPublicationYears().map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm">
            <option value="All">All Topics</option>
            {RESEARCH_TOPICS.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as ResearchPlatformSort)} className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm">
            {RESEARCH_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-4 text-xs text-gray-500">{papers.length} research papers</p>

      <div className="grid gap-4 lg:grid-cols-2">
        {papers.map((paper) => (
          <ResearchCard key={paper.id} paper={paper} onSelect={() => setSelectedId(paper.id)} />
        ))}
      </div>

      {selectedPaper ? (
        <div className="mt-8">
          <ResearchDetail paper={selectedPaper} />
        </div>
      ) : null}
    </>
  );
}
