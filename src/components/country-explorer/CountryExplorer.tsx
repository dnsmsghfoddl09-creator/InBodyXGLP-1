"use client";

import { useState } from "react";
import { CountrySelector } from "@/components/country-explorer/CountrySelector";
import { CountryResearchWorkspace } from "@/components/country-explorer/CountryResearchWorkspace";
import {
  countryProvider,
  type CountryId,
} from "@/lib/intelligence";

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

        <CountryResearchWorkspace key={selectedId} countryId={selectedId} report={report} />
      </div>
    </div>
  );
}
