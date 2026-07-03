export type DashboardWidgetId =
  | "executive-summary"
  | "intelligence"
  | "opportunities"
  | "competitors"
  | "conference"
  | "papers"
  | "regulatory"
  | "country-focus"
  | "content"
  | "weekly-missions";

export type DashboardWidgetDefinition = {
  id: DashboardWidgetId;
  label: string;
  description: string;
  emoji: string;
  gridClassName?: string;
};

export const DASHBOARD_WIDGET_CATALOG: DashboardWidgetDefinition[] = [
  {
    id: "intelligence",
    label: "Today's Intelligence",
    description: "Signals that should shape today's decisions",
    emoji: "🧠",
  },
  {
    id: "opportunities",
    label: "Business Opportunities",
    description: "Revenue and partnership plays worth pursuing now",
    emoji: "💡",
  },
  {
    id: "competitors",
    label: "Competitor Watch",
    description: "Moves from Novo Nordisk, Lilly, and emerging players",
    emoji: "🏢",
  },
  {
    id: "conference",
    label: "Conference Calendar",
    description: "Upcoming events, deadlines, and preparation alerts",
    emoji: "📅",
    gridClassName: "xl:col-span-2",
  },
  {
    id: "papers",
    label: "Recent Papers",
    description: "Publications that affect positioning and KOL conversations",
    emoji: "📚",
  },
  {
    id: "regulatory",
    label: "Regulatory Updates",
    description: "FDA, EMA, MFDS, and PMDA movements affecting market access",
    emoji: "📋",
  },
  {
    id: "country-focus",
    label: "Country Focus",
    description: "Regional priorities for HQ and overseas subsidiaries",
    emoji: "🌍",
  },
  {
    id: "content",
    label: "Content Opportunities",
    description: "Marketing and thought leadership gaps to fill",
    emoji: "🎬",
  },
  {
    id: "executive-summary",
    label: "Executive Summary",
    description: "Today's top strategic priority for leadership",
    emoji: "📋",
  },
  {
    id: "weekly-missions",
    label: "Weekly Mission",
    description: "Assigned research tasks for HQ and overseas teams",
    emoji: "📋",
  },
];

export const DEFAULT_DASHBOARD_WIDGET_IDS: DashboardWidgetId[] = [
  "executive-summary",
  "intelligence",
  "opportunities",
  "competitors",
  "conference",
  "papers",
  "regulatory",
  "country-focus",
  "content",
  "weekly-missions",
];

const STORAGE_KEY = "inbody-dashboard-widgets";

const VALID_WIDGET_IDS = new Set<DashboardWidgetId>(
  DASHBOARD_WIDGET_CATALOG.map((widget) => widget.id),
);

export function isDashboardWidgetId(value: string): value is DashboardWidgetId {
  return VALID_WIDGET_IDS.has(value as DashboardWidgetId);
}

export function sanitizeWidgetIds(ids: unknown): DashboardWidgetId[] {
  if (!Array.isArray(ids)) return DEFAULT_DASHBOARD_WIDGET_IDS;
  const filtered = ids.filter(
    (id): id is DashboardWidgetId => typeof id === "string" && isDashboardWidgetId(id),
  );
  return filtered.length > 0 ? filtered : DEFAULT_DASHBOARD_WIDGET_IDS;
}

export function loadDashboardWidgets(): DashboardWidgetId[] {
  if (typeof window === "undefined") return DEFAULT_DASHBOARD_WIDGET_IDS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DASHBOARD_WIDGET_IDS;
    return sanitizeWidgetIds(JSON.parse(raw));
  } catch {
    return DEFAULT_DASHBOARD_WIDGET_IDS;
  }
}

export function saveDashboardWidgets(ids: DashboardWidgetId[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function getWidgetDefinition(id: DashboardWidgetId): DashboardWidgetDefinition {
  const widget = DASHBOARD_WIDGET_CATALOG.find((entry) => entry.id === id);
  if (!widget) throw new Error(`Unknown dashboard widget: ${id}`);
  return widget;
}
