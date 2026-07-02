import type { CountryId } from "@/data/countries";
import type { ConferenceId, EnterpriseConference } from "@/types/conference";

export const ENTERPRISE_CONFERENCES: EnterpriseConference[] = [
  {
    id: "aoco",
    name: "Asian Oceanian Congress of Obesity",
    acronym: "AOCO",
    date: "September 12, 2026",
    endDate: "September 14, 2026",
    location: "Seoul, South Korea",
    region: "APAC",
    topics: [
      "GLP-1 therapy in Asian populations",
      "Body composition and muscle preservation",
      "Obesity pharmacotherapy access in APAC",
      "Digital health and remote monitoring",
    ],
    relatedCountryIds: ["south-korea", "japan", "china", "thailand", "indonesia", "singapore", "australia", "india"],
    priority: 1,
    inbodyPresence: "Booth + symposium submission under review",
    notes: [
      "3 competitor sessions reference body composition monitoring",
      "Korea subsidiary leading local KOL engagement",
      "Collect all GLP-1 + device integration presentations",
    ],
    preparationDeadline: "August 15, 2026",
  },
  {
    id: "ada",
    name: "American Diabetes Association Scientific Sessions",
    acronym: "ADA",
    date: "June 5, 2026",
    endDate: "June 8, 2026",
    location: "Chicago, USA",
    region: "North America",
    topics: [
      "GLP-1 cardiovascular outcomes",
      "Obesity and diabetes comorbidity management",
      "Health technology in metabolic care",
      "Real-world evidence on GLP-1 persistence",
    ],
    relatedCountryIds: ["usa", "canada", "mexico", "brazil", "uk", "germany"],
    priority: 1,
    inbodyPresence: "Confirmed booth; 5 pre-booked KOL meetings",
    notes: [
      "Premier global diabetes/obesity conference",
      "Executive team attendance confirmed (3 members)",
      "Competitive intel on Lilly oral GLP-1 strategy required before meetings",
    ],
    preparationDeadline: "May 20, 2026",
  },
  {
    id: "easo",
    name: "European Association for the Study of Obesity",
    acronym: "EASO",
    date: "May 11, 2026",
    endDate: "May 14, 2026",
    location: "Dublin, Ireland",
    region: "EMEA",
    topics: [
      "European obesity treatment guidelines",
      "Pharmacotherapy access disparities",
      "Multidisciplinary obesity care models",
      "Patient-reported outcomes in weight management",
    ],
    relatedCountryIds: ["uk", "germany", "france", "italy", "spain", "uae"],
    priority: 2,
    inbodyPresence: "Abstract submitted; attendance TBD",
    notes: [
      "Strong EMEA KOL network opportunity",
      "Align messaging with EMA reimbursement trends",
    ],
    preparationDeadline: "April 25, 2026",
  },
  {
    id: "easd",
    name: "European Association for the Study of Diabetes",
    acronym: "EASD",
    date: "September 15, 2026",
    endDate: "September 19, 2026",
    location: "Vienna, Austria",
    region: "EMEA",
    topics: [
      "Incretin-based therapies",
      "Diabetes technology and monitoring",
      "Obesity-diabetes treatment overlap",
      "Health economics of GLP-1 therapy",
    ],
    relatedCountryIds: ["germany", "france", "italy", "spain", "uk", "uae", "saudi-arabia"],
    priority: 2,
    inbodyPresence: "Poster presentation planned",
    notes: [
      "Focus on GLP-1 + body composition clinical evidence",
      "Coordinate with EMEA subsidiary for hospital lead generation",
    ],
    preparationDeadline: "August 30, 2026",
  },
  {
    id: "obesityweek",
    name: "ObesityWeek",
    acronym: "ObesityWeek",
    date: "November 2, 2026",
    endDate: "November 6, 2026",
    location: "San Antonio, USA",
    region: "Global",
    topics: [
      "Obesity medicine best practices",
      "GLP-1 combination therapies",
      "Behavioral and pharmacological integration",
      "Health equity in obesity treatment",
    ],
    relatedCountryIds: ["usa", "canada", "mexico", "brazil", "uk", "australia", "japan"],
    priority: 1,
    inbodyPresence: "Registration deadline in 21 days — abstract submitted",
    notes: [
      "Primary obesity medicine audience — 3,000+ specialists",
      "Ideal for launching body composition + GLP-1 clinical data",
      "Confirm strategy team attendance (2–3 members)",
    ],
    preparationDeadline: "October 10, 2026",
  },
];

const conferenceMap = new Map(ENTERPRISE_CONFERENCES.map((c) => [c.id, c]));

export function getEnterpriseConference(id: ConferenceId): EnterpriseConference | undefined {
  return conferenceMap.get(id);
}

export function getAllEnterpriseConferences(): EnterpriseConference[] {
  return ENTERPRISE_CONFERENCES;
}

export function getConferencesForCountry(countryId: CountryId): EnterpriseConference[] {
  return ENTERPRISE_CONFERENCES.filter((c) => c.relatedCountryIds.includes(countryId));
}
