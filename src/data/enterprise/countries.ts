import { COUNTRY_LIST, type CountryId } from "@/data/countries";
import {
  CONFERENCE_IDS_BY_REGION,
  COUNTRY_SEEDS,
  KOL_IDS_BY_COUNTRY,
  LOCAL_COMPETITOR_IDS,
  REGULATORY_BODIES,
} from "@/data/enterprise/seeds";
import type { EnterpriseCountry } from "@/types/country";

function buildCountry(meta: (typeof COUNTRY_LIST)[number]): EnterpriseCountry {
  const seed = COUNTRY_SEEDS[meta.id];
  const localCompetitorId = LOCAL_COMPETITOR_IDS[meta.id];
  const competitorIds = ["novo-nordisk", "eli-lilly", ...(localCompetitorId ? [localCompetitorId] : [])];
  const kolIds = KOL_IDS_BY_COUNTRY[meta.id] ?? [];
  const conferenceIds = CONFERENCE_IDS_BY_REGION[meta.region] ?? ["ada"];
  const regulatoryBody = REGULATORY_BODIES[meta.id] ?? "National medicines agency";

  return {
    basic: {
      id: meta.id,
      name: meta.name,
      flag: meta.flag,
      region: meta.region,
      currency: seed.currency,
      primaryLanguage: seed.language,
      subsidiary: seed.subsidiary,
    },
    market: {
      marketSize: seed.marketSize,
      marketSizeUsdBillions: seed.marketSizeUsd,
      growthRate: seed.growth,
      forecast2028: seed.forecast,
      segmentFocus: seed.maturity === "Advanced" ? "Obesity + T2D maintenance" : "T2D-led with obesity expansion",
    },
    demographics: {
      population: seed.population,
      populationMillions: seed.popM,
      obesityRate: seed.obesity,
      diabetesPrevalence: seed.diabetes,
      urbanizationRate: seed.popM > 100 ? "62–78%" : "55–72%",
    },
    glp1Status: {
      maturity: seed.maturity,
      approvedProducts: ["Ozempic", "Wegovy", "Mounjaro", ...(seed.maturity === "Emerging" ? [] : ["Rybelsus"])],
      approvedIndications: seed.maturity === "Emerging"
        ? ["Type 2 Diabetes"]
        : ["Type 2 Diabetes", "Chronic Weight Management"],
      pipelineProducts: ["Oral semaglutide", "Orforglipron (Phase III)"],
      prescriptionVolumeTrend: `${seed.growth} YoY Rx growth`,
      inbodyRelevance: "Body composition monitoring critical for muscle preservation during GLP-1 therapy",
    },
    regulations: {
      approvalStatus: seed.maturity === "Emerging" ? "T2D approved; obesity label expanding" : "Wegovy, Ozempic, Mounjaro approved",
      regulatoryBody,
      prescriptionRules: "BMI ≥30 or ≥27 with comorbidities",
      eligiblePrescribers: seed.maturity === "Advanced" ? "PCP, endocrinologists, obesity specialists" : "Endocrinologists; PCP access expanding",
      importRestrictions: seed.coverage === "Limited" ? "Hospital procurement regulated; personal import restricted" : "Standard pharma licensing",
      advertisingRestrictions: "Direct-to-consumer limited; HCP channel primary",
      recentUpdates: [`${regulatoryBody} obesity indication review ongoing`, "Prior authorization criteria updated Q1 2026"],
    },
    insurance: {
      coverageLevel: seed.coverage,
      publicInsurance: seed.coverage === "Broad" ? "Broad public obesity drug coverage" : seed.coverage === "Partial" ? "Partial — T2D covered; obesity expanding" : "Limited public reimbursement",
      privateInsurance: seed.coverage === "Limited" ? "Select private plans only" : "Growing employer coverage for obesity",
      reimbursement: seed.coverage === "Broad" ? "National formulary inclusion" : "Case-by-case prior authorization",
      outOfPocketShare: seed.coverage === "Limited" ? "60–80%" : seed.coverage === "Partial" ? "40–60%" : "20–35%",
      averageMonthlyCost: seed.monthlyCost,
    },
    competitors: {
      competitorIds,
      novoNordiskShare: seed.maturity === "Advanced" ? "~42%" : "~35–40%",
      eliLillyShare: seed.maturity === "Advanced" ? "~28%" : "~15–22%",
      localPlayerSummary: localCompetitorId ? "Regional distributors and compounders active" : "Limited local GLP-1 manufacturing",
      competitiveIntensity: seed.score >= 85 ? "Very High" : seed.score >= 75 ? "High" : "Moderate",
      inbodyImplication: "Differentiate via clinical body composition outcomes vs. scale-only competitors",
    },
    hospitals: {
      tier1Systems: meta.id === "south-korea"
        ? ["Seoul National University Hospital", "Samsung Medical Center", "Asan Medical Center"]
        : meta.id === "japan"
          ? ["Univ. of Tokyo Hospital", "St. Luke's International", "Osaka Univ. Hospital"]
          : meta.id === "usa"
            ? ["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins"]
            : [`Leading ${meta.name} university hospital`, "National obesity center"],
      obesityPrograms: seed.maturity === "Emerging" ? "Expanding in tier-1 urban hospitals" : "Established multidisciplinary obesity pathways",
      purchasingProcess: seed.subsidiary ? "Subsidiary-led tender with HQ clinical support" : "Distributor or partner-led procurement",
      deviceIntegrationOpportunity: seed.score >= 85 ? "Very High — active GLP-1 program launches" : "High — growing screening demand",
      keyAccounts: [`Top 3 ${meta.name} obesity centers`, "National metabolic institute"],
    },
    pharmacies: {
      majorChains: meta.region === "APAC" ? ["Boots/Watsons equivalents", "Hospital pharmacy networks"] : ["National retail pharmacy chains"],
      glp1DispensingTrend: seed.maturity === "Advanced" ? "Dominant retail channel" : "Hospital pharmacy primary; retail expanding",
      otcWellnessChannel: seed.coverage === "Limited" ? "Strong self-pay wellness segment" : "Moderate wellness cross-sell",
      screeningKioskPotential: meta.id === "thailand" || meta.id === "indonesia" ? "Very High — pharmacy-led growth" : "Moderate to High",
    },
    kolIds,
    conferenceIds,
    opportunities: [
      {
        id: `${meta.id}-opp-hospital`,
        title: "Hospital GLP-1 pathway integration",
        description: `Embed InBody monitoring in tier-1 ${meta.name} obesity programs`,
        priority: seed.score >= 85 ? 1 : 2,
        estimatedImpact: seed.score >= 85 ? "$1.2M+ pipeline" : "$400K–800K pipeline",
        recommendedAction: "Schedule KOL advisory meeting and pilot proposal",
      },
      {
        id: `${meta.id}-opp-pharmacy`,
        title: "Pharmacy screening kiosk deployment",
        description: "Partner with retail pharmacy for GLP-1 patient body composition screening",
        priority: seed.coverage === "Limited" ? 2 : 3,
        estimatedImpact: "150–400 device placements",
        recommendedAction: "Identify top 3 pharmacy chain partners",
      },
    ],
    aiNotes: {
      strategicSummary: `${meta.name} (${seed.population}, ${seed.obesity} obesity) represents a ${seed.score >= 85 ? "priority" : "strategic"} GLP-1 market with ${seed.growth} growth and ${seed.coverage.toLowerCase()} insurance coverage.`,
      dataConfidence: Math.min(95, seed.score - 5 + (seed.subsidiary ? 8 : 0)),
      lastReviewed: "2026-03-28",
      openQuestions: [
        seed.coverage === "Limited" ? "Reimbursement pathway clarity needed" : "Prior authorization volume impact",
        "Oral GLP-1 launch timeline effect on screening touchpoints",
      ],
      suggestedResearch: [
        "Validate payer coverage updates with subsidiary",
        "Map top 5 hospital obesity program decision-makers",
      ],
    },
  };
}

let cache: Record<CountryId, EnterpriseCountry> | null = null;

function getCountriesMap(): Record<CountryId, EnterpriseCountry> {
  if (!cache) {
    cache = Object.fromEntries(COUNTRY_LIST.map((c) => [c.id, buildCountry(c)])) as Record<
      CountryId,
      EnterpriseCountry
    >;
  }
  return cache;
}

export function getEnterpriseCountry(id: CountryId): EnterpriseCountry {
  return getCountriesMap()[id];
}

export function getAllEnterpriseCountries(): EnterpriseCountry[] {
  return COUNTRY_LIST.map((c) => getCountriesMap()[c.id]);
}

export function getEnterpriseCountriesByRegion(region: string): EnterpriseCountry[] {
  return getAllEnterpriseCountries().filter((c) => c.basic.region === region);
}
