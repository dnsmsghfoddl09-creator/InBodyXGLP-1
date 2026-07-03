"use client";

import { ConferenceDashboardWidgets } from "@/components/conference-calendar/ConferenceDashboardWidgets";
import {
  ExecutiveSummaryCard,
  StrategicSectionCard,
} from "@/components/dashboard/StrategicBrief";
import { dashboardProvider } from "@/lib/intelligence/dashboardProvider";
import type { WidgetId } from "@/lib/widgets/registry";

const SECTION_WIDGET_IDS = new Set<WidgetId>([
  "intelligence",
  "opportunities",
  "competitors",
  "papers",
  "regulatory",
  "country-focus",
  "content",
  "weekly-missions",
]);

const SECTION_ID_BY_WIDGET: Record<
  Extract<
    WidgetId,
    | "intelligence"
    | "opportunities"
    | "competitors"
    | "papers"
    | "regulatory"
    | "country-focus"
    | "content"
    | "weekly-missions"
  >,
  string
> = {
  intelligence: "intelligence",
  opportunities: "opportunities",
  competitors: "competitors",
  papers: "papers",
  regulatory: "regulatory",
  "country-focus": "country-focus",
  content: "content",
  "weekly-missions": "weekly-missions",
};

export function renderWidget(id: WidgetId) {
  if (id === "executive-summary") {
    return <ExecutiveSummaryCard insight={dashboardProvider.getExecutiveSummary()} />;
  }

  if (id === "conference") {
    return <ConferenceDashboardWidgets />;
  }

  if (SECTION_WIDGET_IDS.has(id)) {
    const sectionId = SECTION_ID_BY_WIDGET[id as keyof typeof SECTION_ID_BY_WIDGET];
    return <StrategicSectionCard section={dashboardProvider.getSection(sectionId)} />;
  }

  return null;
}
