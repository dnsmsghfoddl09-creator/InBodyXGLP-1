import { getAllNews, type NewsIntelligenceItem } from "@/lib/intelligence/data/mock-news";
import { getAllResearchPapers, type ResearchPaperItem } from "@/lib/intelligence/data/mock-research-platform";
import type { IntelligenceFilter, IntelligenceSort } from "@/lib/intelligence/intelligenceTypes";
import { applyIntelligenceFilter, applyIntelligenceSort } from "@/lib/intelligence/intelligenceTypes";
import { fetchPubMedResearch } from "@/lib/connectors/pubmedConnector";
import { fetchLiveRssNews, fetchRssNews } from "@/lib/connectors/rssConnector";
import {
  LIVE_DATA_ENABLED,
  type LiveNewsMetadata,
  type LiveResearchMetadata,
} from "@/lib/connectors/connectorTypes";
import { resolveWithLiveFallback, resolveWithLiveFallbackSync } from "@/lib/connectors/connectorUtils";

export {
  LIVE_DATA_ENABLED,
  type ConnectorDomain,
  type ConnectorResult,
  type ConnectorStatus,
  type ConferenceFeedDefinition,
  type DataSourceMode,
  type IntelligenceScore,
  type LiveNewsMetadata,
  type LiveResearchMetadata,
  type PubMedDebugInfo,
  type PubMedFetchResult,
  type PubMedQueryDefinition,
  type RssFeedDefinition,
  type SummarySource,
} from "@/lib/connectors/connectorTypes";

export {
  getConnectorStatus,
  getPlatformDataSourceLabel,
  getPlatformDataSourceMode,
  resolveWithLiveFallback,
  resolveWithLiveFallbackSync,
} from "@/lib/connectors/connectorUtils";

export {
  fetchLiveRssNews,
  fetchRssNews,
  getRegisteredRssFeeds,
  RSS_FEED_REGISTRY,
  RSS_PRIMARY_FEEDS,
} from "@/lib/connectors/rssConnector";

export {
  type RssNormalizedArticle,
  STRATEGIC_KEYWORDS,
} from "@/lib/connectors/rssNormalizer";

export {
  fetchPubMedResearch,
  getRegisteredPubMedQueries,
  PUBMED_QUERY_REGISTRY,
  type PubMedFetchOptions,
} from "@/lib/connectors/pubmedConnector";

export {
  CONFERENCE_FEED_REGISTRY,
  fetchLiveConferences,
  getMockConferenceFallback,
  getRegisteredConferenceFeeds,
} from "@/lib/connectors/conferenceConnector";

let newsSnapshot: NewsIntelligenceItem[] | null = null;
let newsMetadata: LiveNewsMetadata = {
  dataSource: "MOCK",
  lastUpdated: null,
  liveArticleCount: 0,
  rssProviderCount: 0,
  activeSource: "mock",
};
let researchSnapshot: ResearchPaperItem[] | null = null;
let researchMetadata: LiveResearchMetadata = {
  dataSource: "MOCK",
  lastUpdated: null,
  pubmedArticleCount: 0,
  activeSource: "mock",
};
let refreshPromise: Promise<LiveNewsMetadata> | null = null;
let researchRefreshPromise: Promise<LiveResearchMetadata> | null = null;
const listeners = new Set<() => void>();
const researchListeners = new Set<() => void>();

function notifyNewsListeners() {
  listeners.forEach((listener) => listener());
}

export function subscribeNewsCache(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function subscribeResearchCache(listener: () => void): () => void {
  researchListeners.add(listener);
  return () => researchListeners.delete(listener);
}

export function getLiveNewsMetadata(): LiveNewsMetadata {
  return newsMetadata;
}

export function getLiveResearchMetadata(): LiveResearchMetadata {
  return researchMetadata;
}

export function setNewsSnapshot(
  items: NewsIntelligenceItem[],
  source: "live" | "mock",
  liveCount = 0,
  rssProviderCount = 0,
  activeProviders: string[] = [],
) {
  newsSnapshot = items;
  newsMetadata = {
    dataSource: source === "live" ? "LIVE" : "MOCK",
    lastUpdated: new Date().toISOString(),
    liveArticleCount: liveCount,
    rssProviderCount,
    activeSource: source,
    activeProviders,
  };
  notifyNewsListeners();
}

function notifyResearchListeners() {
  researchListeners.forEach((listener) => listener());
}

export function setResearchSnapshot(
  items: ResearchPaperItem[],
  source: "live" | "mock",
  pubmedCount = 0,
  debug?: LiveResearchMetadata["debug"],
) {
  researchSnapshot = items;
  researchMetadata = {
    dataSource: source === "live" ? "LIVE" : "MOCK",
    lastUpdated: new Date().toISOString(),
    pubmedArticleCount: pubmedCount,
    activeSource: source,
    debug,
  };
  notifyResearchListeners();
}

export async function refreshNewsCache(): Promise<LiveNewsMetadata> {
  if (!LIVE_DATA_ENABLED) {
    setNewsSnapshot(getAllNews(), "mock", 0, 0);
    return newsMetadata;
  }

  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const result = await fetchLiveRssNews();
      if (result.items.length === 0) throw new Error("No live RSS articles available");

      setNewsSnapshot(
        result.items,
        "live",
        result.items.length,
        result.providerCount,
        result.activeProviders,
      );
    } catch {
      const mockItems = getAllNews();
      setNewsSnapshot(mockItems, "mock", 0, 0);
    } finally {
      refreshPromise = null;
    }

    return newsMetadata;
  })();

  return refreshPromise;
}

export function resolveNewsBase(): NewsIntelligenceItem[] {
  if (!LIVE_DATA_ENABLED) {
    return getAllNews();
  }

  if (newsSnapshot && newsSnapshot.length > 0) {
    return newsSnapshot;
  }

  return getAllNews();
}

export function resolveNewsItems(
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
): NewsIntelligenceItem[] {
  return applyIntelligenceSort(applyIntelligenceFilter(resolveNewsBase(), filter), sort);
}

export async function resolveNewsItemsAsync(
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
): Promise<NewsIntelligenceItem[]> {
  await refreshNewsCache();
  return resolveNewsItems(filter, sort);
}

export function resolveResearchBase(): ResearchPaperItem[] {
  if (!LIVE_DATA_ENABLED) {
    return getAllResearchPapers();
  }

  if (researchSnapshot && researchSnapshot.length > 0) {
    return researchSnapshot;
  }

  return getAllResearchPapers();
}

export function resolveResearchItems(
  mock: () => ResearchPaperItem[],
): ResearchPaperItem[] {
  if (!LIVE_DATA_ENABLED) {
    return mock();
  }

  if (researchSnapshot && researchSnapshot.length > 0) {
    return researchSnapshot;
  }

  return mock();
}

export async function resolveResearchItemsAsync(
  mock: () => ResearchPaperItem[],
): Promise<ResearchPaperItem[]> {
  await refreshResearchCache();
  return resolveResearchItems(mock);
}

export async function refreshResearchCache(): Promise<LiveResearchMetadata> {
  if (!LIVE_DATA_ENABLED) {
    setResearchSnapshot(getAllResearchPapers(), "mock", 0);
    return researchMetadata;
  }

  if (researchRefreshPromise) return researchRefreshPromise;

  researchRefreshPromise = (async () => {
    try {
      const result = await fetchPubMedResearch();
      if (result.items.length === 0) throw new Error("No PubMed articles available");

      setResearchSnapshot(result.items, "live", result.items.length, {
        endpoint: "/api/research/pubmed",
        searchQuery: result.searchQuery,
        pmidsRetrieved: result.pmidsRetrieved,
        articlesAfterNormalization: result.articlesAfterNormalization,
        articlesRendered: result.items.length,
        fallbackStatus: "none",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "PubMed fetch failed";
      setResearchSnapshot(getAllResearchPapers(), "mock", 0, {
        endpoint: "/api/research/pubmed",
        searchQuery: "PubMed fetch failed",
        pmidsRetrieved: 0,
        articlesAfterNormalization: 0,
        articlesRendered: getAllResearchPapers().length,
        fallbackStatus: "error",
        error: message,
      });
    } finally {
      researchRefreshPromise = null;
    }

    return researchMetadata;
  })();

  return researchRefreshPromise;
}

export async function hydrateResearchCacheFromApi(): Promise<LiveResearchMetadata> {
  if (!LIVE_DATA_ENABLED) {
    setResearchSnapshot(getAllResearchPapers(), "mock", 0, {
      endpoint: "/api/research/pubmed",
      searchQuery: "LIVE_DATA_ENABLED=false",
      pmidsRetrieved: 0,
      articlesAfterNormalization: 0,
      articlesRendered: getAllResearchPapers().length,
      fallbackStatus: "mock",
    });
    return researchMetadata;
  }

  try {
    const response = await fetch("/api/research/pubmed", { cache: "no-store" });
    if (!response.ok) throw new Error("PubMed API unavailable");

    const payload = (await response.json()) as {
      items: ResearchPaperItem[];
      meta: LiveResearchMetadata;
    };

    setResearchSnapshot(
      payload.items,
      payload.meta.activeSource,
      payload.meta.pubmedArticleCount,
      payload.meta.debug,
    );
    researchMetadata = payload.meta;
    notifyResearchListeners();
    return researchMetadata;
  } catch (error) {
    const message = error instanceof Error ? error.message : "PubMed API unavailable";
    setResearchSnapshot(getAllResearchPapers(), "mock", 0, {
      endpoint: "/api/research/pubmed",
      searchQuery: "PubMed API unavailable",
      pmidsRetrieved: 0,
      articlesAfterNormalization: 0,
      articlesRendered: getAllResearchPapers().length,
      fallbackStatus: "error",
      error: message,
    });
    return researchMetadata;
  }
}

export async function hydrateNewsCacheFromApi(): Promise<LiveNewsMetadata> {
  if (!LIVE_DATA_ENABLED) {
    setNewsSnapshot(getAllNews(), "mock", 0, 0);
    return newsMetadata;
  }

  try {
    const response = await fetch("/api/news/rss", { cache: "no-store" });
    if (!response.ok) throw new Error("RSS API unavailable");

    const payload = (await response.json()) as {
      items: NewsIntelligenceItem[];
      meta: LiveNewsMetadata;
    };

    setNewsSnapshot(
      payload.items,
      payload.meta.activeSource,
      payload.meta.liveArticleCount,
      payload.meta.rssProviderCount,
      payload.meta.activeProviders ?? [],
    );
    newsMetadata = payload.meta;
    notifyNewsListeners();
    return newsMetadata;
  } catch {
    setNewsSnapshot(getAllNews(), "mock", 0, 0);
    return newsMetadata;
  }
}
