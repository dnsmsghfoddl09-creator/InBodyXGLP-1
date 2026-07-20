"use client";

import { Badge } from "@/components/ui/Badge";
import type {
  CompetitorRecord,
  HospitalRecord,
  KolRecord,
  NewsRecord,
  OpportunityRecord,
  PaperRecord,
  RegulationRecord,
  TrialRecord,
} from "@/data/country-research-workspace";

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

export function NewsCard({ item }: { item: NewsRecord }) {
  const importanceVariant =
    item.importance === "Critical" ? "red" : item.importance === "High" ? "amber" : "blue";
  const executiveSummary = item.executiveSummary ?? item.summary;

  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-gray-900">{item.title}</h3>
        <Badge variant={importanceVariant}>{item.importance}</Badge>
      </div>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetaRow label="Source" value={item.source} />
        <MetaRow label="Country" value={item.country} />
        <MetaRow label="Published Date" value={item.publishedDate} />
        {item.category ? <MetaRow label="Category" value={item.category} /> : null}
      </dl>
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Executive Summary</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">{executiveSummary}</p>
        </div>
        {item.businessImpact ? (
          <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">Business Impact</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-800">{item.businessImpact}</p>
          </div>
        ) : null}
        {item.recommendedAction ? (
          <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">Recommended Action</p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-gray-900">{item.recommendedAction}</p>
          </div>
        ) : null}
      </div>
    </CardShell>
  );
}

export function PaperCard({ item }: { item: PaperRecord }) {
  return (
    <CardShell>
      <h3 className="text-sm font-semibold leading-snug text-gray-900">{item.title}</h3>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetaRow label="Journal" value={item.journal} />
        <MetaRow label="Authors" value={item.authors} />
        <MetaRow label="Publication Date" value={item.publicationDate} />
        <MetaRow label="Study Type" value={item.studyType} />
      </dl>
      <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">Key Findings</p>
        <p className="mt-1 text-sm leading-relaxed text-gray-800">{item.keyFindings}</p>
      </div>
    </CardShell>
  );
}

export function ResearchCard({ item }: { item: TrialRecord | RegulationRecord }) {
  const isTrial = "phase" in item;

  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-gray-900">{item.title}</h3>
        <Badge variant="blue">{isTrial ? item.phase : item.status}</Badge>
      </div>
      {isTrial ? (
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <MetaRow label="Sponsor" value={item.sponsor} />
          <MetaRow label="Status" value={item.status} />
          <MetaRow label="Enrollment" value={item.enrollment} />
          <MetaRow label="Focus" value={item.focus} />
        </dl>
      ) : (
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <MetaRow label="Agency" value={item.agency} />
          <MetaRow label="Status" value={item.status} />
          <MetaRow label="Effective Date" value={item.effectiveDate} />
          <MetaRow label="Impact" value={item.impact} />
        </dl>
      )}
    </CardShell>
  );
}

export function CompetitorCard({ item }: { item: CompetitorRecord }) {
  const threatVariant =
    item.threatLevel === "High" ? "red" : item.threatLevel === "Medium" ? "amber" : "green";

  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900">{item.company}</h3>
        <Badge variant={threatVariant}>{item.threatLevel} Threat</Badge>
      </div>
      <dl className="mt-4 space-y-3">
        <MetaRow label="Current Activity" value={item.currentActivity} />
        <MetaRow label="Market Status" value={item.marketStatus} />
        <MetaRow label="Opportunity" value={item.opportunity} />
      </dl>
    </CardShell>
  );
}

export function HospitalCard({ item }: { item: HospitalRecord }) {
  return (
    <CardShell>
      <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetaRow label="City" value={item.city} />
        <MetaRow label="Specialty" value={item.specialty} />
        <MetaRow label="GLP-1 Experience" value={item.glp1Experience} />
        <MetaRow label="Research Activity" value={item.researchActivity} />
      </dl>
    </CardShell>
  );
}

export function KOLCard({ item }: { item: KolRecord }) {
  return (
    <CardShell>
      <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <MetaRow label="Institution" value={item.institution} />
        <MetaRow label="Specialty" value={item.specialty} />
        <MetaRow label="Influence" value={item.influence} />
        <MetaRow label="Focus Areas" value={item.focusAreas} />
      </dl>
    </CardShell>
  );
}

export function OpportunityCard({ item }: { item: OpportunityRecord }) {
  const statusVariant =
    item.status === "Active" ? "green" : item.status === "In Review" ? "amber" : "blue";
  const priorityVariant = item.priority <= 2 ? "red" : item.priority <= 3 ? "amber" : "blue";

  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-gray-900">{item.title}</h3>
        <div className="flex shrink-0 gap-2">
          <Badge variant={priorityVariant}>P{item.priority}</Badge>
          <Badge variant={statusVariant}>{item.status}</Badge>
        </div>
      </div>
      <dl className="mt-4 space-y-3">
        <MetaRow label="Estimated Impact" value={item.estimatedImpact} />
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3">
          <MetaRow label="Recommended Action" value={item.recommendedAction} />
        </div>
      </dl>
    </CardShell>
  );
}

export function ResearchEmptyState({ tabLabel }: { tabLabel: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
        🔍
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">No {tabLabel} records found</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
        Adjust your search or filters to see intelligence records for this country.
      </p>
    </div>
  );
}
