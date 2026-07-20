import { COUNTRY_LIST, type CountryId } from "@/data/countries";

export type EvidenceLevel = "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";

export type StudyType =
  | "Randomized Controlled Trial"
  | "Meta-analysis"
  | "Systematic Review"
  | "Prospective Study"
  | "Retrospective Study"
  | "Observational Study";

export type ResearchTopic =
  | "GLP-1"
  | "Obesity"
  | "Body Composition"
  | "InBody"
  | "Muscle Mass"
  | "Sarcopenia"
  | "MASH"
  | "Diabetes"
  | "Nutrition"
  | "Exercise"
  | "Digital Health"
  | "Medical Device";

export const RESEARCH_COUNTRIES: CountryId[] = [
  "south-korea",
  "japan",
  "usa",
  "germany",
  "uk",
  "china",
  "singapore",
  "thailand",
  "indonesia",
  "france",
];

export const RESEARCH_JOURNALS = [
  "NEJM",
  "The Lancet",
  "JAMA",
  "Diabetes Care",
  "Obesity Reviews",
  "Journal of Cachexia, Sarcopenia and Muscle",
  "Nature Medicine",
  "Clinical Nutrition",
];

export const RESEARCH_STUDY_TYPES: StudyType[] = [
  "Randomized Controlled Trial",
  "Meta-analysis",
  "Systematic Review",
  "Prospective Study",
  "Retrospective Study",
  "Observational Study",
];

export const RESEARCH_TOPICS: ResearchTopic[] = [
  "GLP-1",
  "Obesity",
  "Body Composition",
  "InBody",
  "Muscle Mass",
  "Sarcopenia",
  "MASH",
  "Diabetes",
  "Nutrition",
  "Exercise",
  "Digital Health",
  "Medical Device",
];

export const EVIDENCE_LEVELS: EvidenceLevel[] = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

export type ResearchPaperItem = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  publicationDate: string;
  publicationYear: number;
  doi: string;
  country: CountryId;
  institution: string;
  studyType: StudyType;
  evidenceLevel: EvidenceLevel;
  sampleSize: string;
  keywords: string[];
  abstract: string;
  aiExecutiveSummary: string;
  clinicalImplications: string;
  businessImplications: string;
  recommendedActions: string[];
  relatedCompetitors: string[];
  relatedCountries: CountryId[];
  relatedConferences: string[];
  relatedNews: string[];
  tags: string[];
  keyFindings: string;
  relevanceScore: number;
};

const INSTITUTIONS: Record<CountryId, string[]> = {
  "south-korea": ["Seoul National University Hospital", "Yonsei University", "Samsung Medical Center"],
  japan: ["University of Tokyo", "Keio University Hospital", "Tokyo Medical University"],
  usa: ["Mayo Clinic", "Harvard Medical School", "Stanford Medicine"],
  germany: ["Charité Berlin", "LMU Munich", "Heidelberg University Hospital"],
  uk: ["University College London", "Oxford University Hospitals", "Imperial College London"],
  china: ["Peking Union Medical College", "Fudan University Shanghai", "West China Hospital"],
  singapore: ["National University Hospital", "SingHealth", "Duke-NUS Medical School"],
  thailand: ["Chulalongkorn University", "Ramathibodi Hospital", "Siriraj Hospital"],
  indonesia: ["University of Indonesia", "Airlangga University", "Cipto Mangunkusumo Hospital"],
  france: ["Pitié-Salpêtrière Hospital", "Sorbonne Université", "Hôpital Européen Georges-Pompidou"],
  taiwan: ["National Taiwan University Hospital"],
  vietnam: ["University Medical Center HCMC"],
  malaysia: ["University Malaya Medical Centre"],
  philippines: ["Philippine General Hospital"],
  india: ["All India Institute of Medical Sciences"],
  australia: ["University of Melbourne"],
  canada: ["University of Toronto"],
  italy: ["University of Milan"],
  spain: ["Hospital Clínic Barcelona"],
  brazil: ["University of São Paulo"],
  mexico: ["Instituto Nacional de Ciencias Médicas"],
  "saudi-arabia": ["King Saud University"],
  uae: ["Cleveland Clinic Abu Dhabi"],
};

const TITLE_TEMPLATES = [
  (topic: string, country: string) => `${topic} outcomes during GLP-1 therapy in ${country}`,
  (topic: string, country: string) => `Body composition changes with semaglutide: ${country} cohort`,
  (topic: string, country: string) => `Lean mass preservation during tirzepatide treatment in ${country}`,
  (topic: string, country: string) => `${topic} monitoring in obesity clinics across ${country}`,
  (topic: string, country: string) => `Real-world evidence for ${topic.toLowerCase()} in ${country} GLP-1 patients`,
  (topic: string, country: string) => `Hospital metabolic pathway outcomes using ${topic.toLowerCase()} in ${country}`,
];

function countryName(id: CountryId): string {
  return COUNTRY_LIST.find((c) => c.id === id)?.name ?? id;
}

function pick<T>(items: readonly T[], index: number): T {
  return items[index % items.length]!;
}

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildPapers(): ResearchPaperItem[] {
  return Array.from({ length: 100 }, (_, index) => {
    const country = pick(RESEARCH_COUNTRIES, index);
    const name = countryName(country);
    const topic = pick(RESEARCH_TOPICS, index);
    const studyType = pick(RESEARCH_STUDY_TYPES, index);
    const evidenceLevel = pick(EVIDENCE_LEVELS, index);
    const journal = pick(RESEARCH_JOURNALS, index);
    const year = 2026 - (index % 6);
    const month = (index % 12) + 1;
    const day = (index % 27) + 1;
    const institution = pick(INSTITUTIONS[country] ?? [`${name} National Research Institute`], index);
    const title = pick(TITLE_TEMPLATES, index)(topic, name);
    const sampleSize = `${800 + index * 37} participants`;
    const keyFindings =
      index % 2 === 0
        ? "Structured body composition monitoring improved GLP-1 persistence and reduced lean mass loss by 14%."
        : "Patients with baseline BIA screening showed higher treatment personalization and payer approval rates.";
    const aiExecutiveSummary = `AI summary: ${title}. High relevance for InBody positioning in ${name} ${topic.toLowerCase()} programs.`;
    const clinicalImplications = `Clinicians in ${name} should integrate body composition screening into GLP-1 initiation and follow-up protocols.`;
    const businessImplications = `Supports InBody hospital bundle ROI in ${name} with evidence aligned to ${topic} and GLP-1 growth.`;

    return {
      id: `research-paper-${index + 1}`,
      title,
      authors: pick(["Kim et al.", "Tanaka et al.", "Patel et al.", "Chen & Rahman", "Nguyen, Sato", "Williams et al."], index),
      journal,
      publicationDate: isoDate(year, month, day),
      publicationYear: year,
      doi: `10.1000/inbody.research.${index + 1}`,
      country,
      institution,
      studyType,
      evidenceLevel,
      sampleSize,
      keywords: [topic, "GLP-1", studyType, name],
      abstract: `Background: ${title}. Methods: ${studyType} with ${sampleSize} in ${name}. Results: ${keyFindings} Conclusions: Body composition monitoring adds clinical and payer value during GLP-1 therapy.`,
      aiExecutiveSummary,
      clinicalImplications,
      businessImplications,
      recommendedActions: [
        `Share summary with ${name} subsidiary medical affairs team.`,
        "Add to KOL briefing pack for hospital obesity pathway discussions.",
        "Reference in payer value dossier for body composition monitoring.",
      ],
      relatedCompetitors: pick(
        [["Novo Nordisk", "Eli Lilly"], ["Roche", "Amgen"], ["Hanmi Pharmaceutical", "InBody"]],
        index,
      ),
      relatedCountries: [country, pick(RESEARCH_COUNTRIES, index + 2)],
      relatedConferences: pick([["ADA", "ObesityWeek"], ["EASD", "APOS"], ["ENDO", "ICO"]], index),
      relatedNews: [`${name} hospitals expand GLP-1 obesity pathways`, `${topic} debate gains traction in ${name} KOL forums`],
      tags: [topic, studyType, evidenceLevel, "GLP-1", name],
      keyFindings,
      relevanceScore: 95 - (index % 20),
    };
  });
}

let catalogCache: ResearchPaperItem[] | null = null;

export function getAllResearchPapers(): ResearchPaperItem[] {
  catalogCache ??= buildPapers();
  return catalogCache;
}

export function getCountryName(id: CountryId): string {
  return countryName(id);
}
