import type { PubMedQueryDefinition } from "@/lib/connectors/connectorTypes";
import type { ResearchPaperItem } from "@/lib/intelligence/data/mock-research-platform";

export type PubMedFetchOptions = {
  queries?: PubMedQueryDefinition[];
};

export const PUBMED_QUERY_REGISTRY: PubMedQueryDefinition[] = [
  {
    id: "glp1-obesity",
    label: "GLP-1 Obesity",
    query: "GLP-1[Title/Abstract] AND obesity[MeSH Terms]",
    maxResults: 25,
  },
  {
    id: "body-composition",
    label: "Body Composition",
    query: "body composition[Title/Abstract] AND bioelectrical impedance[Title/Abstract]",
    maxResults: 25,
  },
  {
    id: "sarcopenia-inbody",
    label: "Sarcopenia Monitoring",
    query: "sarcopenia[MeSH Terms] AND muscle mass[Title/Abstract]",
    maxResults: 25,
  },
];

function buildPubMedSearchUrl(query: string, maxResults = 25): string {
  const encoded = encodeURIComponent(query);
  return `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=${maxResults}&term=${encoded}`;
}

export async function fetchPubMedResearch(_options?: PubMedFetchOptions): Promise<ResearchPaperItem[]> {
  // Architecture-only: uses public E-utilities endpoints and requires no API key.
  // Parsing and mapping to ResearchPaperItem will be added when LIVE_DATA_ENABLED is turned on.
  for (const entry of PUBMED_QUERY_REGISTRY) {
    buildPubMedSearchUrl(entry.query, entry.maxResults);
  }
  return [];
}

export function getRegisteredPubMedQueries(): PubMedQueryDefinition[] {
  return PUBMED_QUERY_REGISTRY;
}
