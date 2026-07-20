import type { CountryId } from "@/data/countries";
import {
  getAllNews,
  NEWS_CATEGORIES,
  NEWS_PRIORITY_COUNTRIES,
  NEWS_TOPICS,
  type NewsIntelligenceItem,
} from "@/lib/intelligence/data/mock-news";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type {
  IntelligenceFilter,
  IntelligenceImportance,
  IntelligenceProvider,
  IntelligenceSort,
} from "@/lib/intelligence/intelligenceTypes";
import { applyIntelligenceFilter, applyIntelligenceSort } from "@/lib/intelligence/intelligenceTypes";

export type { NewsIntelligenceItem };
export { NEWS_CATEGORIES, NEWS_TOPICS, NEWS_PRIORITY_COUNTRIES };

export type NewsModuleFilter = IntelligenceFilter & {
  topic?: string;
  company?: string;
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
  return queryNews(getAllNews(), filter, sort);
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
    return getAllNews().filter((item) =>
      item.tags.some((tag) => normalized.includes(tag.toLowerCase())) ||
      item.relatedTopics.some((topic) => normalized.includes(topic.toLowerCase())),
    );
  },
};

export function matchesKeyword(item: NewsIntelligenceItem, keyword: string): boolean {
  return intelligenceService.filterItems([item], { keyword }).length > 0;
}

export const NEWS_IMPORTANCE_OPTIONS: IntelligenceImportance[] = ["Critical", "High", "Medium", "Low"];
