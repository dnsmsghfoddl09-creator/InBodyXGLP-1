"use client";

import { useEffect, useState } from "react";
import { AddWidgetModal } from "@/components/widgets/AddWidgetModal";
import { renderWidget } from "@/components/widgets/renderWidget";
import { WidgetShell } from "@/components/widgets/WidgetShell";
import { QuickActionsWidget } from "@/components/dashboard/StrategicBrief";
import { getLiveNewsMetadata, getPlatformDataSourceMode, hydrateNewsCacheFromApi, LIVE_DATA_ENABLED, subscribeNewsCache } from "@/lib/connectors";
import { widgetRegistry, type WidgetId, type WidgetPageId } from "@/lib/widgets/registry";

type WidgetBoardProps = {
  pageId: WidgetPageId;
  modalOpen?: boolean;
  onModalOpenChange?: (open: boolean) => void;
  showToolbar?: boolean;
  modalSubtitle?: string;
};

export function AddWidgetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add Widget
    </button>
  );
}

function WidgetGrid({
  widgetIds,
  onRemove,
}: {
  widgetIds: WidgetId[];
  onRemove: (id: WidgetId) => void;
}) {
  if (widgetIds.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {widgetIds.map((id) => {
        const definition = widgetRegistry.getDefinition(id);
        return (
          <WidgetShell
            key={id}
            label={definition.label}
            onRemove={() => onRemove(id)}
            className={definition.gridClassName}
          >
            {renderWidget(id)}
          </WidgetShell>
        );
      })}
    </div>
  );
}

function DataSourceStatusIndicator() {
  const [meta, setMeta] = useState(getLiveNewsMetadata());
  const isLive = getPlatformDataSourceMode() === "live";

  useEffect(() => {
    if (LIVE_DATA_ENABLED) {
      void hydrateNewsCacheFromApi().then(setMeta);
    }
    return subscribeNewsCache(() => setMeta(getLiveNewsMetadata()));
  }, []);

  const lastUpdated = meta.lastUpdated
    ? new Date(meta.lastUpdated).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600">
        <span className={`h-2 w-2 rounded-full ${isLive ? "bg-emerald-500" : "bg-blue-500"}`} />
        Data Source · {meta.dataSource}
      </span>
      <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600">
        Last Updated · {lastUpdated}
      </span>
      <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600">
        RSS Providers · {meta.rssProviderCount}
      </span>
    </div>
  );
}

export function WidgetBoard({
  pageId,
  modalOpen: controlledOpen,
  onModalOpenChange,
  showToolbar = pageId === "dashboard",
  modalSubtitle,
}: WidgetBoardProps) {
  const [widgetIds, setWidgetIds] = useState<WidgetId[]>(widgetRegistry.getDefaultIds(pageId));
  const [internalOpen, setInternalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const modalOpen = controlledOpen ?? internalOpen;
  const setModalOpen = onModalOpenChange ?? setInternalOpen;

  useEffect(() => {
    setWidgetIds(widgetRegistry.load(pageId));
    setHydrated(true);
  }, [pageId]);

  useEffect(() => {
    if (!hydrated) return;
    widgetRegistry.save(pageId, widgetIds);
  }, [widgetIds, hydrated, pageId]);

  const addWidget = (id: WidgetId) => {
    setWidgetIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  const removeWidget = (id: WidgetId) => {
    setWidgetIds((current) => current.filter((widgetId) => widgetId !== id));
  };

  if (pageId === "dashboard") {
    const executiveSummaryId = widgetIds.find((id) => id === "executive-summary");
    const gridWidgetIds = widgetIds.filter((id) => id !== "executive-summary");

    return (
      <>
        {executiveSummaryId && (
          <div className="mb-8">
            <WidgetShell
              label={widgetRegistry.getDefinition("executive-summary").label}
              onRemove={() => removeWidget("executive-summary")}
            >
              {renderWidget("executive-summary")}
            </WidgetShell>
          </div>
        )}

        {showToolbar && (
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Priority intelligence · transform information into action
            </h2>
            <div className="flex items-center gap-3">
              <DataSourceStatusIndicator />
              <p className="hidden text-xs text-gray-400 sm:block">Updated today 8:00 AM KST</p>
              <AddWidgetButton onClick={() => setModalOpen(true)} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {gridWidgetIds.map((id) => {
            const definition = widgetRegistry.getDefinition(id);
            return (
              <WidgetShell
                key={id}
                label={definition.label}
                onRemove={() => removeWidget(id)}
                className={definition.gridClassName}
              >
                {renderWidget(id)}
              </WidgetShell>
            );
          })}
          <QuickActionsWidget />
        </div>

        <AddWidgetModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          catalog={widgetRegistry.getCatalog()}
          activeWidgetIds={widgetIds}
          onAdd={addWidget}
          subtitle={modalSubtitle}
        />
      </>
    );
  }

  return (
    <>
      {widgetIds.length > 0 && (
        <div className="mb-8">
          <WidgetGrid widgetIds={widgetIds} onRemove={removeWidget} />
        </div>
      )}

      <AddWidgetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        catalog={widgetRegistry.getCatalog()}
        activeWidgetIds={widgetIds}
        onAdd={addWidget}
        subtitle={
          modalSubtitle ??
          (pageId === "country-compare"
            ? "Choose a widget to add to Country Compare"
            : "Choose a widget to add to Country Explorer")
        }
      />
    </>
  );
}
