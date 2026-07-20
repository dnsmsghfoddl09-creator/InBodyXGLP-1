import type { CountryId } from "@/data/countries";
import { COUNTRY_LIST } from "@/data/countries";

export type CountryResearchTabId =
  | "overview"
  | "news"
  | "papers"
  | "trials"
  | "regulations"
  | "competitors"
  | "hospitals"
  | "kol"
  | "opportunities";

export const COUNTRY_RESEARCH_TABS: { id: CountryResearchTabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "news", label: "News" },
  { id: "papers", label: "Research Papers" },
  { id: "trials", label: "Clinical Trials" },
  { id: "regulations", label: "Regulations" },
  { id: "competitors", label: "Competitors" },
  { id: "hospitals", label: "Hospitals" },
  { id: "kol", label: "KOL Network" },
  { id: "opportunities", label: "Business Opportunities" },
];

export type NewsRecord = {
  id: string;
  title: string;
  source: string;
  country: string;
  publishedDate: string;
  category?: string;
  importance: "Critical" | "High" | "Medium";
  relatedCompanies?: string[];
  relatedTopics?: string[];
  summary: string;
  executiveSummary?: string;
  businessImpact?: string;
  recommendedAction?: string;
  tags?: string[];
};

export type PaperRecord = {
  id: string;
  title: string;
  journal: string;
  authors: string;
  publicationDate: string;
  studyType: string;
  keyFindings: string;
};

export type TrialRecord = {
  id: string;
  title: string;
  phase: string;
  sponsor: string;
  status: string;
  enrollment: string;
  focus: string;
};

export type RegulationRecord = {
  id: string;
  title: string;
  agency: string;
  status: string;
  effectiveDate: string;
  impact: string;
};

export type CompetitorRecord = {
  id: string;
  company: string;
  currentActivity: string;
  marketStatus: string;
  opportunity: string;
  threatLevel: "High" | "Medium" | "Low";
};

export type HospitalRecord = {
  id: string;
  name: string;
  city: string;
  specialty: string;
  glp1Experience: string;
  researchActivity: string;
};

export type KolRecord = {
  id: string;
  name: string;
  institution: string;
  specialty: string;
  influence: string;
  focusAreas: string;
};

export type OpportunityRecord = {
  id: string;
  title: string;
  priority: 1 | 2 | 3 | 4 | 5;
  estimatedImpact: string;
  recommendedAction: string;
  status: "Active" | "In Review" | "Pipeline";
};

export type CountryResearchData = {
  news: NewsRecord[];
  papers: PaperRecord[];
  trials: TrialRecord[];
  regulations: RegulationRecord[];
  competitors: CompetitorRecord[];
  hospitals: HospitalRecord[];
  kol: KolRecord[];
  opportunities: OpportunityRecord[];
};

function countryName(id: CountryId): string {
  return COUNTRY_LIST.find((c) => c.id === id)?.name ?? id;
}

export function getCountryResearchData(countryId: CountryId): CountryResearchData {
  const name = countryName(countryId);

  return {
    news: [
      {
        id: `${countryId}-n1`,
        title: `${name} hospitals expand integrated GLP-1 obesity pathways`,
        source: "Healthcare Asia Daily",
        country: name,
        publishedDate: "2026-06-28",
        importance: "Critical",
        summary: `Tier-1 hospitals in ${name} are launching multidisciplinary obesity programs with GLP-1 co-management protocols.`,
      },
      {
        id: `${countryId}-n2`,
        title: `Payer negotiations intensify for Wegovy coverage in ${name}`,
        source: "Pharma Market Watch",
        country: name,
        publishedDate: "2026-06-24",
        importance: "High",
        summary: "National insurers are reviewing obesity drug reimbursement criteria amid rising prescription volume.",
      },
      {
        id: `${countryId}-n3`,
        title: `Oral GLP-1 pipeline reshapes ${name} primary care screening demand`,
        source: "Endocrine Intelligence",
        country: name,
        publishedDate: "2026-06-19",
        importance: "High",
        summary: "Primary care networks anticipate broader prescribing touchpoints and body composition monitoring needs.",
      },
      {
        id: `${countryId}-n4`,
        title: `${name} digital health startups partner with obesity clinics`,
        source: "MedTech Brief",
        country: name,
        publishedDate: "2026-06-12",
        importance: "Medium",
        summary: "Telehealth platforms seek device integrations for remote metabolic monitoring during GLP-1 therapy.",
      },
      {
        id: `${countryId}-n5`,
        title: `Muscle preservation debate gains traction in ${name} KOL forums`,
        source: "Clinical Obesity Review",
        country: name,
        publishedDate: "2026-06-05",
        importance: "Medium",
        summary: "Physician societies highlight lean mass tracking as a differentiator for premium obesity programs.",
      },
      {
        id: `${countryId}-n6`,
        title: `Retail pharmacy chains in ${name} pilot GLP-1 patient onboarding`,
        source: "Channel Pharma",
        country: name,
        publishedDate: "2026-05-29",
        importance: "Medium",
        summary: "Pharmacy-led wellness programs may expand screening volume outside hospital settings.",
      },
    ],
    papers: [
      {
        id: `${countryId}-p1`,
        title: `Body composition outcomes during GLP-1 therapy in ${name} cohort`,
        journal: "Journal of Metabolic Health",
        authors: "Tanaka et al.",
        publicationDate: "2026-05-15",
        studyType: "Prospective Cohort",
        keyFindings: "Lean mass loss exceeded 12% without structured resistance monitoring during semaglutide treatment.",
      },
      {
        id: `${countryId}-p2`,
        title: "Real-world adherence patterns for tirzepatide in APAC obesity clinics",
        journal: "Diabetes Care Asia",
        authors: "Kim, Park & Lee",
        publicationDate: "2026-04-22",
        studyType: "Real-World Evidence",
        keyFindings: "Clinic-based body composition feedback improved 6-month persistence by 18%.",
      },
      {
        id: `${countryId}-p3`,
        title: `Payer value frameworks for obesity devices in ${name}`,
        journal: "Health Economics Review",
        authors: "Nguyen, Sato",
        publicationDate: "2026-03-30",
        studyType: "Health Economics",
        keyFindings: "Outcomes-based contracts favor devices that quantify muscle preservation during weight loss.",
      },
      {
        id: `${countryId}-p4`,
        title: "Hospital metabolic pathway design for GLP-1 initiation",
        journal: "Obesity Medicine",
        authors: "Chen & Rahman",
        publicationDate: "2026-02-18",
        studyType: "Clinical Protocol",
        keyFindings: "Standardized BIA screening at baseline increased treatment personalization and patient satisfaction.",
      },
      {
        id: `${countryId}-p5`,
        title: `Telemonitoring muscle mass during GLP-1 treatment: ${name} pilot`,
        journal: "Digital Therapeutics",
        authors: "Williams et al.",
        publicationDate: "2026-01-09",
        studyType: "Pilot Study",
        keyFindings: "Remote body composition monitoring reduced discontinuation in the first 90 days.",
      },
    ],
    trials: [
      {
        id: `${countryId}-t1`,
        title: `GLP-1 + body composition guided therapy (${name})`,
        phase: "Phase III",
        sponsor: "Regional Academic Consortium",
        status: "Recruiting",
        enrollment: "840 patients",
        focus: "Muscle preservation during semaglutide-induced weight loss",
      },
      {
        id: `${countryId}-t2`,
        title: "Oral GLP-1 primary care pathway study",
        phase: "Phase II",
        sponsor: "Global Pharma Partner",
        status: "Active",
        enrollment: "420 patients",
        focus: "Clinic workflow integration for obesity screening",
      },
      {
        id: `${countryId}-t3`,
        title: `${name} hospital-based metabolic bundle trial`,
        phase: "Phase IV",
        sponsor: "National Obesity Institute",
        status: "Completed",
        enrollment: "1,200 patients",
        focus: "Device-assisted monitoring vs. standard care",
      },
      {
        id: `${countryId}-t4`,
        title: "Tirzepatide cardiovascular outcomes extension",
        phase: "Phase III",
        sponsor: "Eli Lilly APAC",
        status: "Recruiting",
        enrollment: "2,100 patients",
        focus: "Long-term metabolic outcomes in obesity population",
      },
      {
        id: `${countryId}-t5`,
        title: "Pediatric-adjacent obesity pathway feasibility",
        phase: "Phase I",
        sponsor: `${name} University Hospital`,
        status: "Planning",
        enrollment: "60 patients",
        focus: "Safety monitoring protocols for adolescent obesity programs",
      },
    ],
    regulations: [
      {
        id: `${countryId}-r1`,
        title: "Obesity drug reimbursement criteria update",
        agency: `${name} National Health Authority`,
        status: "Under Review",
        effectiveDate: "Q3 2026",
        impact: "Expands eligible patient pool for chronic weight management indications.",
      },
      {
        id: `${countryId}-r2`,
        title: "Medical device integration in obesity pathways",
        agency: "Hospital Procurement Board",
        status: "Published",
        effectiveDate: "2026-04-01",
        impact: "Allows co-placement of screening devices in tier-1 obesity programs.",
      },
      {
        id: `${countryId}-r3`,
        title: "GLP-1 advertising and HCP promotion rules",
        agency: "Medicines Advertising Council",
        status: "Active",
        effectiveDate: "2026-01-15",
        impact: "Limits DTC messaging; increases HCP education requirements.",
      },
      {
        id: `${countryId}-r4`,
        title: "Import licensing for obesity monitoring devices",
        agency: "Medical Device Regulator",
        status: "Published",
        effectiveDate: "2025-11-20",
        impact: "Streamlines hospital procurement for body composition systems.",
      },
      {
        id: `${countryId}-r5`,
        title: "Prior authorization criteria for GLP-1 initiation",
        agency: "National Payer Alliance",
        status: "Active",
        effectiveDate: "2026-02-10",
        impact: "Requires documented baseline metabolic assessment for coverage approval.",
      },
    ],
    competitors: [
      {
        id: `${countryId}-c1`,
        company: "Novo Nordisk",
        currentActivity: "Expanding Wegovy hospital partnerships and KOL engagement",
        marketStatus: "Market leader · ~38% share",
        opportunity: "Co-develop clinical monitoring bundles with device partners",
        threatLevel: "High",
      },
      {
        id: `${countryId}-c2`,
        company: "Eli Lilly",
        currentActivity: "Mounjaro volume growth and oral GLP-1 pipeline acceleration",
        marketStatus: "Fastest growth · ~22% share",
        opportunity: "Position InBody as outcomes evidence partner for Lilly programs",
        threatLevel: "High",
      },
      {
        id: `${countryId}-c3`,
        company: "Generic BIA device vendors",
        currentActivity: "Low-cost clinic kiosks targeting obesity clinics",
        marketStatus: "Fragmented · price-led competition",
        opportunity: "Differentiate with clinical-grade body composition analytics",
        threatLevel: "Medium",
      },
      {
        id: `${countryId}-c4`,
        company: "Digital scale / wellness app providers",
        currentActivity: "Pharmacy channel partnerships for GLP-1 patients",
        marketStatus: "Emerging challengers",
        opportunity: "Integrate InBody data into pharmacy onboarding workflows",
        threatLevel: "Medium",
      },
      {
        id: `${countryId}-c5`,
        company: "Local compounders & distributors",
        currentActivity: "Alternative GLP-1 supply in self-pay segments",
        marketStatus: "Niche but visible in urban markets",
        opportunity: "Focus on regulated hospital channel with evidence-led positioning",
        threatLevel: "Low",
      },
    ],
    hospitals: [
      {
        id: `${countryId}-h1`,
        name: `${name} National University Hospital`,
        city: "Capital Metro",
        specialty: "Endocrinology & Obesity Medicine",
        glp1Experience: "Advanced · 2,400+ GLP-1 patients/year",
        researchActivity: "Active obesity pathway trials and KOL leadership",
      },
      {
        id: `${countryId}-h2`,
        name: "Metropolitan Obesity Center",
        city: "Primary Urban Hub",
        specialty: "Multidisciplinary Weight Management",
        glp1Experience: "High · integrated semaglutide program",
        researchActivity: "Publishing real-world body composition outcomes",
      },
      {
        id: `${countryId}-h3`,
        name: "Regional Diabetes & Metabolic Institute",
        city: "Secondary City",
        specialty: "Diabetes & Metabolic Surgery",
        glp1Experience: "Growing · T2D-led with obesity expansion",
        researchActivity: "Piloting device-assisted monitoring protocols",
      },
      {
        id: `${countryId}-h4`,
        name: "Private Tier-1 Medical Center",
        city: "Affluent District",
        specialty: "Executive Health & Obesity",
        glp1Experience: "Premium self-pay GLP-1 volume",
        researchActivity: "Limited formal trials; strong commercial potential",
      },
      {
        id: `${countryId}-h5`,
        name: "Community Hospital Network Hub",
        city: "Suburban Cluster",
        specialty: "Primary Care Obesity Referrals",
        glp1Experience: "Early-stage program launch",
        researchActivity: "Seeking standardized screening workflow partners",
      },
    ],
    kol: [
      {
        id: `${countryId}-k1`,
        name: "Prof. Leading National Obesity Society",
        institution: `${name} University Hospital`,
        specialty: "Obesity Medicine",
        influence: "National · Tier 1",
        focusAreas: "GLP-1 clinical pathways, payer advocacy, hospital integration",
      },
      {
        id: `${countryId}-k2`,
        name: "Dr. Metabolic Health Authority",
        institution: "Metropolitan Obesity Center",
        specialty: "Endocrinology",
        influence: "Regional · Tier 1",
        focusAreas: "Body composition outcomes, muscle preservation research",
      },
      {
        id: `${countryId}-k3`,
        name: "Prof. Diabetes & Obesity Research",
        institution: "National Research Institute",
        specialty: "Clinical Research",
        influence: "Academic · Tier 2",
        focusAreas: "Real-world evidence, device validation studies",
      },
      {
        id: `${countryId}-k4`,
        name: "Dr. Hospital Procurement Influencer",
        institution: "Tier-1 Private Hospital Group",
        specialty: "Hospital Administration",
        influence: "Commercial · Tier 2",
        focusAreas: "Obesity program ROI, device procurement committees",
      },
      {
        id: `${countryId}-k5`,
        name: "Prof. Public Health & Policy",
        institution: "National Health Policy Center",
        specialty: "Health Policy",
        influence: "Policy · Tier 2",
        focusAreas: "Reimbursement frameworks, population obesity strategy",
      },
    ],
    opportunities: [
      {
        id: `${countryId}-o1`,
        title: `InBody + GLP-1 Hospital Bundle — ${name}`,
        priority: 1,
        estimatedImpact: "$1.2M+ pipeline · 40 hospital placements",
        recommendedAction: "Schedule executive outreach with top 3 obesity centers within 30 days.",
        status: "Active",
      },
      {
        id: `${countryId}-o2`,
        title: "Pharmacy screening kiosk deployment",
        priority: 2,
        estimatedImpact: "150–300 device placements in retail channels",
        recommendedAction: "Identify top pharmacy chain wellness program leads.",
        status: "In Review",
      },
      {
        id: `${countryId}-o3`,
        title: "Telehealth metabolic monitoring integration",
        priority: 3,
        estimatedImpact: "$400K–800K ARR from platform partnerships",
        recommendedAction: "Shortlist telehealth partners with active GLP-1 volume.",
        status: "Pipeline",
      },
      {
        id: `${countryId}-o4`,
        title: "KOL advisory board for clinical evidence",
        priority: 2,
        estimatedImpact: "Accelerates 2–3 tier-1 hospital conversions",
        recommendedAction: "Invite top 5 KOLs to quarterly evidence review session.",
        status: "Active",
      },
      {
        id: `${countryId}-o5`,
        title: "Corporate wellness GLP-1 analytics pilot",
        priority: 4,
        estimatedImpact: "Enterprise contract pathway with benefits platforms",
        recommendedAction: "Validate with regional HR benefits consultants.",
        status: "Pipeline",
      },
    ],
  };
}
