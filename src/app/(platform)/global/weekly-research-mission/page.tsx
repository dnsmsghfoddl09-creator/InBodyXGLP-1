import type { Metadata } from "next";
import { WeeklyResearchMission } from "@/components/weekly-research-mission/WeeklyResearchMission";

export const metadata: Metadata = {
  title: "Weekly Research Mission | InBody Global Strategy Intelligence",
  description: "Command center for weekly strategic research missions across global markets",
};

export default function WeeklyResearchMissionPage() {
  return <WeeklyResearchMission />;
}
