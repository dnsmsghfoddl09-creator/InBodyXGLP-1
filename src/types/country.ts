import type { CountryId } from "@/data/countries";
import type { CoverageLevel, MarketMaturity, PriorityLevel } from "@/types/common";

export type CountryBasicInfo = {
  id: CountryId;
  name: string;
  flag: string;
  region: string;
  currency: string;
  primaryLanguage: string;
  subsidiary: string | null;
};

export type CountryMarket = {
  marketSize: string;
  marketSizeUsdBillions: number;
  growthRate: string;
  forecast2028: string;
  segmentFocus: string;
};

export type CountryDemographics = {
  population: string;
  populationMillions: number;
  obesityRate: string;
  diabetesPrevalence: string;
  urbanizationRate: string;
};

export type CountryGlp1Status = {
  maturity: MarketMaturity;
  approvedProducts: string[];
  approvedIndications: string[];
  pipelineProducts: string[];
  prescriptionVolumeTrend: string;
  inbodyRelevance: string;
};

export type CountryRegulations = {
  approvalStatus: string;
  regulatoryBody: string;
  prescriptionRules: string;
  eligiblePrescribers: string;
  importRestrictions: string;
  advertisingRestrictions: string;
  recentUpdates: string[];
};

export type CountryInsurance = {
  coverageLevel: CoverageLevel;
  publicInsurance: string;
  privateInsurance: string;
  reimbursement: string;
  outOfPocketShare: string;
  averageMonthlyCost: string;
};

export type CountryCompetitorPresence = {
  competitorIds: string[];
  novoNordiskShare: string;
  eliLillyShare: string;
  localPlayerSummary: string;
  competitiveIntensity: string;
  inbodyImplication: string;
};

export type CountryHospitalLandscape = {
  tier1Systems: string[];
  obesityPrograms: string;
  purchasingProcess: string;
  deviceIntegrationOpportunity: string;
  keyAccounts: string[];
};

export type CountryPharmacyLandscape = {
  majorChains: string[];
  glp1DispensingTrend: string;
  otcWellnessChannel: string;
  screeningKioskPotential: string;
};

export type CountryOpportunity = {
  id: string;
  title: string;
  description: string;
  priority: PriorityLevel;
  estimatedImpact: string;
  recommendedAction: string;
};

export type CountryAiNotes = {
  strategicSummary: string;
  dataConfidence: number;
  lastReviewed: string;
  openQuestions: string[];
  suggestedResearch: string[];
};

export type EnterpriseCountry = {
  basic: CountryBasicInfo;
  market: CountryMarket;
  demographics: CountryDemographics;
  glp1Status: CountryGlp1Status;
  regulations: CountryRegulations;
  insurance: CountryInsurance;
  competitors: CountryCompetitorPresence;
  hospitals: CountryHospitalLandscape;
  pharmacies: CountryPharmacyLandscape;
  kolIds: string[];
  conferenceIds: string[];
  opportunities: CountryOpportunity[];
  aiNotes: CountryAiNotes;
};

export type { CountryId };
