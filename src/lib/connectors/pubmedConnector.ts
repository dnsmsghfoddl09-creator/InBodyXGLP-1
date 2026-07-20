import type { CountryId } from "@/data/countries";
import type { PubMedQueryDefinition, PubMedFetchResult } from "@/lib/connectors/connectorTypes";
import type {
  EvidenceLevel,
  ResearchPaperItem,
  StudyType,
} from "@/lib/intelligence/data/mock-research-platform";
import { getPlatformGlobalSources } from "@/lib/registry";

export type PubMedFetchOptions = {
  queries?: PubMedQueryDefinition[];
  maxResults?: number;
};

export const STRATEGIC_RESEARCH_TOPICS = [
  "GLP-1",
  "Semaglutide",
  "Tirzepatide",
  "Obesity",
  "Body Composition",
  "InBody",
  "Muscle Mass",
  "Sarcopenia",
  "MASH",
  "Diabetes",
  "Nutrition",
  "Exercise",
  "Medical Device",
  "Digital Health",
] as const;

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

const EUTILS_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const PLACEHOLDER_EXECUTIVE_SUMMARY = "Executive summary pending AI enrichment (Sprint 9).";
const PLACEHOLDER_CLINICAL_IMPACT = "Clinical impact analysis pending.";
const PLACEHOLDER_BUSINESS_IMPACT = "Business impact analysis pending.";
const PLACEHOLDER_RECOMMENDED_ACTION = "Recommended action pending strategy review.";

type PubMedSummaryRecord = {
  uid: string;
  title?: string;
  authors?: Array<{ name?: string }>;
  source?: string;
  fulljournalname?: string;
  pubdate?: string;
  articleids?: Array<{ idtype?: string; value?: string }>;
};

type PubMedArticleDetails = {
  abstract?: string;
  affiliation?: string;
  publicationTypes: string[];
  keywords: string[];
};

export function buildStrategicPubMedQuery(): string {
  const registryQueries = getPlatformGlobalSources()
    .filter((source) => source.connectorType === "pubmed" && source.query)
    .map((source) => source.query!);

  const topicTerms = [
    "GLP-1[Title/Abstract]",
    "semaglutide[Title/Abstract]",
    "tirzepatide[Title/Abstract]",
    "obesity[MeSH Terms]",
    '"body composition"[Title/Abstract]',
    "InBody[Title/Abstract]",
    '"muscle mass"[Title/Abstract]',
    "sarcopenia[MeSH Terms]",
    "MASH[Title/Abstract]",
    "diabetes[MeSH Terms]",
    "nutrition[Title/Abstract]",
    "exercise[Title/Abstract]",
    '"medical device"[Title/Abstract]',
    '"digital health"[Title/Abstract]',
  ];

  const combined = `(${topicTerms.join(" OR ")})`;
  if (registryQueries.length === 0) return combined;
  return `(${combined}) OR (${registryQueries.join(" OR ")})`;
}

function buildPubMedSearchUrl(query: string, maxResults = 50): string {
  return `${EUTILS_BASE}/esearch.fcgi?db=pubmed&retmode=json&retmax=${maxResults}&sort=relevance&term=${encodeURIComponent(query)}`;
}

function buildPubMedSummaryUrl(pmids: string[]): string {
  return `${EUTILS_BASE}/esummary.fcgi?db=pubmed&retmode=json&id=${pmids.join(",")}`;
}

function buildPubMedFetchUrl(pmids: string[]): string {
  return `${EUTILS_BASE}/efetch.fcgi?db=pubmed&retmode=xml&id=${pmids.join(",")}`;
}

function decodeXml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = block.match(regex);
  return match?.[1] ? decodeXml(match[1]) : "";
}

function extractAllTags(block: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const values: string[] = [];
  let match: RegExpExecArray | null = regex.exec(block);
  while (match) {
    if (match[1]) values.push(decodeXml(match[1]));
    match = regex.exec(block);
  }
  return values;
}

function parsePubMedXmlDetails(xml: string, pmids: string[]): Map<string, PubMedArticleDetails> {
  const details = new Map<string, PubMedArticleDetails>();

  for (const pmid of pmids) {
    const articleBlock =
      xml.match(new RegExp(`<PubmedArticle[\\s\\S]*?<PMID[^>]*>${pmid}<\\/PMID>[\\s\\S]*?<\\/PubmedArticle>`, "i"))?.[0] ??
      "";

    if (!articleBlock) {
      details.set(pmid, { publicationTypes: [], keywords: [] });
      continue;
    }

    const abstract = extractAllTags(articleBlock, "AbstractText").join(" ");
    const affiliation = extractTag(articleBlock, "Affiliation");
    const publicationTypes = extractAllTags(articleBlock, "PublicationType");
    const meshKeywords = extractAllTags(articleBlock, "DescriptorName");
    const keywordTags = extractAllTags(articleBlock, "Keyword");

    details.set(pmid, {
      abstract: abstract || undefined,
      affiliation: affiliation || undefined,
      publicationTypes,
      keywords: [...meshKeywords, ...keywordTags],
    });
  }

  return details;
}

function inferCountry(text: string): CountryId {
  const haystack = text.toLowerCase();
  const hints: Array<{ id: CountryId; patterns: string[] }> = [
    { id: "south-korea", patterns: ["korea", "korean", "seoul"] },
    { id: "japan", patterns: ["japan", "japanese", "tokyo"] },
    { id: "usa", patterns: ["united states", "u.s.", "america", "usa"] },
    { id: "uk", patterns: ["united kingdom", "u.k.", "britain", "england"] },
    { id: "germany", patterns: ["germany", "german", "berlin"] },
    { id: "france", patterns: ["france", "french", "paris"] },
    { id: "china", patterns: ["china", "chinese", "beijing", "shanghai"] },
    { id: "singapore", patterns: ["singapore"] },
    { id: "thailand", patterns: ["thailand", "bangkok"] },
    { id: "indonesia", patterns: ["indonesia", "jakarta"] },
    { id: "australia", patterns: ["australia", "sydney", "melbourne"] },
    { id: "canada", patterns: ["canada", "toronto", "montreal"] },
  ];

  for (const hint of hints) {
    if (hint.patterns.some((pattern) => haystack.includes(pattern))) return hint.id;
  }

  return "usa";
}

function parsePublicationDate(pubdate?: string): { publicationDate: string; publicationYear: number } {
  if (!pubdate) {
    const now = new Date();
    return {
      publicationDate: now.toISOString().slice(0, 10),
      publicationYear: now.getFullYear(),
    };
  }

  const yearMatch = pubdate.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? Number(yearMatch[0]) : new Date().getFullYear();
  const monthMatch = pubdate.match(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|June|July|August|September|October|November|December)\b/i,
  );
  const monthMap: Record<string, number> = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3, apr: 4, april: 4,
    may: 5, jun: 6, june: 6, jul: 7, july: 7, aug: 8, august: 8, sep: 9, september: 9,
    oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12,
  };
  const month = monthMatch ? monthMap[monthMatch[0].toLowerCase()] ?? 1 : 1;
  const dayMatch = pubdate.match(/\b([0-3]?\d)\b/);
  const day = dayMatch ? Number(dayMatch[0]) : 1;

  return {
    publicationDate: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    publicationYear: year,
  };
}

function inferStudyType(publicationTypes: string[]): StudyType {
  const joined = publicationTypes.join(" ").toLowerCase();
  if (joined.includes("meta-analysis")) return "Meta-analysis";
  if (joined.includes("systematic review")) return "Systematic Review";
  if (joined.includes("randomized controlled trial")) return "Randomized Controlled Trial";
  if (joined.includes("prospective")) return "Prospective Study";
  if (joined.includes("retrospective") || joined.includes("case-control")) return "Retrospective Study";
  return "Observational Study";
}

function inferEvidenceLevel(studyType: StudyType): EvidenceLevel {
  if (studyType === "Meta-analysis" || studyType === "Systematic Review") return "Level 1";
  if (studyType === "Randomized Controlled Trial") return "Level 2";
  if (studyType === "Prospective Study" || studyType === "Retrospective Study") return "Level 3";
  return "Level 4";
}

function matchTopics(text: string): string[] {
  const haystack = text.toLowerCase();
  return STRATEGIC_RESEARCH_TOPICS.filter((topic) => haystack.includes(topic.toLowerCase()));
}

function formatAuthors(authors?: Array<{ name?: string }>): string {
  if (!authors || authors.length === 0) return "Authors not listed";
  const names = authors.map((author) => author.name).filter(Boolean) as string[];
  if (names.length <= 3) return names.join(", ");
  return `${names.slice(0, 3).join(", ")} et al.`;
}

function extractDoi(record: PubMedSummaryRecord): string {
  const doi = record.articleids?.find((entry) => entry.idtype?.toLowerCase() === "doi")?.value;
  return doi ?? "Not available";
}

function mapPubMedRecordToPaper(
  record: PubMedSummaryRecord,
  details: PubMedArticleDetails,
): ResearchPaperItem {
  const pmid = record.uid;
  const title = record.title?.trim() || "Untitled PubMed record";
  const journal = record.fulljournalname || record.source || "Journal not listed";
  const authors = formatAuthors(record.authors);
  const { publicationDate, publicationYear } = parsePublicationDate(record.pubdate);
  const doi = extractDoi(record);
  const searchable = `${title} ${details.abstract ?? ""} ${details.affiliation ?? ""} ${details.keywords.join(" ")}`;
  const matchedTopics = matchTopics(searchable);
  const keywords = Array.from(new Set([...matchedTopics, ...details.keywords.slice(0, 6), "PubMed"]));
  const country = inferCountry(searchable);
  const institution = details.affiliation || "Institution not reported";
  const studyType = inferStudyType(details.publicationTypes);
  const evidenceLevel = inferEvidenceLevel(studyType);
  const abstract = details.abstract || "Abstract not available from PubMed.";

  return {
    id: `pubmed-${pmid}`,
    title,
    authors,
    journal,
    publicationDate,
    publicationYear,
    doi,
    country,
    institution,
    studyType,
    evidenceLevel,
    sampleSize: "Not reported",
    keywords,
    abstract,
    aiExecutiveSummary: PLACEHOLDER_EXECUTIVE_SUMMARY,
    clinicalImplications: PLACEHOLDER_CLINICAL_IMPACT,
    businessImplications: PLACEHOLDER_BUSINESS_IMPACT,
    recommendedActions: [PLACEHOLDER_RECOMMENDED_ACTION],
    relatedCompetitors: [],
    relatedCountries: [country],
    relatedConferences: [],
    relatedNews: [],
    tags: ["PubMed", "live-research", ...matchedTopics.slice(0, 4)],
    keyFindings: abstract !== "Abstract not available from PubMed." ? abstract.slice(0, 240) : "See abstract for study findings.",
    relevanceScore: Math.min(100, 40 + matchedTopics.length * 8),
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "InBody-Global-Intelligence/1.0" },
    next: { revalidate: 900 },
  });
  if (!response.ok) throw new Error(`PubMed request failed (${response.status})`);
  return (await response.json()) as T;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { Accept: "application/xml", "User-Agent": "InBody-Global-Intelligence/1.0" },
    next: { revalidate: 900 },
  });
  if (!response.ok) throw new Error(`PubMed XML request failed (${response.status})`);
  return response.text();
}

export async function fetchPubMedResearch(options?: PubMedFetchOptions): Promise<PubMedFetchResult> {
  const searchQuery = buildStrategicPubMedQuery();
  const maxResults = options?.maxResults ?? 50;
  const searchUrl = buildPubMedSearchUrl(searchQuery, maxResults);

  const searchPayload = await fetchJson<{
    esearchresult?: { idlist?: string[]; count?: string };
  }>(searchUrl);

  const pmids = searchPayload.esearchresult?.idlist ?? [];
  if (pmids.length === 0) {
    return {
      items: [],
      searchQuery,
      pmidsRetrieved: 0,
      articlesAfterNormalization: 0,
    };
  }

  const summaryPayload = await fetchJson<{
    result?: Record<string, PubMedSummaryRecord | string[]>;
  }>(buildPubMedSummaryUrl(pmids));

  const xml = await fetchText(buildPubMedFetchUrl(pmids));
  const detailsByPmid = parsePubMedXmlDetails(xml, pmids);

  const items: ResearchPaperItem[] = [];
  const seen = new Set<string>();

  for (const pmid of pmids) {
    const rawRecord = summaryPayload.result?.[pmid];
    if (!rawRecord || Array.isArray(rawRecord)) continue;
    const record = rawRecord as PubMedSummaryRecord;
    if (seen.has(pmid)) continue;
    seen.add(pmid);

    items.push(mapPubMedRecordToPaper(record, detailsByPmid.get(pmid) ?? { publicationTypes: [], keywords: [] }));
  }

  items.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));

  return {
    items,
    searchQuery,
    pmidsRetrieved: pmids.length,
    articlesAfterNormalization: items.length,
  };
}

export function getRegisteredPubMedQueries(): PubMedQueryDefinition[] {
  return PUBMED_QUERY_REGISTRY;
}
