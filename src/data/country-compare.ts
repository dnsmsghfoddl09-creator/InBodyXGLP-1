import { COUNTRY_LIST, type CountryId } from "@/data/countries";

export { COUNTRY_LIST, type CountryId };

export const DEFAULT_COMPARE_IDS: CountryId[] = [
  "south-korea",
  "japan",
  "thailand",
  "indonesia",
  "singapore",
];

export const MIN_COMPARE = 2;
export const MAX_COMPARE = 5;

export type CountryCompareProfile = {
  id: CountryId;
  name: string;
  flag: string;
  market: {
    population: string;
    obesityRate: string;
    diabetesPrevalence: string;
    glp1MarketSize: string;
    marketGrowth: string;
    forecast: string;
  };
  healthcare: {
    hospitalSystem: string;
    clinicSystem: string;
    pharmacyChannel: string;
    telemedicine: string;
    digitalHealthAdoption: string;
  };
  regulations: {
    glp1ApprovalStatus: string;
    prescriptionRules: string;
    eligiblePrescribers: string;
    importRestrictions: string;
    advertisingRestrictions: string;
  };
  insurance: {
    insuranceCoverage: string;
    reimbursement: string;
    outOfPocketCost: string;
    averageMonthlyCost: string;
  };
  competition: {
    novoNordisk: string;
    eliLilly: string;
    localCompetitors: string;
    marketShare: string;
    competitiveIntensity: string;
  };
  consumer: {
    awareness: string;
    demand: string;
    weightLossTrend: string;
    digitalSearchInterest: string;
    communityActivity: string;
  };
  businessOpportunity: {
    inbodyPenetration: string;
    partnershipPotential: string;
    pharmacyOpportunity: string;
    hospitalOpportunity: string;
    wellnessOpportunity: string;
  };
  dimensionScores: {
    market: number;
    healthcare: number;
    regulation: number;
    insurance: number;
    competition: number;
    consumer: number;
    business: number;
  };
  overallScore: number;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
};

type CompareSeed = {
  pop: string;
  obesity: string;
  diabetes: string;
  marketSize: string;
  growth: string;
  forecast: string;
  score: number;
  monthlyCost: string;
  coverage: string;
  maturity: string;
  awareness: string;
  penetration: string;
};

const SEEDS: Record<CountryId, CompareSeed> = {
  "south-korea": { pop: "51.7M", obesity: "38.4%", diabetes: "13.8%", marketSize: "$1.8B", growth: "+22%", forecast: "$3.2B by 2028", score: 91, monthlyCost: "₩280K–450K", coverage: "Partial", maturity: "Developing", awareness: "High", penetration: "Low" },
  japan: { pop: "124.8M", obesity: "33.2%", diabetes: "11.2%", marketSize: "$3.4B", growth: "+18%", forecast: "$5.8B by 2028", score: 88, monthlyCost: "¥45K–80K", coverage: "Partial", maturity: "Developing", awareness: "High", penetration: "Low" },
  china: { pop: "1.41B", obesity: "34.3%", diabetes: "12.4%", marketSize: "$8.2B", growth: "+31%", forecast: "$18B by 2028", score: 85, monthlyCost: "¥1.2K–2.8K", coverage: "Limited", maturity: "Emerging", awareness: "Moderate", penetration: "Very Low" },
  taiwan: { pop: "23.6M", obesity: "27.8%", diabetes: "11.8%", marketSize: "$620M", growth: "+16%", forecast: "$1.1B by 2028", score: 79, monthlyCost: "NT$12K–22K", coverage: "Partial", maturity: "Developing", awareness: "Moderate", penetration: "Low" },
  singapore: { pop: "5.9M", obesity: "29.1%", diabetes: "9.5%", marketSize: "$480M", growth: "+14%", forecast: "$820M by 2028", score: 82, monthlyCost: "S$800–1,400", coverage: "Broad", maturity: "Mature", awareness: "High", penetration: "Moderate" },
  thailand: { pop: "71.8M", obesity: "42.3%", diabetes: "10.9%", marketSize: "$940M", growth: "+19%", forecast: "$1.9B by 2028", score: 74, monthlyCost: "฿8K–15K", coverage: "Limited", maturity: "Emerging", awareness: "Moderate", penetration: "Very Low" },
  vietnam: { pop: "99.5M", obesity: "19.4%", diabetes: "6.8%", marketSize: "$420M", growth: "+24%", forecast: "$1.1B by 2028", score: 71, monthlyCost: "₫3.5M–6M", coverage: "Limited", maturity: "Emerging", awareness: "Low", penetration: "Very Low" },
  indonesia: { pop: "277.5M", obesity: "21.8%", diabetes: "7.4%", marketSize: "$1.1B", growth: "+26%", forecast: "$3.4B by 2028", score: 76, monthlyCost: "Rp 2.5M–4.5M", coverage: "Limited", maturity: "Emerging", awareness: "Moderate", penetration: "Very Low" },
  malaysia: { pop: "34.3M", obesity: "45.6%", diabetes: "13.1%", marketSize: "$680M", growth: "+17%", forecast: "$1.3B by 2028", score: 77, monthlyCost: "RM 1.2K–2.2K", coverage: "Partial", maturity: "Developing", awareness: "Moderate", penetration: "Low" },
  philippines: { pop: "115.6M", obesity: "37.2%", diabetes: "8.6%", marketSize: "$520M", growth: "+21%", forecast: "$1.2B by 2028", score: 70, monthlyCost: "₱18K–32K", coverage: "Limited", maturity: "Emerging", awareness: "Moderate", penetration: "Very Low" },
  india: { pop: "1.43B", obesity: "22.9%", diabetes: "11.4%", marketSize: "$2.8B", growth: "+28%", forecast: "$7.2B by 2028", score: 83, monthlyCost: "₹8K–18K", coverage: "Limited", maturity: "Emerging", awareness: "Moderate", penetration: "Very Low" },
  australia: { pop: "26.6M", obesity: "31.7%", diabetes: "8.2%", marketSize: "$1.4B", growth: "+15%", forecast: "$2.4B by 2028", score: 80, monthlyCost: "A$600–1,100", coverage: "Broad", maturity: "Mature", awareness: "Very High", penetration: "Moderate" },
  usa: { pop: "335.9M", obesity: "41.9%", diabetes: "11.3%", marketSize: "$42.8B", growth: "+12%", forecast: "$68B by 2028", score: 86, monthlyCost: "$900–1,400", coverage: "Broad", maturity: "Advanced", awareness: "Very High", penetration: "High" },
  canada: { pop: "40.1M", obesity: "29.4%", diabetes: "9.4%", marketSize: "$2.1B", growth: "+13%", forecast: "$3.6B by 2028", score: 78, monthlyCost: "C$950–1,350", coverage: "Partial", maturity: "Mature", awareness: "High", penetration: "Moderate" },
  uk: { pop: "67.8M", obesity: "28.0%", diabetes: "7.9%", marketSize: "$2.8B", growth: "+11%", forecast: "$4.2B by 2028", score: 75, monthlyCost: "£250–450", coverage: "Partial", maturity: "Mature", awareness: "High", penetration: "Moderate" },
  germany: { pop: "84.4M", obesity: "24.3%", diabetes: "8.9%", marketSize: "$3.2B", growth: "+10%", forecast: "$4.8B by 2028", score: 77, monthlyCost: "€280–520", coverage: "Broad", maturity: "Mature", awareness: "High", penetration: "Moderate" },
  france: { pop: "68.4M", obesity: "17.1%", diabetes: "6.2%", marketSize: "$2.4B", growth: "+9%", forecast: "$3.5B by 2028", score: 72, monthlyCost: "€220–400", coverage: "Partial", maturity: "Developing", awareness: "Moderate", penetration: "Low" },
  italy: { pop: "58.9M", obesity: "21.0%", diabetes: "6.8%", marketSize: "$1.9B", growth: "+10%", forecast: "$2.8B by 2028", score: 73, monthlyCost: "€240–430", coverage: "Partial", maturity: "Developing", awareness: "Moderate", penetration: "Low" },
  spain: { pop: "47.8M", obesity: "23.8%", diabetes: "7.1%", marketSize: "$1.6B", growth: "+11%", forecast: "$2.5B by 2028", score: 74, monthlyCost: "€230–410", coverage: "Partial", maturity: "Developing", awareness: "Moderate", penetration: "Low" },
  brazil: { pop: "216.4M", obesity: "26.8%", diabetes: "9.6%", marketSize: "$1.8B", growth: "+20%", forecast: "$3.6B by 2028", score: 78, monthlyCost: "R$800–1,500", coverage: "Partial", maturity: "Developing", awareness: "Moderate", penetration: "Low" },
  mexico: { pop: "130.9M", obesity: "36.4%", diabetes: "14.4%", marketSize: "$1.2B", growth: "+19%", forecast: "$2.4B by 2028", score: 76, monthlyCost: "MX$3.5K–6.5K", coverage: "Limited", maturity: "Developing", awareness: "Moderate", penetration: "Very Low" },
  "saudi-arabia": { pop: "36.9M", obesity: "40.2%", diabetes: "18.7%", marketSize: "$980M", growth: "+23%", forecast: "$2.1B by 2028", score: 81, monthlyCost: "SAR 2.8K–4.5K", coverage: "Partial", maturity: "Developing", awareness: "High", penetration: "Low" },
  uae: { pop: "9.5M", obesity: "32.7%", diabetes: "15.4%", marketSize: "$720M", growth: "+18%", forecast: "$1.4B by 2028", score: 84, monthlyCost: "AED 2.5K–4K", coverage: "Broad", maturity: "Mature", awareness: "High", penetration: "Moderate" },
};

function buildProfile(country: (typeof COUNTRY_LIST)[number]): CountryCompareProfile {
  const s = SEEDS[country.id];
  const score = s.score;
  const dims = {
    market: Math.min(100, score + 2),
    healthcare: Math.min(100, score - 4 + (s.maturity === "Mature" ? 8 : 0)),
    regulation: Math.min(100, score - 8 + (s.coverage === "Broad" ? 10 : 0)),
    insurance: Math.min(100, score - 12 + (s.coverage === "Broad" ? 15 : s.coverage === "Partial" ? 5 : 0)),
    competition: Math.min(100, 70 + (s.maturity === "Emerging" ? 15 : 5)),
    consumer: Math.min(100, score - 6 + (s.awareness === "Very High" ? 10 : s.awareness === "High" ? 5 : 0)),
    business: Math.min(100, score + (s.penetration === "Very Low" ? 8 : s.penetration === "Low" ? 4 : -5)),
  };

  return {
    id: country.id,
    name: country.name,
    flag: country.flag,
    market: {
      population: s.pop,
      obesityRate: s.obesity,
      diabetesPrevalence: s.diabetes,
      glp1MarketSize: s.marketSize,
      marketGrowth: s.growth,
      forecast: s.forecast,
    },
    healthcare: {
      hospitalSystem: s.maturity === "Advanced" ? "Integrated national hospital networks" : s.maturity === "Mature" ? "Strong public + private hospital tiers" : "Tier-1 hospitals in major cities; expanding obesity programs",
      clinicSystem: s.score >= 85 ? "Dense private obesity clinic network" : "Growing specialist clinic density in urban centers",
      pharmacyChannel: s.maturity === "Advanced" ? "Dominant retail pharmacy channel" : "Hospital pharmacy primary; retail expanding",
      telemedicine: s.awareness === "Very High" || s.awareness === "High" ? "Mature GLP-1 telehealth platforms" : "Early adoption; high growth trajectory",
      digitalHealthAdoption: s.awareness === "Very High" ? "Very High — 68% digital health app usage" : s.awareness === "High" ? "High — 52% adoption" : "Moderate — 28–40% adoption",
    },
    regulations: {
      glp1ApprovalStatus: s.maturity === "Emerging" ? "Approved for T2D; obesity label expanding" : "Wegovy, Ozempic, Mounjaro approved",
      prescriptionRules: "BMI ≥30 or ≥27 with comorbidities required",
      eligiblePrescribers: s.maturity === "Advanced" ? "PCP, endocrinologists, obesity specialists" : "Endocrinologists and obesity specialists; PCP expanding",
      importRestrictions: s.coverage === "Limited" ? "Personal import restricted; hospital procurement regulated" : "Standard pharma import licensing",
      advertisingRestrictions: "Direct-to-consumer advertising limited; medical channel only",
    },
    insurance: {
      insuranceCoverage: s.coverage,
      reimbursement: s.coverage === "Broad" ? "Broad obesity drug reimbursement" : s.coverage === "Partial" ? "Partial — T2D covered; obesity expanding" : "Limited public reimbursement",
      outOfPocketCost: s.coverage === "Limited" ? "60–80% self-pay" : s.coverage === "Partial" ? "40–60% mixed" : "20–35% co-pay",
      averageMonthlyCost: s.monthlyCost,
    },
    competition: {
      novoNordisk: s.maturity === "Advanced" ? "Leader — ~42% share" : "Leader — ~35–40% share",
      eliLilly: `Fastest growth — ${s.maturity === "Advanced" ? "28%" : "15–22%"} share`,
      localCompetitors: country.id === "china" ? "Innovent, Huadong Medicine" : country.id === "india" ? "Biocon, Sun Pharma" : "Regional distributors, compounders",
      marketShare: "Novo + Lilly control 55–65% combined",
      competitiveIntensity: s.score >= 85 ? "Very High" : s.score >= 75 ? "High" : "Moderate — window for new entrants",
    },
    consumer: {
      awareness: s.awareness,
      demand: `${s.growth} YoY demand growth`,
      weightLossTrend: s.obesity > "35%" ? "Very strong — obesity crisis driving demand" : "Strong and accelerating",
      digitalSearchInterest: s.growth + " search query volume",
      communityActivity: s.awareness === "Very High" ? "Very active online communities" : "Growing social media GLP-1 discourse",
    },
    businessOpportunity: {
      inbodyPenetration: s.penetration,
      partnershipPotential: score >= 85 ? "Very High" : score >= 75 ? "High" : "Moderate",
      pharmacyOpportunity: s.maturity === "Advanced" ? "Moderate — saturated channel" : country.id === "thailand" ? "Very High — pharmacy-led growth" : "High",
      hospitalOpportunity: s.score >= 85 ? "Very High — tier-1 hospital programs launching" : "High",
      wellnessOpportunity: s.coverage === "Limited" ? "High — self-pay wellness segment" : "Moderate",
    },
    dimensionScores: dims,
    overallScore: score,
    swot: {
      strengths: [
        `${s.pop} addressable population with ${s.obesity} obesity rate`,
        `${s.growth} GLP-1 market growth exceeds regional average`,
        s.score >= 85 ? "Strong tier-1 hospital infrastructure for device integration" : "Low InBody penetration — first-mover advantage",
      ],
      weaknesses: [
        `${s.coverage} insurance coverage limits patient access`,
        s.penetration === "Very Low" ? "Minimal existing InBody brand presence" : "Limited localized clinical evidence",
        s.maturity === "Emerging" ? "Regulatory framework still evolving" : "High competitive pressure from MNCs",
      ],
      opportunities: [
        "GLP-1 + body composition monitoring clinical positioning",
        country.id === "thailand" || country.id === "indonesia" ? "Pharmacy channel expansion for screening kiosks" : "Hospital pathway integration partnerships",
        "Telehealth remote monitoring integration",
      ],
      threats: [
        "MNC competitors bundling digital tools with drug contracts",
        s.coverage === "Limited" ? "Reimbursement delays may slow adoption" : "Price compression from oral GLP-1 entrants",
        "Local low-cost BIA device competition",
      ],
    },
  };
}

let compareProfilesCache: Record<CountryId, CountryCompareProfile> | null = null;

function getCompareProfilesMap(): Record<CountryId, CountryCompareProfile> {
  if (!compareProfilesCache) {
    compareProfilesCache = Object.fromEntries(
      COUNTRY_LIST.map((c) => [c.id, buildProfile(c)]),
    ) as Record<CountryId, CountryCompareProfile>;
  }
  return compareProfilesCache;
}

export function getCompareProfiles(ids: CountryId[]): CountryCompareProfile[] {
  const profiles = getCompareProfilesMap();
  return ids.map((id) => profiles[id]);
}


export const COMPARE_CATEGORIES: {
  id: string;
  title: string;
  icon: string;
  section: keyof CountryCompareProfile;
  fields: { label: string; field: string }[];
}[] = [
  {
    id: "market",
    title: "Market",
    icon: "📈",
    section: "market",
    fields: [
      { label: "Population", field: "population" },
      { label: "Obesity Rate", field: "obesityRate" },
      { label: "Diabetes Prevalence", field: "diabetesPrevalence" },
      { label: "GLP-1 Market Size", field: "glp1MarketSize" },
      { label: "Market Growth", field: "marketGrowth" },
      { label: "Forecast", field: "forecast" },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: "🏥",
    section: "healthcare",
    fields: [
      { label: "Hospital System", field: "hospitalSystem" },
      { label: "Clinic System", field: "clinicSystem" },
      { label: "Pharmacy Channel", field: "pharmacyChannel" },
      { label: "Telemedicine", field: "telemedicine" },
      { label: "Digital Health Adoption", field: "digitalHealthAdoption" },
    ],
  },
  {
    id: "regulations",
    title: "Regulations",
    icon: "⚖️",
    section: "regulations",
    fields: [
      { label: "GLP-1 Approval Status", field: "glp1ApprovalStatus" },
      { label: "Prescription Rules", field: "prescriptionRules" },
      { label: "Eligible Prescribers", field: "eligiblePrescribers" },
      { label: "Import Restrictions", field: "importRestrictions" },
      { label: "Advertising Restrictions", field: "advertisingRestrictions" },
    ],
  },
  {
    id: "insurance",
    title: "Insurance",
    icon: "🏦",
    section: "insurance",
    fields: [
      { label: "Insurance Coverage", field: "insuranceCoverage" },
      { label: "Reimbursement", field: "reimbursement" },
      { label: "Out-of-pocket Cost", field: "outOfPocketCost" },
      { label: "Average Monthly Cost", field: "averageMonthlyCost" },
    ],
  },
  {
    id: "competition",
    title: "Competition",
    icon: "🏢",
    section: "competition",
    fields: [
      { label: "Novo Nordisk", field: "novoNordisk" },
      { label: "Eli Lilly", field: "eliLilly" },
      { label: "Local Competitors", field: "localCompetitors" },
      { label: "Market Share", field: "marketShare" },
      { label: "Competitive Intensity", field: "competitiveIntensity" },
    ],
  },
  {
    id: "consumer",
    title: "Consumer",
    icon: "👥",
    section: "consumer",
    fields: [
      { label: "Awareness", field: "awareness" },
      { label: "Demand", field: "demand" },
      { label: "Weight-loss Trend", field: "weightLossTrend" },
      { label: "Digital Search Interest", field: "digitalSearchInterest" },
      { label: "Community Activity", field: "communityActivity" },
    ],
  },
  {
    id: "business",
    title: "Business Opportunity",
    icon: "💡",
    section: "businessOpportunity",
    fields: [
      { label: "InBody Penetration", field: "inbodyPenetration" },
      { label: "Partnership Potential", field: "partnershipPotential" },
      { label: "Pharmacy Opportunity", field: "pharmacyOpportunity" },
      { label: "Hospital Opportunity", field: "hospitalOpportunity" },
      { label: "Wellness Opportunity", field: "wellnessOpportunity" },
    ],
  },
];

const AI_INSIGHTS: Partial<Record<CountryId, string>> = {
  "south-korea": "South Korea combines high obesity rates with rapidly expanding hospital obesity programs — ideal for InBody hospital pathway partnerships.",
  japan: "Japan has high purchasing power but limited insurance support — prioritize premium self-pay clinic and wellness segments.",
  thailand: "Thailand presents strong pharmacy expansion opportunities driven by high obesity prevalence and retail channel growth.",
  indonesia: "Indonesia offers the largest long-term growth potential with 277M population and minimal InBody penetration.",
  singapore: "Singapore serves as a regional hub with mature digital health adoption — ideal for telehealth integration pilots.",
  china: "China's GLP-1 market is scaling rapidly but regulatory complexity requires local partnership strategy.",
  usa: "USA is mature and highly competitive — focus on differentiated body composition value proposition vs. scale-only devices.",
  india: "India combines massive population with emerging GLP-1 access — early hospital network partnerships critical.",
};

export function generateAiInsights(profiles: CountryCompareProfile[]): string[] {
  const insights = profiles
    .map((p) => AI_INSIGHTS[p.id] ?? `${p.name} shows ${p.market.marketGrowth} GLP-1 growth with ${p.businessOpportunity.partnershipPotential.toLowerCase()} partnership potential for InBody.`)
    .slice(0, 5);

  if (profiles.length >= 2) {
    const top = [...profiles].sort((a, b) => b.overallScore - a.overallScore)[0];
    insights.push(`Priority recommendation: Lead with ${top.name} (${top.overallScore}/100 opportunity score) while building pipeline in secondary markets.`);
  }

  return insights;
}

export const RADAR_DIMENSIONS = [
  { key: "market" as const, label: "Market" },
  { key: "healthcare" as const, label: "Healthcare" },
  { key: "regulation" as const, label: "Regulation" },
  { key: "insurance" as const, label: "Insurance" },
  { key: "competition" as const, label: "Competition" },
  { key: "consumer" as const, label: "Consumer" },
  { key: "business" as const, label: "Business" },
];
