import type { RssFeedDefinition } from "@/lib/connectors/connectorTypes";
import type { NewsIntelligenceItem } from "@/lib/intelligence/data/mock-news";
import {
  mapArticlesToNewsItems,
  normalizeAndFilterRssFeed,
  type ParsedRssItem,
  type RssNormalizedArticle,
} from "@/lib/connectors/rssNormalizer";
import { getAllRegistryRssFeeds, getPlatformRssFeeds } from "@/lib/registry";

export const RSS_PRIMARY_FEEDS: RssFeedDefinition[] = getPlatformRssFeeds();

export const RSS_FEED_REGISTRY: RssFeedDefinition[] = getAllRegistryRssFeeds();

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
