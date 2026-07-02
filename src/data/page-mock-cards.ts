import type { ModuleCard } from "@/data/mock-data";

const templates: Record<string, () => ModuleCard[]> = {
  "global-dashboard": () => [
    { title: "APAC", subtitle: "Fastest GLP-1 Rx growth", meta: "+22% QoQ", badge: "Priority" },
    { title: "North America", subtitle: "Largest revenue market", meta: "$18.2B", badge: "Mature" },
    { title: "EMEA", subtitle: "Reimbursement expanding", meta: "12 markets", badge: "Growth" },
  ],
  "country-explorer": () => [
    { title: "South Korea", subtitle: "MFDS obesity indication approved", meta: "High potential", badge: "APAC" },
    { title: "United States", subtitle: "Retail pharmacy-led growth", meta: "2.4M Rx/wk", badge: "NA" },
    { title: "Germany", subtitle: "Hospital pathway focus", meta: "EMA aligned", badge: "EMEA" },
  ],
  "country-compare": () => [
    { title: "KR vs JP", subtitle: "Regulatory & access comparison", meta: "Updated", badge: "Compare" },
    { title: "US vs UK", subtitle: "Reimbursement gap analysis", meta: "Updated", badge: "Compare" },
  ],
  "weekly-research-mission": () => [
    { title: "APAC payer landscape scan", subtitle: "Assigned: Tokyo subsidiary", meta: "Due Fri", badge: "Mission" },
    { title: "Lilly oral GLP-1 competitive brief", subtitle: "Assigned: HQ Strategy", meta: "Due Thu", badge: "Mission" },
  ],
  "market-overview": () => [
    { title: "Global GLP-1 Market", subtitle: "Total addressable market", meta: "$42.8B", badge: "+12.4%" },
    { title: "Obesity Segment", subtitle: "Primary growth driver", meta: "$28.1B", badge: "+18.2%" },
  ],
  "treatment-pathway": () => [
    { title: "Diagnosis", subtitle: "BMI + comorbidity screening", meta: "Entry point", badge: "Stage 1" },
    { title: "Monitoring", subtitle: "Body composition tracking", meta: "InBody fit", badge: "Stage 4" },
  ],
  regulations: () => [
    { title: "FDA", subtitle: "Wegovy cardiovascular indication", meta: "Approved", badge: "US" },
    { title: "EMA", subtitle: "Mounjaro obesity label expansion", meta: "Pending", badge: "EU" },
  ],
  "insurance-reimbursement": () => [
    { title: "US Commercial", subtitle: "Employer coverage expanding", meta: "68% plans", badge: "Coverage" },
    { title: "NHS UK", subtitle: "Limited obesity access", meta: "Restricted", badge: "Barrier" },
  ],
  "prescription-channels": () => [
    { title: "Retail Pharmacy", subtitle: "Fastest channel growth", meta: "+24%", badge: "Channel" },
    { title: "Telehealth", subtitle: "Direct-to-patient prescribing", meta: "+31%", badge: "Channel" },
  ],
  "consumer-insights": () => [
    { title: "Brand Awareness", subtitle: "Wegovy unprompted recall", meta: "47%", badge: "US" },
    { title: "Patient Concerns", subtitle: "Muscle loss during weight loss", meta: "Top 3", badge: "Insight" },
  ],
  hospitals: () => [
    { title: "SNUH", subtitle: "Obesity Center program", meta: "Active", badge: "APAC" },
    { title: "Mayo Clinic", subtitle: "Metabolic Health pilot", meta: "Pilot", badge: "NA" },
  ],
  pharmacies: () => [
    { title: "CVS Health", subtitle: "9,200 locations", meta: "+18%", badge: "High volume" },
    { title: "Boots UK", subtitle: "2,200 locations", meta: "+9%", badge: "Medium" },
  ],
  emr: () => [
    { title: "Epic", subtitle: "Body Comp Module", meta: "142 hospitals", badge: "Live" },
    { title: "Cerner", subtitle: "Metabolic Dashboard", meta: "67 hospitals", badge: "Beta" },
  ],
  telemedicine: () => [
    { title: "Ro", subtitle: "GLP-1 telehealth platform", meta: "Partnership target", badge: "US" },
    { title: "Noom Med", subtitle: "Integrated weight program", meta: "Monitoring gap", badge: "Opportunity" },
  ],
  news: () => [
    { title: "Novo APAC supply expansion", subtitle: "Reuters", meta: "2h ago", badge: "Supply" },
    { title: "FDA oral GLP-1 panel review", subtitle: "STAT News", meta: "4h ago", badge: "Regulatory" },
  ],
  research: () => [
    { title: "Muscle mass preservation during GLP-1 weight loss", subtitle: "JAMA", meta: "May 2026", badge: "Kim et al." },
    { title: "Dual GLP-1/GIP agonist efficacy", subtitle: "The Lancet", meta: "Jun 2026", badge: "Chen et al." },
  ],
  "clinical-trials": () => [
    { title: "SURMOUNT-5 Extension", subtitle: "Eli Lilly", meta: "Phase III", badge: "Recruiting" },
    { title: "REDEFINE 4", subtitle: "Novo Nordisk", meta: "Phase III", badge: "Active" },
  ],
  competitors: () => [
    { title: "Eli Lilly", subtitle: "Orforglipron Phase III success", meta: "Jul 1", badge: "High" },
    { title: "Novo Nordisk", subtitle: "Ultra-long-acting patent filed", meta: "Jul 1", badge: "High" },
  ],
  "regulatory-updates": () => [
    { title: "FDA Advisory Panel", subtitle: "Oral GLP-1 review scheduled", meta: "Aug 2026", badge: "US" },
    { title: "MFDS Guidance", subtitle: "Obesity drug reimbursement update", meta: "Jun 2026", badge: "KR" },
  ],
  aoco: () => [{ title: "AOCO 2026", subtitle: "Melbourne, Australia", meta: "Sep 15–18", badge: "74 days" }],
  obesityweek: () => [{ title: "ObesityWeek 2026", subtitle: "San Antonio, TX", meta: "Nov 3–6", badge: "125 days" }],
  ada: () => [{ title: "ADA Scientific Sessions", subtitle: "Chicago, IL", meta: "Jul 15–18", badge: "14 days" }],
  easd: () => [{ title: "EASD Annual Meeting", subtitle: "Madrid, Spain", meta: "Sep 9–12", badge: "70 days" }],
  easo: () => [{ title: "EASO Congress", subtitle: "Dublin, Ireland", meta: "May 2027", badge: "Planning" }],
  kol: () => [
    { title: "Dr. Sarah Mitchell", subtitle: "Obesity Medicine · Johns Hopkins", meta: "High influence", badge: "US" },
    { title: "Prof. Hiroshi Tanaka", subtitle: "Endocrinology · Univ. of Tokyo", meta: "High influence", badge: "JP" },
  ],
  "content-studio": () => [
    { title: "GLP-1 + InBody Whitepaper", subtitle: "Whitepaper", meta: "In review", badge: "Marketing" },
    { title: "Q3 Global Trends Deck", subtitle: "Presentation", meta: "Draft", badge: "Strategy" },
  ],
  "business-opportunities": () => [
    { title: "InBody + GLP-1 Monitoring Bundle", subtitle: "Product Integration", meta: "Score 92", badge: "Priority" },
    { title: "APAC Telehealth Partnership", subtitle: "Partnership", meta: "Score 81", badge: "APAC" },
  ],
  "executive-reports": () => [
    { title: "Q2 Global GLP-1 Overview", subtitle: "Executive summary", meta: "Jun 28", badge: "Board" },
    { title: "APAC Hospital Pipeline", subtitle: "Market analysis", meta: "Jun 25", badge: "Regional" },
  ],
};

export function getPageMockCards(pageId: string): ModuleCard[] {
  const factory = templates[pageId];
  if (factory) return factory();
  return [
    { title: "Sample Record", subtitle: "Preview data for this module", meta: "Mock", badge: "Preview" },
    { title: "Strategic Signal", subtitle: "Connect live feeds to populate", meta: "Pending", badge: "Empty" },
  ];
}
