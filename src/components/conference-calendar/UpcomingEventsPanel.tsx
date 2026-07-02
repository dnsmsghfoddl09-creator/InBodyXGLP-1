import Link from "next/link";
import { conferenceProvider } from "@/lib/intelligence";
import type { CalendarConference } from "@/types/conference";

type UpcomingEventsPanelProps = {
  conferences: CalendarConference[];
};

export function UpcomingEventsPanel({ conferences }: UpcomingEventsPanelProps) {
  const upcoming = conferences.filter((c) => c.status !== "Completed").slice(0, 4);

  return (
    <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900">Upcoming Events</h3>
      <p className="mt-0.5 text-xs text-gray-500">Next conferences on the strategy calendar</p>
      <ul className="mt-4 space-y-3">
        {upcoming.map((c) => {
          const days = conferenceProvider.daysUntil(c.startDate);
          return (
            <li key={c.id}>
              <Link
                href={`/conferences/calendar/${c.id}`}
                prefetch={false}
                className="block rounded-xl border border-gray-100 bg-gray-50/50 p-3 transition-colors hover:border-blue-200 hover:bg-blue-50/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-blue-600">{c.acronym}</p>
                    <p className="text-sm font-medium text-gray-900">{c.city}, {c.country}</p>
                    <p className="text-xs text-gray-500">{c.displayDate}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                    {days}d
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
