"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/country-explorer/ResearchCards";
import { Badge } from "@/components/ui/Badge";
import { COUNTRY_LIST, type CountryId } from "@/data/countries";
import type { NewsRecord } from "@/data/country-research-workspace";
import {
  getNews,
  getNewsByCountries,
  NEWS_CATEGORIES,
  NEWS_IMPORTANCE_OPTIONS,
  NEWS_PRIORITY_COUNTRIES,
  NEWS_TOPICS,
  type NewsIntelligenceItem,
} from "@/lib/intelligence/newsProvider";
import type { IntelligenceSort } from "@/lib/intelligence/intelligenceTypes";

type NewsIntelligenceModuleProps = {
  variant?: "center" | "compare";
  countryIds?: CountryId[];
  limit?: number;
};

function toNewsRecord(item: NewsIntelligenceItem): NewsRecord {
  const country = COUNTRY_LIST.find((entry) => entry.id === item.country)?.name ?? item.country;

  return {
    id: item.id,
    title: item.title,
    source: item.source,
    country,
    publishedDate: item.publishedDate,
    category: item.category,
    importance: item.importance === "Low" ? "Medium" : (item.importance as "Critical" | "High" | "Medium"),
    relatedCompanies: item.relatedCompanies,
    relatedTopics: item.relatedTopics,
    summary: item.executiveSummary,
    executiveSummary: item.executiveSummary,
    businessImpact: item.businessImpact,
    recommendedAction: item.recommendedAction,
    tags: item.tags,
  };
}

export function NewsIntelligenceModule({
  variant = "center",
  countryIds = [],
  limit,
}: NewsIntelligenceModuleProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [importanceFilter, setImportanceFilter] = useState<string>("All");
  const [sort, setSort] = useState<IntelligenceSort>("newest");

  const records = useMemo(() => {
    const filter = {
      keyword: searchQuery.trim() || undefined,
      country:
        variant === "compare"
          ? countryIds
          : countryFilter !== "All"
            ? (countryFilter as CountryId)
            : undefined,
      category: categoryFilter !== "All" ? categoryFilter : undefined,
      importance:
        importanceFilter !== "All"
          ? (importanceFilter as (typeof NEWS_IMPORTANCE_OPTIONS)[number])
          : undefined,
    };

    const items =
      variant === "compare"
        ? getNewsByCountries(countryIds, filter, sort)
        : getNews(filter, sort);

    const mapped = items.map(toNewsRecord);
    return limit ? mapped.slice(0, limit) : mapped;
  }, [
    variant,
    countryIds,
    searchQuery,
    countryFilter,
    categoryFilter,
    importanceFilter,
    sort,
    limit,
  ]);

  if (variant === "compare") {
    return (
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Country News Intelligence</h3>
            <p className="mt-1 text-xs text-gray-500">
              Headlines related to selected compare markets
            </p>
          </div>
          <Badge variant="blue">{records.length} stories</Badge>
        </div>
        {records.length === 0 ? (
          <p className="mt-5 text-sm text-gray-500">No news matched the selected countries.</p>
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {records.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative flex-1 xl:max-w-md">
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
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search news headlines, companies, topics…"
            className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={countryFilter}
            onChange={(event) => setCountryFilter(event.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            aria-label="Filter by country"
          >
            <option value="All">All Countries</option>
            {NEWS_PRIORITY_COUNTRIES.map((countryId) => {
              const country = COUNTRY_LIST.find((entry) => entry.id === countryId);
              return (
                <option key={countryId} value={countryId}>
                  {country?.name ?? countryId}
                </option>
              );
            })}
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            {NEWS_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={importanceFilter}
            onChange={(event) => setImportanceFilter(event.target.value)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            aria-label="Filter by importance"
          >
            <option value="All">All Importance</option>
            {NEWS_IMPORTANCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as IntelligenceSort)}
            className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            aria-label="Sort news"
          >
            <option value="newest">Newest</option>
            <option value="importance">Importance</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      <p className="mb-4 text-xs text-gray-500">{records.length} intelligence stories</p>

      {records.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">No news matched your filters</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Try adjusting country, category, importance, or search terms.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {records.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
