import type { Metadata } from "next";
import { GlobalConferenceCalendar } from "@/components/conference-calendar/GlobalConferenceCalendar";

export const metadata: Metadata = {
  title: "Global Conference Calendar | InBody Global Strategy Intelligence",
  description: "Unified conference calendar for global strategy and marketing intelligence",
};

export default function ConferenceCalendarPage() {
  return <GlobalConferenceCalendar />;
}
