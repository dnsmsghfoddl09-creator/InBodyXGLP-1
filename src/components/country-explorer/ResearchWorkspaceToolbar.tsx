"use client";

type SortOption = "newest" | "oldest" | "az";

type ResearchWorkspaceToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  filterOptions: string[];
  searchPlaceholder?: string;
  onExport?: () => void;
  onAddWidget?: () => void;
  actionsOnly?: boolean;
};

export function ResearchWorkspaceToolbar({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
  filterOptions,
  searchPlaceholder = "Search records…",
  onExport,
  onAddWidget,
  actionsOnly = false,
}: ResearchWorkspaceToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {!actionsOnly && (
        <div className="relative flex-1 lg:max-w-md">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
        </div>
      )}

      <div className={`flex flex-wrap items-center gap-2 ${actionsOnly ? "w-full justify-end" : ""}`}>
        {!actionsOnly && (
          <>
            <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          aria-label="Filter records"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          aria-label="Sort records"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A–Z</option>
        </select>
          </>
        )}

        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export
        </button>

        {onAddWidget && (
          <button
            type="button"
            onClick={onAddWidget}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Widget
          </button>
        )}
      </div>
    </div>
  );
}

export type { SortOption };
