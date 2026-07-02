export type MarketMetric = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
};

export const marketMetrics: MarketMetric[] = [
  { label: "Global GLP-1 Market", value: "$42.8B", change: "+12.4%", trend: "up" },
  { label: "Obesity Drug Segment", value: "$28.1B", change: "+18.2%", trend: "up" },
  { label: "Avg. Weekly Rx Growth", value: "3.7%", change: "+0.4pp", trend: "up" },
  { label: "Pipeline Candidates", value: "147", change: "+9 YoY", trend: "up" },
];

export type NewsItem = {
  title: string;
  source: string;
  time: string;
  tag: string;
};

export const latestNews: NewsItem[] = [
  {
    title: "Novo Nordisk expands Wegovy supply to 12 new markets in Asia-Pacific",
    source: "Reuters",
    time: "2h ago",
    tag: "Supply Chain",
  },
  {
    title: "FDA advisory panel reviews oral GLP-1 formulations for broader access",
    source: "STAT News",
    time: "4h ago",
    tag: "Regulatory",
  },
  {
    title: "Eli Lilly reports 34% YoY growth in Mounjaro prescriptions",
    source: "Bloomberg",
    time: "6h ago",
    tag: "Earnings",
  },
  {
    title: "Telehealth platforms see surge in GLP-1 prescription requests",
    source: "Healthcare Dive",
    time: "8h ago",
    tag: "Digital Health",
  },
];

export type ResearchPaper = {
  title: string;
  journal: string;
  authors: string;
  date: string;
};

export const researchPapers: ResearchPaper[] = [
  {
    title: "Comparative efficacy of dual GLP-1/GIP agonists in type 2 diabetes",
    journal: "The Lancet",
    authors: "Chen et al.",
    date: "Jun 2026",
  },
  {
    title: "Long-term cardiovascular outcomes with semaglutide: 5-year follow-up",
    journal: "NEJM",
    authors: "Patel et al.",
    date: "May 2026",
  },
  {
    title: "Muscle mass preservation during GLP-1-mediated weight loss",
    journal: "JAMA",
    authors: "Kim et al.",
    date: "May 2026",
  },
];

export type CompetitorUpdate = {
  company: string;
  update: string;
  impact: "high" | "medium" | "low";
  date: string;
};

export const competitorUpdates: CompetitorUpdate[] = [
  {
    company: "Novo Nordisk",
    update: "Filed new patent for ultra-long-acting GLP-1 formulation",
    impact: "high",
    date: "Jul 1",
  },
  {
    company: "Eli Lilly",
    update: "Phase III trial for orforglipron meets primary endpoint",
    impact: "high",
    date: "Jun 30",
  },
  {
    company: "Amgen",
    update: "MariTide shows 20% weight reduction at 52 weeks",
    impact: "medium",
    date: "Jun 28",
  },
  {
    company: "Pfizer",
    update: "Resumed danuglipron development with modified dosing",
    impact: "medium",
    date: "Jun 27",
  },
];

export type Conference = {
  name: string;
  location: string;
  date: string;
  daysAway: number;
};

export const upcomingConferences: Conference[] = [
  {
    name: "ADA Scientific Sessions 2026",
    location: "Chicago, IL",
    date: "Jul 15–18",
    daysAway: 14,
  },
  {
    name: "ObesityWeek 2026",
    location: "San Antonio, TX",
    date: "Nov 3–6",
    daysAway: 125,
  },
  {
    name: "EASD Annual Meeting",
    location: "Madrid, Spain",
    date: "Sep 9–12",
    daysAway: 70,
  },
];

export type BusinessOpportunity = {
  title: string;
  description: string;
  score: number;
  category: string;
};

export const businessOpportunities: BusinessOpportunity[] = [
  {
    title: "InBody + GLP-1 Monitoring Bundle",
    description: "Pair body composition tracking with prescription adherence for clinics",
    score: 92,
    category: "Product Integration",
  },
  {
    title: "Corporate Wellness GLP-1 Analytics",
    description: "B2B dashboard for employers tracking metabolic health outcomes",
    score: 87,
    category: "Enterprise",
  },
  {
    title: "APAC Telehealth Partnership",
    description: "White-label InBody data for regional telehealth GLP-1 providers",
    score: 81,
    category: "Partnership",
  },
];

export type IntelligenceItem = {
  title: string;
  summary: string;
  priority: "high" | "medium" | "low";
  time: string;
};

export const todaysIntelligence: IntelligenceItem[] = [
  {
    title: "APAC supply expansion signals pricing pressure in H2",
    summary: "Novo Nordisk capacity additions may shift regional pricing dynamics.",
    priority: "high",
    time: "Today · 8:00 AM",
  },
  {
    title: "Hospital obesity programs accelerating InBody demand",
    summary: "12 new tier-1 hospitals launched integrated body composition + GLP-1 pathways.",
    priority: "medium",
    time: "Today · 7:30 AM",
  },
  {
    title: "Oral GLP-1 FDA panel scheduled for Q3 review",
    summary: "Potential access expansion could reshape primary care prescribing patterns.",
    priority: "high",
    time: "Today · 6:45 AM",
  },
];

export type Glp1Update = {
  headline: string;
  metric: string;
  change: string;
  trend: "up" | "down";
};

export const glp1Updates: Glp1Update[] = [
  { headline: "US Weekly Rx Volume", metric: "2.4M", change: "+5.2%", trend: "up" },
  { headline: "Wegovy Market Share", metric: "38%", change: "+1.1pp", trend: "up" },
  { headline: "Mounjaro Growth Rate", metric: "+34%", change: "YoY", trend: "up" },
];

export type HospitalRecord = {
  name: string;
  region: string;
  program: string;
  status: string;
};

export const hospitalMarket: HospitalRecord[] = [
  { name: "Seoul National University Hospital", region: "APAC", program: "Obesity Center", status: "Active" },
  { name: "Mayo Clinic", region: "NA", program: "Metabolic Health", status: "Pilot" },
  { name: "Charité Berlin", region: "EMEA", program: "GLP-1 Pathway", status: "Prospect" },
];

export type PharmacyRecord = {
  chain: string;
  locations: number;
  glp1Volume: string;
  trend: string;
};

export const pharmacyMarket: PharmacyRecord[] = [
  { chain: "CVS Health", locations: 9200, glp1Volume: "High", trend: "+18%" },
  { chain: "Walgreens", locations: 8600, glp1Volume: "High", trend: "+14%" },
  { chain: "Boots UK", locations: 2200, glp1Volume: "Medium", trend: "+9%" },
];

export type EmrRecord = {
  system: string;
  integration: string;
  hospitals: number;
  status: string;
};

export const emrActivity: EmrRecord[] = [
  { system: "Epic", integration: "Body Comp Module", hospitals: 142, status: "Live" },
  { system: "Cerner", integration: "Metabolic Dashboard", hospitals: 67, status: "Beta" },
  { system: "Allscripts", integration: "Wellness API", hospitals: 23, status: "Planning" },
];

export type ContentItem = {
  title: string;
  type: string;
  stage: string;
  owner: string;
};

export const contentPipeline: ContentItem[] = [
  { title: "GLP-1 + InBody Clinical Whitepaper", type: "Whitepaper", stage: "Review", owner: "Marketing" },
  { title: "Hospital Partner Case Study", type: "Case Study", stage: "Draft", owner: "Content" },
  { title: "Q3 Market Trends Deck", type: "Presentation", stage: "Published", owner: "Strategy" },
];

export type QuickAction = {
  label: string;
  emoji: string;
  href: string;
};

export const quickActions: QuickAction[] = [
  { label: "Generate Report", emoji: "📈", href: "/reports" },
  { label: "Ask AI Assistant", emoji: "🤖", href: "/ai-assistant" },
  { label: "Track Competitor", emoji: "🏢", href: "/competitors" },
  { label: "New Content", emoji: "🎬", href: "/content-studio" },
];

export type ReportItem = {
  title: string;
  type: string;
  date: string;
  author: string;
};

export const recentReports: ReportItem[] = [
  { title: "Q2 GLP-1 Market Overview", type: "Executive", date: "Jun 28", author: "Strategy Team" },
  { title: "APAC Hospital Pipeline Analysis", type: "Market", date: "Jun 25", author: "J. Kim" },
  { title: "Competitor Landscape Update", type: "Competitive", date: "Jun 22", author: "M. Park" },
];

export type ClinicalTrial = {
  name: string;
  sponsor: string;
  phase: string;
  status: string;
};

export const clinicalTrials: ClinicalTrial[] = [
  { name: "SURMOUNT-5 Extension", sponsor: "Eli Lilly", phase: "Phase III", status: "Recruiting" },
  { name: "REDEFINE 4", sponsor: "Novo Nordisk", phase: "Phase III", status: "Active" },
  { name: "MariTide Obesity Study", sponsor: "Amgen", phase: "Phase II", status: "Completed" },
];

export type KolProfile = {
  name: string;
  specialty: string;
  institution: string;
  influence: string;
};

export const kolProfiles: KolProfile[] = [
  { name: "Dr. Sarah Mitchell", specialty: "Obesity Medicine", institution: "Johns Hopkins", influence: "High" },
  { name: "Prof. Hiroshi Tanaka", specialty: "Endocrinology", institution: "Univ. of Tokyo", influence: "High" },
  { name: "Dr. Elena Rossi", specialty: "Metabolic Health", institution: "Univ. of Milan", influence: "Medium" },
];

export type NotificationItem = {
  title: string;
  time: string;
  unread: boolean;
};

export const notifications: NotificationItem[] = [
  { title: "New competitor filing: Novo Nordisk patent", time: "10m ago", unread: true },
  { title: "ADA conference session added to calendar", time: "1h ago", unread: true },
  { title: "Q2 report ready for review", time: "3h ago", unread: false },
];

export type ModuleCard = {
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: string;
};

export function getModuleCards(key: string): ModuleCard[] {
  const cards: Record<string, ModuleCard[]> = {
    intelligence: todaysIntelligence.map((i) => ({
      title: i.title,
      subtitle: i.summary,
      meta: i.time,
      badge: i.priority,
    })),
    "glp1-market": marketMetrics.map((m) => ({
      title: m.label,
      subtitle: m.value,
      meta: m.change,
      badge: m.trend,
    })),
    hospitals: hospitalMarket.map((h) => ({
      title: h.name,
      subtitle: h.program,
      meta: h.region,
      badge: h.status,
    })),
    pharmacies: pharmacyMarket.map((p) => ({
      title: p.chain,
      subtitle: `${p.locations.toLocaleString()} locations`,
      meta: p.trend,
      badge: p.glp1Volume,
    })),
    emr: emrActivity.map((e) => ({
      title: e.system,
      subtitle: e.integration,
      meta: `${e.hospitals} hospitals`,
      badge: e.status,
    })),
    "market-news": latestNews.map((n) => ({
      title: n.title,
      subtitle: n.source,
      meta: n.time,
      badge: n.tag,
    })),
    research: researchPapers.map((p) => ({
      title: p.title,
      subtitle: p.journal,
      meta: p.date,
      badge: p.authors,
    })),
    "clinical-trials": clinicalTrials.map((t) => ({
      title: t.name,
      subtitle: t.sponsor,
      meta: t.phase,
      badge: t.status,
    })),
    competitors: competitorUpdates.map((c) => ({
      title: c.company,
      subtitle: c.update,
      meta: c.date,
      badge: c.impact,
    })),
    conferences: upcomingConferences.map((c) => ({
      title: c.name,
      subtitle: c.location,
      meta: c.date,
      badge: `${c.daysAway}d`,
    })),
    kol: kolProfiles.map((k) => ({
      title: k.name,
      subtitle: k.specialty,
      meta: k.institution,
      badge: k.influence,
    })),
    "content-studio": contentPipeline.map((c) => ({
      title: c.title,
      subtitle: c.type,
      meta: c.owner,
      badge: c.stage,
    })),
    "business-ideas": businessOpportunities.map((b) => ({
      title: b.title,
      subtitle: b.description,
      meta: b.category,
      badge: String(b.score),
    })),
    reports: recentReports.map((r) => ({
      title: r.title,
      subtitle: r.type,
      meta: r.date,
      badge: r.author,
    })),
  };
  return cards[key] ?? [];
}
