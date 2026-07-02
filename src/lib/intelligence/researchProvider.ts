import type { CountryId } from "@/data/countries";
import { researchPapers } from "@/data/mock-data";
import type { IntelligenceProvider, ResearchPaper } from "@/lib/intelligence/types";

const PAPER_TAGS: Record<string, string[]> = {
  "Comparative efficacy": ["GLP-1", "Diabetes", "Clinical"],
  "cardiovascular outcomes": ["GLP-1", "Diabetes", "Outcomes"],
  "Muscle mass preservation": ["GLP-1", "Obesity", "Body Composition"],
};

const PAPER_COUNTRIES: Record<string, CountryId[]> = {
  "Comparative efficacy": ["usa", "germany", "japan"],
  "cardiovascular outcomes": ["usa", "uk"],
  "Muscle mass preservation": ["usa", "south-korea", "japan"],
};

function deriveTags(title: string): string[] {
  for (const [key, tags] of Object.entries(PAPER_TAGS)) {
    if (title.includes(key)) return tags;
  }
  return ["Research", "GLP-1"];
}

function deriveCountries(title: string): CountryId[] {
  for (const [key, countries] of Object.entries(PAPER_COUNTRIES)) {
    if (title.includes(key)) return countries;
  }
  return ["usa"];
}

const MOCK_PAPERS: ResearchPaper[] = researchPapers.map((paper, index) => ({
  id: `paper-${index + 1}`,
  title: paper.title,
  journal: paper.journal,
  authors: paper.authors,
  publishedAt: paper.date,
  tags: deriveTags(paper.title),
  countryIds: deriveCountries(paper.title),
  relevance: paper.title.includes("Muscle mass")
    ? "Core InBody positioning evidence"
    : "Strategic clinical intelligence",
}));

function matchesKeyword(item: ResearchPaper, keyword: string): boolean {
  const q = keyword.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    item.journal.toLowerCase().includes(q) ||
    item.authors.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export const researchProvider: IntelligenceProvider<ResearchPaper, CountryId> = {
  getLatest() {
    return [...MOCK_PAPERS];
  },

  getByCountry(country) {
    return MOCK_PAPERS.filter((p) => p.countryIds.includes(country));
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return MOCK_PAPERS.filter((p) => matchesKeyword(p, keyword));
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return MOCK_PAPERS.filter((p) =>
      p.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};
