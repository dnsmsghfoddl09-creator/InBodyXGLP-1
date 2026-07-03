/**
 * Intelligence Data Layer — public entry point.
 * Future API integration: replace provider implementations only.
 */

export type {
  IntelligenceProvider,
  IntelligenceItem,
  IntelligenceRecord,
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
} from "@/lib/intelligence/intelligenceTypes";

export {
  applyIntelligenceFilter,
  applyIntelligenceSort,
  importanceRank,
} from "@/lib/intelligence/intelligenceTypes";

export { getNews, newsProvider } from "@/lib/intelligence/newsProvider";
export { getPapers, paperProvider } from "@/lib/intelligence/paperProvider";
export { getRegulations, regulationProvider } from "@/lib/intelligence/regulationProvider";
export { getCompetitors, competitorProvider } from "@/lib/intelligence/competitorProvider";
export { getConferences, conferenceProvider } from "@/lib/intelligence/conferenceProvider";
export type { CalendarConference, ConferenceDetail, ConferenceId } from "@/lib/intelligence/conferenceProvider";
export { getCountries, countryProvider } from "@/lib/intelligence/countryProvider";
export type { CountryReport, CountryCompareProfile } from "@/lib/intelligence/countryProvider";

/** Backward-compatible exports — existing modules keep working unchanged. */
export { intelligenceService } from "@/lib/intelligence/intelligenceService";
export { papersProvider } from "@/lib/intelligence/papersProvider";
export { researchProvider } from "@/lib/intelligence/researchProvider";
export { dashboardProvider } from "@/lib/intelligence/dashboardProvider";
export type { QuickAction, StrategicInsight, StrategicSection } from "@/lib/intelligence/dashboardProvider";

/** Legacy type re-exports for modules still importing from types.ts */
export type {
  IntelligenceProvider as LegacyIntelligenceProvider,
  IntelligenceItem as LegacyIntelligenceItem,
} from "@/lib/intelligence/types";
