import { fetchLiveRssNews } from "@/lib/connectors/rssConnector";

export async function GET() {
  try {
    const result = await fetchLiveRssNews();

    if (result.items.length === 0) {
      return Response.json(
        { error: "No strategic RSS articles matched keyword filters." },
        { status: 502 },
      );
    }

    return Response.json({
      items: result.items,
      articles: result.articles,
      meta: {
        dataSource: "LIVE" as const,
        lastUpdated: new Date().toISOString(),
        liveArticleCount: result.items.length,
        rssProviderCount: result.providerCount,
        activeSource: "live" as const,
        activeProviders: result.activeProviders,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "RSS fetch failed";
    return Response.json({ error: message }, { status: 502 });
  }
}
