import type { CountryId } from "@/data/countries";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type {
  CompetitorIntelligenceItem,
  IntelligenceFilter,
  IntelligenceProvider,
  IntelligenceSort,
} from "@/lib/intelligence/intelligenceTypes";

export type { CompetitorIntelligenceItem };

export function getCompetitors(
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
): CompetitorIntelligenceItem[] {
  return intelligenceService.getLatestCompetitors(filter, sort);
}

export const competitorProvider: IntelligenceProvider<CompetitorIntelligenceItem, CountryId> = {
  getLatest() {
    return getCompetitors();
  },

  getByCountry(country) {
    return getCompetitors({ country });
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return getCompetitors({ keyword });
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return getCompetitors().filter((item) =>
      item.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};

export function queryCompetitors(
  country?: CountryId,
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
) {
  return getCompetitors(country ? { ...filter, country } : filter, sort);
}
