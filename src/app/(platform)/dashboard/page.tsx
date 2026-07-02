import type { Metadata } from "next";
import {
  DailyBriefHeader,
  ExecutiveSummaryCard,
  QuickActionsWidget,
  StrategicSectionCard,
} from "@/components/dashboard/StrategicBrief";
import { ConferenceDashboardWidgets } from "@/components/conference-calendar/ConferenceDashboardWidgets";
import { dashboardProvider } from "@/lib/intelligence/dashboardProvider";

export const metadata: Metadata = {
  title: "Executive Dashboard | InBody Global Strategy Intelligence",
  description: "What should the strategy team do today?",
};

export default function DashboardPage() {
  const p1 = dashboardProvider.countByPriority(1);
  const p2 = dashboardProvider.countByPriority(2);
  const total = dashboardProvider.getAllPrioritizedInsights().length;

  return (
    <div className="flex-1">
      <DailyBriefHeader criticalCount={p1} highCount={p2} totalActions={total} />

      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="mb-8">
          <ExecutiveSummaryCard insight={dashboardProvider.getExecutiveSummary()} />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Priority intelligence · transform information into action
          </h2>
          <p className="text-xs text-gray-400">Updated today 8:00 AM KST</p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <StrategicSectionCard section={dashboardProvider.getSection("intelligence")} />
          <StrategicSectionCard section={dashboardProvider.getSection("opportunities")} />
          <StrategicSectionCard section={dashboardProvider.getSection("competitors")} />
          <ConferenceDashboardWidgets />
          <StrategicSectionCard section={dashboardProvider.getSection("papers")} />
          <StrategicSectionCard section={dashboardProvider.getSection("regulatory")} />
          <StrategicSectionCard section={dashboardProvider.getSection("country-focus")} />
          <StrategicSectionCard section={dashboardProvider.getSection("content")} />
          <StrategicSectionCard section={dashboardProvider.getSection("weekly-missions")} />
          <QuickActionsWidget />
        </div>
      </div>
    </div>
  );
}
