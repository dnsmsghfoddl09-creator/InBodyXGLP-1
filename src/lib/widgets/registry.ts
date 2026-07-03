export type WidgetPageId = "dashboard" | "country-compare" | "country-explorer";

export type WidgetId =
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

export type WidgetDefinition = {
  id: WidgetId;
  label: string;
  description: string;
  emoji: string;
  gridClassName?: string;
};

export const WIDGET_CATALOG: WidgetDefinition[] = [
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

const PAGE_DEFAULTS: Record<WidgetPageId, WidgetId[]> = {
  dashboard: [
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
  ],
  "country-compare": [],
  "country-explorer": [],
};

const STORAGE_KEYS: Record<WidgetPageId, string> = {
  dashboard: "inbody-widgets-dashboard",
  "country-compare": "inbody-widgets-country-compare",
  "country-explorer": "inbody-widgets-country-explorer",
};

const LEGACY_DASHBOARD_KEY = "inbody-dashboard-widgets";

const VALID_WIDGET_IDS = new Set<WidgetId>(WIDGET_CATALOG.map((widget) => widget.id));

export const widgetRegistry = {
  getCatalog(): WidgetDefinition[] {
    return WIDGET_CATALOG;
  },

  getDefaultIds(pageId: WidgetPageId): WidgetId[] {
    return PAGE_DEFAULTS[pageId];
  },

  getDefinition(id: WidgetId): WidgetDefinition {
    const widget = WIDGET_CATALOG.find((entry) => entry.id === id);
    if (!widget) throw new Error(`Unknown widget: ${id}`);
    return widget;
  },

  load(pageId: WidgetPageId): WidgetId[] {
    if (typeof window === "undefined") return PAGE_DEFAULTS[pageId];
    try {
      let raw = window.localStorage.getItem(STORAGE_KEYS[pageId]);
      if (pageId === "dashboard" && !raw) {
        raw = window.localStorage.getItem(LEGACY_DASHBOARD_KEY);
      }
      if (!raw) return PAGE_DEFAULTS[pageId];
      return widgetRegistry.sanitizeIds(pageId, JSON.parse(raw));
    } catch {
      return PAGE_DEFAULTS[pageId];
    }
  },

  save(pageId: WidgetPageId, ids: WidgetId[]): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS[pageId], JSON.stringify(ids));
  },

  sanitizeIds(pageId: WidgetPageId, ids: unknown): WidgetId[] {
    if (!Array.isArray(ids)) return PAGE_DEFAULTS[pageId];
    const filtered = ids.filter(
      (id): id is WidgetId => typeof id === "string" && VALID_WIDGET_IDS.has(id as WidgetId),
    );
    return pageId === "dashboard"
      ? filtered.length > 0
        ? filtered
        : PAGE_DEFAULTS.dashboard
      : filtered;
  },
};

export type DashboardWidgetId = WidgetId;
export type DashboardWidgetDefinition = WidgetDefinition;
export const DASHBOARD_WIDGET_CATALOG = WIDGET_CATALOG;
export const DEFAULT_DASHBOARD_WIDGET_IDS = PAGE_DEFAULTS.dashboard;

export function isDashboardWidgetId(value: string): value is WidgetId {
  return VALID_WIDGET_IDS.has(value as WidgetId);
}

export function sanitizeWidgetIds(ids: unknown): WidgetId[] {
  return widgetRegistry.sanitizeIds("dashboard", ids);
}

export function loadDashboardWidgets(): WidgetId[] {
  return widgetRegistry.load("dashboard");
}

export function saveDashboardWidgets(ids: WidgetId[]): void {
  widgetRegistry.save("dashboard", ids);
}

export function getWidgetDefinition(id: WidgetId): WidgetDefinition {
  return widgetRegistry.getDefinition(id);
}
