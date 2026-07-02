import type { CountryId } from "@/data/countries";
import type { ConferenceId } from "@/types/conference";
import type { EnterpriseResearchMission } from "@/types/research-mission";

export const ENTERPRISE_RESEARCH_MISSIONS: EnterpriseResearchMission[] = [
  {
    id: "erm-2026-w14",
    mission: "APAC GLP-1 Insurance & Reimbursement Landscape",
    description:
      "Synthesize payer coverage, reimbursement pathways, and out-of-pocket dynamics across priority APAC markets to inform Q2 hospital and pharmacy strategy.",
    theme: "GLP-1 Insurance Coverage",
    countryIds: ["south-korea", "japan", "thailand", "indonesia", "singapore"],
    status: "in-progress",
    priority: 1,
    progress: 64,
    relatedConferenceId: "aoco",
    expectedDeliverables: [
      "executive-summary",
      "comparison-table",
      "market-report",
      "powerpoint-draft",
      "business-opportunities",
    ],
    assignedTeam: ["Sarah Kim — APAC Lead", "James Park — Research Analyst", "Yuki Tanaka — Japan Subsidiary"],
    deadline: "April 4, 2026",
    createdAt: "March 24, 2026",
    aiNotes: [
      "Japan reimbursement policy should be updated — subsidiary data from January may not reflect MFDS April guidance.",
      "Thailand pharmacy regulation requires verification — retail GLP-1 dispensing rules changed in Q1 2026.",
      "Indonesia market data is outdated — refresh hospital procurement contacts before executive briefing.",
    ],
  },
  {
    id: "erm-2026-w13",
    mission: "ADA 2026 Competitive Intelligence Brief",
    description:
      "Prepare unified competitive response covering Lilly oral GLP-1 strategy, Novo supply expansion, and device bundling trends ahead of Chicago meetings.",
    theme: "Competitor Launch",
    countryIds: ["usa", "japan", "germany", "uk"],
    status: "review",
    priority: 1,
    progress: 88,
    relatedConferenceId: "ada",
    expectedDeliverables: [
      "executive-summary",
      "competitor-analysis",
      "meeting-agenda",
      "email-draft",
      "kol-list",
    ],
    assignedTeam: ["Michael Chen — Competitive Intel", "Dr. Lisa Hart — Medical Affairs"],
    deadline: "May 20, 2026",
    createdAt: "March 17, 2026",
    aiNotes: [
      "Collect all ADA GLP-1 + digital health sessions by April 15.",
      "Pre-book 5 KOL meetings — 2 slots remaining.",
    ],
  },
  {
    id: "erm-2026-w12",
    mission: "ObesityWeek Content & Evidence Pipeline",
    description:
      "Finalize abstract, booth narrative, and clinical evidence pack for ObesityWeek body composition + GLP-1 positioning.",
    theme: "ObesityWeek Preparation",
    countryIds: ["usa", "australia", "canada"],
    status: "planning",
    priority: 2,
    progress: 35,
    relatedConferenceId: "obesityweek",
    expectedDeliverables: [
      "executive-summary",
      "powerpoint-draft",
      "market-report",
      "kol-list",
    ],
    assignedTeam: ["Content Studio Team", "Medical Affairs"],
    deadline: "October 10, 2026",
    createdAt: "March 10, 2026",
    aiNotes: [
      "Registration deadline in 21 days — confirm attendance.",
      "Whitepaper stuck in review 3 weeks — escalate to publish before ObesityWeek.",
    ],
  },
  {
    id: "erm-2026-w11",
    mission: "EMEA Hospital Purchasing Process Mapping",
    description:
      "Document tier-1 hospital procurement workflows for obesity device integration in Germany, UK, and France.",
    theme: "Hospital Purchasing Process",
    countryIds: ["germany", "uk", "france"],
    status: "completed",
    priority: 2,
    progress: 100,
    relatedConferenceId: "easd",
    expectedDeliverables: [
      "market-report",
      "comparison-table",
      "business-opportunities",
    ],
    assignedTeam: ["EMEA BD Lead", "Germany Subsidiary"],
    deadline: "March 14, 2026",
    createdAt: "February 24, 2026",
    aiNotes: ["Completed — 8 new hospital inquiries linked to GLP-1 volume growth in Germany."],
  },
];

const missionMap = new Map(ENTERPRISE_RESEARCH_MISSIONS.map((m) => [m.id, m]));

export function getEnterpriseResearchMission(id: string): EnterpriseResearchMission | undefined {
  return missionMap.get(id);
}

export function getAllEnterpriseResearchMissions(): EnterpriseResearchMission[] {
  return ENTERPRISE_RESEARCH_MISSIONS;
}

export function getActiveEnterpriseResearchMissions(): EnterpriseResearchMission[] {
  return ENTERPRISE_RESEARCH_MISSIONS.filter((m) => m.status !== "completed");
}

export function getMissionsForCountry(countryId: CountryId): EnterpriseResearchMission[] {
  return ENTERPRISE_RESEARCH_MISSIONS.filter((m) => m.countryIds.includes(countryId));
}

export function getMissionsForConference(conferenceId: ConferenceId): EnterpriseResearchMission[] {
  return ENTERPRISE_RESEARCH_MISSIONS.filter((m) => m.relatedConferenceId === conferenceId);
}
