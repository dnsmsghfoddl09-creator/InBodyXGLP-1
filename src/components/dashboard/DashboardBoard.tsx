"use client";

import { useEffect, useState } from "react";
import { ConferenceDashboardWidgets } from "@/components/conference-calendar/ConferenceDashboardWidgets";
import { AddWidgetModal } from "@/components/dashboard/AddWidgetModal";
import { DashboardWidgetShell } from "@/components/dashboard/DashboardWidgetShell";
import {
  ExecutiveSummaryCard,
  QuickActionsWidget,
  StrategicSectionCard,
} from "@/components/dashboard/StrategicBrief";
import { dashboardProvider } from "@/lib/intelligence/dashboardProvider";
import {
  getWidgetDefinition,
  loadDashboardWidgets,
  saveDashboardWidgets,
  type DashboardWidgetId,
} from "@/lib/dashboard/widgets";

const SECTION_WIDGET_IDS = new Set<DashboardWidgetId>([
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
    DashboardWidgetId,
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

function renderWidget(id: DashboardWidgetId) {
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

export function DashboardBoard() {
  const [widgetIds, setWidgetIds] = useState<DashboardWidgetId[]>(
    dashboardProvider.getDefaultWidgetIds(),
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setWidgetIds(loadDashboardWidgets());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveDashboardWidgets(widgetIds);
  }, [widgetIds, hydrated]);

  const addWidget = (id: DashboardWidgetId) => {
    setWidgetIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  const removeWidget = (id: DashboardWidgetId) => {
    setWidgetIds((current) => current.filter((widgetId) => widgetId !== id));
  };

  const executiveSummaryId = widgetIds.find((id) => id === "executive-summary");
  const gridWidgetIds = widgetIds.filter((id) => id !== "executive-summary");

  return (
    <>
      {executiveSummaryId && (
        <div className="mb-8">
          <DashboardWidgetShell
            label={getWidgetDefinition("executive-summary").label}
            onRemove={() => removeWidget("executive-summary")}
          >
            {renderWidget("executive-summary")}
          </DashboardWidgetShell>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          Priority intelligence · transform information into action
        </h2>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-gray-400 sm:block">Updated today 8:00 AM KST</p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Widget
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {gridWidgetIds.map((id) => {
          const definition = getWidgetDefinition(id);
          return (
            <DashboardWidgetShell
              key={id}
              label={definition.label}
              onRemove={() => removeWidget(id)}
              className={definition.gridClassName}
            >
              {renderWidget(id)}
            </DashboardWidgetShell>
          );
        })}
        <QuickActionsWidget />
      </div>

      <AddWidgetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        catalog={dashboardProvider.getWidgetCatalog()}
        activeWidgetIds={widgetIds}
        onAdd={addWidget}
      />
    </>
  );
}
