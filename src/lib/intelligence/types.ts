import type { CountryId } from "@/data/countries";

export type IntelligenceProvider<T, TCountry = CountryId> = {
  getLatest(): T[];
  getByCountry(country: TCountry): T[];
  search(keyword: string): T[];
  getRelated(tags: string[]): T[];
};

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
