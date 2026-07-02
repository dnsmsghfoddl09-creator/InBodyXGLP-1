/**
 * Enterprise Data Foundation — public API for future AI features and module migration.
 *
 * Consumption examples (future sprints):
 *   import { getEnterpriseCountry, getAllEnterpriseCompetitors } from "@/data/enterprise";
 */

export {
  getEnterpriseCountry,
  getAllEnterpriseCountries,
  getEnterpriseCountriesByRegion,
} from "@/data/enterprise/countries";

export {
  getEnterpriseCompetitor,
  getAllEnterpriseCompetitors,
  getCompetitorsForCountry,
  ENTERPRISE_COMPETITORS,
} from "@/data/enterprise/competitors";

export {
  getEnterpriseConference,
  getAllEnterpriseConferences,
  getConferencesForCountry,
  ENTERPRISE_CONFERENCES,
} from "@/data/enterprise/conferences";

export {
  getEnterpriseKol,
  getAllEnterpriseKols,
  getKolsForCountry,
  getKolsByIds,
  ENTERPRISE_KOLS,
} from "@/data/enterprise/kols";

export {
  getEnterpriseResearchMission,
  getAllEnterpriseResearchMissions,
  getActiveEnterpriseResearchMissions,
  getMissionsForCountry,
  getMissionsForConference,
  ENTERPRISE_RESEARCH_MISSIONS,
} from "@/data/enterprise/research-missions";

export { COUNTRY_SEEDS } from "@/data/enterprise/seeds";

export type {
  EnterpriseCountry,
  EnterpriseCompetitor,
  EnterpriseConference,
  EnterpriseKol,
  EnterpriseResearchMission,
  CountryId,
  CompetitorId,
  ConferenceId,
  KolId,
  DeliverableType,
  MissionStatus,
  PriorityLevel,
} from "@/types";
