import type { CountryId } from "@/data/countries";
import type { RssFeedDefinition } from "@/lib/connectors/connectorTypes";
import {
  COUNTRY_REGISTRY,
  getCountryRegistryRecord,
  getPlatformRssSourceIds,
  PLATFORM_GLOBAL_SOURCES,
} from "@/lib/registry/countryRegistry";
import type {
  CountryRegistryEntry,
  RegistryStats,
  StrategicDataSource,
  StrategicSourceCategory,
} from "@/lib/registry/registryTypes";
import { STRATEGIC_SOURCE_CATEGORY_LABELS } from "@/lib/registry/registryTypes";

export function getSupportedRegistryCountries(): CountryRegistryEntry[] {
  return COUNTRY_REGISTRY;
}

export function getCountryRegistryEntry(countryId: CountryId): CountryRegistryEntry | undefined {
  return getCountryRegistryRecord(countryId);
}

export function getPlatformGlobalSources(): StrategicDataSource[] {
  return PLATFORM_GLOBAL_SOURCES;
}

export function getCountrySources(
  countryId: CountryId,
  category?: StrategicSourceCategory,
): StrategicDataSource[] {
  const entry = getCountryRegistryRecord(countryId);
  if (!entry) return [];
  if (!category) return entry.sources;
  return entry.sources.filter((source) => source.category === category);
}

export function getCountrySourcesByCategory(
  countryId: CountryId,
): Partial<Record<StrategicSourceCategory, StrategicDataSource[]>> {
  const entry = getCountryRegistryRecord(countryId);
  if (!entry) return {};

  return entry.sources.reduce<Partial<Record<StrategicSourceCategory, StrategicDataSource[]>>>(
    (groups, source) => {
      const bucket = groups[source.category] ?? [];
      bucket.push(source);
      groups[source.category] = bucket;
      return groups;
    },
    {},
  );
}

export function toRssFeedDefinition(
  source: StrategicDataSource,
  countryId?: CountryId,
): RssFeedDefinition | null {
  if (source.connectorType !== "rss" || !source.url) return null;

  return {
    id: source.id,
    label: source.label,
    url: source.url,
    country: countryId ?? source.countryId,
    credibility: source.credibility,
  };
}

export function getPlatformRssFeeds(): RssFeedDefinition[] {
  const activeIds = new Set(getPlatformRssSourceIds());

  return PLATFORM_GLOBAL_SOURCES.filter(
    (source) => activeIds.has(source.id) && source.connectorType === "rss",
  )
    .map((source) => toRssFeedDefinition(source))
    .filter((feed): feed is RssFeedDefinition => feed !== null);
}

export function getAllRegistryRssFeeds(): RssFeedDefinition[] {
  const feeds: RssFeedDefinition[] = [];
  const seen = new Set<string>();

  for (const source of PLATFORM_GLOBAL_SOURCES) {
    const feed = toRssFeedDefinition(source);
    if (!feed || seen.has(feed.id)) continue;
    seen.add(feed.id);
    feeds.push(feed);
  }

  for (const country of COUNTRY_REGISTRY) {
    for (const source of country.sources) {
      const feed = toRssFeedDefinition(source, country.id);
      if (!feed || seen.has(feed.id)) continue;
      seen.add(feed.id);
      feeds.push(feed);
    }
  }

  return feeds;
}

export function getRegistryStats(liveRssProviderCount = 0): RegistryStats {
  const countrySources = COUNTRY_REGISTRY.flatMap((entry) => entry.sources);
  const allSources = [...PLATFORM_GLOBAL_SOURCES, ...countrySources];
  const configuredSources = allSources.length;
  const registryActive = allSources.filter((source) => source.status === "active").length;

  return {
    supportedCountries: COUNTRY_REGISTRY.length,
    configuredSources,
    activeProviders: Math.max(registryActive, liveRssProviderCount),
  };
}

export function getCategoryLabel(category: StrategicSourceCategory): string {
  return STRATEGIC_SOURCE_CATEGORY_LABELS[category];
}

export function formatCountryMetadata(entry: CountryRegistryEntry): string {
  return `${entry.isoCode} · ${entry.region} · ${entry.language.toUpperCase()} · ${entry.currency} · ${entry.timeZone}`;
}
