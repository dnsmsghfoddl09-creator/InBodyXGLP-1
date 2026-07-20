import type { CountryId } from "@/data/countries";
import type { PaperRecord } from "@/data/country-research-workspace";
import {
  EVIDENCE_LEVELS,
  getAllResearchPapers,
  getCountryName,
  RESEARCH_COUNTRIES,
  RESEARCH_JOURNALS,
  RESEARCH_STUDY_TYPES,
  RESEARCH_TOPICS,
  type EvidenceLevel,
  type ResearchPaperItem,
  type StudyType,
} from "@/lib/intelligence/data/mock-research-platform";
import { resolveResearchItems } from "@/lib/connectors";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type {
  IntelligenceFilter,
  IntelligenceProvider,
  IntelligenceSort,
  PaperIntelligenceItem,
} from "@/lib/intelligence/intelligenceTypes";

export type {
  EvidenceLevel,
  ResearchPaperItem,
  StudyType,
};
export { EVIDENCE_LEVELS, RESEARCH_COUNTRIES, RESEARCH_JOURNALS, RESEARCH_STUDY_TYPES, RESEARCH_TOPICS };

export type ResearchPlatformFilter = {
  keyword?: string;
  country?: CountryId | CountryId[] | "All";
  journal?: string | "All";
  studyType?: StudyType | "All";
  evidenceLevel?: EvidenceLevel | "All";
  publicationYear?: number | "All";
  topic?: string | "All";
};

export type ResearchPlatformSort = "newest" | "highest-evidence" | "most-relevant" | "alphabetical";

export type LatestResearchWidgetItem = {
  title: string;
  journal: string;
  evidenceLevel: EvidenceLevel;
  publicationDate: string;
};

export type CountryResearchComparison = {
  countryId: CountryId;
  country: string;
  publicationCount: number;
  topInstitutions: string[];
  researchTopics: string[];
  latestPublications: ResearchPaperItem[];
};

const EVIDENCE_RANK: Record<EvidenceLevel, number> = {
  "Level 1": 5,
  "Level 2": 4,
  "Level 3": 3,
  "Level 4": 2,
  "Level 5": 1,
};

function evidenceRank(level: EvidenceLevel): number {
  return EVIDENCE_RANK[level];
}

function matchesKeyword(text: string, keyword?: string): boolean {
  if (!keyword?.trim()) return true;
  return text.toLowerCase().includes(keyword.toLowerCase());
}

function filterPapers(filter?: ResearchPlatformFilter): ResearchPaperItem[] {
  return getAllResearchPapers().filter((paper) => {
    if (filter?.country && filter.country !== "All") {
      const countries = Array.isArray(filter.country) ? filter.country : [filter.country];
      if (!countries.some((country) => paper.country === country || paper.relatedCountries.includes(country))) {
        return false;
      }
    }
    if (filter?.journal && filter.journal !== "All" && paper.journal !== filter.journal) return false;
    if (filter?.studyType && filter.studyType !== "All" && paper.studyType !== filter.studyType) return false;
    if (filter?.evidenceLevel && filter.evidenceLevel !== "All" && paper.evidenceLevel !== filter.evidenceLevel) {
      return false;
    }
    if (filter?.publicationYear && filter.publicationYear !== "All" && paper.publicationYear !== filter.publicationYear) {
      return false;
    }
    if (filter?.topic && filter.topic !== "All" && !paper.keywords.includes(filter.topic)) return false;
    if (
      !matchesKeyword(
        `${paper.title} ${paper.authors} ${paper.journal} ${paper.abstract} ${paper.keywords.join(" ")}`,
        filter?.keyword,
      )
    ) {
      return false;
    }
    return true;
  });
}

function sortPapers(papers: ResearchPaperItem[], sort: ResearchPlatformSort): ResearchPaperItem[] {
  const copy = [...papers];
  switch (sort) {
    case "alphabetical":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "highest-evidence":
      return copy.sort((a, b) => evidenceRank(b.evidenceLevel) - evidenceRank(a.evidenceLevel));
    case "most-relevant":
      return copy.sort((a, b) => b.relevanceScore - a.relevanceScore);
    case "newest":
    default:
      return copy.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
  }
}

export function getResearchPapers(
  filter?: ResearchPlatformFilter,
  sort: ResearchPlatformSort = "newest",
): ResearchPaperItem[] {
  return resolveResearchItems(() => sortPapers(filterPapers(filter), sort));
}

export function getResearchPaper(id: string): ResearchPaperItem | undefined {
  return getAllResearchPapers().find((paper) => paper.id === id);
}

export function toPaperRecord(paper: ResearchPaperItem): PaperRecord {
  return {
    id: paper.id,
    title: paper.title,
    journal: paper.journal,
    authors: paper.authors,
    publicationDate: paper.publicationDate,
    studyType: paper.studyType,
    keyFindings: paper.keyFindings,
  };
}

export function getCountryPaperRecords(
  countryId: CountryId,
  filter?: Omit<ResearchPlatformFilter, "country">,
  sort: ResearchPlatformSort = "newest",
): PaperRecord[] {
  return getResearchPapers({ ...filter, country: countryId }, sort).map(toPaperRecord);
}

export function getLatestResearchItems(limit = 5): LatestResearchWidgetItem[] {
  return getResearchPapers(undefined, "newest")
    .slice(0, limit)
    .map((paper) => ({
      title: paper.title,
      journal: paper.journal,
      evidenceLevel: paper.evidenceLevel,
      publicationDate: paper.publicationDate,
    }));
}

export function getCountryResearchComparison(countryIds: CountryId[]): CountryResearchComparison[] {
  return countryIds.map((countryId) => {
    const papers = getResearchPapers({ country: countryId }, "newest");
    const institutions = Array.from(new Set(papers.map((paper) => paper.institution))).slice(0, 3);
    const topics = Array.from(new Set(papers.flatMap((paper) => paper.keywords))).slice(0, 5);
    return {
      countryId,
      country: getCountryName(countryId),
      publicationCount: papers.length,
      topInstitutions: institutions,
      researchTopics: topics,
      latestPublications: papers.slice(0, 3),
    };
  });
}

export function getPublicationYears(): number[] {
  return Array.from(new Set(getAllResearchPapers().map((paper) => paper.publicationYear))).sort((a, b) => b - a);
}

export function getPapers(filter?: IntelligenceFilter, sort: IntelligenceSort = "newest"): PaperIntelligenceItem[] {
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
    const normalized = tags.map((tag) => tag.toLowerCase());
    return getPapers().filter((item) => item.tags.some((tag) => normalized.includes(tag.toLowerCase())));
  },
};

export const RESEARCH_SORT_OPTIONS: { value: ResearchPlatformSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "highest-evidence", label: "Highest Evidence" },
  { value: "most-relevant", label: "Most Relevant" },
  { value: "alphabetical", label: "Alphabetical" },
];
