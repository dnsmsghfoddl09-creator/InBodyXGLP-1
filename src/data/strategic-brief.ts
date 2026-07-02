/**
 * @deprecated Import from `@/lib/intelligence` instead.
 */
import { dashboardProvider } from "@/lib/intelligence/dashboardProvider";

export type {
  QuickAction,
  StrategicInsight,
  StrategicSection,
} from "@/lib/intelligence/dashboardProvider";

export const executiveSummary = dashboardProvider.getExecutiveSummary();
export const strategicSections = dashboardProvider.getStrategicSections();
export const quickActions = dashboardProvider.getQuickActions();
export const getDashboardSections = dashboardProvider.getStrategicSections.bind(dashboardProvider);
export const getAllPrioritizedInsights = dashboardProvider.getAllPrioritizedInsights.bind(dashboardProvider);
export const countByPriority = dashboardProvider.countByPriority.bind(dashboardProvider);
