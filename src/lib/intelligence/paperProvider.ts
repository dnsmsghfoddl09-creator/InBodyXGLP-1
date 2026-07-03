import type { CountryId } from "@/data/countries";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type {
  IntelligenceFilter,
  IntelligenceProvider,
  IntelligenceSort,
  PaperIntelligenceItem,
} from "@/lib/intelligence/intelligenceTypes";

export type { PaperIntelligenceItem };

export function getPapers(
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
): PaperIntelligenceItem[] {
  return intelligenceService.getLatestPapers(filter, sort);
}

export const paperProvider: IntelligenceProvider<PaperIntelligenceItem, CountryId> = {
  getLatest() {
    return getPapers();
  },

  getByCountry(country) {
    return getPapers({ country });
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return getPapers({ keyword });
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return getPapers().filter((item) =>
      item.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};
