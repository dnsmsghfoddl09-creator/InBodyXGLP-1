import {
  executiveSummary,
  quickActions,
  strategicSections,
  type QuickAction,
  type StrategicInsight,
  type StrategicSection,
} from "@/lib/intelligence/data/strategic-brief";
import { intelligenceService } from "@/lib/intelligence/intelligenceService";
import {
  DASHBOARD_WIDGET_CATALOG,
  DEFAULT_DASHBOARD_WIDGET_IDS,
  type DashboardWidgetDefinition,
  type DashboardWidgetId,
} from "@/lib/dashboard/widgets";
import type { IntelligenceItem } from "@/lib/intelligence/types";
import { COUNTRY_LIST } from "@/data/countries";

export type { QuickAction, StrategicInsight, StrategicSection };
export type { DashboardWidgetDefinition, DashboardWidgetId };

const STATIC_SECTION_IDS = new Set([
  "opportunities",
  "country-focus",
  "content",
  "weekly-missions",
]);

function countryLabel(countryId: IntelligenceItem["country"]): string {
  return COUNTRY_LIST.find((c) => c.id === countryId)?.name ?? countryId;
}

function itemToInsight(item: IntelligenceItem): StrategicInsight {
  return {
    id: item.id,
    headline: item.title,
    whyItMatters: item.summary,
    businessImpact: `${item.importance} · ${item.category} · ${countryLabel(item.country)} · ${item.status}`,
    suggestedAction: `Review source (${item.source}). Track status: ${item.status}.`,
    priority: intelligenceService.importanceToPriority(item.importance),
  };
}

function buildLiveSection(
  base: StrategicSection,
  items: IntelligenceItem[],
  limit = 2,
): StrategicSection {
  const insights = items.slice(0, limit).map(itemToInsight);
  if (insights.length === 0) {
    return base;
  }
  return { ...base, insights };
}

function getLiveSections(): StrategicSection[] {
  return strategicSections.map((section) => {
    if (STATIC_SECTION_IDS.has(section.id)) {
      return section;
    }

    switch (section.id) {
      case "intelligence":
        return buildLiveSection(
          section,
          intelligenceService.getLatestNews(undefined, "importance"),
        );
      case "papers":
        return buildLiveSection(
          section,
          intelligenceService.getLatestPapers(undefined, "newest"),
        );
      case "regulatory":
        return buildLiveSection(
          section,
          intelligenceService.getLatestRegulations(undefined, "importance"),
        );
      case "competitors":
        return buildLiveSection(
          section,
          intelligenceService.getLatestCompetitors(undefined, "importance"),
        );
      case "conferences":
        return buildLiveSection(
          section,
          intelligenceService.getLatestConferences(undefined, "newest"),
        );
      default:
        return section;
    }
  });
}

let sectionsCache: StrategicSection[] | null = null;

function getSections(): StrategicSection[] {
  sectionsCache ??= getLiveSections();
  return sectionsCache;
}

export const dashboardProvider = {
  getExecutiveSummary(): StrategicInsight {
    return executiveSummary;
  },

  getStrategicSections(): StrategicSection[] {
    return getSections();
  },

  getSection(id: string): StrategicSection {
    const section = getSections().find((s) => s.id === id);
    if (!section) throw new Error(`Missing dashboard section: ${id}`);
    return section;
  },

  getQuickActions(): QuickAction[] {
    return quickActions;
  },

  getAllPrioritizedInsights(): StrategicInsight[] {
    const all = [executiveSummary, ...getSections().flatMap((s) => s.insights)];
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
