/**
 * Intelligence Data Layer — unified provider access for live-data readiness.
 */

export type {
  IntelligenceProvider,
  News,
  Research,
  ResearchPaper,
  Conference,
  Competitor,
  CompetitorUpdate,
  CountryIntelligence,
  CountryId,
} from "@/lib/intelligence/types";

export { newsProvider } from "@/lib/intelligence/newsProvider";
export { researchProvider } from "@/lib/intelligence/researchProvider";
export { competitorProvider } from "@/lib/intelligence/competitorProvider";
export { conferenceProvider } from "@/lib/intelligence/conferenceProvider";
export type { CalendarConference, ConferenceDetail, ConferenceId } from "@/lib/intelligence/conferenceProvider";
export { countryProvider } from "@/lib/intelligence/countryProvider";
export type { CountryReport, CountryCompareProfile } from "@/lib/intelligence/countryProvider";
export { dashboardProvider } from "@/lib/intelligence/dashboardProvider";
export type { QuickAction, StrategicInsight, StrategicSection } from "@/lib/intelligence/dashboardProvider";
