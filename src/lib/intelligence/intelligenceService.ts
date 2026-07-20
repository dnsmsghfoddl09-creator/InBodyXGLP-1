import { COUNTRY_LIST, type CountryId } from "@/data/countries";
import type {
  CompetitorRecord,
  NewsRecord,
  PaperRecord,
  RegulationRecord,
} from "@/data/country-research-workspace";
import {
  getMockCompetitors,
  getMockConferenceUpdates,
  getMockPapers,
  getMockRegulations,
} from "@/lib/intelligence/data/mock-intelligence";
import type { NewsIntelligenceItem } from "@/lib/intelligence/data/mock-news";
import { resolveNewsItems } from "@/lib/connectors";
import type {
  CompetitorIntelligenceItem,
  IntelligenceFilter,
  IntelligenceImportance,
  IntelligenceItem,
  IntelligenceSort,
  PaperIntelligenceItem,
} from "@/lib/intelligence/types";
import {
  applyIntelligenceFilter,
  applyIntelligenceSort,
  importanceRank,
} from "@/lib/intelligence/types";

function countryName(id: CountryId): string {
  return COUNTRY_LIST.find((c) => c.id === id)?.name ?? id;
}

function queryItems<T extends IntelligenceItem>(
  items: T[],
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
): T[] {
  return applyIntelligenceSort(applyIntelligenceFilter(items, filter), sort);
}

function toNewsRecord(item: NewsIntelligenceItem): NewsRecord {
  return {
    id: item.id,
    title: item.title,
    source: item.source,
    country: countryName(item.country),
    publishedDate: item.publishedDate,
    category: item.category,
    importance: item.importance === "Low" ? "Medium" : (item.importance as "Critical" | "High" | "Medium"),
    relatedCompanies: item.relatedCompanies,
    relatedTopics: item.relatedTopics,
    summary: item.executiveSummary,
    executiveSummary: item.executiveSummary,
    businessImpact: item.businessImpact,
    recommendedAction: item.recommendedAction,
    tags: item.tags,
  };
}

function toPaperRecord(item: PaperIntelligenceItem): PaperRecord {
  return {
    id: item.id,
    title: item.title,
    journal: item.journal,
    authors: item.authors,
    publicationDate: item.publishedDate,
    studyType: item.studyType,
    keyFindings: item.keyFindings,
  };
}

function toRegulationRecord(item: IntelligenceItem): RegulationRecord {
  return {
    id: item.id,
    title: item.title,
    agency: item.source,
    status: item.status,
    effectiveDate: item.publishedDate,
    impact: item.summary,
  };
}

function toCompetitorRecord(item: CompetitorIntelligenceItem): CompetitorRecord {
  return {
    id: item.id,
    company: item.company,
    currentActivity: item.currentActivity,
    marketStatus: item.marketStatus,
    opportunity: item.opportunity,
    threatLevel: item.threatLevel,
  };
}

function importanceToPriority(importance: IntelligenceImportance): 1 | 2 | 3 | 4 | 5 {
  switch (importance) {
    case "Critical":
      return 1;
    case "High":
      return 2;
    case "Medium":
      return 3;
    case "Low":
      return 4;
    default:
      return 5;
  }
}

export const intelligenceService = {
  getLatestNews(filter?: IntelligenceFilter, sort: IntelligenceSort = "newest"): NewsIntelligenceItem[] {
    return resolveNewsItems(filter, sort);
  },

  getLatestPapers(filter?: IntelligenceFilter, sort: IntelligenceSort = "newest"): PaperIntelligenceItem[] {
    return queryItems(getMockPapers(), filter, sort);
  },

  getLatestRegulations(filter?: IntelligenceFilter, sort: IntelligenceSort = "newest"): IntelligenceItem[] {
    return queryItems(getMockRegulations(), filter, sort);
  },

  getLatestConferences(filter?: IntelligenceFilter, sort: IntelligenceSort = "newest"): IntelligenceItem[] {
    return queryItems(getMockConferenceUpdates(), filter, sort);
  },

  getLatestCompetitors(
    filter?: IntelligenceFilter,
    sort: IntelligenceSort = "newest",
  ): CompetitorIntelligenceItem[] {
    return queryItems(getMockCompetitors(), filter, sort);
  },

  getByCountry<T extends IntelligenceItem>(
    items: T[],
    country: CountryId,
    filter?: Omit<IntelligenceFilter, "country">,
    sort: IntelligenceSort = "newest",
  ): T[] {
    return queryItems(items, { ...filter, country }, sort);
  },

  filterItems<T extends IntelligenceItem>(items: T[], filter?: IntelligenceFilter): T[] {
    return applyIntelligenceFilter(items, filter);
  },

  sortItems<T extends IntelligenceItem>(items: T[], sort: IntelligenceSort = "newest"): T[] {
    return applyIntelligenceSort(items, sort);
  },

  importanceToPriority,

  importanceRank,

  getCountryNews(country: CountryId, filter?: IntelligenceFilter, sort: IntelligenceSort = "newest"): NewsRecord[] {
    return this.getLatestNews({ ...filter, country }, sort).map(toNewsRecord);
  },

  getCountryPapers(country: CountryId, filter?: IntelligenceFilter, sort: IntelligenceSort = "newest"): PaperRecord[] {
    return this.getLatestPapers({ ...filter, country }, sort).map(toPaperRecord);
  },

  getCountryRegulations(
    country: CountryId,
    filter?: IntelligenceFilter,
    sort: IntelligenceSort = "newest",
  ): RegulationRecord[] {
    return this.getLatestRegulations({ ...filter, country }, sort).map(toRegulationRecord);
  },

  getCountryCompetitors(
    country: CountryId,
    filter?: IntelligenceFilter,
    sort: IntelligenceSort = "newest",
  ): CompetitorRecord[] {
    return this.getLatestCompetitors({ ...filter, country }, sort).map(toCompetitorRecord);
  },

  getCompareHighlights(countries: CountryId[], limit = 3): IntelligenceItem[] {
    return this.getLatestNews({ country: countries }, "importance").slice(0, limit);
  },
};

export type { IntelligenceFilter, IntelligenceSort };
