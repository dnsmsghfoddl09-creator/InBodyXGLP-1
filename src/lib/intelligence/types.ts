import type { CountryId } from "@/data/countries";

export type IntelligenceImportance = "Critical" | "High" | "Medium" | "Low";

export type IntelligenceItem = {
  id: string;
  title: string;
  country: CountryId;
  category: string;
  source: string;
  publishedDate: string;
  importance: IntelligenceImportance;
  tags: string[];
  summary: string;
  link: string;
  status: string;
};

export type PaperIntelligenceItem = IntelligenceItem & {
  journal: string;
  authors: string;
  studyType: string;
  keyFindings: string;
};

export type CompetitorIntelligenceItem = IntelligenceItem & {
  company: string;
  currentActivity: string;
  marketStatus: string;
  opportunity: string;
  threatLevel: "High" | "Medium" | "Low";
};

export type IntelligenceFilter = {
  country?: CountryId | CountryId[];
  category?: string;
  importance?: IntelligenceImportance;
  dateFrom?: string;
  dateTo?: string;
  keyword?: string;
};

export type IntelligenceSort = "newest" | "importance" | "alphabetical";

export type IntelligenceProvider<T, TCountry = CountryId> = {
  getLatest(): T[];
  getByCountry(country: TCountry): T[];
  search(keyword: string): T[];
  getRelated(tags: string[]): T[];
};

const IMPORTANCE_RANK: Record<IntelligenceImportance, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export function importanceRank(importance: IntelligenceImportance): number {
  return IMPORTANCE_RANK[importance];
}

export function applyIntelligenceFilter<T extends IntelligenceItem>(
  items: T[],
  filter?: IntelligenceFilter,
): T[] {
  if (!filter) return [...items];

  let result = [...items];

  if (filter.country) {
    const countries = Array.isArray(filter.country) ? filter.country : [filter.country];
    result = result.filter((item) => countries.includes(item.country));
  }

  if (filter.category && filter.category !== "All") {
    result = result.filter((item) => item.category === filter.category);
  }

  if (filter.importance) {
    result = result.filter((item) => item.importance === filter.importance);
  }

  if (filter.dateFrom) {
    result = result.filter((item) => item.publishedDate >= filter.dateFrom!);
  }

  if (filter.dateTo) {
    result = result.filter((item) => item.publishedDate <= filter.dateTo!);
  }

  if (filter.keyword?.trim()) {
    const q = filter.keyword.toLowerCase();
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }

  return result;
}

export function applyIntelligenceSort<T extends IntelligenceItem>(
  items: T[],
  sort: IntelligenceSort = "newest",
): T[] {
  const copy = [...items];

  switch (sort) {
    case "alphabetical":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "importance":
      return copy.sort((a, b) => {
        const diff = importanceRank(b.importance) - importanceRank(a.importance);
        return diff !== 0 ? diff : b.publishedDate.localeCompare(a.publishedDate);
      });
    case "newest":
    default:
      return copy.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
  }
}

/** @deprecated Legacy shape — prefer IntelligenceItem for new code */
export type News = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  tag: string;
  tags: string[];
  countryIds: CountryId[];
  summary?: string;
};

/** @deprecated Legacy shape — prefer PaperIntelligenceItem for new code */
export type Research = {
  id: string;
  title: string;
  journal: string;
  authors: string;
  publishedAt: string;
  tags: string[];
  countryIds: CountryId[];
  relevance?: string;
};

/** @deprecated Use Research */
export type ResearchPaper = Research;

export type Conference = {
  id: string;
  name: string;
  acronym: string;
  startDate: string;
  endDate: string;
  displayDate: string;
  country: string;
  city: string;
  region: string;
  status: string;
  importance: number;
  tags: string[];
  countryIds: CountryId[];
};

/** @deprecated Legacy shape — prefer CompetitorIntelligenceItem for new code */
export type Competitor = {
  id: string;
  company: string;
  update: string;
  impact: "high" | "medium" | "low";
  publishedAt: string;
  tags: string[];
  countryIds: CountryId[];
};

/** @deprecated Use Competitor */
export type CompetitorUpdate = Competitor;

export type CountryIntelligence = {
  id: CountryId;
  name: string;
  flag: string;
  region: string;
  tags: string[];
  summary: string;
  opportunityScore: number;
  marketSize: string;
  glp1Growth: string;
  obesityRate: string;
};

export type { CountryId };
