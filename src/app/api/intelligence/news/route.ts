import { fetchLiveRssNews } from "@/lib/connectors/rssConnector";
import { getAllNews } from "@/lib/intelligence/data/mock-news";
import { LIVE_DATA_ENABLED } from "@/lib/connectors/connectorTypes";

export async function GET() {
  if (!LIVE_DATA_ENABLED) {
    return Response.json({
      items: getAllNews(),
      meta: {
        dataSource: "MOCK",
        lastUpdated: new Date().toISOString(),
        liveArticleCount: 0,
        rssProviderCount: 0,
        activeSource: "mock",
      },
    });
  }

  try {
    const result = await fetchLiveRssNews();
    if (result.items.length === 0) throw new Error("No RSS articles");

    return Response.json({
      items: result.items,
      meta: {
        dataSource: "LIVE",
        lastUpdated: new Date().toISOString(),
        liveArticleCount: result.items.length,
        rssProviderCount: result.providerCount,
        activeSource: "live",
        activeProviders: result.activeProviders,
      },
    });
  } catch {
    return Response.json({
      items: getAllNews(),
      meta: {
        dataSource: "MOCK",
        lastUpdated: new Date().toISOString(),
        liveArticleCount: 0,
        rssProviderCount: 0,
        activeSource: "mock",
      },
    });
  }
}
