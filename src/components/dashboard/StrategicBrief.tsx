import Link from "next/link";
import {
  dashboardProvider,
  type StrategicInsight,
  type StrategicSection,
} from "@/lib/intelligence/dashboardProvider";

const priorityConfig = {
  1: { label: "P1", ring: "ring-red-200", bg: "bg-red-600", text: "text-red-700", light: "bg-red-50", bar: "bg-red-500" },
  2: { label: "P2", ring: "ring-orange-200", bg: "bg-orange-500", text: "text-orange-700", light: "bg-orange-50", bar: "bg-orange-400" },
  3: { label: "P3", ring: "ring-amber-200", bg: "bg-amber-500", text: "text-amber-700", light: "bg-amber-50", bar: "bg-amber-400" },
  4: { label: "P4", ring: "ring-blue-200", bg: "bg-blue-500", text: "text-blue-700", light: "bg-blue-50", bar: "bg-blue-400" },
  5: { label: "P5", ring: "ring-gray-200", bg: "bg-gray-400", text: "text-gray-600", light: "bg-gray-50", bar: "bg-gray-300" },
} as const;

export function PriorityBadge({ priority, size = "sm" }: { priority: 1 | 2 | 3 | 4 | 5; size?: "sm" | "lg" }) {
  const config = priorityConfig[priority];
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md font-bold text-white ${config.bg} ${
        size === "lg" ? "h-8 min-w-8 px-2 text-sm" : "h-6 min-w-6 px-1.5 text-[11px]"
      }`}
      title={`Priority ${priority}`}
    >
      {config.label}
    </span>
  );
}

function InsightBlock({ insight, compact = false }: { insight: StrategicInsight; compact?: boolean }) {
  const config = priorityConfig[insight.priority];

  return (
    <article
      className={`relative rounded-xl border border-gray-100 ${config.light} p-4 ${compact ? "" : "lg:p-5"}`}
    >
      <div className={`absolute left-0 top-4 h-[calc(100%-2rem)] w-1 rounded-full ${config.bar}`} />
      <div className="pl-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold leading-snug text-gray-900 lg:text-[15px]">
            {insight.headline}
          </h3>
          <PriorityBadge priority={insight.priority} />
        </div>

        <dl className={`mt-4 space-y-3 ${compact ? "text-xs" : "text-sm"}`}>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Why it matters
            </dt>
            <dd className="mt-1 leading-relaxed text-gray-700">{insight.whyItMatters}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Business impact
            </dt>
            <dd className="mt-1 leading-relaxed text-gray-700">{insight.businessImpact}</dd>
          </div>
          <div className={`rounded-lg border border-gray-200/80 bg-white p-3 ${compact ? "" : "lg:p-4"}`}>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
              Suggested action
            </dt>
            <dd className="mt-1 font-medium leading-relaxed text-gray-900">{insight.suggestedAction}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

type StrategicSectionCardProps = {
  section: StrategicSection;
  featured?: boolean;
};

export function StrategicSectionCard({ section, featured = false }: StrategicSectionCardProps) {
  const topInsights = [...section.insights].sort((a, b) => a.priority - b.priority);

  return (
    <section
      className={`rounded-2xl border border-gray-100/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] ${
        featured ? "ring-1 ring-blue-100" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 lg:px-6 lg:py-5">
        <div className="flex items-start gap-3">
          <span className="text-xl leading-none">{section.emoji}</span>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-900">{section.title}</h2>
            <p className="mt-0.5 text-sm text-gray-500">{section.description}</p>
          </div>
        </div>
        <Link
          href={section.href}
          prefetch={false}
          className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Open →
        </Link>
      </div>

      <div className="space-y-4 p-5 lg:p-6">
        {topInsights.map((insight) => (
          <InsightBlock key={insight.id} insight={insight} compact={!featured} />
        ))}
      </div>
    </section>
  );
}

export function ExecutiveSummaryCard({ insight }: { insight: StrategicInsight }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="border-b border-white/10 px-5 py-4 lg:px-6 lg:py-5">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-blue-200">
              Executive Summary
            </p>
            <h2 className="text-lg font-semibold tracking-tight">Today&apos;s strategic priority</h2>
          </div>
        </div>
      </div>

      <div className="p-5 lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-snug lg:text-xl">{insight.headline}</h3>
          <span className="flex h-8 shrink-0 items-center rounded-md bg-white/20 px-2 text-sm font-bold">
            P{insight.priority}
          </span>
        </div>

        <dl className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
              Why it matters
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-blue-50">{insight.whyItMatters}</dd>
          </div>
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
              Business impact
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-blue-50">{insight.businessImpact}</dd>
          </div>
          <div className="rounded-xl bg-white p-4 text-gray-900">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
              Suggested action
            </dt>
            <dd className="mt-2 text-sm font-semibold leading-relaxed">{insight.suggestedAction}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function DailyBriefHeader({
  criticalCount,
  highCount,
  totalActions,
}: {
  criticalCount: number;
  highCount: number;
  totalActions: number;
}) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              {today} · Executive Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 lg:text-[2rem] lg:leading-tight">
              What should the strategy team do today?
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 lg:text-base">
              AI-powered briefing for HQ Strategy, overseas subsidiaries, and executives — transforming
              scattered intelligence into prioritized business actions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-2xl font-bold text-red-700">{criticalCount}</p>
              <p className="text-xs font-medium text-red-600">Critical (P1)</p>
            </div>
            <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3">
              <p className="text-2xl font-bold text-orange-700">{highCount}</p>
              <p className="text-xs font-medium text-orange-600">High (P2)</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-2xl font-bold text-gray-900">{totalActions}</p>
              <p className="text-xs font-medium text-gray-600">Total actions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuickActionsWidget() {
  return (
    <section className="rounded-2xl border border-gray-100/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
      <div className="border-b border-gray-100 px-5 py-4 lg:px-6 lg:py-5">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-900">Quick Actions</h2>
            <p className="mt-0.5 text-sm text-gray-500">Jump to high-value workflows</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-5 lg:grid-cols-3 lg:p-6">
        {dashboardProvider.getQuickActions().map((action) => (
          <Link
            key={action.label}
            href={action.href}
            prefetch={false}
            className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 text-sm font-medium text-gray-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <span className="text-base">{action.emoji}</span>
            <span className="leading-snug">{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
