import type { CountryId } from "@/data/countries";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type { IntelligenceFilter, IntelligenceItem, IntelligenceProvider, IntelligenceSort } from "@/lib/intelligence/intelligenceTypes";

export type { IntelligenceItem };

export function getNews(
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
): IntelligenceItem[] {
  return intelligenceService.getLatestNews(filter, sort);
}

function matchesKeyword(item: IntelligenceItem, keyword: string): boolean {
  return intelligenceService.filterItems([item], { keyword }).length > 0;
}

export const newsProvider: IntelligenceProvider<IntelligenceItem, CountryId> = {
  getLatest() {
    return getNews();
  },

  getByCountry(country) {
    return getNews({ country });
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return getNews({ keyword });
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return getNews().filter((item) =>
      item.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};

export { matchesKeyword };
