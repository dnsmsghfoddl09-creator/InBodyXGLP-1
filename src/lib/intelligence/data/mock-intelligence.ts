import { COUNTRY_LIST, type CountryId } from "@/data/countries";
import type {
  CompetitorIntelligenceItem,
  IntelligenceImportance,
  IntelligenceItem,
  PaperIntelligenceItem,
} from "@/lib/intelligence/types";

export const PRIORITY_COUNTRIES: CountryId[] = [
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

const NEWS_SOURCES = [
  "Reuters",
  "Bloomberg",
  "STAT News",
  "Healthcare Dive",
  "Pharma Market Watch",
  "Endocrine Intelligence",
  "MedTech Brief",
  "Clinical Obesity Review",
];

const NEWS_CATEGORIES = [
  "Supply Chain",
  "Regulatory",
  "Market Access",
  "Clinical",
  "Digital Health",
  "Partnership",
  "Pricing",
  "Hospital Programs",
];

const PAPER_JOURNALS = [
  "The Lancet",
  "NEJM",
  "JAMA",
  "Diabetes Care",
  "Obesity Reviews",
  "Journal of Metabolic Health",
  "Nature Medicine",
];

const PAPER_TYPES = [
  "Randomized Controlled Trial",
  "Real-World Evidence",
  "Health Economics",
  "Prospective Cohort",
  "Systematic Review",
  "Clinical Protocol",
];

const REGULATION_AGENCIES: Record<CountryId, string> = {
  "south-korea": "MFDS",
  japan: "PMDA",
  thailand: "Thai FDA",
  indonesia: "BPOM",
  singapore: "HSA",
  china: "NMPA",
  usa: "FDA",
  uk: "MHRA",
  germany: "BfArM",
  france: "ANSM",
  taiwan: "TFDA",
  vietnam: "DAV",
  malaysia: "NPRA",
  philippines: "FDA Philippines",
  india: "CDSCO",
  australia: "TGA",
  canada: "Health Canada",
  italy: "AIFA",
  spain: "AEMPS",
  brazil: "ANVISA",
  mexico: "COFEPRIS",
  "saudi-arabia": "SFDA",
  uae: "MOHAP",
};

const COMPANIES = [
  "Novo Nordisk",
  "Eli Lilly",
  "Amgen",
  "Pfizer",
  "AstraZeneca",
  "Roche",
  "Sanofi",
  "Merck",
];

const CONFERENCE_NAMES = [
  { name: "American Diabetes Association Scientific Sessions", acronym: "ADA" },
  { name: "ObesityWeek", acronym: "OW" },
  { name: "European Association for the Study of Diabetes", acronym: "EASD" },
  { name: "Asia-Pacific Obesity Summit", acronym: "APOS" },
  { name: "International Congress on Obesity", acronym: "ICO" },
  { name: "Endocrine Society Annual Meeting", acronym: "ENDO" },
  { name: "Digital Health Obesity Forum", acronym: "DHOF" },
  { name: "APAC Metabolic Health Congress", acronym: "AMHC" },
];

function countryName(id: CountryId): string {
  return COUNTRY_LIST.find((c) => c.id === id)?.name ?? id;
}

function isoDate(daysAgo: number): string {
  const date = new Date("2026-07-01");
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

function pick<T>(items: T[], index: number): T {
  return items[index % items.length]!;
}

function pickCountry(index: number): CountryId {
  return PRIORITY_COUNTRIES[index % PRIORITY_COUNTRIES.length]!;
}

function pickImportance(index: number): IntelligenceImportance {
  const levels: IntelligenceImportance[] = ["Critical", "High", "Medium", "Low"];
  if (index % 11 === 0) return "Critical";
  if (index % 5 === 0) return "High";
  if (index % 3 === 0) return "Medium";
  return pick(levels, index);
}

function buildNews(): IntelligenceItem[] {
  const templates = [
    (c: string) => `${c} hospitals expand integrated GLP-1 obesity pathways`,
    (c: string) => `Payer negotiations intensify for Wegovy coverage in ${c}`,
    (c: string) => `Oral GLP-1 pipeline reshapes ${c} primary care screening demand`,
    (c: string) => `${c} digital health startups partner with obesity clinics`,
    (c: string) => `Muscle preservation debate gains traction in ${c} KOL forums`,
    (c: string) => `Retail pharmacy chains in ${c} pilot GLP-1 patient onboarding`,
    (c: string) => `${c} insurers review chronic obesity drug reimbursement criteria`,
    (c: string) => `Tier-1 ${c} hospital systems launch metabolic monitoring bundles`,
    (c: string) => `${c} telehealth platforms seek body composition device integrations`,
    (c: string) => `Corporate wellness programs in ${c} add GLP-1 analytics dashboards`,
  ];

  return Array.from({ length: 50 }, (_, index) => {
    const country = pickCountry(index);
    const name = countryName(country);
    const category = pick(NEWS_CATEGORIES, index);
    const importance = pickImportance(index);
    const title = pick(templates, index)(name);

    return {
      id: `news-${index + 1}`,
      title,
      country,
      category,
      source: pick(NEWS_SOURCES, index),
      publishedDate: isoDate(index * 2),
      importance,
      tags: [category, "GLP-1", "News", name],
      summary: `${name} market signal: ${title.toLowerCase()}. Relevant for InBody hospital and clinic placement strategy.`,
      link: `#news-${index + 1}`,
      status: index % 4 === 0 ? "Breaking" : "Published",
    };
  });
}

function buildPapers(): PaperIntelligenceItem[] {
  const templates = [
    (c: string) => `Body composition outcomes during GLP-1 therapy in ${c} cohort`,
    (c: string) => `Real-world adherence patterns for tirzepatide in ${c} obesity clinics`,
    (c: string) => `Payer value frameworks for obesity devices in ${c}`,
    (c: string) => `Hospital metabolic pathway design for GLP-1 initiation in ${c}`,
    (c: string) => `Telemonitoring muscle mass during GLP-1 treatment: ${c} pilot`,
    (c: string) => `Long-term lean mass preservation with semaglutide in ${c}`,
    (c: string) => `Comparative efficacy of dual GLP-1/GIP agonists — ${c} registry`,
  ];

  return Array.from({ length: 30 }, (_, index) => {
    const country = pickCountry(index + 3);
    const name = countryName(country);
    const title = pick(templates, index)(name);
    const studyType = pick(PAPER_TYPES, index);

    return {
      id: `paper-${index + 1}`,
      title,
      country,
      category: studyType,
      source: pick(PAPER_JOURNALS, index),
      publishedDate: isoDate(index * 4 + 1),
      importance: pickImportance(index + 1),
      tags: [studyType, "GLP-1", "Research", name],
      summary: `Peer-reviewed evidence from ${name} supporting body composition monitoring during GLP-1 therapy.`,
      link: `#paper-${index + 1}`,
      status: "Published",
      journal: pick(PAPER_JOURNALS, index),
      authors: pick(
        ["Kim et al.", "Tanaka et al.", "Patel et al.", "Chen & Rahman", "Nguyen, Sato", "Williams et al."],
        index,
      ),
      studyType,
      keyFindings:
        index % 2 === 0
          ? "Lean mass loss exceeded 12% without structured resistance monitoring during semaglutide treatment."
          : "Clinic-based body composition feedback improved 6-month GLP-1 persistence by 18%.",
    };
  });
}

function buildRegulations(): IntelligenceItem[] {
  const templates = [
    "Obesity drug reimbursement criteria update",
    "Medical device integration in obesity pathways",
    "GLP-1 advertising and HCP promotion rules",
    "Import licensing for obesity monitoring devices",
    "Prior authorization criteria for GLP-1 initiation",
    "Hospital procurement standards for metabolic screening",
    "Telehealth reimbursement for remote body composition monitoring",
  ];

  return Array.from({ length: 20 }, (_, index) => {
    const country = pickCountry(index + 1);
    const name = countryName(country);
    const title = pick(templates, index);
    const agency = REGULATION_AGENCIES[country] ?? `${name} Health Authority`;

    return {
      id: `regulation-${index + 1}`,
      title,
      country,
      category: pick(["Reimbursement", "Device Approval", "Advertising", "Import Licensing", "Prior Auth"], index),
      source: agency,
      publishedDate: isoDate(index * 5 + 2),
      importance: pickImportance(index + 2),
      tags: ["Regulatory", agency, "GLP-1", name],
      summary: `${agency} update affecting GLP-1 market access and device placement in ${name}.`,
      link: `#regulation-${index + 1}`,
      status: pick(["Published", "Active", "Under Review"], index),
    };
  });
}

function buildCompetitors(): CompetitorIntelligenceItem[] {
  const activities = [
    "Expanding Wegovy hospital partnerships and KOL engagement",
    "Mounjaro volume growth and oral GLP-1 pipeline acceleration",
    "Phase III oral GLP-1 trial readout and launch preparation",
    "Digital health bundle partnerships with pharmacy chains",
    "Patent filing for ultra-long-acting GLP-1 formulation",
    "Pricing negotiations with national payers in APAC markets",
    "Low-cost clinic kiosk targeting obesity programs",
  ];

  return Array.from({ length: 20 }, (_, index) => {
    const country = pickCountry(index + 2);
    const name = countryName(country);
    const company = pick(COMPANIES, index);
    const threatLevel = pick(["High", "Medium", "Low"] as const, index);

    return {
      id: `competitor-${index + 1}`,
      title: `${company} — ${pick(activities, index)}`,
      country,
      category: pick(["Pipeline", "Partnership", "Pricing", "Market Expansion", "Patent"], index),
      source: "Competitive Intelligence Desk",
      publishedDate: isoDate(index * 3 + 1),
      importance: threatLevel === "High" ? "Critical" : threatLevel === "Medium" ? "High" : "Medium",
      tags: [company, "Competition", "GLP-1", name],
      summary: `${company} activity in ${name} with implications for InBody positioning and hospital partnerships.`,
      link: `#competitor-${index + 1}`,
      status: "Active",
      company,
      currentActivity: pick(activities, index),
      marketStatus: pick(
        ["Market leader · ~38% share", "Fastest growth · ~22% share", "Emerging challenger", "Fragmented · price-led"],
        index,
      ),
      opportunity: pick(
        [
          "Co-develop clinical monitoring bundles with device partners",
          "Position InBody as outcomes evidence partner",
          "Differentiate with clinical-grade body composition analytics",
          "Integrate InBody data into pharmacy onboarding workflows",
        ],
        index,
      ),
      threatLevel,
    };
  });
}

function buildConferences(): IntelligenceItem[] {
  return Array.from({ length: 15 }, (_, index) => {
    const country = pickCountry(index);
    const name = countryName(country);
    const conf = pick(CONFERENCE_NAMES, index);
    const startDate = isoDate(-(index * 14 + 7));

    return {
      id: `conference-intel-${index + 1}`,
      title: `${conf.acronym} — ${conf.name}`,
      country,
      category: pick(["Obesity Medicine", "Diabetes", "Endocrinology", "Digital Health"], index),
      source: "Conference Intelligence Desk",
      publishedDate: startDate,
      importance: index % 3 === 0 ? "Critical" : index % 2 === 0 ? "High" : "Medium",
      tags: [conf.acronym, "Conference", "GLP-1", name],
      summary: `${conf.name} in ${name} region — key KOL and competitor presence for GLP-1 and obesity strategy.`,
      link: `#conference-${index + 1}`,
      status: pick(["Upcoming", "Registration Open", "Abstract Deadline", "Confirmed"], index),
    };
  });
}

let newsCache: IntelligenceItem[] | null = null;
let papersCache: PaperIntelligenceItem[] | null = null;
let regulationsCache: IntelligenceItem[] | null = null;
let competitorsCache: CompetitorIntelligenceItem[] | null = null;
let conferencesCache: IntelligenceItem[] | null = null;

export function getMockNews(): IntelligenceItem[] {
  newsCache ??= buildNews();
  return newsCache;
}

export function getMockPapers(): PaperIntelligenceItem[] {
  papersCache ??= buildPapers();
  return papersCache;
}

export function getMockRegulations(): IntelligenceItem[] {
  regulationsCache ??= buildRegulations();
  return regulationsCache;
}

export function getMockCompetitors(): CompetitorIntelligenceItem[] {
  competitorsCache ??= buildCompetitors();
  return competitorsCache;
}

export function getMockConferenceUpdates(): IntelligenceItem[] {
  conferencesCache ??= buildConferences();
  return conferencesCache;
}
