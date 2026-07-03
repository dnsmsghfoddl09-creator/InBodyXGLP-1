"use client";

import { useMemo, useState } from "react";
import { CountryIntelligenceReport } from "@/components/country-explorer/CountryIntelligenceReport";
import { CountryTabs } from "@/components/country-explorer/CountryTabs";
import {
  CompetitorCard,
  HospitalCard,
  KOLCard,
  NewsCard,
  OpportunityCard,
  PaperCard,
  ResearchCard,
  ResearchEmptyState,
} from "@/components/country-explorer/ResearchCards";
import {
  ResearchWorkspaceToolbar,
  type SortOption,
} from "@/components/country-explorer/ResearchWorkspaceToolbar";
import { WidgetBoard } from "@/components/widgets/WidgetBoard";
import type { CountryReport } from "@/lib/intelligence";
import type { CountryId } from "@/lib/intelligence";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type { IntelligenceSort } from "@/lib/intelligence/types";
import {
  COUNTRY_RESEARCH_TABS,
  getCountryResearchData,
  type CountryResearchTabId,
} from "@/data/country-research-workspace";

type CountryResearchWorkspaceProps = {
  countryId: CountryId;
  report: CountryReport;
};

function toIntelSort(sort: SortOption): IntelligenceSort {
  if (sort === "az") return "alphabetical";
  return "newest";
}

function maybeReverse<T>(items: T[], sort: SortOption): T[] {
  return sort === "oldest" ? [...items].reverse() : items;
}

function sortByLabel<T extends { title?: string; name?: string; company?: string }>(
  items: T[],
  sort: SortOption,
  dateKey?: (item: T) => string,
): T[] {
  const copy = [...items];
  if (sort === "az") {
    return copy.sort((a, b) => {
      const aLabel = a.title ?? a.name ?? a.company ?? "";
      const bLabel = b.title ?? b.name ?? b.company ?? "";
      return aLabel.localeCompare(bLabel);
    });
  }
  if (dateKey) {
    return copy.sort((a, b) => {
      const aDate = dateKey(a);
      const bDate = dateKey(b);
      return sort === "newest" ? bDate.localeCompare(aDate) : aDate.localeCompare(bDate);
    });
  }
  return copy;
}

export function CountryResearchWorkspace({ countryId, report }: CountryResearchWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<CountryResearchTabId>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");
  const [widgetModalOpen, setWidgetModalOpen] = useState(false);

  const data = useMemo(() => getCountryResearchData(countryId), [countryId]);
  const intelSort = toIntelSort(sort);
  const searchFilter = searchQuery.trim() ? { keyword: searchQuery } : undefined;
  const activeTabLabel = COUNTRY_RESEARCH_TABS.find((tab) => tab.id === activeTab)?.label ?? "Records";

  const filterOptions = useMemo(() => {
    switch (activeTab) {
      case "news":
        return ["All", "Critical", "High", "Medium"];
      case "competitors":
        return ["All", "High", "Medium", "Low"];
      case "opportunities":
        return ["All", "Active", "In Review", "Pipeline"];
      case "trials":
        return ["All", "Recruiting", "Active", "Completed", "Planning"];
      case "regulations":
        return ["All", "Published", "Active", "Under Review"];
      default:
        return ["All"];
    }
  }, [activeTab]);

  const filteredNews = useMemo(() => {
    let items = intelligenceService.getCountryNews(countryId, searchFilter, intelSort);
    if (filter !== "All") items = items.filter((item) => item.importance === filter);
    return maybeReverse(items, sort);
  }, [countryId, searchFilter, filter, sort, intelSort]);

  const filteredPapers = useMemo(() => {
    const items = intelligenceService.getCountryPapers(countryId, searchFilter, intelSort);
    return maybeReverse(items, sort);
  }, [countryId, searchFilter, sort, intelSort]);

  const filteredTrials = useMemo(() => {
    let items = data.trials.filter(
      (item) =>
        !searchQuery ||
        `${item.title} ${item.sponsor} ${item.focus}`.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (filter !== "All") items = items.filter((item) => item.status === filter);
    return sortByLabel(items, sort, (item) => item.title);
  }, [data.trials, searchQuery, filter, sort]);

  const filteredRegulations = useMemo(() => {
    let items = intelligenceService.getCountryRegulations(countryId, searchFilter, intelSort);
    if (filter !== "All") items = items.filter((item) => item.status === filter);
    return maybeReverse(items, sort);
  }, [countryId, searchFilter, filter, sort, intelSort]);

  const filteredCompetitors = useMemo(() => {
    let items = intelligenceService.getCountryCompetitors(countryId, searchFilter, intelSort);
    if (filter !== "All") items = items.filter((item) => item.threatLevel === filter);
    return maybeReverse(sortByLabel(items, sort), sort);
  }, [countryId, searchFilter, filter, sort, intelSort]);

  const filteredHospitals = useMemo(() => {
    const items = data.hospitals.filter(
      (item) =>
        !searchQuery ||
        `${item.name} ${item.city} ${item.specialty} ${item.researchActivity}`.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return sortByLabel(items, sort);
  }, [data.hospitals, searchQuery, sort]);

  const filteredKol = useMemo(() => {
    const items = data.kol.filter(
      (item) =>
        !searchQuery ||
        `${item.name} ${item.institution} ${item.focusAreas}`.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return sortByLabel(items, sort);
  }, [data.kol, searchQuery, sort]);

  const filteredOpportunities = useMemo(() => {
    let items = data.opportunities.filter(
      (item) =>
        !searchQuery ||
        `${item.title} ${item.estimatedImpact} ${item.recommendedAction}`.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (filter !== "All") items = items.filter((item) => item.status === filter);
    return sortByLabel(items, sort, (item) => `P${item.priority}-${item.title}`);
  }, [data.opportunities, searchQuery, filter, sort]);

  const handleTabChange = (tab: CountryResearchTabId) => {
    setActiveTab(tab);
    setSearchQuery("");
    setFilter("All");
    setSort("newest");
  };

  const renderTabContent = () => {
    if (activeTab === "overview") {
      return <CountryIntelligenceReport report={report} />;
    }

    const grid = "grid gap-4 lg:grid-cols-2";

    switch (activeTab) {
      case "news":
        return filteredNews.length === 0 ? (
          <ResearchEmptyState tabLabel={activeTabLabel} />
        ) : (
          <div className={grid}>{filteredNews.map((item) => <NewsCard key={item.id} item={item} />)}</div>
        );
      case "papers":
        return filteredPapers.length === 0 ? (
          <ResearchEmptyState tabLabel={activeTabLabel} />
        ) : (
          <div className={grid}>{filteredPapers.map((item) => <PaperCard key={item.id} item={item} />)}</div>
        );
      case "trials":
        return filteredTrials.length === 0 ? (
          <ResearchEmptyState tabLabel={activeTabLabel} />
        ) : (
          <div className={grid}>{filteredTrials.map((item) => <ResearchCard key={item.id} item={item} />)}</div>
        );
      case "regulations":
        return filteredRegulations.length === 0 ? (
          <ResearchEmptyState tabLabel={activeTabLabel} />
        ) : (
          <div className={grid}>
            {filteredRegulations.map((item) => (
              <ResearchCard key={item.id} item={item} />
            ))}
          </div>
        );
      case "competitors":
        return filteredCompetitors.length === 0 ? (
          <ResearchEmptyState tabLabel={activeTabLabel} />
        ) : (
          <div className={grid}>
            {filteredCompetitors.map((item) => (
              <CompetitorCard key={item.id} item={item} />
            ))}
          </div>
        );
      case "hospitals":
        return filteredHospitals.length === 0 ? (
          <ResearchEmptyState tabLabel={activeTabLabel} />
        ) : (
          <div className={grid}>
            {filteredHospitals.map((item) => (
              <HospitalCard key={item.id} item={item} />
            ))}
          </div>
        );
      case "kol":
        return filteredKol.length === 0 ? (
          <ResearchEmptyState tabLabel={activeTabLabel} />
        ) : (
          <div className={grid}>{filteredKol.map((item) => <KOLCard key={item.id} item={item} />)}</div>
        );
      case "opportunities":
        return filteredOpportunities.length === 0 ? (
          <ResearchEmptyState tabLabel={activeTabLabel} />
        ) : (
          <div className={grid}>
            {filteredOpportunities.map((item) => (
              <OpportunityCard key={item.id} item={item} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <WidgetBoard
        pageId="country-explorer"
        modalOpen={widgetModalOpen}
        onModalOpenChange={setWidgetModalOpen}
        showToolbar={false}
      />

      <CountryTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <ResearchWorkspaceToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        filterOptions={filterOptions}
        searchPlaceholder={`Search ${activeTabLabel.toLowerCase()}…`}
        onExport={() => undefined}
        onAddWidget={() => setWidgetModalOpen(true)}
        actionsOnly={activeTab === "overview"}
      />

      {renderTabContent()}
    </>
  );
}
