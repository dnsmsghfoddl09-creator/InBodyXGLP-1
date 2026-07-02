type PageToolbarProps = {
  searchPlaceholder?: string;
};

export function PageToolbar({ searchPlaceholder = "Search…" }: PageToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-md">
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
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          Filter
        </button>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Widget
        </button>
      </div>
    </div>
  );
}
