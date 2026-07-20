import {
  LIVE_DATA_ENABLED,
  type ConnectorDomain,
  type ConnectorResult,
  type ConnectorStatus,
  type DataSourceMode,
} from "@/lib/connectors/connectorTypes";

const statusByDomain = new Map<ConnectorDomain, ConnectorStatus>();

function setStatus(domain: ConnectorDomain, activeSource: DataSourceMode, lastError?: string) {
  statusByDomain.set(domain, {
    domain,
    activeSource,
    liveEnabled: LIVE_DATA_ENABLED,
    lastError,
  });
}

export function getConnectorStatus(domain: ConnectorDomain): ConnectorStatus {
  return (
    statusByDomain.get(domain) ?? {
      domain,
      activeSource: "mock",
      liveEnabled: LIVE_DATA_ENABLED,
    }
  );
}

export function getPlatformDataSourceMode(): DataSourceMode {
  if (!LIVE_DATA_ENABLED) return "mock";
  const statuses = Array.from(statusByDomain.values());
  if (statuses.some((status) => status.activeSource === "live")) return "live";
  return "mock";
}

export function getPlatformDataSourceLabel(): string {
  return getPlatformDataSourceMode() === "live" ? "Live" : "Mock";
}

export async function resolveWithLiveFallback<T>({
  domain,
  mock,
  live,
}: {
  domain: ConnectorDomain;
  mock: () => T;
  live: () => Promise<T> | T;
}): Promise<ConnectorResult<T>> {
  if (!LIVE_DATA_ENABLED) {
    setStatus(domain, "mock");
    return { data: mock(), source: "mock", domain };
  }

  try {
    const data = await live();
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new Error("Live connector returned no data");
    }
    setStatus(domain, "live");
    return { data, source: "live", domain };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Live connector failed";
    setStatus(domain, "mock", message);
    return { data: mock(), source: "mock", domain, error: message };
  }
}

export function resolveWithLiveFallbackSync<T>({
  domain,
  mock,
  live,
}: {
  domain: ConnectorDomain;
  mock: () => T;
  live: () => T;
}): ConnectorResult<T> {
  if (!LIVE_DATA_ENABLED) {
    setStatus(domain, "mock");
    return { data: mock(), source: "mock", domain };
  }

  try {
    const data = live();
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new Error("Live connector returned no data");
    }
    setStatus(domain, "live");
    return { data, source: "live", domain };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Live connector failed";
    setStatus(domain, "mock", message);
    return { data: mock(), source: "mock", domain, error: message };
  }
}
