"use client";

import type { WidgetDefinition, WidgetId } from "@/lib/widgets/registry";

type AddWidgetModalProps = {
  open: boolean;
  onClose: () => void;
  catalog: WidgetDefinition[];
  activeWidgetIds: WidgetId[];
  onAdd: (id: WidgetId) => void;
  subtitle?: string;
};

export function AddWidgetModal({
  open,
  onClose,
  catalog,
  activeWidgetIds,
  onAdd,
  subtitle = "Choose a widget to add to your executive dashboard",
}: AddWidgetModalProps) {
  if (!open) return null;

  const activeSet = new Set(activeWidgetIds);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close add widget dialog"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-widget-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 lg:px-6 lg:py-5">
          <div>
            <h2 id="add-widget-title" className="text-base font-semibold tracking-tight text-gray-900">
              Add Widget
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="max-h-[min(28rem,calc(100vh-12rem))] overflow-y-auto p-3 lg:p-4">
          {catalog.map((widget) => {
            const isActive = activeSet.has(widget.id);
            return (
              <li key={widget.id} className="mb-2 last:mb-0">
                <button
                  type="button"
                  disabled={isActive}
                  onClick={() => {
                    onAdd(widget.id);
                    onClose();
                  }}
                  className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                    isActive
                      ? "cursor-not-allowed border-gray-100 bg-gray-50 opacity-60"
                      : "border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50/40"
                  }`}
                >
                  <span className="text-xl leading-none">{widget.emoji}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-gray-900">{widget.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">
                      {widget.description}
                    </span>
                  </span>
                  {isActive ? (
                    <span className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-gray-400">
                      Added
                    </span>
                  ) : (
                    <span className="shrink-0 text-xs font-medium text-blue-600">Add</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
