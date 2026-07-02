import type { CountryId } from "@/data/countries";
import { competitorUpdates } from "@/data/mock-data";
import type { CompetitorUpdate, IntelligenceProvider } from "@/lib/intelligence/types";

const COMPANY_COUNTRIES: Record<string, CountryId[]> = {
  "Novo Nordisk": ["usa", "uk", "japan", "south-korea", "germany"],
  "Eli Lilly": ["usa", "japan", "germany"],
  Amgen: ["usa", "uk"],
  Pfizer: ["usa"],
};

const COMPANY_TAGS: Record<string, string[]> = {
  "Novo Nordisk": ["GLP-1", "Competition", "Patent"],
  "Eli Lilly": ["GLP-1", "Competition", "Clinical Trial"],
  Amgen: ["GLP-1", "Competition", "Pipeline"],
  Pfizer: ["GLP-1", "Competition", "Pipeline"],
};

const MOCK_UPDATES: CompetitorUpdate[] = competitorUpdates.map((item, index) => ({
  id: `competitor-${index + 1}`,
  company: item.company,
  update: item.update,
  impact: item.impact,
  publishedAt: item.date,
  tags: COMPANY_TAGS[item.company] ?? ["Competition", "GLP-1"],
  countryIds: COMPANY_COUNTRIES[item.company] ?? ["usa"],
}));

function matchesKeyword(item: CompetitorUpdate, keyword: string): boolean {
  const q = keyword.toLowerCase();
  return (
    item.company.toLowerCase().includes(q) ||
    item.update.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export const competitorProvider: IntelligenceProvider<CompetitorUpdate, CountryId> = {
  getLatest() {
    return [...MOCK_UPDATES];
  },

  getByCountry(country) {
    return MOCK_UPDATES.filter((u) => u.countryIds.includes(country));
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return MOCK_UPDATES.filter((u) => matchesKeyword(u, keyword));
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return MOCK_UPDATES.filter((u) =>
      u.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};
