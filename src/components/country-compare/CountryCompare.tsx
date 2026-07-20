"use client";

import { useState } from "react";
import { CountryMultiSelector, CompareActionBar } from "@/components/country-compare/CountryMultiSelector";
import { StickyCompareHeader } from "@/components/country-compare/StickyCompareHeader";
import { ScoreCards } from "@/components/country-compare/ScoreCards";
import { ExecutiveInsightPanel } from "@/components/country-compare/ExecutiveInsightPanel";
import { RadarChart } from "@/components/country-compare/RadarChart";
import { OpportunityRanking } from "@/components/country-compare/OpportunityRanking";
import { ComparisonTable } from "@/components/country-compare/ComparisonTable";
import { SwotSummary } from "@/components/country-compare/SwotSummary";
import { AiStrategicSummary } from "@/components/country-compare/AiStrategicSummary";
import { CompetitorIntelligenceModule } from "@/components/competitors/CompetitorIntelligenceModule";
import { NewsIntelligenceModule } from "@/components/news/NewsIntelligenceModule";
import { ResearchIntelligenceModule } from "@/components/research/ResearchIntelligenceModule";
import { WidgetBoard } from "@/components/widgets/WidgetBoard";
import {
  countryProvider,
  type CountryId,
} from "@/lib/intelligence";

export function CountryCompare() {
  const [selectedIds, setSelectedIds] = useState<CountryId[]>(
    countryProvider.getDefaultCompareIds(),
  );
  const [widgetModalOpen, setWidgetModalOpen] = useState(false);
  const profiles = countryProvider.getCompareProfiles(selectedIds);

  return (
    <div className="flex-1">
      <div className="border-b border-gray-100 bg-white px-4 py-6 lg:px-8 lg:py-8">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
          Global Intelligence
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 lg:text-3xl">
          Country Compare
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500 lg:text-base">
          Compare 2–5 countries side-by-side across market, healthcare, regulation, insurance,
          competition, and business opportunity dimensions to identify InBody market priorities.
        </p>
      </div>

      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:flex-row lg:items-end lg:justify-between lg:p-6">
          <div className="flex-1">
            <CountryMultiSelector selectedIds={selectedIds} onChange={setSelectedIds} />
          </div>
          <CompareActionBar onAddWidget={() => setWidgetModalOpen(true)} />
        </div>

        <WidgetBoard
          pageId="country-compare"
          modalOpen={widgetModalOpen}
          onModalOpenChange={setWidgetModalOpen}
          showToolbar={false}
        />

        <StickyCompareHeader profiles={profiles} />

        <div className="mt-6 space-y-8">
          <ScoreCards profiles={profiles} />
          <ExecutiveInsightPanel profiles={profiles} />
          <div className="grid gap-6 lg:grid-cols-2">
            <RadarChart profiles={profiles} />
            <OpportunityRanking profiles={profiles} />
          </div>
          <AiStrategicSummary profiles={profiles} />
          <NewsIntelligenceModule variant="compare" countryIds={selectedIds} limit={6} />
          <CompetitorIntelligenceModule variant="compare" countryIds={selectedIds} />
          <ResearchIntelligenceModule variant="compare" countryIds={selectedIds} />
          <ComparisonTable profiles={profiles} />
          <SwotSummary profiles={profiles} />
        </div>
      </div>
    </div>
  );
}
