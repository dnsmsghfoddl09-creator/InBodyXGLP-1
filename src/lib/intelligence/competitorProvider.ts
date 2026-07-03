import type { CountryId } from "@/data/countries";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type {
  CompetitorIntelligenceItem,
  IntelligenceFilter,
  IntelligenceProvider,
  IntelligenceSort,
} from "@/lib/intelligence/types";

export const competitorProvider: IntelligenceProvider<CompetitorIntelligenceItem, CountryId> = {
  getLatest() {
    return intelligenceService.getLatestCompetitors();
  },

  getByCountry(country) {
    return intelligenceService.getLatestCompetitors({ country });
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return intelligenceService.getLatestCompetitors({ keyword });
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return intelligenceService.getLatestCompetitors().filter((item) =>
      item.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};

export function queryCompetitors(
  country?: CountryId,
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
) {
  return intelligenceService.getLatestCompetitors(country ? { ...filter, country } : filter, sort);
}
