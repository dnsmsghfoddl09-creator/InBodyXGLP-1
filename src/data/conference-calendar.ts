import type { CountryId } from "@/data/countries";
import { getKolsByIds } from "@/data/enterprise/kols";
import type {
  CalendarConference,
  ConferenceDetail,
  ConferenceId,
  ConferenceRegion,
  ConferenceTopicTag,
} from "@/types/conference";

export const CALENDAR_REFERENCE_DATE = new Date("2026-07-01");

export const REGION_FILTER_OPTIONS: ConferenceRegion[] = [
  "APAC",
  "North America",
  "EMEA",
  "Global",
  "LATAM",
];

export const CATEGORY_FILTER_OPTIONS = [
  "Obesity",
  "Diabetes",
  "Nutrition",
  "Sports Medicine",
  "Multidisciplinary",
] as const;

export const TOPIC_FILTER_OPTIONS: ConferenceTopicTag[] = [
  "GLP-1",
  "Obesity",
  "Diabetes",
  "Nutrition",
  "Sports Medicine",
];

const CALENDAR_ENTRIES: CalendarConference[] = [
  {
    id: "easo",
    name: "European Association for the Study of Obesity",
    acronym: "EASO",
    startDate: "2026-05-11",
    endDate: "2026-05-14",
    displayDate: "May 11–14, 2026",
    country: "Ireland",
    city: "Dublin",
    region: "EMEA",
    category: "Obesity",
    topicTags: ["GLP-1", "Obesity", "Nutrition"],
    status: "Completed",
    importance: 2,
    preparationDeadline: "April 25, 2026",
    abstractDeadline: "February 15, 2026",
    registrationDeadline: "April 30, 2026",
    travelLeadDays: 14,
  },
  {
    id: "ada",
    name: "American Diabetes Association Scientific Sessions",
    acronym: "ADA",
    startDate: "2026-06-05",
    endDate: "2026-06-08",
    displayDate: "June 5–8, 2026",
    country: "USA",
    city: "Chicago",
    region: "North America",
    category: "Diabetes",
    topicTags: ["GLP-1", "Diabetes", "Obesity"],
    status: "Completed",
    importance: 1,
    preparationDeadline: "May 20, 2026",
    abstractDeadline: "March 1, 2026",
    registrationDeadline: "May 25, 2026",
    travelLeadDays: 7,
  },
  {
    id: "aoco",
    name: "Asian Oceanian Congress of Obesity",
    acronym: "AOCO",
    startDate: "2026-09-12",
    endDate: "2026-09-14",
    displayDate: "September 12–14, 2026",
    country: "South Korea",
    city: "Seoul",
    region: "APAC",
    category: "Obesity",
    topicTags: ["GLP-1", "Obesity", "Nutrition"],
    status: "In Preparation",
    importance: 1,
    preparationDeadline: "August 15, 2026",
    abstractDeadline: "June 30, 2026",
    registrationDeadline: "September 1, 2026",
    travelLeadDays: 10,
  },
  {
    id: "easd",
    name: "European Association for the Study of Diabetes",
    acronym: "EASD",
    startDate: "2026-09-15",
    endDate: "2026-09-19",
    displayDate: "September 15–19, 2026",
    country: "Austria",
    city: "Vienna",
    region: "EMEA",
    category: "Diabetes",
    topicTags: ["GLP-1", "Diabetes", "Obesity"],
    status: "Registration Open",
    importance: 2,
    preparationDeadline: "August 30, 2026",
    abstractDeadline: "July 15, 2026",
    registrationDeadline: "September 5, 2026",
    travelLeadDays: 12,
  },
  {
    id: "obesityweek",
    name: "ObesityWeek",
    acronym: "ObesityWeek",
    startDate: "2026-11-02",
    endDate: "2026-11-06",
    displayDate: "November 2–6, 2026",
    country: "USA",
    city: "San Antonio",
    region: "Global",
    category: "Obesity",
    topicTags: ["GLP-1", "Obesity", "Sports Medicine"],
    status: "Abstract Due",
    importance: 1,
    preparationDeadline: "October 10, 2026",
    abstractDeadline: "July 10, 2026",
    registrationDeadline: "October 20, 2026",
    travelLeadDays: 14,
  },
];

type DetailExtras = Omit<
  ConferenceDetail,
  keyof CalendarConference | "kolNames"
>;

const DETAIL_EXTRAS: Record<ConferenceId, DetailExtras> = {
  ada: {
    overview:
      "Premier global diabetes and obesity conference. ADA Scientific Sessions 2026 convenes 15,000+ HCPs with heavy GLP-1, digital health, and cardiovascular outcomes programming.",
    importantDates: [
      { label: "Abstract submission", date: "March 1, 2026", note: "Closed" },
      { label: "Conference dates", date: "June 5–8, 2026" },
    ],
    scientificTopics: ["GLP-1 cardiovascular outcomes", "Obesity-diabetes comorbidity", "Digital therapeutics"],
    glp1Sessions: [
      {
        title: "Long-term semaglutide cardiovascular outcomes — 5-year follow-up",
        track: "GLP-1 Outcomes",
        date: "June 6, 2026",
        speakers: ["Dr. Elena Maratos", "Prof. Robert Kaplan"],
      },
    ],
    obesitySessions: [
      {
        title: "Muscle mass preservation during GLP-1-mediated weight loss",
        track: "Obesity Medicine",
        date: "June 6, 2026",
        speakers: ["JAMA study authors"],
      },
    ],
    kolIds: ["kol-maratos-ucsd", "kol-kaplan-harvard"],
    companies: {
      novoNordisk: [{ name: "Novo Nordisk", role: "Sponsor", focus: "Wegovy outcomes pavilion" }],
      eliLilly: [{ name: "Eli Lilly", role: "Exhibitor", focus: "Mounjaro/Zepbound showcase" }],
      otherPlayers: [{ name: "Amgen", role: "Speaker", focus: "MariTide Phase III preview" }],
    },
    exhibition: {
      boothNumber: "1842",
      hall: "McCormick Place — North Building",
      hours: "Jun 5–8 · 9:00 AM – 5:00 PM",
      setupDate: "June 4, 2026",
      notes: ["Lead scanner devices shipped"],
    },
    inbodyOpportunity: {
      summary: "Historical ADA presence generated 12 qualified hospital leads.",
      pipelineEstimate: "$2.1M qualified pipeline",
      targets: ["5 KOL meetings", "12 hospital BD conversations"],
    },
    suggestedAgenda: [
      { time: "Day 1 · 10:00", activity: "Booth opening — KOL meet & greet" },
      { time: "Day 2 · 11:00", activity: "Competitive walk-through — Novo & Lilly booths" },
    ],
    actionItems: [
      { task: "Post-conference lead report", owner: "APAC Lead", dueDate: "June 12, 2026", status: "done" },
    ],
    relatedPapers: [
      { title: "Muscle mass preservation during GLP-1-mediated weight loss", journal: "JAMA", relevance: "Core InBody positioning" },
    ],
    relatedNews: [{ title: "FDA advisory panel reviews oral GLP-1", source: "STAT News", date: "June 2026" }],
    relatedCountryIds: ["usa", "canada", "japan", "germany", "uk"],
    aiStrategySummary: ["ADA is highest-ROI for US hospital pipeline — prioritize 72-hour follow-up."],
  },
  aoco: {
    overview: "Flagship APAC obesity congress in Seoul focusing on GLP-1 in Asian populations and digital health.",
    importantDates: [
      { label: "Abstract submission", date: "June 30, 2026", note: "Due in 29 days" },
      { label: "Conference dates", date: "September 12–14, 2026" },
    ],
    scientificTopics: ["GLP-1 in Asian populations", "Body composition monitoring", "APAC access"],
    glp1Sessions: [
      { title: "GLP-1 access disparities across APAC", track: "Policy", date: "Sep 12, 2026", speakers: ["Prof. Ji-Hoon Kim"] },
    ],
    obesitySessions: [
      { title: "Body composition in multidisciplinary obesity care", track: "Clinical", date: "Sep 13, 2026", speakers: ["AOCO Faculty"] },
    ],
    kolIds: ["kol-kim-snu", "kol-tanaka-utokyo", "kol-anong-chulalongkorn"],
    companies: {
      novoNordisk: [{ name: "Novo Nordisk", role: "Sponsor", focus: "APAC Wegovy access" }],
      eliLilly: [{ name: "Eli Lilly", role: "Exhibitor", focus: "Mounjaro APAC" }],
      otherPlayers: [{ name: "Innovent Biologics", role: "Speaker", focus: "China pipeline" }],
    },
    exhibition: {
      boothNumber: "A-214",
      hall: "COEX Convention Center",
      hours: "Sep 12–14 · 9:30 AM – 6:00 PM",
      setupDate: "September 11, 2026",
      notes: ["Symposium under review"],
    },
    inbodyOpportunity: {
      summary: "Home-market advantage in Seoul with strong competitor body composition sessions.",
      pipelineEstimate: "¥180M+ Japan/Korea pipeline",
      targets: ["SNUH partnership", "3 hospital pilots"],
    },
    suggestedAgenda: [
      { time: "Day 1 · 09:00", activity: "GLP-1 APAC access panel" },
      { time: "Day 2 · 10:30", activity: "InBody symposium / poster" },
    ],
    actionItems: [
      { task: "Submit symposium abstract", owner: "Medical Affairs", dueDate: "June 30, 2026", status: "in-progress" },
    ],
    relatedPapers: [{ title: "Asian obesity phenotypes and GLP-1 response", journal: "Lancet D&E", relevance: "AOCO messaging" }],
    relatedNews: [{ title: "MFDS updates reimbursement criteria", source: "KBR", date: "March 2026" }],
    relatedCountryIds: ["south-korea", "japan", "thailand", "indonesia", "singapore"],
    aiStrategySummary: [
      "Collect AOCO 2026 presentations referencing body composition monitoring.",
      "Japan reimbursement policy should be updated before KOL meetings.",
    ],
  },
  easd: {
    overview: "Europe's leading diabetes congress in Vienna with incretin and technology programming.",
    importantDates: [
      { label: "Abstract submission", date: "July 15, 2026", note: "Due in 14 days" },
      { label: "Conference dates", date: "September 15–19, 2026" },
    ],
    scientificTopics: ["Incretin therapies", "Diabetes technology", "Health economics"],
    glp1Sessions: [
      { title: "Real-world GLP-1 persistence outcomes", track: "Clinical", date: "Sep 16, 2026", speakers: ["Prof. John Wilding"] },
    ],
    obesitySessions: [
      { title: "Integrated obesity-diabetes hospital pathways", track: "Systems", date: "Sep 17, 2026", speakers: ["Prof. Annette Hamann"] },
    ],
    kolIds: ["kol-wilding-liverpool", "kol-hamann-leipzig"],
    companies: {
      novoNordisk: [{ name: "Novo Nordisk", role: "Sponsor", focus: "EU obesity access" }],
      eliLilly: [{ name: "Eli Lilly", role: "Exhibitor", focus: "Mounjaro EMEA" }],
      otherPlayers: [{ name: "Roche", role: "Speaker", focus: "Diagnostics" }],
    },
    exhibition: {
      boothNumber: "P-142",
      hall: "Messe Wien",
      hours: "Sep 15–19 · 8:30 AM – 6:00 PM",
      setupDate: "September 14, 2026",
      notes: ["Poster confirmed"],
    },
    inbodyOpportunity: {
      summary: "8 new German hospital inquiries — ideal for EMEA pipeline conversion.",
      pipelineEstimate: "€1.2M EMEA pipeline",
      targets: ["3 hospital pilots", "KOL advisory board"],
    },
    suggestedAgenda: [{ time: "Day 1 · 11:00", activity: "Poster presentation" }],
    actionItems: [
      { task: "Finalize poster", owner: "Medical Affairs", dueDate: "July 15, 2026", status: "in-progress" },
    ],
    relatedPapers: [{ title: "5-year semaglutide CV outcomes", journal: "NEJM", relevance: "Long-term monitoring" }],
    relatedNews: [{ title: "EMEA hospitals expand metabolic programs", source: "EHR", date: "Feb 2026" }],
    relatedCountryIds: ["germany", "france", "uk", "uae"],
    aiStrategySummary: ["EASD abstract deadline in 14 days — escalate poster review."],
  },
  easo: {
    overview: "European obesity congress in Dublin — guidelines and access disparities focus.",
    importantDates: [{ label: "Conference dates", date: "May 11–14, 2026", note: "Completed" }],
    scientificTopics: ["European obesity guidelines", "Pharmacotherapy access", "Multidisciplinary care"],
    glp1Sessions: [
      { title: "GLP-1 reimbursement in European public systems", track: "Policy", date: "May 12, 2026", speakers: ["Prof. John Wilding"] },
    ],
    obesitySessions: [
      { title: "Patient-reported outcomes in weight management", track: "Clinical", date: "May 13, 2026", speakers: ["EASO Faculty"] },
    ],
    kolIds: ["kol-wilding-liverpool", "kol-hamann-leipzig"],
    companies: {
      novoNordisk: [{ name: "Novo Nordisk", role: "Sponsor", focus: "EU policy" }],
      eliLilly: [{ name: "Eli Lilly", role: "Exhibitor", focus: "Access programs" }],
      otherPlayers: [],
    },
    exhibition: {
      boothNumber: "—",
      hall: "Dublin Convention Centre",
      hours: "Attended — no booth",
      setupDate: "—",
      notes: ["Abstract presented"],
    },
    inbodyOpportunity: {
      summary: "Completed — strong EMEA KOL connections for H2 outreach.",
      pipelineEstimate: "€800K influenced pipeline",
      targets: ["4 KOL follow-ups"],
    },
    suggestedAgenda: [{ time: "Completed", activity: "Sessions captured in intel report" }],
    actionItems: [{ task: "Post-EASO report", owner: "EMEA Lead", dueDate: "May 20, 2026", status: "done" }],
    relatedPapers: [],
    relatedNews: [],
    relatedCountryIds: ["uk", "germany", "france"],
    aiStrategySummary: ["Reuse EASO reimbursement insights in Germany hospital conversations."],
  },
  obesityweek: {
    overview: "Premier global obesity medicine conference — 3,000+ specialists in San Antonio.",
    importantDates: [
      { label: "Abstract submission", date: "July 10, 2026", note: "URGENT — 9 days" },
      { label: "Conference dates", date: "November 2–6, 2026" },
    ],
    scientificTopics: ["Obesity best practices", "GLP-1 combinations", "Health equity"],
    glp1Sessions: [
      { title: "Next-gen incretin therapies and monitoring", track: "Pharmacotherapy", date: "Nov 3, 2026", speakers: ["OMA Faculty"] },
    ],
    obesitySessions: [
      { title: "Body composition in obesity pharmacotherapy", track: "Assessment", date: "Nov 4, 2026", speakers: ["Dr. Elena Maratos"] },
    ],
    kolIds: ["kol-maratos-ucsd", "kol-kaplan-harvard", "kol-dixon-melbourne"],
    companies: {
      novoNordisk: [{ name: "Novo Nordisk", role: "Sponsor", focus: "Wegovy pavilion" }],
      eliLilly: [{ name: "Eli Lilly", role: "Sponsor", focus: "Zepbound hub" }],
      otherPlayers: [{ name: "WW International", role: "Partner", focus: "Behavioral integration" }],
    },
    exhibition: {
      boothNumber: "Pending",
      hall: "Henry B. González Convention Center",
      hours: "Nov 2–6 · 9:00 AM – 5:30 PM",
      setupDate: "November 1, 2026",
      notes: ["Booth selection in progress"],
    },
    inbodyOpportunity: {
      summary: "Primary launch venue for GLP-1 + body composition whitepaper.",
      pipelineEstimate: "$1.5M NA clinic pipeline",
      targets: ["Whitepaper launch", "20 booth leads"],
    },
    suggestedAgenda: [
      { time: "Day 2 · 13:00", activity: "InBody product demo block" },
      { time: "Day 3 · 16:00", activity: "KOL roundtable" },
    ],
    actionItems: [
      { task: "Submit final abstract", owner: "Medical Affairs", dueDate: "July 10, 2026", status: "in-progress" },
      { task: "Confirm team attendance", owner: "HQ Strategy", dueDate: "July 15, 2026", status: "pending" },
    ],
    relatedPapers: [{ title: "GLP-1 + InBody whitepaper", journal: "Internal", relevance: "ObesityWeek launch" }],
    relatedNews: [{ title: "ObesityWeek registration record interest", source: "Obesity Society", date: "June 2026" }],
    relatedCountryIds: ["usa", "canada", "australia", "japan"],
    aiStrategySummary: [
      "Abstract deadline in 9 days — escalate whitepaper review.",
      "Confirm strategy team attendance before registration closes.",
    ],
  },
};

function buildDetail(entry: CalendarConference): ConferenceDetail {
  const extra = DETAIL_EXTRAS[entry.id];
  const kols = getKolsByIds(extra.kolIds);
  return { ...entry, ...extra, kolNames: kols.map((k) => `${k.name} — ${k.institution}`) };
}

let detailCache: Map<ConferenceId, ConferenceDetail> | null = null;

function getDetailMap(): Map<ConferenceId, ConferenceDetail> {
  if (!detailCache) {
    detailCache = new Map(CALENDAR_ENTRIES.map((e) => [e.id, buildDetail(e)]));
  }
  return detailCache;
}

export function getAllCalendarConferences(): CalendarConference[] {
  return [...CALENDAR_ENTRIES].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
}

export function getCalendarConference(id: ConferenceId): CalendarConference | undefined {
  return CALENDAR_ENTRIES.find((c) => c.id === id);
}

export function getConferenceDetail(id: ConferenceId): ConferenceDetail | undefined {
  return getDetailMap().get(id);
}

export function getUpcomingConferences(reference = CALENDAR_REFERENCE_DATE): CalendarConference[] {
  return getAllCalendarConferences().filter(
    (c) => new Date(c.endDate) >= reference && c.status !== "Completed",
  );
}

export function daysUntil(dateStr: string, reference = CALENDAR_REFERENCE_DATE): number {
  return Math.ceil((new Date(dateStr).getTime() - reference.getTime()) / (1000 * 60 * 60 * 24));
}

export function getConferencesForMonth(year: number, month: number): CalendarConference[] {
  return CALENDAR_ENTRIES.filter((c) => {
    const start = new Date(c.startDate);
    const end = new Date(c.endDate);
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    return start <= monthEnd && end >= monthStart;
  });
}

export function filterConferences(
  conferences: CalendarConference[],
  opts: {
    query?: string;
    region?: ConferenceRegion | "All";
    category?: string;
    topic?: ConferenceTopicTag | "All";
  },
): CalendarConference[] {
  return conferences.filter((c) => {
    if (opts.query) {
      const q = opts.query.toLowerCase();
      if (!`${c.name} ${c.acronym} ${c.city} ${c.country}`.toLowerCase().includes(q)) return false;
    }
    if (opts.region && opts.region !== "All" && c.region !== opts.region) return false;
    if (opts.category && opts.category !== "All" && c.category !== opts.category) return false;
    if (opts.topic && opts.topic !== "All" && !c.topicTags.includes(opts.topic)) return false;
    return true;
  });
}

export function getDashboardConferenceIntel(reference = CALENDAR_REFERENCE_DATE) {
  const upcoming = getUpcomingConferences(reference);
  const abstractAlerts = upcoming.filter((c) => c.status === "Abstract Due");
  const travelPrep = upcoming.filter((c) => daysUntil(c.startDate, reference) <= 90);
  const countdown = upcoming[0]
    ? { name: upcoming[0].acronym, fullName: upcoming[0].name, days: daysUntil(upcoming[0].startDate, reference), id: upcoming[0].id }
    : null;
  const deadlines = upcoming.flatMap((c) => [
    { conference: c.acronym, id: c.id, label: "Preparation", date: c.preparationDeadline },
    ...(c.abstractDeadline ? [{ conference: c.acronym, id: c.id, label: "Abstract", date: c.abstractDeadline }] : []),
  ]);
  return { upcoming, deadlines, abstractAlerts, travelPrep, countdown };
}
