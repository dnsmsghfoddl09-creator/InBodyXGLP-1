import { conferenceProvider } from "@/lib/intelligence";
import type { ConferenceRegion, ConferenceTopicTag } from "@/types/conference";

type CalendarFiltersProps = {
  query: string;
  onQueryChange: (v: string) => void;
  region: ConferenceRegion | "All";
  onRegionChange: (v: ConferenceRegion | "All") => void;
  category: string;
  onCategoryChange: (v: string) => void;
  topic: ConferenceTopicTag | "All";
  onTopicChange: (v: ConferenceTopicTag | "All") => void;
};

export function CalendarFilters({
  query,
  onQueryChange,
  region,
  onRegionChange,
  category,
  onCategoryChange,
  topic,
  onTopicChange,
}: CalendarFiltersProps) {
  const selectClass =
    "h-9 rounded-xl border border-gray-200 bg-gray-50/80 px-3 text-sm text-gray-900 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:flex-row lg:flex-wrap lg:items-center">
      <div className="relative min-w-[200px] flex-1 lg:max-w-xs">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="search"
          placeholder="Search conferences…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="h-9 w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-9 pr-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <select value={region} onChange={(e) => onRegionChange(e.target.value as ConferenceRegion | "All")} className={selectClass}>
        <option value="All">All Regions</option>
        {conferenceProvider.filters.regions.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)} className={selectClass}>
        <option value="All">All Categories</option>
        {conferenceProvider.filters.categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select value={topic} onChange={(e) => onTopicChange(e.target.value as ConferenceTopicTag | "All")} className={selectClass}>
        <option value="All">All Topics</option>
        {conferenceProvider.filters.topics.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}
