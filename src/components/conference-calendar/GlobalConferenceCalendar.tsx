"use client";

import { useMemo, useState } from "react";
import { CalendarFilters } from "@/components/conference-calendar/CalendarFilters";
import { ListView } from "@/components/conference-calendar/ListView";
import { MonthView } from "@/components/conference-calendar/MonthView";
import { UpcomingEventsPanel } from "@/components/conference-calendar/UpcomingEventsPanel";
import { conferenceProvider } from "@/lib/intelligence";
import type { ConferenceRegion, ConferenceTopicTag } from "@/types/conference";

type ViewMode = "month" | "list";

export function GlobalConferenceCalendar() {
  const [view, setView] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<ConferenceRegion | "All">("All");
  const [category, setCategory] = useState("All");
  const [topic, setTopic] = useState<ConferenceTopicTag | "All">("All");
  const [monthOffset, setMonthOffset] = useState(0);

  const refDate = conferenceProvider.referenceDate;
  const viewDate = new Date(refDate.getFullYear(), refDate.getMonth() + monthOffset, 1);

  const filtered = useMemo(
    () => conferenceProvider.filterConferences(conferenceProvider.getCalendarConferences(), { query, region, category, topic }),
    [query, region, category, topic],
  );

  return (
    <div className="flex-1">
      <div className="border-b border-gray-100 bg-white px-4 py-6 lg:px-8 lg:py-8">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Conferences</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 lg:text-3xl">
          📅 Global Conference Calendar
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500 lg:text-base">
          Unified intelligence calendar for AOCO, ADA, EASD, EASO, ObesityWeek, and strategic industry events.
        </p>
      </div>

      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {(["list", "month"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              className={`inline-flex h-9 items-center rounded-xl px-4 text-xs font-medium transition-colors ${
                view === mode ? "bg-blue-600 text-white" : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {mode === "month" ? "Month View" : "List View"}
            </button>
          ))}
        </div>

        <CalendarFilters
          query={query}
          onQueryChange={setQuery}
          region={region}
          onRegionChange={setRegion}
          category={category}
          onCategoryChange={setCategory}
          topic={topic}
          onTopicChange={setTopic}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            {view === "month" ? (
              <MonthView
                year={viewDate.getFullYear()}
                month={viewDate.getMonth()}
                conferences={filtered}
                onPrev={() => setMonthOffset((m) => m - 1)}
                onNext={() => setMonthOffset((m) => m + 1)}
              />
            ) : (
              <ListView conferences={filtered} />
            )}
          </div>
          <UpcomingEventsPanel conferences={filtered} />
        </div>
      </div>
    </div>
  );
}
