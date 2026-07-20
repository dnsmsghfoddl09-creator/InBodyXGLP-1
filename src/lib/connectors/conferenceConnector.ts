import type { ConferenceFeedDefinition } from "@/lib/connectors/connectorTypes";
import { getAllCalendarConferences } from "@/data/conference-calendar";
import type { CalendarConference } from "@/types/conference";

export const CONFERENCE_FEED_REGISTRY: ConferenceFeedDefinition[] = [
  {
    id: "global-obesity-calendar",
    label: "Global Obesity Conference Feed",
    source: "ics",
    url: "https://example.com/feeds/global-obesity.ics",
  },
  {
    id: "diabetes-congress-rss",
    label: "Diabetes Congress RSS",
    source: "rss",
    url: "https://example.com/feeds/diabetes-congress.xml",
  },
];

export async function fetchLiveConferences(
  _feeds: ConferenceFeedDefinition[] = CONFERENCE_FEED_REGISTRY,
): Promise<CalendarConference[]> {
  // Architecture placeholder for future ICS/RSS/API ingestion.
  return [];
}

export function getMockConferenceFallback(): CalendarConference[] {
  return getAllCalendarConferences();
}

export function getRegisteredConferenceFeeds(): ConferenceFeedDefinition[] {
  return CONFERENCE_FEED_REGISTRY;
}
