"use client";

import { useState } from "react";
import { CountrySelector } from "@/components/country-explorer/CountrySelector";
import { CountryResearchWorkspace } from "@/components/country-explorer/CountryResearchWorkspace";
import {
  countryProvider,
  type CountryId,
} from "@/lib/intelligence";
import {
  formatCountryMetadata,
  getCategoryLabel,
  getCountryRegistryEntry,
  getCountrySourcesByCategory,
} from "@/lib/registry";

function AvailableDataSourcesPanel({ countryId }: { countryId: CountryId }) {
  const entry = getCountryRegistryEntry(countryId);
  if (!entry) return null;

  const grouped = getCountrySourcesByCategory(countryId);
  const categories = Object.keys(grouped) as Array<keyof typeof grouped>;

  return (
    <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Source Registry</p>
          <h2 className="mt-1 text-base font-semibold text-gray-900">Available Data Sources</h2>
          <p className="mt-1 text-xs text-gray-500">{formatCountryMetadata(entry)}</p>
        </div>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {entry.sources.length} configured
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const sources = grouped[category] ?? [];
          return (
            <div key={category} className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {getCategoryLabel(category)}
              </p>
              <ul className="mt-3 space-y-2">
                {sources.map((source) => (
                  <li key={source.id} className="flex items-start justify-between gap-2 text-sm text-gray-700">
                    <span>{source.label}</span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        source.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {source.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CountryExplorer() {
  const [selectedId, setSelectedId] = useState<CountryId>(
    countryProvider.getDefaultExplorerCountryId(),
  );
  const report = countryProvider.getExplorerReport(selectedId);

  return (
    <div className="flex-1">
      <div className="border-b border-gray-100 bg-white px-4 py-6 lg:px-8 lg:py-8">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
          Global Intelligence
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 lg:text-3xl">
          Country Explorer
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500 lg:text-base">
          Deep-dive country intelligence for GLP-1 market entry, regulatory navigation, and InBody
          business development. Select a market to generate a full strategic report.
        </p>
      </div>

      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:flex-row lg:items-end lg:justify-between lg:p-6">
          <CountrySelector selectedId={selectedId} onSelect={setSelectedId} />
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            Mock intelligence data · {report.region}
          </div>
        </div>

        <AvailableDataSourcesPanel countryId={selectedId} />

        <CountryResearchWorkspace key={selectedId} countryId={selectedId} report={report} />
      </div>
    </div>
  );
}
