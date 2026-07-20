import type { CountryId } from "@/data/countries";

export type StrategicSourceCategory =
  | "news"
  | "research"
  | "clinical-trials"
  | "government"
  | "insurance"
  | "conference"
  | "competitors"
  | "medical-societies";

export type SourceConnectorType =
  | "rss"
  | "pubmed"
  | "clinical-trials"
  | "regulatory"
  | "api"
  | "reference";

export type SourceProviderId =
  | "FDA"
  | "EMA"
  | "PMDA"
  | "MFDS"
  | "WHO"
  | "PubMed"
  | "ClinicalTrials.gov"
  | "Google News"
  | string;

export type SourceStatus = "active" | "configured" | "placeholder";

export type StrategicDataSource = {
  id: string;
  label: string;
  category: StrategicSourceCategory;
  connectorType: SourceConnectorType;
  provider?: SourceProviderId;
  url?: string;
  query?: string;
  credibility?: number;
  countryId?: CountryId;
  status: SourceStatus;
};

export type CountryRegistryEntry = {
  id: CountryId;
  name: string;
  isoCode: string;
  region: string;
  language: string;
  currency: string;
  timeZone: string;
  sources: StrategicDataSource[];
};

export type RegistryStats = {
  supportedCountries: number;
  configuredSources: number;
  activeProviders: number;
};

export const STRATEGIC_SOURCE_CATEGORY_LABELS: Record<StrategicSourceCategory, string> = {
  news: "News",
  research: "Research",
  "clinical-trials": "Clinical Trials",
  government: "Government",
  insurance: "Insurance",
  conference: "Conference",
  competitors: "Competitors",
  "medical-societies": "Medical Societies",
};
