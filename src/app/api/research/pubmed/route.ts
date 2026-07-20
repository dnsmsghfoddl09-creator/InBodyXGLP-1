import { fetchPubMedResearch } from "@/lib/connectors/pubmedConnector";
import { getAllResearchPapers } from "@/lib/intelligence/data/mock-research-platform";
import { LIVE_DATA_ENABLED } from "@/lib/connectors/connectorTypes";

export async function GET() {
  if (!LIVE_DATA_ENABLED) {
    const mockItems = getAllResearchPapers();
    return Response.json({
      items: mockItems,
      meta: {
        dataSource: "MOCK",
        lastUpdated: new Date().toISOString(),
        pubmedArticleCount: 0,
        activeSource: "mock",
        debug: {
          endpoint: "/api/research/pubmed",
          searchQuery: "LIVE_DATA_ENABLED=false",
          pmidsRetrieved: 0,
          articlesAfterNormalization: 0,
          articlesRendered: mockItems.length,
          fallbackStatus: "mock",
        },
      },
    });
  }

  try {
    const result = await fetchPubMedResearch();

    if (result.items.length === 0) {
      throw new Error("No PubMed articles matched strategic query.");
    }

    return Response.json({
      items: result.items,
      meta: {
        dataSource: "LIVE",
        lastUpdated: new Date().toISOString(),
        pubmedArticleCount: result.items.length,
        activeSource: "live",
        debug: {
          endpoint: "/api/research/pubmed",
          searchQuery: result.searchQuery,
          pmidsRetrieved: result.pmidsRetrieved,
          articlesAfterNormalization: result.articlesAfterNormalization,
          articlesRendered: result.items.length,
          fallbackStatus: "none",
        },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "PubMed fetch failed";
    const mockItems = getAllResearchPapers();

    return Response.json({
      items: mockItems,
      meta: {
        dataSource: "MOCK",
        lastUpdated: new Date().toISOString(),
        pubmedArticleCount: 0,
        activeSource: "mock",
        debug: {
          endpoint: "/api/research/pubmed",
          searchQuery: "PubMed fetch failed",
          pmidsRetrieved: 0,
          articlesAfterNormalization: 0,
          articlesRendered: mockItems.length,
          fallbackStatus: "error",
          error: message,
        },
      },
    });
  }
}
