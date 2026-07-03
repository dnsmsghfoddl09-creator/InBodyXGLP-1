export type {
  DashboardWidgetDefinition,
  DashboardWidgetId,
  WidgetDefinition,
  WidgetId,
  WidgetPageId,
} from "@/lib/widgets/registry";
export {
  DASHBOARD_WIDGET_CATALOG,
  DEFAULT_DASHBOARD_WIDGET_IDS,
  WIDGET_CATALOG,
  widgetRegistry,
  getWidgetDefinition,
  isDashboardWidgetId,
  loadDashboardWidgets,
  sanitizeWidgetIds,
  saveDashboardWidgets,
} from "@/lib/widgets/registry";
