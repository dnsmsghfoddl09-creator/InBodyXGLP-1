export type PageMeta = {
  id: string;
  slug: string;
  title: string;
  description: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyDescription: string;
  category: string;
};

export type NavLink = {
  id: string;
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  emoji?: string;
  items: NavLink[];
};

export const PLATFORM_NAME = "InBody Global Strategy Intelligence Platform";

export const sidebarGroups: NavGroup[] = [
  {
    label: "",
    items: [{ id: "dashboard", label: "Dashboard", href: "/dashboard" }],
  },
  {
    label: "Global Intelligence",
    emoji: "🌍",
    items: [
      { id: "global-dashboard", label: "Global Dashboard", href: "/global/dashboard" },
      { id: "country-explorer", label: "Country Explorer", href: "/global/country-explorer" },
      { id: "country-compare", label: "Country Compare", href: "/global/country-compare" },
      { id: "weekly-research-mission", label: "Weekly Research Mission", href: "/global/weekly-research-mission" },
    ],
  },
  {
    label: "GLP-1 Market",
    emoji: "💉",
    items: [
      { id: "market-overview", label: "Market Overview", href: "/glp1-market/market-overview" },
      { id: "treatment-pathway", label: "Treatment Pathway", href: "/glp1-market/treatment-pathway" },
      { id: "regulations", label: "Regulations", href: "/glp1-market/regulations" },
      { id: "insurance-reimbursement", label: "Insurance & Reimbursement", href: "/glp1-market/insurance-reimbursement" },
      { id: "prescription-channels", label: "Prescription Channels", href: "/glp1-market/prescription-channels" },
      { id: "consumer-insights", label: "Consumer Insights", href: "/glp1-market/consumer-insights" },
    ],
  },
  {
    label: "Healthcare Ecosystem",
    emoji: "🏥",
    items: [
      { id: "hospitals", label: "Hospitals", href: "/healthcare/hospitals" },
      { id: "pharmacies", label: "Pharmacies", href: "/healthcare/pharmacies" },
      { id: "emr", label: "EMR", href: "/healthcare/emr" },
      { id: "telemedicine", label: "Telemedicine", href: "/healthcare/telemedicine" },
    ],
  },
  {
    label: "Intelligence",
    emoji: "📰",
    items: [
      { id: "news", label: "News", href: "/intelligence/news" },
      { id: "research", label: "Research Papers", href: "/intelligence/research" },
      { id: "clinical-trials", label: "Clinical Trials", href: "/intelligence/clinical-trials" },
      { id: "competitors", label: "Competitors", href: "/intelligence/competitors" },
      { id: "regulatory-updates", label: "Regulatory Updates", href: "/intelligence/regulatory-updates" },
    ],
  },
  {
    label: "Conferences",
    emoji: "📅",
    items: [
      { id: "conference-calendar", label: "Global Conference Calendar", href: "/conferences/calendar" },
    ],
  },
  {
    label: "",
    emoji: "👨‍⚕️",
    items: [{ id: "kol", label: "KOL Network", href: "/kol" }],
  },
  {
    label: "",
    emoji: "🎬",
    items: [{ id: "content-studio", label: "Content Studio", href: "/content-studio" }],
  },
  {
    label: "",
    emoji: "💡",
    items: [{ id: "business-opportunities", label: "Business Opportunities", href: "/business-opportunities" }],
  },
  {
    label: "",
    emoji: "📈",
    items: [{ id: "executive-reports", label: "Executive Reports", href: "/executive-reports" }],
  },
  {
    label: "",
    emoji: "🤖",
    items: [{ id: "ai-assistant", label: "AI Strategy Assistant", href: "/ai-assistant" }],
  },
  {
    label: "",
    emoji: "⚙",
    items: [{ id: "settings", label: "Settings", href: "/settings" }],
  },
];

function meta(
  id: string,
  slug: string,
  title: string,
  description: string,
  category: string,
  emptyTitle?: string,
): PageMeta {
  return {
    id,
    slug,
    title,
    description,
    category,
    searchPlaceholder: `Search ${title.toLowerCase()}…`,
    emptyTitle: emptyTitle ?? `No ${title.toLowerCase()} yet`,
    emptyDescription: `Connect data sources or add widgets to begin tracking ${title.toLowerCase()} for your strategy team.`,
  };
}

export const pageRegistry: PageMeta[] = [
  meta("global-dashboard", "global/dashboard", "Global Dashboard", "Cross-regional KPIs and market signals for HQ and subsidiaries", "Global Intelligence"),
  meta("country-explorer", "global/country-explorer", "Country Explorer", "Deep-dive intelligence by country and region", "Global Intelligence"),
  meta("country-compare", "global/country-compare", "Country Compare", "Side-by-side market and regulatory comparison across countries", "Global Intelligence"),
  meta("weekly-research-mission", "global/weekly-research-mission", "Weekly Research Mission", "Assigned research tasks for HQ and overseas teams", "Global Intelligence", "No missions assigned"),
  meta("market-overview", "glp1-market/market-overview", "Market Overview", "Global GLP-1 market sizing, growth, and segment dynamics", "GLP-1 Market"),
  meta("treatment-pathway", "glp1-market/treatment-pathway", "Treatment Pathway", "Patient journey from diagnosis to GLP-1 therapy and monitoring", "GLP-1 Market"),
  meta("regulations", "glp1-market/regulations", "Regulations", "Drug approval status and regulatory frameworks by market", "GLP-1 Market"),
  meta("insurance-reimbursement", "glp1-market/insurance-reimbursement", "Insurance & Reimbursement", "Payer coverage, reimbursement rates, and access barriers", "GLP-1 Market"),
  meta("prescription-channels", "glp1-market/prescription-channels", "Prescription Channels", "Hospital, clinic, pharmacy, and telehealth dispensing trends", "GLP-1 Market"),
  meta("consumer-insights", "glp1-market/consumer-insights", "Consumer Insights", "Patient demand, awareness, and behavior in obesity care", "GLP-1 Market"),
  meta("hospitals", "healthcare/hospitals", "Hospitals", "Hospital obesity programs and InBody deployment pipeline", "Healthcare Ecosystem"),
  meta("pharmacies", "healthcare/pharmacies", "Pharmacies", "Retail pharmacy GLP-1 dispensing and partnership targets", "Healthcare Ecosystem"),
  meta("emr", "healthcare/emr", "EMR", "Electronic medical record integrations and clinical workflows", "Healthcare Ecosystem"),
  meta("telemedicine", "healthcare/telemedicine", "Telemedicine", "Virtual care platforms prescribing GLP-1 and monitoring patients", "Healthcare Ecosystem"),
  meta("news", "intelligence/news", "News", "Curated GLP-1 and obesity care headlines from global sources", "Intelligence"),
  meta("research", "intelligence/research", "Research Papers", "Peer-reviewed publications and clinical evidence", "Intelligence"),
  meta("clinical-trials", "intelligence/clinical-trials", "Clinical Trials", "Active and upcoming GLP-1 trials by phase and sponsor", "Intelligence"),
  meta("competitors", "intelligence/competitors", "Competitors", "Competitive intelligence on Novo Nordisk, Lilly, and emerging players", "Intelligence"),
  meta("regulatory-updates", "intelligence/regulatory-updates", "Regulatory Updates", "FDA, EMA, MFDS, and PMDA regulatory movements", "Intelligence"),
  meta("conference-calendar", "conferences/calendar", "Global Conference Calendar", "Unified calendar for AOCO, ADA, EASD, EASO, ObesityWeek and industry events", "Conferences"),
  meta("aoco", "conferences/aoco", "AOCO", "Asian Oceanian Congress of Obesity sessions and InBody presence", "Conferences"),
  meta("obesityweek", "conferences/obesityweek", "ObesityWeek", "ObesityWeek program, abstracts, and networking opportunities", "Conferences"),
  meta("ada", "conferences/ada", "ADA", "American Diabetes Association Scientific Sessions intelligence", "Conferences"),
  meta("easd", "conferences/easd", "EASD", "European Association for the Study of Diabetes annual meeting", "Conferences"),
  meta("easo", "conferences/easo", "EASO", "European Association for the Study of Obesity conference tracker", "Conferences"),
  meta("kol", "kol", "KOL Network", "Key opinion leaders in obesity medicine and metabolic health", "KOL Network"),
  meta("content-studio", "content-studio", "Content Studio", "Marketing content pipeline for global strategy campaigns", "Content Studio"),
  meta("business-opportunities", "business-opportunities", "Business Opportunities", "AI-scored strategic opportunities for InBody globally", "Business Opportunities"),
  meta("executive-reports", "executive-reports", "Executive Reports", "Executive summaries and board-ready strategic deliverables", "Executive Reports"),
  meta("ai-assistant", "ai-assistant", "AI Strategy Assistant", "Conversational AI for global GLP-1 strategy and InBody positioning", "AI Strategy Assistant"),
  meta("settings", "settings", "Settings", "Platform preferences, notifications, and team configuration", "Settings"),
];

export function getPageBySlug(slug: string): PageMeta | undefined {
  return pageRegistry.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return pageRegistry.map((p) => p.slug);
}

export function slugToSegments(slug: string): string[] {
  return slug.split("/");
}

export function segmentsToSlug(segments: string[]): string {
  return segments.join("/");
}
