import type { CountryId } from "@/data/countries";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type {
  IntelligenceFilter,
  IntelligenceProvider,
  IntelligenceSort,
  PaperIntelligenceItem,
} from "@/lib/intelligence/types";

export const papersProvider: IntelligenceProvider<PaperIntelligenceItem, CountryId> = {
  getLatest() {
    return intelligenceService.getLatestPapers();
  },

  getByCountry(country) {
    return intelligenceService.getLatestPapers({ country });
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return intelligenceService.getLatestPapers({ keyword });
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return intelligenceService.getLatestPapers().filter((item) =>
      item.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};

export function queryPapers(country?: CountryId, filter?: IntelligenceFilter, sort: IntelligenceSort = "newest") {
  return intelligenceService.getLatestPapers(country ? { ...filter, country } : filter, sort);
}

/** @deprecated Use papersProvider */
export const researchProvider = papersProvider;
