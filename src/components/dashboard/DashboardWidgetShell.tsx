"use client";

import type { ReactNode } from "react";

type DashboardWidgetShellProps = {
  label: string;
  onRemove: () => void;
  className?: string;
  children: ReactNode;
};

export function DashboardWidgetShell({
  label,
  onRemove,
  className = "",
  children,
}: DashboardWidgetShellProps) {
  return (
    <div className={`relative [&_section>div:first-child]:pr-12 ${className}`.trim()}>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-3 top-3 z-20 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white/95 text-gray-400 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        aria-label={`Remove ${label} widget`}
        title={`Remove ${label}`}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {children}
    </div>
  );
}
