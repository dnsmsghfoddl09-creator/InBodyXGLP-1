import { COUNTRY_LIST, type CountryId } from "@/data/countries";
import type { CountryCompareProfile } from "@/data/country-compare";
import type { CountryReport } from "@/data/country-explorer";
import type { CountryIntelligence, IntelligenceProvider } from "@/lib/intelligence/types";

type CompareModule = typeof import("@/data/country-compare");
type ExplorerModule = typeof import("@/data/country-explorer");
type EnterpriseModule = typeof import("@/data/enterprise/countries");

let compareModule: CompareModule | undefined;
let explorerModule: ExplorerModule | undefined;
let enterpriseModule: EnterpriseModule | undefined;

function loadCompareModule(): CompareModule {
  compareModule ??= require("@/data/country-compare") as CompareModule;
  return compareModule;
}

function loadExplorerModule(): ExplorerModule {
  explorerModule ??= require("@/data/country-explorer") as ExplorerModule;
  return explorerModule;
}

function loadEnterpriseModule(): EnterpriseModule {
  enterpriseModule ??= require("@/data/enterprise/countries") as EnterpriseModule;
  return enterpriseModule;
}

function buildIntelligenceCatalog(): CountryIntelligence[] {
  const { getAllEnterpriseCountries } = loadEnterpriseModule();
  const { getCountryReport } = loadExplorerModule();
  const enterprise = getAllEnterpriseCountries();

  return COUNTRY_LIST.map((meta) => {
    const ent = enterprise.find((e) => e.basic.id === meta.id);
    const report = getCountryReport(meta.id);
    return {
      id: meta.id,
      name: meta.name,
      flag: meta.flag,
      region: meta.region,
      tags: [
        meta.region,
        ent?.glp1Status.maturity ?? "Market",
        ent?.insurance.coverageLevel ?? "Coverage",
        "GLP-1",
        "Country Intelligence",
      ],
      summary: ent?.aiNotes.strategicSummary ?? report.aiStrategy.whyMatters,
      opportunityScore: report.overview.opportunityScore,
      marketSize: ent?.market.marketSize ?? report.overview.glp1MarketMaturity,
      glp1Growth: report.overview.marketGrowth,
      obesityRate: report.overview.obesityPrevalence,
    };
  });
}

let catalogCache: CountryIntelligence[] | null = null;

function getCatalog(): CountryIntelligence[] {
  if (!catalogCache) {
    catalogCache = buildIntelligenceCatalog();
  }
  return catalogCache;
}

function matchesKeyword(item: CountryIntelligence, keyword: string): boolean {
  const q = keyword.toLowerCase();
  return (
    item.name.toLowerCase().includes(q) ||
    item.region.toLowerCase().includes(q) ||
    item.summary.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}

const baseProvider: IntelligenceProvider<CountryIntelligence, CountryId> = {
  getLatest() {
    return [...getCatalog()].sort((a, b) => b.opportunityScore - a.opportunityScore);
  },

  getByCountry(country) {
    const item = getCatalog().find((c) => c.id === country);
    return item ? [item] : [];
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return getCatalog().filter((c) => matchesKeyword(c, keyword));
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return getCatalog().filter((c) =>
      c.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};

export const countryProvider = {
  ...baseProvider,

  listCountries() {
    return COUNTRY_LIST;
  },

  getExplorerReport(id: CountryId): CountryReport {
    return loadExplorerModule().getCountryReport(id);
  },

  getDefaultExplorerCountryId(): CountryId {
    return loadExplorerModule().DEFAULT_COUNTRY_ID;
  },

  getCompareProfiles(ids: CountryId[]): CountryCompareProfile[] {
    return loadCompareModule().getCompareProfiles(ids);
  },

  getDefaultCompareIds(): CountryId[] {
    return loadCompareModule().DEFAULT_COMPARE_IDS;
  },

  getCompareLimits() {
    const { MIN_COMPARE, MAX_COMPARE } = loadCompareModule();
    return { min: MIN_COMPARE, max: MAX_COMPARE };
  },

  generateCompareInsights(profiles: CountryCompareProfile[]): string[] {
    return loadCompareModule().generateAiInsights(profiles);
  },

  get compareCategories() {
    return loadCompareModule().COMPARE_CATEGORIES;
  },

  get radarDimensions() {
    return loadCompareModule().RADAR_DIMENSIONS;
  },
};

export type { CountryReport, CountryCompareProfile };
