import type { CountryId } from "@/data/countries";
import type { CompetitorId, EnterpriseCompetitor } from "@/types/competitor";

export const ENTERPRISE_COMPETITORS: EnterpriseCompetitor[] = [
  {
    id: "novo-nordisk",
    name: "Novo Nordisk",
    category: "multinational",
    headquarters: "Bagsværd, Denmark",
    products: [
      { name: "Ozempic", type: "injectable", indication: "Type 2 Diabetes", status: "marketed", launchMarkets: ["usa", "uk", "germany", "japan", "south-korea", "australia"] },
      { name: "Wegovy", type: "injectable", indication: "Chronic Weight Management", status: "marketed", launchMarkets: ["usa", "uk", "germany", "japan", "south-korea", "uae"] },
      { name: "Rybelsus", type: "oral", indication: "Type 2 Diabetes", status: "marketed", launchMarkets: ["usa", "uk", "germany", "japan"] },
    ],
    launchTimeline: [
      { product: "Wegovy", market: "usa", date: "2021-06", milestone: "FDA obesity approval" },
      { product: "Wegovy", market: "japan", date: "2023-11", milestone: "PMDA obesity approval" },
      { product: "Wegovy", market: "south-korea", date: "2024-03", milestone: "MFDS obesity approval" },
      { product: "Ozempic", market: "indonesia", date: "2025-08", milestone: "BPOM T2D launch" },
    ],
    strengths: [
      "First-mover advantage in GLP-1 obesity category",
      "Strong KOL relationships and clinical evidence base",
      "Global manufacturing scale and supply expansion",
      "Integrated patient support and digital adherence programs",
    ],
    weaknesses: [
      "Supply constraints in emerging markets",
      "Premium pricing limits access in self-pay markets",
      "Compounding and counterfeit pressure in APAC",
      "Oral GLP-1 competition from Lilly pipeline",
    ],
    activeCountryIds: ["usa", "uk", "germany", "france", "japan", "south-korea", "china", "australia", "uae", "saudi-arabia", "brazil", "mexico", "india"],
    aiNotes: "Monitor Novo digital health bundling — potential to exclude third-party body composition devices from contracts.",
  },
  {
    id: "eli-lilly",
    name: "Eli Lilly",
    category: "multinational",
    headquarters: "Indianapolis, USA",
    products: [
      { name: "Mounjaro", type: "injectable", indication: "Type 2 Diabetes / Obesity", status: "marketed", launchMarkets: ["usa", "uk", "germany", "japan", "south-korea"] },
      { name: "Zepbound", type: "injectable", indication: "Chronic Weight Management", status: "marketed", launchMarkets: ["usa"] },
      { name: "Orforglipron", type: "oral", indication: "Obesity / T2D", status: "phase-3", launchMarkets: ["usa", "japan", "germany"] },
    ],
    launchTimeline: [
      { product: "Mounjaro", market: "usa", date: "2022-05", milestone: "FDA T2D approval" },
      { product: "Zepbound", market: "usa", date: "2023-11", milestone: "FDA obesity approval" },
      { product: "Mounjaro", market: "japan", date: "2024-09", milestone: "PMDA launch" },
      { product: "Orforglipron", market: "Global", date: "2026-08", milestone: "Phase III primary endpoint met" },
    ],
    strengths: [
      "Superior weight loss efficacy data vs. semaglutide in head-to-head trials",
      "Aggressive pharmacy channel strategy in US",
      "Oral GLP-1 pipeline may reshape primary care access",
      "Strong R&D investment in next-gen incretin combinations",
    ],
    weaknesses: [
      "Later market entry vs. Novo in several APAC markets",
      "GI side effect profile affects persistence rates",
      "Limited obesity brand recognition outside US",
      "Reimbursement negotiations lag Novo in EMEA public systems",
    ],
    activeCountryIds: ["usa", "uk", "germany", "japan", "south-korea", "australia", "canada", "uae", "saudi-arabia"],
    aiNotes: "Lilly pharmacy-led model may shift body composition screening to retail — InBody should pursue pharmacy partnerships proactively.",
  },
  {
    id: "amgen",
    name: "Amgen",
    category: "multinational",
    headquarters: "Thousand Oaks, USA",
    products: [
      { name: "MariTide (AMG 133)", type: "injectable", indication: "Obesity", status: "phase-3", launchMarkets: ["usa", "uk"] },
    ],
    launchTimeline: [
      { product: "MariTide", market: "usa", date: "2027-H1", milestone: "Phase III readout expected" },
    ],
    strengths: ["Novel mechanism (GLP-1/GIP/glucagon)", "Strong biologics manufacturing"],
    weaknesses: ["Late entrant", "Limited obesity commercial infrastructure"],
    activeCountryIds: ["usa", "uk", "germany"],
    aiNotes: "Track Phase III outcomes — potential market disruptor if monthly dosing confirmed.",
  },
  {
    id: "local-apac",
    name: "APAC Local Players",
    category: "local-consolidated",
    headquarters: "Regional (APAC)",
    products: [
      { name: "Innovent IBI362", type: "injectable", indication: "Obesity", status: "phase-3", launchMarkets: ["china"] },
      { name: "Biocon biosimilars", type: "biosimilar", indication: "T2D", status: "phase-3", launchMarkets: ["india"] },
    ],
    launchTimeline: [
      { product: "IBI362", market: "china", date: "2026-Q4", milestone: "NMPA submission planned" },
      { product: "Liraglutide biosimilar", market: "india", date: "2025-12", milestone: "CDSCO approval" },
    ],
    strengths: ["Local pricing advantage", "Government partnership in domestic markets", "Faster regulatory pathways for local manufacturers"],
    weaknesses: ["Limited global clinical evidence", "Narrow product portfolios", "Weaker KOL networks vs. MNCs"],
    activeCountryIds: ["china", "india", "japan", "indonesia", "thailand", "vietnam", "philippines"],
    aiNotes: "Local players may bundle low-cost BIA devices — InBody must emphasize clinical-grade accuracy and GLP-1-specific metrics.",
  },
  {
    id: "local-emea",
    name: "EMEA Local Players",
    category: "local-consolidated",
    headquarters: "Regional (EMEA)",
    products: [
      { name: "Regional compounded GLP-1", type: "injectable", indication: "Weight Management", status: "marketed", launchMarkets: ["germany", "france", "uk"] },
    ],
    launchTimeline: [
      { product: "Compounded semaglutide", market: "germany", date: "2024-06", milestone: "Specialty pharmacy channel growth" },
    ],
    strengths: ["Price-sensitive market access", "Telehealth integration"],
    weaknesses: ["Regulatory scrutiny increasing", "Quality consistency concerns"],
    activeCountryIds: ["germany", "france", "italy", "spain", "uk"],
    aiNotes: "EMA tightening on compounding may benefit branded GLP-1 and associated monitoring devices.",
  },
  {
    id: "local-latam",
    name: "LATAM Local Players",
    category: "local-consolidated",
    headquarters: "Regional (LATAM)",
    products: [
      { name: "Regional distributors", type: "injectable", indication: "T2D", status: "marketed", launchMarkets: ["brazil", "mexico"] },
    ],
    launchTimeline: [
      { product: "Ozempic (licensed)", market: "brazil", date: "2023-04", milestone: "ANVISA approval via Novo partner" },
      { product: "Mounjaro", market: "mexico", date: "2025-02", milestone: "COFEPRIS launch" },
    ],
    strengths: ["Growing obesity awareness", "Private hospital channel expansion"],
    weaknesses: ["Reimbursement gaps", "Import dependency for innovator products"],
    activeCountryIds: ["brazil", "mexico"],
    aiNotes: "LATAM private hospital segment offers InBody premium positioning despite limited public reimbursement.",
  },
];

const competitorMap = new Map(ENTERPRISE_COMPETITORS.map((c) => [c.id, c]));

export function getEnterpriseCompetitor(id: CompetitorId): EnterpriseCompetitor | undefined {
  return competitorMap.get(id);
}

export function getAllEnterpriseCompetitors(): EnterpriseCompetitor[] {
  return ENTERPRISE_COMPETITORS;
}

export function getCompetitorsForCountry(countryId: CountryId): EnterpriseCompetitor[] {
  return ENTERPRISE_COMPETITORS.filter((c) => c.activeCountryIds.includes(countryId));
}
