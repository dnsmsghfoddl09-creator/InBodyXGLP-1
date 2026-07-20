import { COUNTRY_LIST, type CountryId } from "@/data/countries";

export type ThreatLevel = "High" | "Medium" | "Low";

export type PipelineStatus = "Approved" | "Phase III" | "Phase II" | "Phase I" | "Preclinical";

export type CompetitorCompanyId =
  | "novo-nordisk"
  | "eli-lilly"
  | "roche"
  | "amgen"
  | "structure-therapeutics"
  | "viking-therapeutics"
  | "hanmi-pharmaceutical"
  | "daewoong-pharmaceutical"
  | "hk-innon"
  | "inbody";

export const COMPETITOR_COMPANY_IDS: CompetitorCompanyId[] = [
  "novo-nordisk",
  "eli-lilly",
  "roche",
  "amgen",
  "structure-therapeutics",
  "viking-therapeutics",
  "hanmi-pharmaceutical",
  "daewoong-pharmaceutical",
  "hk-innon",
  "inbody",
];

export const COMPETITOR_PRIORITY_COUNTRIES: CountryId[] = [
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

export type CompetitorCompanyProfile = {
  id: CompetitorCompanyId;
  company: string;
  headquarters: string;
  marketFocus: string;
  companyOverview: string;
  glp1Pipeline: string;
  approvedProducts: string[];
  clinicalTrials: string;
  recentNews: string;
  marketExpansion: string;
  strategicPartnerships: string;
  financialHighlights: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  threatLevel: ThreatLevel;
  opportunityScore: number;
  recommendedAction: string;
  activeCountries: CountryId[];
  businessOpportunities: string[];
  latestActivity: string;
  marketStatus: string;
};

export type PipelineItem = {
  id: string;
  companyId: CompetitorCompanyId;
  name: string;
  phase: string;
  status: PipelineStatus;
  indication: string;
  country: CountryId;
};

export type CompetitorActivity = {
  id: string;
  companyId: CompetitorCompanyId;
  company: string;
  title: string;
  summary: string;
  activityType: string;
  publishedDate: string;
  country: CountryId;
  threatLevel: ThreatLevel;
  opportunityScore: number;
};

export type CompetitorPartnership = {
  id: string;
  companyId: CompetitorCompanyId;
  partner: string;
  focus: string;
  region: string;
  status: string;
  publishedDate: string;
};

export type CompetitorClinicalUpdate = {
  id: string;
  companyId: CompetitorCompanyId;
  trialName: string;
  phase: string;
  status: string;
  enrollment: string;
  country: CountryId;
  update: string;
  publishedDate: string;
};

const COMPANY_META: Record<
  CompetitorCompanyId,
  Omit<CompetitorCompanyProfile, "id" | "activeCountries" | "latestActivity">
> = {
  "novo-nordisk": {
    company: "Novo Nordisk",
    headquarters: "Bagsvaerd, Denmark",
    marketFocus: "Global GLP-1 market leader · obesity and diabetes",
    companyOverview:
      "Dominant GLP-1 franchise with Wegovy and Ozempic driving hospital and pharmacy channel expansion worldwide.",
    glp1Pipeline: "Oral semaglutide, amylin combinations, next-gen obesity assets",
    approvedProducts: ["Wegovy", "Ozempic", "Rybelsus"],
    clinicalTrials: "12 active obesity and T2D trials across APAC and North America",
    recentNews: "APAC supply expansion and hospital partnership acceleration in Korea and Japan",
    marketExpansion: "Prioritizing tier-1 hospital obesity pathways in APAC and Middle East",
    strategicPartnerships: "Digital health bundles with pharmacy chains and telehealth platforms",
    financialHighlights: "GLP-1 revenue +34% YoY · obesity segment outpacing diabetes",
    swot: {
      strengths: ["Category leadership", "Manufacturing scale", "KOL network depth"],
      weaknesses: ["Supply constraints in emerging markets", "Premium pricing pressure"],
      opportunities: ["Hospital co-placement programs", "Primary care oral GLP-1 shift"],
      threats: ["Fast-follower tirzepatide volume", "Local device bundling rivals"],
    },
    threatLevel: "High",
    opportunityScore: 88,
    recommendedAction:
      "Position InBody as outcomes partner in Novo hospital programs before device standards are set.",
    businessOpportunities: [
      "Co-branded body composition monitoring in tier-1 obesity centers",
      "Evidence packages for muscle preservation during Wegovy therapy",
    ],
    marketStatus: "Market leader · ~38% global GLP-1 share",
  },
  "eli-lilly": {
    company: "Eli Lilly",
    headquarters: "Indianapolis, USA",
    marketFocus: "Fastest-growing GLP-1/GIP portfolio · Mounjaro and Zepbound",
    companyOverview:
      "Aggressive volume growth with tirzepatide and advancing oral GLP-1 pipeline reshaping competitive dynamics.",
    glp1Pipeline: "Orforglipron oral GLP-1, retatrutide triple agonist, next-wave combinations",
    approvedProducts: ["Mounjaro", "Zepbound"],
    clinicalTrials: "9 late-stage obesity and cardiometabolic trials with APAC sites",
    recentNews: "Oral GLP-1 Phase III readout accelerates primary care positioning",
    marketExpansion: "Retail pharmacy and employer channel expansion in US and Japan",
    strategicPartnerships: "Pharmacy wellness integrations and payer outcomes contracts",
    financialHighlights: "Mounjaro Rx growth +40% YoY in key markets",
    swot: {
      strengths: ["Superior efficacy narrative", "Oral pipeline timing", "US channel dominance"],
      weaknesses: ["Hospital workflow less mature vs Novo in APAC"],
      opportunities: ["Lilly + device evidence partnerships", "Employer metabolic programs"],
      threats: ["Novo supply recovery in APAC", "Pricing negotiations with payers"],
    },
    threatLevel: "High",
    opportunityScore: 91,
    recommendedAction:
      "Prepare Lilly partnership brief highlighting InBody lean mass data for outcomes-based contracts.",
    businessOpportunities: [
      "Lilly account team outreach for metabolic monitoring pilots",
      "Pharmacy channel screening kiosk bundles",
    ],
    marketStatus: "Fastest growth · ~22% share",
  },
  roche: {
    company: "Roche",
    headquarters: "Basel, Switzerland",
    marketFocus: "Diagnostics-led metabolic health · obesity adjacency",
    companyOverview:
      "Leveraging diagnostics footprint to enter obesity management ecosystems with integrated monitoring plays.",
    glp1Pipeline: "CT-996 oral GLP-1, combination metabolic assets",
    approvedProducts: ["Diagnostic ecosystem (no GLP-1 brand yet)"],
    clinicalTrials: "4 obesity-linked metabolic trials with companion diagnostics focus",
    recentNews: "Roche exploring GLP-1 companion diagnostic partnerships in EU hospitals",
    marketExpansion: "Germany, UK, and France hospital metabolic institutes",
    strategicPartnerships: "Hospital lab networks and EMR analytics vendors",
    financialHighlights: "Diagnostics division stable · obesity venture investments rising",
    swot: {
      strengths: ["Hospital trust", "Lab integration", "EU KOL access"],
      weaknesses: ["Late GLP-1 entrant", "Limited obesity brand recognition"],
      opportunities: ["InBody + lab workflow integration", "Hospital bundle RFPs"],
      threats: ["Novo/Lilly hospital lock-in", "Standalone BIA vendors"],
    },
    threatLevel: "Medium",
    opportunityScore: 74,
    recommendedAction: "Engage Roche diagnostics teams on combined body composition + lab reporting.",
    businessOpportunities: ["EU hospital metabolic bundle pilots"],
    marketStatus: "Emerging challenger · diagnostics-led",
  },
  amgen: {
    company: "Amgen",
    headquarters: "Thousand Oaks, USA",
    marketFocus: "Maridebart cafraglutide and obesity pipeline rebuild",
    companyOverview:
      "Re-entering obesity with MariTide and exploring differentiated long-acting formulations.",
    glp1Pipeline: "Maridebart cafraglutide (MariTide), monthly dosing candidates",
    approvedProducts: ["Pipeline-stage obesity assets"],
    clinicalTrials: "6 Phase II/III obesity trials including muscle preservation endpoints",
    recentNews: "MariTide Phase II data highlights lean mass considerations",
    marketExpansion: "US and Japan priority launches under evaluation",
    strategicPartnerships: "Academic obesity centers and digital adherence platforms",
    financialHighlights: "R&D reinvestment in obesity after cardiovascular portfolio maturity",
    swot: {
      strengths: ["Monthly dosing differentiation", "Strong clinical ops"],
      weaknesses: ["Late market entry", "Limited GLP-1 commercial infrastructure"],
      opportunities: ["Muscle preservation endpoint alignment with InBody"],
      threats: ["Entrenched Novo/Lilly prescriber habits"],
    },
    threatLevel: "Medium",
    opportunityScore: 79,
    recommendedAction: "Track MariTide endpoints and offer InBody as lean mass validation partner.",
    businessOpportunities: ["Clinical endpoint support for Amgen trials"],
    marketStatus: "Pipeline challenger · pre-launch",
  },
  "structure-therapeutics": {
    company: "Structure Therapeutics",
    headquarters: "Shanghai / San Diego",
    marketFocus: "Oral small-molecule GLP-1 · GSBR-1290",
    companyOverview: "Oral GLP-1 challenger targeting primary care and emerging APAC markets.",
    glp1Pipeline: "GSBR-1290 oral GLP-1, follow-on oral combinations",
    approvedProducts: ["None approved"],
    clinicalTrials: "3 oral GLP-1 trials with China and US enrollment",
    recentNews: "China NMPA interactions advance oral GLP-1 clinic workflow planning",
    marketExpansion: "China, Singapore, and US primary care networks",
    strategicPartnerships: "Telehealth prescribers and clinic management platforms",
    financialHighlights: "Biotech funding focused on Phase III oral GLP-1 execution",
    swot: {
      strengths: ["Oral convenience", "APAC clinical footprint"],
      weaknesses: ["Limited commercial scale", "Regulatory uncertainty"],
      opportunities: ["Clinic screening device partnerships at scale"],
      threats: ["Lilly orforglipron timing", "Hospital preference for injectables"],
    },
    threatLevel: "Medium",
    opportunityScore: 72,
    recommendedAction: "Monitor China clinic pathway pilots for device integration entry points.",
    businessOpportunities: ["Primary care screening bundles in China pilots"],
    marketStatus: "Emerging oral GLP-1 challenger",
  },
  "viking-therapeutics": {
    company: "Viking Therapeutics",
    headquarters: "San Diego, USA",
    marketFocus: "Dual agonist VK2735 · obesity pipeline",
    companyOverview: "Mid-cap biotech advancing VK2735 with competitive weight loss efficacy signals.",
    glp1Pipeline: "VK2735 dual agonist, oral follow-on formulations",
    approvedProducts: ["None approved"],
    clinicalTrials: "2 Phase II obesity trials with US sites",
    recentNews: "VK2735 Phase II enrollment completes ahead of schedule",
    marketExpansion: "US-focused with partnership licensing discussions in APAC",
    strategicPartnerships: "Seeking regional commercial partners in Asia",
    financialHighlights: "Cash runway aligned to Phase III initiation",
    swot: {
      strengths: ["Strong early efficacy", "Partnership optionality"],
      weaknesses: ["No commercial infrastructure", "Single-asset risk"],
      opportunities: ["Early partnership on monitoring endpoints"],
      threats: ["Big pharma oral GLP-1 timing"],
    },
    threatLevel: "Low",
    opportunityScore: 65,
    recommendedAction: "Add to watchlist; engage if APAC licensing partner emerges.",
    businessOpportunities: ["Trial site body composition substudy support"],
    marketStatus: "Phase II biotech challenger",
  },
  "hanmi-pharmaceutical": {
    company: "Hanmi Pharmaceutical",
    headquarters: "Seoul, South Korea",
    marketFocus: "APAC GLP-1 partnerships and metabolic pipeline",
    companyOverview: "Korea-based pharma with GLP-1 licensing and regional commercialization strategy.",
    glp1Pipeline: "Licensed GLP-1 assets, fixed-dose combinations for APAC",
    approvedProducts: ["Regional metabolic portfolio"],
    clinicalTrials: "5 APAC obesity and T2D trials with Korean lead sites",
    recentNews: "Hanmi expands hospital KOL program for GLP-1 launch readiness in Korea",
    marketExpansion: "Korea, Japan, and Southeast Asia hospital channels",
    strategicPartnerships: "Korean hospital groups and CJ healthcare networks",
    financialHighlights: "APAC licensing milestones driving R&D spend",
    swot: {
      strengths: ["Local hospital access", "MFDS regulatory experience"],
      weaknesses: ["Global brand limited vs multinationals"],
      opportunities: ["InBody Korea co-placement in Hanmi-led programs"],
      threats: ["Novo/Lilly direct hospital contracts"],
    },
    threatLevel: "Medium",
    opportunityScore: 84,
    recommendedAction: "Coordinate with Korea subsidiary for Hanmi hospital pathway meetings.",
    businessOpportunities: ["Korea tier-1 hospital bundle with Hanmi KOLs"],
    marketStatus: "Regional APAC challenger · Korea-led",
  },
  "daewoong-pharmaceutical": {
    company: "Daewoong Pharmaceutical",
    headquarters: "Seoul, South Korea",
    marketFocus: "Obesity care distribution and clinic channel in Korea",
    companyOverview: "Commercial strength in Korea with growing obesity clinic and pharmacy presence.",
    glp1Pipeline: "Metabolic combinations and licensed incretin assets",
    approvedProducts: ["Regional metabolic brands"],
    clinicalTrials: "3 real-world obesity program studies in Korea",
    recentNews: "Daewoong clinic network pilots GLP-1 patient onboarding with digital scales",
    marketExpansion: "Korea nationwide clinic expansion",
    strategicPartnerships: "Pharmacy chains and aesthetic clinic networks",
    financialHighlights: "Obesity segment growth in domestic portfolio",
    swot: {
      strengths: ["Clinic channel density", "Domestic commercial team"],
      weaknesses: ["Limited global pipeline scale"],
      opportunities: ["Replace scale vendors with InBody in onboarding flows"],
      threats: ["Low-cost device commoditization"],
    },
    threatLevel: "Medium",
    opportunityScore: 80,
    recommendedAction: "Pitch InBody clinic onboarding integration to Daewoong channel team.",
    businessOpportunities: ["Clinic onboarding bundle in Korea"],
    marketStatus: "Commercial challenger · clinic-led",
  },
  "hk-innon": {
    company: "HK inno.N",
    headquarters: "Seongnam, South Korea",
    marketFocus: "Incretin pipeline and Korea-Japan metabolic partnerships",
    companyOverview: "Korean innovator pursuing GLP-1 class partnerships and regional trials.",
    glp1Pipeline: "Incretin analogs, combination therapies for obesity",
    approvedProducts: ["Metabolic portfolio in development"],
    clinicalTrials: "4 Phase I/II trials in Korea and Japan",
    recentNews: "HK inno.N signs research collaboration with Japanese obesity institute",
    marketExpansion: "Korea and Japan academic hospital networks",
    strategicPartnerships: "University hospitals and CRO metabolic networks",
    financialHighlights: "R&D partnership funding for incretin platform",
    swot: {
      strengths: ["Academic partnerships", "Japan-Korea bridge"],
      weaknesses: ["Early-stage pipeline", "Limited commercial reach"],
      opportunities: ["Joint evidence generation with InBody at trial sites"],
      threats: ["Multinational site competition for KOL attention"],
    },
    threatLevel: "Low",
    opportunityScore: 70,
    recommendedAction: "Support trial sites with body composition substudy proposals.",
    businessOpportunities: ["Academic hospital evidence partnerships"],
    marketStatus: "Regional innovator · early pipeline",
  },
  inbody: {
    company: "InBody",
    headquarters: "Seoul, South Korea",
    marketFocus: "Body composition intelligence · GLP-1 monitoring benchmark",
    companyOverview:
      "Internal benchmark for hospital/clinic device placement, muscle preservation evidence, and payer ROI narratives.",
    glp1Pipeline: "N/A — device and analytics platform",
    approvedProducts: ["InBody BIA devices", "LookinBody analytics"],
    clinicalTrials: "Supporting 8 collaborative obesity monitoring studies globally",
    recentNews: "InBody GLP-1 hospital bundle pilots expand in Korea and Japan",
    marketExpansion: "APAC tier-1 hospitals, US obesity centers, EU metabolic institutes",
    strategicPartnerships: "Hospital obesity pathways, pharmacy wellness, payer pilots",
    financialHighlights: "GLP-1 segment pipeline +28% YoY in active hospital accounts",
    swot: {
      strengths: ["Clinical-grade body composition", "Global installed base", "GLP-1 narrative fit"],
      weaknesses: ["Capital budget competition with drug access", "Pharmacy price sensitivity"],
      opportunities: ["First-mover hospital bundles", "Pharmacy screening kiosks"],
      threats: ["Low-cost BIA vendors", "Drug makers bundling digital tools"],
    },
    threatLevel: "Low",
    opportunityScore: 95,
    recommendedAction: "Execute Q3 priority hospital conversions in Korea, Japan, and US.",
    businessOpportunities: [
      "Hospital GLP-1 bundle standardization",
      "Pharmacy channel screening deployment",
    ],
    marketStatus: "Internal benchmark · strategic priority",
  },
};

function countryName(id: CountryId): string {
  return COUNTRY_LIST.find((c) => c.id === id)?.name ?? id;
}

function pick<T>(items: readonly T[], index: number): T {
  return items[index % items.length]!;
}

function isoDate(daysAgo: number): string {
  const date = new Date("2026-07-01");
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

function buildProfiles(): CompetitorCompanyProfile[] {
  return COMPETITOR_COMPANY_IDS.map((id, index) => {
    const meta = COMPANY_META[id];
    const activeCountries = Array.from(
      new Set([
        ...COMPETITOR_PRIORITY_COUNTRIES.slice(index % 5, (index % 5) + 4),
        ...COMPETITOR_PRIORITY_COUNTRIES.slice(0, 3),
      ]),
    ).slice(0, 6) as CountryId[];

    return {
      id,
      ...meta,
      activeCountries,
      latestActivity: `${meta.recentNews} (${countryName(pick(activeCountries, index))})`,
    };
  });
}

function buildPipeline(): PipelineItem[] {
  const phases: PipelineStatus[] = ["Approved", "Phase III", "Phase II", "Phase I", "Preclinical"];
  const indications = ["Obesity", "T2D", "NAFLD", "Cardiometabolic", "Muscle preservation"];

  return Array.from({ length: 30 }, (_, index) => {
    const companyId = pick(COMPETITOR_COMPANY_IDS, index);
    const status = pick(phases, index);

    return {
      id: `pipeline-${index + 1}`,
      companyId,
      name: `${COMPANY_META[companyId].company} metabolic candidate ${(index % 3) + 1}`,
      phase: status === "Approved" ? "Marketed" : status,
      status,
      indication: pick(indications, index),
      country: pick(COMPETITOR_PRIORITY_COUNTRIES, index + 2),
    };
  });
}

function buildActivities(): CompetitorActivity[] {
  const types = ["Market Expansion", "Clinical Trial", "Partnership", "Pricing", "Regulatory", "Product Launch"];

  return Array.from({ length: 50 }, (_, index) => {
    const companyId = pick(COMPETITOR_COMPANY_IDS, index);
    const profile = COMPANY_META[companyId];
    const country = pick(COMPETITOR_PRIORITY_COUNTRIES, index);
    const threatLevel = pick(["High", "Medium", "Low"] as const, index + profile.opportunityScore);

    return {
      id: `activity-${index + 1}`,
      companyId,
      company: profile.company,
      title: `${profile.company} ${pick(types, index).toLowerCase()} update in ${countryName(country)}`,
      summary: `${profile.company} activity affecting GLP-1 competitive positioning and InBody placement strategy in ${countryName(country)}.`,
      activityType: pick(types, index),
      publishedDate: isoDate(index + 1),
      country,
      threatLevel,
      opportunityScore: Math.max(55, profile.opportunityScore - (index % 7)),
    };
  });
}

function buildPartnerships(): CompetitorPartnership[] {
  const partners = ["CVS Health", "Teladoc", "Mayo Clinic Network", "Apollo Hospitals", "Walgreens", "Ping An Health"];

  return Array.from({ length: 20 }, (_, index) => {
    const companyId = pick(COMPETITOR_COMPANY_IDS, index);
    return {
      id: `partnership-${index + 1}`,
      companyId,
      partner: pick(partners, index),
      focus: "GLP-1 patient onboarding and metabolic monitoring",
      region: countryName(pick(COMPETITOR_PRIORITY_COUNTRIES, index)),
      status: pick(["Active", "Signed", "In Negotiation"], index),
      publishedDate: isoDate(index * 3 + 2),
    };
  });
}

function buildClinicalUpdates(): CompetitorClinicalUpdate[] {
  return Array.from({ length: 20 }, (_, index) => {
    const companyId = pick(COMPETITOR_COMPANY_IDS, index);
    return {
      id: `clinical-${index + 1}`,
      companyId,
      trialName: `${COMPANY_META[companyId].company} obesity outcomes study ${index + 1}`,
      phase: pick(["Phase I", "Phase II", "Phase III", "Phase IV"], index),
      status: pick(["Recruiting", "Active", "Completed", "Planning"], index),
      enrollment: `${400 + index * 120} patients`,
      country: pick(COMPETITOR_PRIORITY_COUNTRIES, index + 1),
      update: "Lean mass and body composition secondary endpoints included.",
      publishedDate: isoDate(index * 2 + 1),
    };
  });
}

let profilesCache: CompetitorCompanyProfile[] | null = null;
let pipelineCache: PipelineItem[] | null = null;
let activitiesCache: CompetitorActivity[] | null = null;
let partnershipsCache: CompetitorPartnership[] | null = null;
let clinicalCache: CompetitorClinicalUpdate[] | null = null;

export function getAllCompetitorProfiles(): CompetitorCompanyProfile[] {
  profilesCache ??= buildProfiles();
  return profilesCache;
}

export function getAllPipelineItems(): PipelineItem[] {
  pipelineCache ??= buildPipeline();
  return pipelineCache;
}

export function getAllCompetitorActivities(): CompetitorActivity[] {
  activitiesCache ??= buildActivities();
  return activitiesCache;
}

export function getAllCompetitorPartnerships(): CompetitorPartnership[] {
  partnershipsCache ??= buildPartnerships();
  return partnershipsCache;
}

export function getAllCompetitorClinicalUpdates(): CompetitorClinicalUpdate[] {
  clinicalCache ??= buildClinicalUpdates();
  return clinicalCache;
}

export function getCountryName(id: CountryId): string {
  return countryName(id);
}
