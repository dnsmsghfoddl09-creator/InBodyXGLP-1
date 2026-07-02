"use client";

import { useState, type ReactNode } from "react";

type CollapsibleSectionProps = {
  title: string;
  icon: string;
  badge?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function CollapsibleSection({
  title,
  icon,
  badge,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50/80 lg:px-6 lg:py-5"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-lg">
            {icon}
          </span>
          <h2 className="text-base font-semibold tracking-tight text-gray-900">{title}</h2>
          {badge && (
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-gray-100 px-5 py-5 lg:px-6 lg:py-6">{children}</div>
      )}
    </section>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-50 py-3 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <dt className="shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400 sm:w-44">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-gray-800">{value}</dd>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-100"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function DataGrid({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl>
      {rows.map((row) => (
        <DataRow key={row.label} label={row.label} value={row.value} />
      ))}
    </dl>
  );
}

export function ListBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="py-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <TagList items={items} />
    </div>
  );
}

export { TagList };
