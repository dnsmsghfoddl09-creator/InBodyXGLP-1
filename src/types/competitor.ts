import type { CountryId } from "@/data/countries";

export type CompetitorId =
  | "novo-nordisk"
  | "eli-lilly"
  | "amgen"
  | "local-apac"
  | "local-emea"
  | "local-latam";

export type CompetitorProduct = {
  name: string;
  type: "injectable" | "oral" | "biosimilar" | "device";
  indication: string;
  status: "marketed" | "approved" | "phase-3" | "phase-2";
  launchMarkets: CountryId[];
};

export type CompetitorLaunchEvent = {
  product: string;
  market: CountryId | "Global";
  date: string;
  milestone: string;
};

export type EnterpriseCompetitor = {
  id: CompetitorId;
  name: string;
  category: "multinational" | "local-consolidated";
  headquarters: string;
  products: CompetitorProduct[];
  launchTimeline: CompetitorLaunchEvent[];
  strengths: string[];
  weaknesses: string[];
  activeCountryIds: CountryId[];
  aiNotes: string;
};

export type { CountryId };
