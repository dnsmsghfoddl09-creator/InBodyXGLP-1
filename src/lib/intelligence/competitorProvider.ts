import type { CountryId } from "@/data/countries";
import type { CompetitorRecord } from "@/data/country-research-workspace";
import {
  COMPETITOR_COMPANY_IDS,
  COMPETITOR_PRIORITY_COUNTRIES,
  getAllCompetitorActivities,
  getAllCompetitorClinicalUpdates,
  getAllCompetitorPartnerships,
  getAllCompetitorProfiles,
  getAllPipelineItems,
  getCountryName,
  type CompetitorActivity,
  type CompetitorClinicalUpdate,
  type CompetitorCompanyId,
  type CompetitorCompanyProfile,
  type CompetitorPartnership,
  type PipelineItem,
  type PipelineStatus,
  type ThreatLevel,
} from "@/lib/intelligence/data/mock-competitors-platform";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type {
  CompetitorIntelligenceItem,
  IntelligenceFilter,
  IntelligenceProvider,
  IntelligenceSort,
} from "@/lib/intelligence/intelligenceTypes";

export type {
  CompetitorActivity,
  CompetitorClinicalUpdate,
  CompetitorCompanyId,
  CompetitorCompanyProfile,
  CompetitorPartnership,
  PipelineItem,
  PipelineStatus,
  ThreatLevel,
};
export { COMPETITOR_COMPANY_IDS, COMPETITOR_PRIORITY_COUNTRIES };

export type CompetitorPlatformFilter = {
  keyword?: string;
  companyId?: CompetitorCompanyId | "All";
  country?: CountryId | CountryId[] | "All";
  threatLevel?: ThreatLevel | "All";
  pipelineStatus?: PipelineStatus | "All";
};

export type CompetitorPlatformSort =
  | "most-active"
  | "highest-threat"
  | "highest-opportunity"
  | "alphabetical";

export type CompetitorWatchItem = {
  company: string;
  latestActivity: string;
  threatLevel: ThreatLevel;
  opportunityScore: number;
};

export type CountryCompetitorPresence = {
  countryId: CountryId;
  country: string;
  activeCompanies: string[];
  highThreatCount: number;
  topOpportunityScore: number;
};

const THREAT_RANK: Record<ThreatLevel, number> = { High: 3, Medium: 2, Low: 1 };

function threatRank(level: ThreatLevel): number {
  return THREAT_RANK[level];
}

function sortProfiles(profiles: CompetitorCompanyProfile[], sort: CompetitorPlatformSort): CompetitorCompanyProfile[] {
  const copy = [...profiles];
  switch (sort) {
    case "alphabetical":
      return copy.sort((a, b) => a.company.localeCompare(b.company));
    case "highest-threat":
      return copy.sort((a, b) => threatRank(b.threatLevel) - threatRank(a.threatLevel));
    case "highest-opportunity":
      return copy.sort((a, b) => b.opportunityScore - a.opportunityScore);
    case "most-active":
    default:
      return copy.sort((a, b) => b.latestActivity.localeCompare(a.latestActivity));
  }
}

function matchesKeyword(text: string, keyword?: string): boolean {
  if (!keyword?.trim()) return true;
  return text.toLowerCase().includes(keyword.toLowerCase());
}

function filterProfiles(filter?: CompetitorPlatformFilter): CompetitorCompanyProfile[] {
  return getAllCompetitorProfiles().filter((profile) => {
    if (filter?.companyId && filter.companyId !== "All" && profile.id !== filter.companyId) return false;
    if (filter?.threatLevel && filter.threatLevel !== "All" && profile.threatLevel !== filter.threatLevel) {
      return false;
    }
    if (filter?.country && filter.country !== "All") {
      const countries = Array.isArray(filter.country) ? filter.country : [filter.country];
      if (!countries.some((country) => profile.activeCountries.includes(country))) return false;
    }
    if (
      !matchesKeyword(
        `${profile.company} ${profile.companyOverview} ${profile.latestActivity} ${profile.marketFocus}`,
        filter?.keyword,
      )
    ) {
      return false;
    }
    return true;
  });
}

export function getCompetitorProfiles(
  filter?: CompetitorPlatformFilter,
  sort: CompetitorPlatformSort = "most-active",
): CompetitorCompanyProfile[] {
  return sortProfiles(filterProfiles(filter), sort);
}

export function getCompetitorProfile(id: CompetitorCompanyId): CompetitorCompanyProfile | undefined {
  return getAllCompetitorProfiles().find((profile) => profile.id === id);
}

export function getPipelineItems(filter?: CompetitorPlatformFilter): PipelineItem[] {
  return getAllPipelineItems().filter((item) => {
    if (filter?.companyId && filter.companyId !== "All" && item.companyId !== filter.companyId) return false;
    if (filter?.pipelineStatus && filter.pipelineStatus !== "All" && item.status !== filter.pipelineStatus) {
      return false;
    }
    if (filter?.country && filter.country !== "All") {
      const countries = Array.isArray(filter.country) ? filter.country : [filter.country];
      if (!countries.includes(item.country)) return false;
    }
    return matchesKeyword(`${item.name} ${item.indication} ${item.phase}`, filter?.keyword);
  });
}

export function getCompetitorActivities(
  filter?: CompetitorPlatformFilter,
  sort: CompetitorPlatformSort = "most-active",
): CompetitorActivity[] {
  let items = getAllCompetitorActivities().filter((item) => {
    if (filter?.companyId && filter.companyId !== "All" && item.companyId !== filter.companyId) return false;
    if (filter?.threatLevel && filter.threatLevel !== "All" && item.threatLevel !== filter.threatLevel) return false;
    if (filter?.country && filter.country !== "All") {
      const countries = Array.isArray(filter.country) ? filter.country : [filter.country];
      if (!countries.includes(item.country)) return false;
    }
    return matchesKeyword(`${item.title} ${item.summary} ${item.company}`, filter?.keyword);
  });

  if (sort === "alphabetical") items = [...items].sort((a, b) => a.company.localeCompare(b.company));
  if (sort === "highest-threat") items = [...items].sort((a, b) => threatRank(b.threatLevel) - threatRank(a.threatLevel));
  if (sort === "highest-opportunity") {
    items = [...items].sort((a, b) => b.opportunityScore - a.opportunityScore);
  }
  if (sort === "most-active") items = [...items].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

  return items;
}

export function getCompetitorPartnerships(filter?: CompetitorPlatformFilter): CompetitorPartnership[] {
  return getAllCompetitorPartnerships().filter((item) => {
    if (filter?.companyId && filter.companyId !== "All" && item.companyId !== filter.companyId) return false;
    return matchesKeyword(`${item.partner} ${item.focus} ${item.region}`, filter?.keyword);
  });
}

export function getCompetitorClinicalUpdates(filter?: CompetitorPlatformFilter): CompetitorClinicalUpdate[] {
  return getAllCompetitorClinicalUpdates().filter((item) => {
    if (filter?.companyId && filter.companyId !== "All" && item.companyId !== filter.companyId) return false;
    if (filter?.country && filter.country !== "All") {
      const countries = Array.isArray(filter.country) ? filter.country : [filter.country];
      if (!countries.includes(item.country)) return false;
    }
    return matchesKeyword(`${item.trialName} ${item.update}`, filter?.keyword);
  });
}

export function toCompetitorRecord(profile: CompetitorCompanyProfile): CompetitorRecord {
  return {
    id: profile.id,
    company: profile.company,
    currentActivity: profile.latestActivity,
    marketStatus: profile.marketStatus,
    opportunity: profile.businessOpportunities[0] ?? profile.recommendedAction,
    threatLevel: profile.threatLevel,
  };
}

export function getCountryCompetitorRecords(
  countryId: CountryId,
  filter?: Omit<CompetitorPlatformFilter, "country">,
  sort: CompetitorPlatformSort = "highest-threat",
): CompetitorRecord[] {
  return getCompetitorProfiles({ ...filter, country: countryId }, sort).map(toCompetitorRecord);
}

export function getCompetitorWatchItems(limit = 5): CompetitorWatchItem[] {
  return getCompetitorProfiles(undefined, "highest-opportunity")
    .slice(0, limit)
    .map((profile) => ({
      company: profile.company,
      latestActivity: profile.latestActivity,
      threatLevel: profile.threatLevel,
      opportunityScore: profile.opportunityScore,
    }));
}

export function getCountryCompetitorPresence(countryIds: CountryId[]): CountryCompetitorPresence[] {
  return countryIds.map((countryId) => {
    const profiles = getCompetitorProfiles({ country: countryId }, "highest-opportunity");
    return {
      countryId,
      country: getCountryName(countryId),
      activeCompanies: profiles.map((profile) => profile.company),
      highThreatCount: profiles.filter((profile) => profile.threatLevel === "High").length,
      topOpportunityScore: profiles[0]?.opportunityScore ?? 0,
    };
  });
}

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
    const normalized = tags.map((tag) => tag.toLowerCase());
    return getCompetitors().filter((item) =>
      item.tags.some((tag) => normalized.includes(tag.toLowerCase())),
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

export const THREAT_LEVEL_OPTIONS: ThreatLevel[] = ["High", "Medium", "Low"];

export const PIPELINE_STATUS_OPTIONS: PipelineStatus[] = [
  "Approved",
  "Phase III",
  "Phase II",
  "Phase I",
  "Preclinical",
];

export const COMPETITOR_SORT_OPTIONS: { value: CompetitorPlatformSort; label: string }[] = [
  { value: "most-active", label: "Most Active" },
  { value: "highest-threat", label: "Highest Threat" },
  { value: "highest-opportunity", label: "Highest Opportunity" },
  { value: "alphabetical", label: "Alphabetical" },
];
