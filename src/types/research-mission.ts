import type { CountryId } from "@/data/countries";
import type { ConferenceId } from "@/types/conference";
import type { DeliverableType, MissionStatus, PriorityLevel } from "@/types/common";

export type EnterpriseResearchMission = {
  id: string;
  mission: string;
  description: string;
  theme: string;
  countryIds: CountryId[];
  status: MissionStatus;
  priority: PriorityLevel;
  progress: number;
  relatedConferenceId: ConferenceId | null;
  expectedDeliverables: DeliverableType[];
  assignedTeam: string[];
  deadline: string;
  createdAt: string;
  aiNotes: string[];
};

export type { CountryId };
