import { COUNTRY_LIST, type CountryId } from "@/data/countries";
import type { IntelligenceImportance } from "@/lib/intelligence/intelligenceTypes";

export const NEWS_PRIORITY_COUNTRIES: CountryId[] = [
  "south-korea",
  "japan",
  "thailand",
  "indonesia",
  "singapore",
  "china",
  "usa",
  "uk",
  "germany",
  "france",
];

export const NEWS_TOPICS = [
  "GLP-1",
  "Obesity",
  "Medical Devices",
  "InBody",
  "Novo Nordisk",
  "Eli Lilly",
  "Digital Health",
  "Pharmacy",
  "Hospital",
  "Government",
  "Insurance",
  "Clinical Trial",
  "Conference",
] as const;

export const NEWS_CATEGORIES = [
  "Supply Chain",
  "Regulatory",
  "Market Access",
  "Clinical",
  "Digital Health",
  "Partnership",
  "Pricing",
  "Hospital Programs",
  "Insurance",
  "Pharmacy Channel",
] as const;

export type NewsTopic = (typeof NEWS_TOPICS)[number];
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsIntelligenceItem = {
  id: string;
  title: string;
  country: CountryId;
  category: NewsCategory;
  source: string;
  publishedDate: string;
  importance: IntelligenceImportance;
  tags: string[];
  summary: string;
  link: string;
  status: string;
  relatedCompanies: string[];
  relatedTopics: NewsTopic[];
  executiveSummary: string;
  businessImpact: string;
  recommendedAction: string;
};

const NEWS_SOURCES = [
  "Reuters",
  "Bloomberg",
  "STAT News",
  "Healthcare Dive",
  "Pharma Market Watch",
  "Endocrine Intelligence",
  "MedTech Brief",
  "Clinical Obesity Review",
  "Fierce Pharma",
  "Endpoints News",
];

const RELATED_COMPANIES = [
  "Novo Nordisk",
  "Eli Lilly",
  "InBody",
  "Amgen",
  "Pfizer",
  "Roche",
  "CVS Health",
  "Walgreens",
  "Teladoc",
];

const TITLE_TEMPLATES = [
  (country: string, topic: string) => `${country} ${topic.toLowerCase()} programs accelerate GLP-1 patient onboarding`,
  (country: string, topic: string) => `National payers in ${country} revisit ${topic.toLowerCase()} reimbursement frameworks`,
  (country: string, topic: string) => `${country} hospital networks expand ${topic.toLowerCase()} monitoring standards`,
  (country: string, topic: string) => `${topic} adoption reshapes ${country} obesity care delivery models`,
  (country: string, topic: string) => `${country} regulators signal tighter oversight on ${topic.toLowerCase()} promotion`,
  (country: string, topic: string) => `Tier-1 ${country} clinics pilot ${topic.toLowerCase()} body composition pathways`,
  (country: string, topic: string) => `${country} pharmacy chains launch ${topic.toLowerCase()} adherence programs`,
  (country: string, topic: string) => `${country} insurers tie ${topic.toLowerCase()} coverage to metabolic screening`,
  (country: string, topic: string) => `KOL consensus in ${country} elevates ${topic.toLowerCase()} in GLP-1 protocols`,
  (country: string, topic: string) => `${country} digital health platforms integrate ${topic.toLowerCase()} analytics`,
];

function countryName(id: CountryId): string {
  return COUNTRY_LIST.find((c) => c.id === id)?.name ?? id;
}

function isoDate(daysAgo: number): string {
  const date = new Date("2026-07-01");
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

function pick<T>(items: readonly T[], index: number): T {
  return items[index % items.length]!;
}

function pickImportance(index: number): IntelligenceImportance {
  if (index % 13 === 0) return "Critical";
  if (index % 5 === 0) return "High";
  if (index % 2 === 0) return "Medium";
  return "Low";
}

function buildNewsCatalog(): NewsIntelligenceItem[] {
  return Array.from({ length: 100 }, (_, index) => {
    const country = pick(NEWS_PRIORITY_COUNTRIES, index);
    const name = countryName(country);
    const category = pick(NEWS_CATEGORIES, index);
    const primaryTopic = pick(NEWS_TOPICS, index);
    const secondaryTopic = pick(NEWS_TOPICS, index + 3);
    const importance = pickImportance(index);
    const title = pick(TITLE_TEMPLATES, index)(name, primaryTopic);
    const companyA = pick(RELATED_COMPANIES, index);
    const companyB = pick(RELATED_COMPANIES, index + 2);
    const executiveSummary = `${name} intelligence signal: ${title}. This development affects GLP-1 market access, clinical workflow design, and device placement strategy for InBody.`;
    const businessImpact =
      importance === "Critical"
        ? `High-priority ${name} opportunity — est. pipeline impact within 90 days if InBody responds before competitors.`
        : importance === "High"
          ? `Material ${name} market shift — hospital and clinic screening touchpoints may expand in H2.`
          : `Moderate ${name} signal — monitor for Q3 planning and subsidiary briefing cycles.`;
    const recommendedAction =
      importance === "Critical"
        ? `Escalate to regional lead within 48 hours. Prepare ${name} hospital outreach brief and KOL talking points.`
        : importance === "High"
          ? `Share with ${name} subsidiary this week. Update country battlecard and sales enablement deck.`
          : `Log in weekly intelligence review. Track for inclusion in next executive summary cycle.`;

    return {
      id: `news-${index + 1}`,
      title,
      country,
      category,
      source: pick(NEWS_SOURCES, index),
      publishedDate: isoDate(index + 1),
      importance,
      tags: [category, primaryTopic, secondaryTopic, "GLP-1", name],
      summary: executiveSummary,
      link: `#news-${index + 1}`,
      status: index % 5 === 0 ? "Breaking" : "Published",
      relatedCompanies: Array.from(new Set([companyA, companyB])),
      relatedTopics: Array.from(new Set([primaryTopic, secondaryTopic])),
      executiveSummary,
      businessImpact,
      recommendedAction,
    };
  });
}

let catalogCache: NewsIntelligenceItem[] | null = null;

export function getAllNews(): NewsIntelligenceItem[] {
  catalogCache ??= buildNewsCatalog();
  return catalogCache;
}

/** Backward-compatible export for intelligenceService mock layer. */
export function getMockNews(): NewsIntelligenceItem[] {
  return getAllNews();
}
