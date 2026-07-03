import type { Metadata } from "next";
import { DailyBriefHeader } from "@/components/dashboard/StrategicBrief";
import { DashboardBoard } from "@/components/dashboard/DashboardBoard";
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
        <DashboardBoard />
      </div>
    </div>
  );
}
