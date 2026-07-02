"use client";

import { useState } from "react";
import { MissionDashboard } from "@/components/weekly-research-mission/MissionDashboard";
import { MissionBuilder } from "@/components/weekly-research-mission/MissionBuilder";
import { CountryResearchStatus } from "@/components/weekly-research-mission/CountryResearchStatus";
import { AiResearchPlanner } from "@/components/weekly-research-mission/AiResearchPlanner";
import { ResearchTimeline } from "@/components/weekly-research-mission/ResearchTimeline";
import { ExportCenter } from "@/components/weekly-research-mission/ExportCenter";
import { ExpectedOutputPanel } from "@/components/weekly-research-mission/ExpectedOutputPanel";
import { DEFAULT_MISSION, type ResearchMission } from "@/data/weekly-research-mission";

export function WeeklyResearchMission() {
  const [mission, setMission] = useState<ResearchMission>(DEFAULT_MISSION);

  return (
    <div className="flex-1">
      <div className="border-b border-gray-100 bg-white px-4 py-6 lg:px-8 lg:py-8">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
          Global Intelligence
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 lg:text-3xl">
          Weekly Research Mission
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500 lg:text-base">
          Command center for the Global Strategy Marketing Team — create, track, and deliver
          weekly strategic research missions across priority markets.
        </p>
      </div>

      <div className="space-y-6 px-4 py-6 lg:px-8 lg:py-8">
        <MissionDashboard mission={mission} />
        <MissionBuilder onCreateMission={setMission} />

        <div className="grid gap-6 lg:grid-cols-2">
          <CountryResearchStatus statuses={mission.countryStatuses} />
          <div className="space-y-6">
            <ResearchTimeline stages={mission.timeline} />
            <ExportCenter />
          </div>
        </div>

        <AiResearchPlanner recommendations={mission.aiRecommendations} />

        <ExpectedOutputPanel selected={mission.expectedOutputs} />
      </div>
    </div>
  );
}
