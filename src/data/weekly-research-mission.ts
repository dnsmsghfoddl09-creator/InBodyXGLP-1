import { COUNTRY_LIST, type CountryId } from "@/data/countries";

export type MissionPriority = 1 | 2 | 3 | 4 | 5;

export type ExpectedOutputId =
  | "executive-summary"
  | "comparison-table"
  | "market-report"
  | "powerpoint-draft"
  | "meeting-agenda"
  | "email-draft"
  | "kol-list"
  | "competitor-analysis"
  | "business-opportunities";

export const EXPECTED_OUTPUT_OPTIONS: { id: ExpectedOutputId; label: string }[] = [
  { id: "executive-summary", label: "Executive Summary" },
  { id: "comparison-table", label: "Comparison Table" },
  { id: "market-report", label: "Market Report" },
  { id: "powerpoint-draft", label: "PowerPoint Draft" },
  { id: "meeting-agenda", label: "Meeting Agenda" },
  { id: "email-draft", label: "Email Draft" },
  { id: "kol-list", label: "KOL List" },
  { id: "competitor-analysis", label: "Competitor Analysis" },
  { id: "business-opportunities", label: "Business Opportunities" },
];

export const RESEARCH_THEMES = [
  "GLP-1 Insurance Coverage",
  "Pharmacy Expansion",
  "Obesity Treatment Guidelines",
  "Digital Therapeutics",
  "Telemedicine",
  "Hospital Purchasing Process",
  "Consumer Awareness",
  "Competitor Launch",
  "Reimbursement Policy",
  "AOCO Preparation",
  "ObesityWeek Preparation",
] as const;

export type ResearchTheme = (typeof RESEARCH_THEMES)[number];

export const CONFERENCE_OPTIONS = [
  "None",
  "AOCO 2026",
  "ObesityWeek 2026",
  "ADA Scientific Sessions",
  "EASD 2026",
  "EASO 2026",
] as const;

export type TimelineStage = {
  id: string;
  label: string;
  date: string;
  status: "completed" | "in-progress" | "pending";
  detail?: string;
};

export type CountryResearchCard = {
  countryId: CountryId;
  progress: number;
  missingInfo: string[];
  latestUpdate: string;
  confidenceScore: number;
  priority: MissionPriority;
};

export type ResearchMission = {
  id: string;
  title: string;
  description: string;
  theme: ResearchTheme;
  countryIds: CountryId[];
  priority: MissionPriority;
  conference: string;
  deadline: string;
  expectedOutputs: ExpectedOutputId[];
  assignedTeam: string[];
  completionPercent: number;
  researchPriority: string;
  countryStatuses: CountryResearchCard[];
  timeline: TimelineStage[];
  aiRecommendations: string[];
  createdAt: string;
};

export const PRIORITY_LABELS: Record<MissionPriority, string> = {
  1: "P1 — Critical",
  2: "P2 — High",
  3: "P3 — Medium",
  4: "P4 — Low",
  5: "P5 — Monitor",
};

export const PRIORITY_COLORS: Record<MissionPriority, string> = {
  1: "bg-red-600",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-blue-500",
  5: "bg-gray-400",
};

function buildCountryStatuses(ids: CountryId[]): CountryResearchCard[] {
  const templates: Partial<Record<CountryId, Omit<CountryResearchCard, "countryId">>> = {
    japan: {
      progress: 72,
      missingInfo: ["Updated reimbursement policy", "PMDA obesity label timeline"],
      latestUpdate: "Subsidiary submitted payer matrix draft — 2 days ago",
      confidenceScore: 68,
      priority: 1,
    },
    thailand: {
      progress: 58,
      missingInfo: ["Pharmacy regulation verification", "Retail channel pricing"],
      latestUpdate: "Local distributor interview scheduled — yesterday",
      confidenceScore: 61,
      priority: 2,
    },
    indonesia: {
      progress: 41,
      missingInfo: ["Market sizing data refresh", "Hospital procurement contacts"],
      latestUpdate: "Market data flagged as outdated — 5 days ago",
      confidenceScore: 52,
      priority: 1,
    },
    "south-korea": {
      progress: 85,
      missingInfo: ["MFDS guidance cross-check"],
      latestUpdate: "Insurance coverage brief approved by HQ — today",
      confidenceScore: 82,
      priority: 2,
    },
    singapore: {
      progress: 67,
      missingInfo: ["Telehealth platform partnerships"],
      latestUpdate: "Digital health scan completed — 3 days ago",
      confidenceScore: 74,
      priority: 3,
    },
  };

  return ids.map((id) => {
    const base = templates[id] ?? {
      progress: 50,
      missingInfo: ["Primary research pending"],
      latestUpdate: "Awaiting subsidiary input",
      confidenceScore: 55,
      priority: 3 as MissionPriority,
    };
    return { countryId: id, ...base };
  });
}

export const DEFAULT_MISSION: ResearchMission = {
  id: "mission-2026-w14",
  title: "APAC GLP-1 Insurance & Reimbursement Landscape",
  description:
    "Synthesize payer coverage, reimbursement pathways, and out-of-pocket dynamics across priority APAC markets to inform Q2 hospital and pharmacy strategy.",
  theme: "GLP-1 Insurance Coverage",
  countryIds: ["south-korea", "japan", "thailand", "indonesia", "singapore"],
  priority: 1,
  conference: "AOCO 2026",
  deadline: "April 4, 2026",
  expectedOutputs: [
    "executive-summary",
    "comparison-table",
    "market-report",
    "powerpoint-draft",
    "business-opportunities",
  ],
  assignedTeam: ["Sarah Kim — APAC Lead", "James Park — Research Analyst", "Yuki Tanaka — Japan Subsidiary"],
  completionPercent: 64,
  researchPriority: "Insurance reimbursement gaps blocking hospital adoption in Japan and Indonesia",
  countryStatuses: buildCountryStatuses(["south-korea", "japan", "thailand", "indonesia", "singapore"]),
  timeline: [
    { id: "created", label: "Mission Created", date: "Mar 24, 2026", status: "completed", detail: "HQ Strategy Team" },
    { id: "started", label: "Research Started", date: "Mar 25, 2026", status: "completed", detail: "Subsidiary briefings dispatched" },
    { id: "analysis", label: "Country Analysis", date: "Mar 28, 2026", status: "in-progress", detail: "4 of 5 markets in review" },
    { id: "ai-summary", label: "AI Summary", date: "Apr 1, 2026", status: "pending", detail: "Scheduled after country analysis" },
    { id: "executive", label: "Executive Report", date: "Apr 3, 2026", status: "pending", detail: "Board-ready deliverable" },
    { id: "completed", label: "Completed", date: "Apr 4, 2026", status: "pending", detail: "Mission deadline" },
  ],
  aiRecommendations: [
    "Japan reimbursement policy should be updated — subsidiary data from January may not reflect MFDS April guidance.",
    "Thailand pharmacy regulation requires verification — retail GLP-1 dispensing rules changed in Q1 2026.",
    "Indonesia market data is outdated — refresh hospital procurement contacts before executive briefing.",
    "Collect AOCO 2026 presentations — 3 competitor sessions reference body composition monitoring.",
    "Interview local distributor in Bangkok — pharmacy channel intelligence gap flagged by APAC lead.",
  ],
  createdAt: "Mar 24, 2026",
};

export function getCountryMeta(id: CountryId) {
  return COUNTRY_LIST.find((c) => c.id === id)!;
}

export function createMissionFromForm(input: {
  title: string;
  description: string;
  theme: ResearchTheme;
  countryIds: CountryId[];
  priority: MissionPriority;
  conference: string;
  deadline: string;
  expectedOutputs: ExpectedOutputId[];
}): ResearchMission {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    id: `mission-${Date.now()}`,
    title: input.title,
    description: input.description,
    theme: input.theme,
    countryIds: input.countryIds,
    priority: input.priority,
    conference: input.conference,
    deadline: input.deadline,
    expectedOutputs: input.expectedOutputs,
    assignedTeam: ["HQ Strategy Team"],
    completionPercent: 8,
    researchPriority: `New mission: ${input.theme} across ${input.countryIds.length} market(s)`,
    countryStatuses: buildCountryStatuses(input.countryIds),
    timeline: [
      { id: "created", label: "Mission Created", date: today, status: "completed", detail: "Mission builder" },
      { id: "started", label: "Research Started", date: today, status: "in-progress", detail: "Awaiting subsidiary input" },
      { id: "analysis", label: "Country Analysis", date: "—", status: "pending" },
      { id: "ai-summary", label: "AI Summary", date: "—", status: "pending" },
      { id: "executive", label: "Executive Report", date: "—", status: "pending" },
      { id: "completed", label: "Completed", date: input.deadline, status: "pending", detail: "Mission deadline" },
    ],
    aiRecommendations: [
      `Prioritize ${input.theme.toLowerCase()} data collection for ${input.countryIds.length} selected market(s).`,
      "Assign subsidiary research owners within 48 hours of mission launch.",
      "Schedule AI summary review once country analysis reaches 60% completion.",
    ],
    createdAt: today,
  };
}
