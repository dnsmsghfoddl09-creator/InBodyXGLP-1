import { type ReactNode } from "react";
import { PageToolbar } from "@/components/layout/PageToolbar";
import type { PageMeta } from "@/data/navigation";
import { ModuleCards } from "@/components/ui/ModuleCards";

type ModulePageProps = {
  meta: PageMeta;
  children?: ReactNode;
  showCards?: boolean;
};

export function ModulePage({ meta, children, showCards = true }: ModulePageProps) {
  return (
    <div className="flex-1">
      <div className="border-b border-gray-100 bg-white px-4 py-6 lg:px-8 lg:py-8">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">{meta.category}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 lg:text-3xl">
          {meta.title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500 lg:text-base">
          {meta.description}
        </p>
      </div>

      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <PageToolbar searchPlaceholder={meta.searchPlaceholder} />

        <div className="mb-8 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
            📋
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">{meta.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">{meta.emptyDescription}</p>
          <button
            type="button"
            className="mt-5 inline-flex h-10 items-center rounded-xl bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Add Widget
          </button>
        </div>

        {showCards && <ModuleCards pageId={meta.id} />}
        {children}
      </div>
    </div>
  );
}
