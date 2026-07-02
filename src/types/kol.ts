import type { CountryId } from "@/data/countries";
import type { InfluenceTier, PriorityLevel } from "@/types/common";

export type KolId = string;

export type EnterpriseKol = {
  id: KolId;
  name: string;
  institution: string;
  countryId: CountryId;
  specialty: string;
  influenceScore: number;
  influenceTier: InfluenceTier;
  researchAreas: string[];
  priority: PriorityLevel;
  conferenceAffiliations: string[];
  notes: string;
};

export type { CountryId };
