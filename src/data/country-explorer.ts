import { COUNTRY_LIST, type CountryId } from "@/data/countries";

export { COUNTRY_LIST, type CountryId };

export type BusinessOpportunity = {
  title: string;
  description: string;
  businessImpact: string;
  difficulty: "Low" | "Medium" | "High";
  priority: 1 | 2 | 3 | 4 | 5;
  recommendedAction: string;
};

export type CountryReport = {
  id: CountryId;
  name: string;
  flag: string;
  region: string;
  overview: {
    population: string;
    obesityPrevalence: string;
    glp1MarketMaturity: string;
    marketGrowth: string;
    opportunityScore: number;
  };
  regulation: {
    approvedProducts: string[];
    approvedIndications: string[];
    prescribers: string;
    prescriptionRestrictions: string;
    offLabelStatus: string;
    recentUpdates: string[];
  };
  insurance: {
    coverage: string;
    publicInsurance: string;
    privateInsurance: string;
    outOfPocket: string;
    monthlyPatientCost: string;
  };
  treatmentEcosystem: {
    hospitals: string;
    clinics: string;
    pharmacies: string;
    telemedicine: string;
    weightManagementCenters: string;
  };
  consumerInsights: {
    awareness: string;
    socialMediaInterest: string;
    concerns: string[];
    popularKeywords: string[];
    searchTrends: string;
  };
  competitorLandscape: {
    novoNordisk: string;
    lilly: string;
    localCompetitors: string[];
    marketLeaders: string[];
    competitiveActivity: string;
  };
  digitalHealth: {
    obesityApps: string[];
    patientCommunities: string[];
    onlineConsultation: string[];
    remoteMonitoring: string;
  };
  kol: {
    topHospitals: string[];
    leadingProfessors: string[];
    medicalSocieties: string[];
    majorConferences: string[];
  };
  businessOpportunities: BusinessOpportunity[];
  aiStrategy: {
    whyMatters: string;
    whyNow: string;
    recommendedActions: string[];
    potentialRisks: string[];
  };
};

type CountrySeed = {
  population: string;
  obesity: string;
  maturity: "Emerging" | "Developing" | "Mature" | "Advanced";
  growth: string;
  score: number;
  monthlyCost: string;
  coverage: "Limited" | "Partial" | "Broad" | "Comprehensive";
  awareness: "Low" | "Moderate" | "High" | "Very High";
};

const SEEDS: Record<CountryId, CountrySeed> = {
  "south-korea": { population: "51.7M", obesity: "38.4%", maturity: "Developing", growth: "+22% YoY", score: 91, monthlyCost: "₩280,000–450,000", coverage: "Partial", awareness: "High" },
  japan: { population: "124.8M", obesity: "33.2%", maturity: "Developing", growth: "+18% YoY", score: 88, monthlyCost: "¥45,000–80,000", coverage: "Partial", awareness: "High" },
  china: { population: "1.41B", obesity: "34.3%", maturity: "Emerging", growth: "+31% YoY", score: 85, monthlyCost: "¥1,200–2,800", coverage: "Limited", awareness: "Moderate" },
  taiwan: { population: "23.6M", obesity: "27.8%", maturity: "Developing", growth: "+16% YoY", score: 79, monthlyCost: "NT$12,000–22,000", coverage: "Partial", awareness: "Moderate" },
  singapore: { population: "5.9M", obesity: "29.1%", maturity: "Mature", growth: "+14% YoY", score: 82, monthlyCost: "S$800–1,400", coverage: "Broad", awareness: "High" },
  thailand: { population: "71.8M", obesity: "42.3%", maturity: "Emerging", growth: "+19% YoY", score: 74, monthlyCost: "฿8,000–15,000", coverage: "Limited", awareness: "Moderate" },
  vietnam: { population: "99.5M", obesity: "19.4%", maturity: "Emerging", growth: "+24% YoY", score: 71, monthlyCost: "₫3.5M–6M", coverage: "Limited", awareness: "Low" },
  indonesia: { population: "277.5M", obesity: "21.8%", maturity: "Emerging", growth: "+26% YoY", score: 76, monthlyCost: "Rp 2.5M–4.5M", coverage: "Limited", awareness: "Moderate" },
  malaysia: { population: "34.3M", obesity: "45.6%", maturity: "Developing", growth: "+17% YoY", score: 77, monthlyCost: "RM 1,200–2,200", coverage: "Partial", awareness: "Moderate" },
  philippines: { population: "115.6M", obesity: "37.2%", maturity: "Emerging", growth: "+21% YoY", score: 70, monthlyCost: "₱18,000–32,000", coverage: "Limited", awareness: "Moderate" },
  india: { population: "1.43B", obesity: "22.9%", maturity: "Emerging", growth: "+28% YoY", score: 83, monthlyCost: "₹8,000–18,000", coverage: "Limited", awareness: "Moderate" },
  australia: { population: "26.6M", obesity: "31.7%", maturity: "Mature", growth: "+15% YoY", score: 80, monthlyCost: "A$600–1,100", coverage: "Broad", awareness: "Very High" },
  usa: { population: "335.9M", obesity: "41.9%", maturity: "Advanced", growth: "+12% YoY", score: 86, monthlyCost: "$900–1,400", coverage: "Broad", awareness: "Very High" },
  canada: { population: "40.1M", obesity: "29.4%", maturity: "Mature", growth: "+13% YoY", score: 78, monthlyCost: "C$950–1,350", coverage: "Partial", awareness: "High" },
  uk: { population: "67.8M", obesity: "28.0%", maturity: "Mature", growth: "+11% YoY", score: 75, monthlyCost: "£250–450", coverage: "Partial", awareness: "High" },
  germany: { population: "84.4M", obesity: "24.3%", maturity: "Mature", growth: "+10% YoY", score: 77, monthlyCost: "€280–520", coverage: "Broad", awareness: "High" },
  france: { population: "68.4M", obesity: "17.1%", maturity: "Developing", growth: "+9% YoY", score: 72, monthlyCost: "€220–400", coverage: "Partial", awareness: "Moderate" },
  italy: { population: "58.9M", obesity: "21.0%", maturity: "Developing", growth: "+10% YoY", score: 73, monthlyCost: "€240–430", coverage: "Partial", awareness: "Moderate" },
  spain: { population: "47.8M", obesity: "23.8%", maturity: "Developing", growth: "+11% YoY", score: 74, monthlyCost: "€230–410", coverage: "Partial", awareness: "Moderate" },
  brazil: { population: "216.4M", obesity: "26.8%", maturity: "Developing", growth: "+20% YoY", score: 78, monthlyCost: "R$800–1,500", coverage: "Partial", awareness: "Moderate" },
  mexico: { population: "130.9M", obesity: "36.4%", maturity: "Developing", growth: "+19% YoY", score: 76, monthlyCost: "MX$3,500–6,500", coverage: "Limited", awareness: "Moderate" },
  "saudi-arabia": { population: "36.9M", obesity: "40.2%", maturity: "Developing", growth: "+23% YoY", score: 81, monthlyCost: "SAR 2,800–4,500", coverage: "Partial", awareness: "High" },
  uae: { population: "9.5M", obesity: "32.7%", maturity: "Mature", growth: "+18% YoY", score: 84, monthlyCost: "AED 2,500–4,000", coverage: "Broad", awareness: "High" },
};

function buildOpportunities(name: string, score: number): BusinessOpportunity[] {
  const p = (n: 1 | 2 | 3 | 4 | 5) => n;
  return [
    {
      title: `InBody + GLP-1 Clinic Bundle — ${name}`,
      description: "Integrate body composition monitoring into obesity clinic workflows for prescription adherence and outcomes reporting.",
      businessImpact: score >= 85 ? "Est. $1.2M ARR from 40 clinic deployments" : "Est. $400K–800K ARR from pilot network",
      difficulty: score >= 85 ? "Medium" : "Low",
      priority: p(1),
      recommendedAction: "Identify top 5 obesity centers for co-branded pilot within 60 days.",
    },
    {
      title: "Hospital Metabolic Pathway Partnership",
      description: "Embed InBody devices in hospital GLP-1 initiation and monitoring protocols.",
      businessImpact: "Unlocks tier-1 hospital contracts and recurring device + software revenue.",
      difficulty: "High",
      priority: p(2),
      recommendedAction: "Map hospital obesity programs and schedule KOL-led clinical briefings.",
    },
    {
      title: "Telehealth Monitoring Integration",
      description: "White-label body composition data for telehealth platforms prescribing GLP-1.",
      businessImpact: "Expands addressable market beyond in-clinic screening touchpoints.",
      difficulty: "Medium",
      priority: p(3),
      recommendedAction: "Shortlist 3 telehealth partners with active GLP-1 patient volume.",
    },
    {
      title: "Corporate Wellness GLP-1 Analytics",
      description: "B2B dashboard for employers and insurers tracking metabolic health outcomes.",
      businessImpact: "Enterprise contracts with benefits platforms and payer networks.",
      difficulty: "High",
      priority: p(4),
      recommendedAction: "Validate with regional benefits consultants and pilot one employer program.",
    },
    {
      title: "Pharmacy Channel Screening Kiosk",
      description: "Deploy InBody kiosks at high-volume pharmacy chains for GLP-1 patient onboarding.",
      businessImpact: "High-visibility consumer touchpoint; drives brand awareness and data capture.",
      difficulty: "Medium",
      priority: p(5),
      recommendedAction: "Engage top pharmacy chain wellness program leads for feasibility study.",
    },
  ];
}

function buildReport(country: (typeof COUNTRY_LIST)[number]): CountryReport {
  const seed = SEEDS[country.id];
  const { name, flag, region, id } = country;

  const maturityLabel = seed.maturity;
  const coverageMap = {
    Limited: { pub: "Minimal public reimbursement", priv: "Select private plans cover obesity drugs", oop: "Predominantly out-of-pocket" },
    Partial: { pub: "Partial public coverage for T2D; obesity expanding", priv: "Growing employer plan coverage", oop: "Mixed — 40–60% self-pay" },
    Broad: { pub: "Broad coverage for eligible patients", priv: "Strong private insurance uptake", oop: "Moderate co-pay structures" },
    Comprehensive: { pub: "Comprehensive public reimbursement", priv: "Universal supplementary options", oop: "Low out-of-pocket for approved indications" },
  }[seed.coverage];

  return {
    id,
    name,
    flag,
    region,
    overview: {
      population: seed.population,
      obesityPrevalence: seed.obesity,
      glp1MarketMaturity: maturityLabel,
      marketGrowth: seed.growth,
      opportunityScore: seed.score,
    },
    regulation: {
      approvedProducts: ["Wegovy (semaglutide)", "Ozempic (semaglutide)", "Mounjaro (tirzepatide)", id === "china" ? "Benaglutide (local)" : "Rybelsus (oral semaglutide)"].slice(0, id === "china" || id === "india" ? 3 : 4),
      approvedIndications: ["Type 2 diabetes", seed.maturity !== "Emerging" ? "Chronic weight management" : "Obesity (limited access)"],
      prescribers: seed.maturity === "Advanced" ? "Primary care, endocrinologists, obesity medicine specialists" : "Endocrinologists, obesity specialists; primary care expanding",
      prescriptionRestrictions: seed.coverage === "Limited" ? "BMI ≥30 or ≥27 with comorbidities; limited specialist access" : "BMI thresholds apply; prior authorization common",
      offLabelStatus: seed.maturity === "Emerging" ? "Off-label use monitored; regulatory scrutiny increasing" : "Off-label prescribing declining as obesity labels expand",
      recentUpdates: [
        `${name} health authority reviewing expanded obesity drug reimbursement`,
        "Oral GLP-1 formulations under priority review in multiple markets",
        seed.score >= 85 ? "Fast-track pathway announced for obesity device + drug combination studies" : "Updated clinical guidelines emphasize body composition monitoring",
      ],
    },
    insurance: {
      coverage: seed.coverage,
      publicInsurance: coverageMap.pub,
      privateInsurance: coverageMap.priv,
      outOfPocket: coverageMap.oop,
      monthlyPatientCost: seed.monthlyCost,
    },
    treatmentEcosystem: {
      hospitals: seed.score >= 85 ? "Strong — 120+ tier-1 hospitals with obesity programs" : seed.score >= 75 ? "Growing — 40–80 hospital-based programs" : "Emerging — limited dedicated obesity centers",
      clinics: seed.maturity !== "Emerging" ? "High density of private obesity and endocrinology clinics" : "Concentrated in major metropolitan areas",
      pharmacies: seed.maturity === "Advanced" ? "Retail pharmacy is primary dispensing channel" : "Hospital pharmacy dominant; retail expanding rapidly",
      telemedicine: seed.awareness === "Very High" || seed.awareness === "High" ? "Mature telehealth GLP-1 platforms with 15%+ Rx share" : "Early-stage telehealth adoption; high growth potential",
      weightManagementCenters: seed.score >= 80 ? "Established network of commercial weight management chains" : "Fragmented; partnership opportunity for standardized programs",
    },
    consumerInsights: {
      awareness: `${seed.awareness} — ${seed.awareness === "Very High" ? "Wegovy/Mounjaro household name recognition" : seed.awareness === "High" ? "Strong branded drug awareness in urban populations" : "Growing awareness via social media and KOL content"}`,
      socialMediaInterest: seed.awareness === "Very High" ? "+45% YoY GLP-1 related mentions" : `+${18 + (seed.score % 15)}% YoY social media volume`,
      concerns: ["Muscle loss during rapid weight reduction", "Long-term affordability and insurance access", "Side effect management (GI, nausea)", "Authenticity of compounded alternatives"],
      popularKeywords: ["GLP-1 weight loss", "Wegovy alternative", "body composition", "Ozempic face", `${name.split(" ")[0]} obesity clinic`],
      searchTrends: seed.growth.replace(" YoY", " increase in GLP-1 related search queries"),
    },
    competitorLandscape: {
      novoNordisk: seed.maturity === "Advanced" ? "Market leader — Wegovy/Ozempic dominant share (~42%)" : "Leading share (~35–40%); supply constraints easing in APAC",
      lilly: `Fastest growth — Mounjaro capturing ${seed.maturity === "Advanced" ? "28%" : "15–22%"} share`,
      localCompetitors: id === "china" ? ["Innovent Biologics", "Huadong Medicine"] : id === "india" ? ["Biocon", "Sun Pharma (biosimilars)"] : id === "japan" ? ["Takeda (partnerships)", "Local compounders"] : ["Regional pharma distributors", "Compounding pharmacies"],
      marketLeaders: ["Novo Nordisk", "Eli Lilly", ...(seed.maturity === "Emerging" ? ["Local generics"] : ["Amgen (pipeline)"])],
      competitiveActivity: seed.score >= 85 ? "Intense — both MNCs investing in direct-to-clinic programs and KOL engagement" : "Accelerating — new market entrants and oral GLP-1 launches expected within 18 months",
    },
    digitalHealth: {
      obesityApps: ["Noom", "MyFitnessPal", region === "APAC" ? "Kakao Health (KR)" : "Lose It!", "Cal AI"],
      patientCommunities: ["Reddit r/Ozempic", "Facebook GLP-1 support groups", region === "APAC" ? "Local LINE/Kakao communities" : "Discord wellness channels"],
      onlineConsultation: ["Teladoc", region === "APAC" ? "Doctor Now" : "Ro", "PlushCare", "Local telehealth platforms"],
      remoteMonitoring: seed.score >= 80 ? "Growing demand for connected scales and body composition devices" : "Early adoption; InBody differentiation opportunity in remote monitoring",
    },
    kol: {
      topHospitals: id === "south-korea" ? ["Seoul National University Hospital", "Samsung Medical Center", "Asan Medical Center"] : id === "japan" ? ["Univ. of Tokyo Hospital", "St. Luke's International", "Osaka Univ. Hospital"] : id === "usa" ? ["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins"] : [`Leading ${name} university hospital`, `National obesity center`, `Tier-1 metabolic institute`],
      leadingProfessors: id === "south-korea" ? ["Prof. Kim (SNU Endocrinology)", "Dr. Park (Obesity Medicine)"] : id === "japan" ? ["Prof. Tanaka (Univ. of Tokyo)", "Dr. Suzuki (Obesity Research)"] : [`Dr. leading national obesity society`, `Prof. metabolic health authority`],
      medicalSocieties: region === "APAC" ? ["Asian Association for the Study of Obesity", "Local Endocrine Society"] : region === "EMEA" ? ["EASO", "National Diabetes Association"] : ["Obesity Medicine Association", "American Diabetes Association"],
      majorConferences: ["ADA Scientific Sessions", region === "APAC" ? "AOCO" : "ObesityWeek", "EASD", `National ${name} obesity symposium`],
    },
    businessOpportunities: buildOpportunities(name, seed.score),
    aiStrategy: {
      whyMatters: `${name} represents a ${seed.score >= 85 ? "priority" : "strategic"} market with ${seed.population} population, ${seed.obesity} obesity prevalence, and ${seed.growth} GLP-1 market growth. InBody's body composition monitoring directly addresses the #1 patient and physician concern — muscle preservation during GLP-1-mediated weight loss.`,
      whyNow: `GLP-1 market maturity is ${maturityLabel.toLowerCase()} with ${seed.coverage.toLowerCase()} insurance coverage creating a ${seed.coverage === "Limited" ? "self-pay driven" : "rapidly expanding"} patient pool. ${seed.score >= 85 ? "First-mover advantage in hospital and clinic integration is available for the next 6–9 months." : "Competitive window open before oral GLP-1 formulations reshape the channel landscape."}`,
      recommendedActions: [
        `Deploy subsidiary-led hospital outreach targeting top 5 obesity programs in ${name}`,
        "Publish localized clinical evidence brief: GLP-1 + body composition monitoring outcomes",
        seed.score >= 85 ? "Launch pilot with 3 tier-1 hospitals within Q3" : "Conduct market sizing workshop with regional BD team",
        "Engage leading KOLs identified in intelligence report for advisory board formation",
        "Prepare payer value dossier linking body composition data to GLP-1 treatment outcomes",
      ],
      potentialRisks: [
        seed.coverage === "Limited" ? "Reimbursement delays may slow hospital budget allocation" : "Prior authorization requirements may limit patient volume",
        "MNC competitors bundling digital health tools with drug contracts",
        seed.maturity === "Emerging" ? "Regulatory uncertainty around compounded GLP-1 alternatives" : "Price compression as oral GLP-1 generics approach market",
        "Local device competitors offering lower-cost BIA alternatives",
      ],
    },
  };
}

let countryReportsCache: Record<CountryId, CountryReport> | null = null;

function getCountryReportsMap(): Record<CountryId, CountryReport> {
  if (!countryReportsCache) {
    countryReportsCache = Object.fromEntries(
      COUNTRY_LIST.map((c) => [c.id, buildReport(c)]),
    ) as Record<CountryId, CountryReport>;
  }
  return countryReportsCache;
}

export function getCountryReport(id: CountryId): CountryReport {
  return getCountryReportsMap()[id];
}

export const DEFAULT_COUNTRY_ID: CountryId = "south-korea";
