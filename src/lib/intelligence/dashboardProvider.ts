import {
  executiveSummary,
  quickActions,
  strategicSections,
  type QuickAction,
  type StrategicInsight,
  type StrategicSection,
} from "@/lib/intelligence/data/strategic-brief";
import {
  DASHBOARD_WIDGET_CATALOG,
  DEFAULT_DASHBOARD_WIDGET_IDS,
  type DashboardWidgetDefinition,
  type DashboardWidgetId,
} from "@/lib/dashboard/widgets";

export type { QuickAction, StrategicInsight, StrategicSection };
export type { DashboardWidgetDefinition, DashboardWidgetId };

export const dashboardProvider = {
  getExecutiveSummary(): StrategicInsight {
    return executiveSummary;
  },

  getStrategicSections(): StrategicSection[] {
    return strategicSections;
  },

  getSection(id: string): StrategicSection {
    const section = strategicSections.find((s) => s.id === id);
    if (!section) throw new Error(`Missing dashboard section: ${id}`);
    return section;
  },

  getQuickActions(): QuickAction[] {
    return quickActions;
  },

  getAllPrioritizedInsights(): StrategicInsight[] {
    const all = [executiveSummary, ...strategicSections.flatMap((s) => s.insights)];
    return all.sort((a, b) => a.priority - b.priority);
  },

  countByPriority(priority: 1 | 2 | 3 | 4 | 5): number {
    return this.getAllPrioritizedInsights().filter((i) => i.priority === priority).length;
  },

  getWidgetCatalog(): DashboardWidgetDefinition[] {
    return DASHBOARD_WIDGET_CATALOG;
  },

  getDefaultWidgetIds(): DashboardWidgetId[] {
    return DEFAULT_DASHBOARD_WIDGET_IDS;
  },
};
