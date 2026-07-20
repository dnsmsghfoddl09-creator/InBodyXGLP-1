import type { RssFeedDefinition } from "@/lib/connectors/connectorTypes";
import type { NewsIntelligenceItem } from "@/lib/intelligence/data/mock-news";
import {
  mapArticlesToNewsItems,
  normalizeAndFilterRssFeed,
  type ParsedRssItem,
  type RssNormalizedArticle,
} from "@/lib/connectors/rssNormalizer";

const GOOGLE_NEWS_RSS = (query: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;

export const RSS_PRIMARY_FEEDS: RssFeedDefinition[] = [
  {
    id: "google-news",
    label: "Google News",
    url: GOOGLE_NEWS_RSS("GLP-1 OR obesity OR semaglutide OR tirzepatide OR InBody"),
    credibility: 55,
  },
  {
    id: "who-news",
    label: "WHO News",
    url: "https://www.who.int/rss-feeds/news-english.xml",
    credibility: 90,
  },
  {
    id: "fda-news",
    label: "FDA News",
    url: "https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/press-releases/rss.xml",
    country: "usa",
    credibility: 95,
  },
  {
    id: "ema-news",
    label: "EMA News",
    url: GOOGLE_NEWS_RSS("site:ema.europa.eu European Medicines Agency obesity diabetes"),
    credibility: 92,
  },
];

export const RSS_FEED_REGISTRY: RssFeedDefinition[] = [...RSS_PRIMARY_FEEDS];

export type RssFetchResult = {
  items: NewsIntelligenceItem[];
  articles: RssNormalizedArticle[];
  providerCount: number;
  activeProviders: string[];
};

function decodeHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = block.match(regex);
  return match?.[1] ? decodeHtml(match[1]) : "";
}

export function parseRssXml(xml: string, feed: RssFeedDefinition): ParsedRssItem[] {
  const items: ParsedRssItem[] = [];
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s\S]*?<\/entry>/gi) ?? [];

  for (const block of itemBlocks) {
    const title = extractTag(block, "title");
    const link =
      extractTag(block, "link") ||
      block.match(/<link[^>]*href="([^"]+)"/i)?.[1] ||
      extractTag(block, "guid");
    const description =
      extractTag(block, "description") || extractTag(block, "summary") || extractTag(block, "content");
    const publishedAt =
      extractTag(block, "pubDate") || extractTag(block, "published") || extractTag(block, "updated");

    if (!title || !link) continue;

    items.push({ title, link, description, publishedAt, feed });
  }

  return items;
}

async function fetchFeedXml(feed: RssFeedDefinition): Promise<string | null> {
  try {
    const response = await fetch(feed.url, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "User-Agent": "InBody-Global-Intelligence/1.0",
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

export async function fetchLiveRssNews(
  feeds: RssFeedDefinition[] = RSS_PRIMARY_FEEDS,
): Promise<RssFetchResult> {
  const rawItems: ParsedRssItem[] = [];
  const activeProviders: string[] = [];

  await Promise.all(
    feeds.map(async (feed) => {
      const xml = await fetchFeedXml(feed);
      if (!xml) return;
      const parsed = parseRssXml(xml, feed);
      if (parsed.length === 0) return;
      activeProviders.push(feed.label);
      rawItems.push(...parsed);
    }),
  );

  const articles = normalizeAndFilterRssFeed(rawItems);
  const items = mapArticlesToNewsItems(articles);

  return {
    items,
    articles,
    providerCount: activeProviders.length,
    activeProviders,
  };
}

export async function fetchRssNews(
  feeds: RssFeedDefinition[] = RSS_PRIMARY_FEEDS,
): Promise<NewsIntelligenceItem[]> {
  const result = await fetchLiveRssNews(feeds);
  return result.items;
}

export function getRegisteredRssFeeds(): RssFeedDefinition[] {
  return RSS_FEED_REGISTRY;
}

export function filterStrategicNews(items: NewsIntelligenceItem[]): NewsIntelligenceItem[] {
  return items.filter((item) => item.tags.includes("live-rss") || !item.link.startsWith("#"));
}
