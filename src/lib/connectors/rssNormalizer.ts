import type { CountryId } from "@/data/countries";
import { COUNTRY_LIST } from "@/data/countries";
import type { RssFeedDefinition } from "@/lib/connectors/connectorTypes";
import type { NewsCategory, NewsIntelligenceItem, NewsTopic } from "@/lib/intelligence/data/mock-news";

export const STRATEGIC_KEYWORDS = [
  "GLP-1",
  "GLP1",
  "Obesity",
  "Weight Loss",
  "Semaglutide",
  "Tirzepatide",
  "Body Composition",
  "Muscle",
  "Sarcopenia",
  "MASH",
  "Diabetes",
  "Digital Health",
  "Medical Device",
  "Hospital",
  "Pharmacy",
  "Novo Nordisk",
  "Eli Lilly",
  "Roche",
  "Amgen",
  "Viking Therapeutics",
  "Structure Therapeutics",
  "InBody",
] as const;

export const PLACEHOLDER_EXECUTIVE_SUMMARY =
  "Executive summary pending AI enrichment (Sprint 9).";
export const PLACEHOLDER_BUSINESS_IMPACT = "Business impact analysis pending.";
export const PLACEHOLDER_RECOMMENDED_ACTION = "Recommended action pending strategy review.";

export type RssNormalizedArticle = {
  id: string;
  title: string;
  source: string;
  publishedDate: string;
  description: string;
  link: string;
  country?: CountryId;
  keywords: string[];
  feedId: string;
};

export type ParsedRssItem = {
  title: string;
  link: string;
  description: string;
  publishedAt?: string;
  feed: RssFeedDefinition;
};

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeTitleKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parsePublishedDate(value?: string): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10);
  return parsed.toISOString().slice(0, 10);
}

export function matchStrategicKeywords(text: string): string[] {
  const haystack = text.toLowerCase();
  return STRATEGIC_KEYWORDS.filter((keyword) => haystack.includes(keyword.toLowerCase()));
}

export function passesKeywordFilter(text: string): boolean {
  return matchStrategicKeywords(text).length > 0;
}

function inferCountry(text: string, feed: RssFeedDefinition): CountryId | undefined {
  if (feed.country && COUNTRY_LIST.some((entry) => entry.id === feed.country)) {
    return feed.country as CountryId;
  }

  const haystack = text.toLowerCase();
  for (const hint of [
    { id: "south-korea" as const, patterns: ["korea", "korean", "seoul"] },
    { id: "japan" as const, patterns: ["japan", "japanese", "tokyo"] },
    { id: "usa" as const, patterns: ["united states", "u.s.", "america"] },
    { id: "uk" as const, patterns: ["united kingdom", "u.k.", "britain"] },
    { id: "germany" as const, patterns: ["germany", "german"] },
    { id: "france" as const, patterns: ["france", "french"] },
    { id: "china" as const, patterns: ["china", "chinese"] },
    { id: "singapore" as const, patterns: ["singapore"] },
    { id: "thailand" as const, patterns: ["thailand"] },
    { id: "indonesia" as const, patterns: ["indonesia"] },
  ]) {
    if (hint.patterns.some((pattern) => haystack.includes(pattern))) return hint.id;
  }

  return undefined;
}

function inferCategory(keywords: string[]): NewsCategory {
  const joined = keywords.join(" ").toLowerCase();
  if (joined.includes("hospital")) return "Hospital Programs";
  if (joined.includes("pharmacy")) return "Pharmacy Channel";
  if (joined.includes("digital health")) return "Digital Health";
  if (joined.includes("device")) return "Supply Chain";
  if (joined.includes("diabetes") || joined.includes("glp")) return "Clinical";
  return "Market Access";
}

function inferRelatedTopics(keywords: string[]): NewsTopic[] {
  const topics = new Set<NewsTopic>();
  for (const keyword of keywords) {
    if (keyword === "GLP-1" || keyword === "GLP1" || keyword === "Semaglutide" || keyword === "Tirzepatide") {
      topics.add("GLP-1");
    }
    if (keyword === "Obesity" || keyword === "Weight Loss") topics.add("Obesity");
    if (keyword === "Digital Health") topics.add("Digital Health");
    if (keyword === "Hospital") topics.add("Hospital");
    if (keyword === "Pharmacy") topics.add("Pharmacy");
    if (keyword === "InBody") topics.add("InBody");
    if (keyword === "Medical Device") topics.add("Medical Devices");
    if (
      keyword === "Novo Nordisk" ||
      keyword === "Eli Lilly" ||
      keyword === "Roche" ||
      keyword === "Amgen"
    ) {
      topics.add(keyword as NewsTopic);
    }
  }
  return Array.from(topics).slice(0, 4);
}

function inferRelatedCompanies(keywords: string[]): string[] {
  const companies = [
    "Novo Nordisk",
    "Eli Lilly",
    "Roche",
    "Amgen",
    "Viking Therapeutics",
    "Structure Therapeutics",
    "InBody",
  ] as const;

  return companies.filter((company) =>
    keywords.some((keyword) => keyword.toLowerCase() === company.toLowerCase()),
  );
}

export function normalizeRssArticle(raw: ParsedRssItem, index: number): RssNormalizedArticle | null {
  const title = normalizeText(raw.title);
  const description = normalizeText(raw.description);
  const searchable = `${title} ${description}`;
  const keywords = matchStrategicKeywords(searchable);

  if (!passesKeywordFilter(searchable)) return null;

  return {
    id: `rss-${raw.feed.id}-${index}-${normalizeTitleKey(title).slice(0, 24)}`,
    title,
    source: raw.feed.label,
    publishedDate: parsePublishedDate(raw.publishedAt),
    description: description || title,
    link: raw.link,
    country: inferCountry(searchable, raw.feed),
    keywords,
    feedId: raw.feed.id,
  };
}

export function deduplicateArticles(articles: RssNormalizedArticle[]): RssNormalizedArticle[] {
  const seen = new Set<string>();
  const deduped: RssNormalizedArticle[] = [];

  for (const article of articles) {
    const key = article.link || normalizeTitleKey(article.title);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(article);
  }

  return deduped;
}

export function toNewsIntelligenceItem(article: RssNormalizedArticle): NewsIntelligenceItem {
  return {
    id: article.id,
    title: article.title,
    source: article.source,
    publishedDate: article.publishedDate,
    link: article.link,
    summary: article.description,
    country: article.country ?? "usa",
    category: inferCategory(article.keywords),
    importance: "Medium",
    tags: [...article.keywords, "live-rss"],
    status: "Published",
    relatedCompanies: inferRelatedCompanies(article.keywords),
    relatedTopics: inferRelatedTopics(article.keywords),
    executiveSummary: PLACEHOLDER_EXECUTIVE_SUMMARY,
    businessImpact: PLACEHOLDER_BUSINESS_IMPACT,
    recommendedAction: PLACEHOLDER_RECOMMENDED_ACTION,
  };
}

export function normalizeAndFilterRssFeed(
  rawItems: ParsedRssItem[],
): RssNormalizedArticle[] {
  const normalized = rawItems
    .map((item, index) => normalizeRssArticle(item, index))
    .filter((item): item is RssNormalizedArticle => item !== null);

  return deduplicateArticles(normalized).sort((a, b) =>
    b.publishedDate.localeCompare(a.publishedDate),
  );
}

export function mapArticlesToNewsItems(articles: RssNormalizedArticle[]): NewsIntelligenceItem[] {
  return articles.map(toNewsIntelligenceItem);
}
