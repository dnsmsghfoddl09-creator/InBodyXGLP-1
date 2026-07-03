import type { CountryId } from "@/data/countries";
import {
  CALENDAR_REFERENCE_DATE,
  CATEGORY_FILTER_OPTIONS,
  filterConferences,
  getAllCalendarConferences,
  getConferenceDetail,
  getConferencesForMonth,
  getDashboardConferenceIntel,
  getUpcomingConferences,
  REGION_FILTER_OPTIONS,
  TOPIC_FILTER_OPTIONS,
  daysUntil,
} from "@/data/conference-calendar";
import type { CalendarConference, ConferenceDetail, ConferenceId } from "@/types/conference";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import type { Conference, IntelligenceProvider } from "@/lib/intelligence/types";
import type { IntelligenceFilter, IntelligenceItem, IntelligenceSort } from "@/lib/intelligence/intelligenceTypes";

function toConference(entry: CalendarConference): Conference {
  return {
    id: entry.id,
    name: entry.name,
    acronym: entry.acronym,
    startDate: entry.startDate,
    endDate: entry.endDate,
    displayDate: entry.displayDate,
    country: entry.country,
    city: entry.city,
    region: entry.region,
    status: entry.status,
    importance: entry.importance,
    tags: [...entry.topicTags, entry.category],
    countryIds: [],
  };
}

const MOCK_CONFERENCES: Conference[] = getAllCalendarConferences().map(toConference);

function enrichWithCountries(items: Conference[]): Conference[] {
  return items.map((item) => {
    const detail = getConferenceDetail(item.id as ConferenceId);
    return { ...item, countryIds: detail?.relatedCountryIds ?? [] };
  });
}

let enrichedCache: Conference[] | null = null;

function getEnriched(): Conference[] {
  if (!enrichedCache) {
    enrichedCache = enrichWithCountries(MOCK_CONFERENCES);
  }
  return enrichedCache;
}

function matchesKeyword(item: Conference, keyword: string): boolean {
  const q = keyword.toLowerCase();
  return (
    item.name.toLowerCase().includes(q) ||
    item.acronym.toLowerCase().includes(q) ||
    item.city.toLowerCase().includes(q) ||
    item.country.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}

const baseProvider: IntelligenceProvider<Conference, CountryId> = {
  getLatest() {
    return [...getEnriched()];
  },

  getByCountry(country) {
    return getEnriched().filter((c) => c.countryIds.includes(country));
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return getEnriched().filter((c) => matchesKeyword(c, keyword));
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return getEnriched().filter((c) =>
      c.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};

export function getConferences(
  filter?: IntelligenceFilter,
  sort: IntelligenceSort = "newest",
): IntelligenceItem[] {
  return intelligenceService.getLatestConferences(filter, sort);
}

export const conferenceProvider = {
  ...baseProvider,

  getCalendarConferences() {
    return getAllCalendarConferences();
  },

  getCalendarConference(id: ConferenceId) {
    return getAllCalendarConferences().find((c) => c.id === id);
  },

  getDetail(id: ConferenceId): ConferenceDetail | undefined {
    return getConferenceDetail(id);
  },

  getUpcoming(reference = CALENDAR_REFERENCE_DATE) {
    return getUpcomingConferences(reference);
  },

  getDashboardIntel(reference = CALENDAR_REFERENCE_DATE) {
    return getDashboardConferenceIntel(reference);
  },

  filterConferences,
  getConferencesForMonth,
  daysUntil,

  filters: {
    regions: REGION_FILTER_OPTIONS,
    categories: CATEGORY_FILTER_OPTIONS,
    topics: TOPIC_FILTER_OPTIONS,
  },

  referenceDate: CALENDAR_REFERENCE_DATE,
};

export type { CalendarConference, ConferenceDetail, ConferenceId };
