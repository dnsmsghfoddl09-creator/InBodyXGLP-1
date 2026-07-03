"use client";

import type { CountryResearchTabId } from "@/data/country-research-workspace";
import { COUNTRY_RESEARCH_TABS } from "@/data/country-research-workspace";

type CountryTabsProps = {
  activeTab: CountryResearchTabId;
  onTabChange: (tab: CountryResearchTabId) => void;
};

export function CountryTabs({ activeTab, onTabChange }: CountryTabsProps) {
  return (
    <div className="mb-6 overflow-x-auto border-b border-gray-100">
      <nav className="-mb-px flex min-w-max gap-1" aria-label="Country research tabs">
        {COUNTRY_RESEARCH_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-600 hover:border-gray-200 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
