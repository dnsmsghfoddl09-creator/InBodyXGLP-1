"use client";

import { useState, useRef, useEffect } from "react";
import { countryProvider, type CountryId } from "@/lib/intelligence";

type CountrySelectorProps = {
  selectedId: CountryId;
  onSelect: (id: CountryId) => void;
};

export function CountrySelector({ selectedId, onSelect }: CountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const countries = countryProvider.listCountries();
  const selected = countries.find((c) => c.id === selectedId)!;
  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.region.toLowerCase().includes(query.toLowerCase()),
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

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
        Select Country
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-all hover:border-blue-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <span className="flex items-center gap-3">
          <span className="text-xl">{selected.flag}</span>
          <span>
            <span className="block text-sm font-semibold text-gray-900">{selected.name}</span>
            <span className="block text-xs text-gray-500">{selected.region}</span>
          </span>
        </span>
        <svg className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
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
          <ul className="max-h-64 overflow-y-auto p-1">
            {filtered.map((country) => (
              <li key={country.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(country.id);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    country.id === selectedId
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span>
                    <span className="font-medium">{country.name}</span>
                    <span className="block text-xs text-gray-500">{country.region}</span>
                  </span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-gray-500">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
