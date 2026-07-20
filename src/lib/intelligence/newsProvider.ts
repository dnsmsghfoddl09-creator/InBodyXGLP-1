import type { CountryId } from "@/data/countries";
import { COUNTRY_LIST } from "@/data/countries";
import {
  NEWS_CATEGORIES,
  NEWS_PRIORITY_COUNTRIES,
  NEWS_TOPICS,
  type NewsIntelligenceItem,
} from "@/lib/intelligence/data/mock-news";
import {
  getLiveNewsMetadata,
  hydrateNewsCacheFromApi,
  resolveNewsBase,
  resolveNewsItems,
  subscribeNewsCache,
  type LiveNewsMetadata,
} from "@/lib/connectors";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type {
  IntelligenceFilter,
  IntelligenceImportance,
  IntelligenceProvider,
  IntelligenceSort,
} from "@/lib/intelligence/intelligenceTypes";
import { applyIntelligenceFilter, applyIntelligenceSort } from "@/lib/intelligence/intelligenceTypes";

export type { NewsIntelligenceItem, LiveNewsMetadata };
export { NEWS_CATEGORIES, NEWS_TOPICS, NEWS_PRIORITY_COUNTRIES };
export { getLiveNewsMetadata, hydrateNewsCacheFromApi, subscribeNewsCache };

export type NewsModuleFilter = IntelligenceFilter & {
  topic?: string;
  company?: string;
};

export type CountryNewsComparison = {
  countryId: CountryId;
  country: string;
  newsVolume: number;
  topTopics: string[];
  topCompanies: string[];
  latestStrategicNews: NewsIntelligenceItem[];
};

function applyNewsModuleFilter(items: NewsIntelligenceItem[], filter?: NewsModuleFilter): NewsIntelligenceItem[] {
  let result = applyIntelligenceFilter(items, filter);

  if (filter?.topic && filter.topic !== "All") {
    const topic = filter.topic;
    result = result.filter(
      (item) =>
        item.relatedTopics.includes(topic as NewsIntelligenceItem["relatedTopics"][number]) ||
        item.tags.includes(topic),
    );
  }

  if (filter?.company && filter.company !== "All") {
    result = result.filter((item) => item.relatedCompanies.includes(filter.company!));
  }

  return result;
}

function queryNews(items: NewsIntelligenceItem[], filter?: NewsModuleFilter, sort: IntelligenceSort = "newest") {
  return applyIntelligenceSort(applyNewsModuleFilter(items, filter), sort);
}

export function getNews(filter?: NewsModuleFilter, sort: IntelligenceSort = "newest"): NewsIntelligenceItem[] {
  return queryNews(resolveNewsBase(), filter, sort);
}

export function getNewsByCountry(
  country: CountryId,
  filter?: Omit<NewsModuleFilter, "country">,
  sort: IntelligenceSort = "newest",
): NewsIntelligenceItem[] {
  return getNews({ ...filter, country }, sort);
}

export function getNewsByCountries(
  countries: CountryId[],
  filter?: Omit<NewsModuleFilter, "country">,
  sort: IntelligenceSort = "newest",
): NewsIntelligenceItem[] {
  return getNews({ ...filter, country: countries }, sort);
}

export function searchNews(keyword: string, sort: IntelligenceSort = "newest"): NewsIntelligenceItem[] {
  return getNews({ keyword }, sort);
}

export function getTodaysIntelligence(limit = 2): NewsIntelligenceItem[] {
  return getNews(undefined, "importance").slice(0, limit);
}

export function getCountryNewsComparison(countryIds: CountryId[]): CountryNewsComparison[] {
  return countryIds.map((countryId) => {
    const articles = getNewsByCountry(countryId, undefined, "importance");
    const topTopics = Array.from(new Set(articles.flatMap((item) => item.relatedTopics))).slice(0, 5);
    const topCompanies = Array.from(new Set(articles.flatMap((item) => item.relatedCompanies))).slice(0, 5);

    return {
      countryId,
      country: COUNTRY_LIST.find((entry) => entry.id === countryId)?.name ?? countryId,
      newsVolume: articles.length,
      topTopics,
      topCompanies,
      latestStrategicNews: articles.slice(0, 3),
    };
  });
}

export const newsProvider: IntelligenceProvider<NewsIntelligenceItem, CountryId> = {
  getLatest() {
    return getNews();
  },

  getByCountry(country) {
    return getNewsByCountry(country);
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return searchNews(keyword);
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((tag) => tag.toLowerCase());
    return resolveNewsBase().filter((item) =>
      item.tags.some((tag) => normalized.includes(tag.toLowerCase())) ||
      item.relatedTopics.some((topic) => normalized.includes(topic.toLowerCase())),
    );
  },
};

export function matchesKeyword(item: NewsIntelligenceItem, keyword: string): boolean {
  return intelligenceService.filterItems([item], { keyword }).length > 0;
}

export const NEWS_IMPORTANCE_OPTIONS: IntelligenceImportance[] = ["Critical", "High", "Medium", "Low"];

export function getNewsIntelligenceScore(item: NewsIntelligenceItem): "High" | "Medium" | "Low" {
  const tagged = item.tags.find((tag) => tag === "High" || tag === "Medium" || tag === "Low");
  if (tagged) return tagged;
  if (item.importance === "Critical") return "High";
  if (item.importance === "High") return "Medium";
  return "Low";
}
