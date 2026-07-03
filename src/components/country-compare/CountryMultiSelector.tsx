"use client";

import { useState, useRef, useEffect } from "react";
import { countryProvider, type CountryId } from "@/lib/intelligence";

const { min: MIN_COMPARE, max: MAX_COMPARE } = countryProvider.getCompareLimits();

type CountryMultiSelectorProps = {
  selectedIds: CountryId[];
  onChange: (ids: CountryId[]) => void;
};

export function CountryMultiSelector({ selectedIds, onChange }: CountryMultiSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = countryProvider.listCountries().filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(id: CountryId) {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > MIN_COMPARE) {
        onChange(selectedIds.filter((x) => x !== id));
      }
    } else if (selectedIds.length < MAX_COMPARE) {
      onChange([...selectedIds, id]);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
        Compare Countries ({MIN_COMPARE}–{MAX_COMPARE})
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex min-h-[44px] w-full flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-left shadow-sm transition-all hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {selectedIds.map((id) => {
          const c = countryProvider.listCountries().find((x) => x.id === id)!;
          return (
            <span
              key={id}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
            >
              {c.flag} {c.name}
            </span>
          );
        })}
        <span className="ml-auto text-xs text-gray-400">{selectedIds.length}/{MAX_COMPARE}</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <div className="border-b border-gray-100 p-2">
            <input
              type="search"
              autoFocus
              placeholder="Search countries…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto p-1">
            {filtered.map((country) => {
              const selected = selectedIds.includes(country.id);
              const disabled = !selected && selectedIds.length >= MAX_COMPARE;
              return (
                <li key={country.id}>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => toggle(country.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      selected ? "bg-blue-50 text-blue-700" : disabled ? "cursor-not-allowed opacity-40" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`flex h-4 w-4 items-center justify-center rounded border ${selected ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300"}`}>
                      {selected && "✓"}
                    </span>
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-medium">{country.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function CompareActionBar({ onAddWidget }: { onAddWidget?: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {onAddWidget && (
        <button
          type="button"
          onClick={onAddWidget}
          className="inline-flex h-9 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Widget
        </button>
      )}
      {[
        { label: "Export", icon: "↓" },
        { label: "Download PPT", icon: "📊" },
        { label: "Share Report", icon: "↗" },
      ].map((action) => (
        <button
          key={action.label}
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          <span>{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
}
