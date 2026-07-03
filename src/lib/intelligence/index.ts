/**
 * Intelligence Data Layer — unified provider access for live-data readiness.
 */

export type {
  IntelligenceProvider,
  IntelligenceItem,
  IntelligenceImportance,
  IntelligenceFilter,
  IntelligenceSort,
  PaperIntelligenceItem,
  CompetitorIntelligenceItem,
  News,
  Research,
  ResearchPaper,
  Conference,
  Competitor,
  CompetitorUpdate,
  CountryIntelligence,
  CountryId,
} from "@/lib/intelligence/types";

export {
  applyIntelligenceFilter,
  applyIntelligenceSort,
  importanceRank,
} from "@/lib/intelligence/types";

export { intelligenceService } from "@/lib/intelligence/intelligenceService";
export { newsProvider } from "@/lib/intelligence/newsProvider";
export { papersProvider } from "@/lib/intelligence/papersProvider";
export { researchProvider } from "@/lib/intelligence/papersProvider";
export { regulationProvider } from "@/lib/intelligence/regulationProvider";
export { competitorProvider } from "@/lib/intelligence/competitorProvider";
export { conferenceProvider } from "@/lib/intelligence/conferenceProvider";
export type { CalendarConference, ConferenceDetail, ConferenceId } from "@/lib/intelligence/conferenceProvider";
export { countryProvider } from "@/lib/intelligence/countryProvider";
export type { CountryReport, CountryCompareProfile } from "@/lib/intelligence/countryProvider";
export { dashboardProvider } from "@/lib/intelligence/dashboardProvider";
export type { QuickAction, StrategicInsight, StrategicSection } from "@/lib/intelligence/dashboardProvider";
