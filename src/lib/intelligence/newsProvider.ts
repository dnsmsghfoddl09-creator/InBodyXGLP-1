import type { CountryId } from "@/data/countries";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type { IntelligenceItem, IntelligenceProvider } from "@/lib/intelligence/types";

function matchesKeyword(item: IntelligenceItem, keyword: string): boolean {
  return intelligenceService.filterItems([item], { keyword }).length > 0;
}

export const newsProvider: IntelligenceProvider<IntelligenceItem, CountryId> = {
  getLatest() {
    return intelligenceService.getLatestNews();
  },

  getByCountry(country) {
    return intelligenceService.getLatestNews({ country });
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return intelligenceService.getLatestNews({ keyword });
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return intelligenceService.getLatestNews().filter((item) =>
      item.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};

export { matchesKeyword };
