/**
 * Public Intelligence Data Layer types.
 * Unified model shared by all intelligence providers.
 */

export type {
  IntelligenceItem,
  IntelligenceImportance,
  IntelligenceFilter,
  IntelligenceSort,
  PaperIntelligenceItem,
  CompetitorIntelligenceItem,
  IntelligenceProvider,
  CountryIntelligence,
  CountryId,
  News,
  Research,
  ResearchPaper,
  Conference,
  Competitor,
  CompetitorUpdate,
} from "@/lib/intelligence/types";

export {
  applyIntelligenceFilter,
  applyIntelligenceSort,
  importanceRank,
} from "@/lib/intelligence/types";

/** Canonical alias for the unified intelligence record shape. */
export type { IntelligenceItem as IntelligenceRecord } from "@/lib/intelligence/types";
