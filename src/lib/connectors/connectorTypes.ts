export const LIVE_DATA_ENABLED = true;

export type DataSourceMode = "mock" | "live";

export type ConnectorDomain = "news" | "research" | "conference";

export type ConnectorResult<T> = {
  data: T;
  source: DataSourceMode;
  domain: ConnectorDomain;
  error?: string;
};

export type ConnectorStatus = {
  domain: ConnectorDomain;
  activeSource: DataSourceMode;
  liveEnabled: boolean;
  lastError?: string;
};

export type RssFeedDefinition = {
  id: string;
  label: string;
  url: string;
  country?: string;
  topics?: string[];
  credibility?: number;
};

export type IntelligenceScore = "High" | "Medium" | "Low";

export type SummarySource = "template" | "ai";

export type LiveNewsMetadata = {
  dataSource: "LIVE" | "MOCK";
  lastUpdated: string | null;
  liveArticleCount: number;
  rssProviderCount: number;
  activeSource: DataSourceMode;
  activeProviders?: string[];
};

export type PubMedQueryDefinition = {
  id: string;
  label: string;
  query: string;
  maxResults?: number;
};

export type ConferenceFeedDefinition = {
  id: string;
  label: string;
  source: "ics" | "rss" | "api";
  url?: string;
};
