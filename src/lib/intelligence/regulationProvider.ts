import type { CountryId } from "@/data/countries";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type { IntelligenceFilter, IntelligenceItem, IntelligenceProvider, IntelligenceSort } from "@/lib/intelligence/types";

export const regulationProvider: IntelligenceProvider<IntelligenceItem, CountryId> = {
  getLatest() {
    return intelligenceService.getLatestRegulations();
  },

  getByCountry(country) {
    return intelligenceService.getLatestRegulations({ country });
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return intelligenceService.getLatestRegulations({ keyword });
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return intelligenceService.getLatestRegulations().filter((item) =>
      item.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};

export function queryRegulations(
  country?: CountryId,
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
) {
  return intelligenceService.getLatestRegulations(country ? { ...filter, country } : filter, sort);
}
