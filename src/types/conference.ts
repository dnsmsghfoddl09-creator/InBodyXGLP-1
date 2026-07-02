import type { CountryId } from "@/data/countries";
import type { PriorityLevel } from "@/types/common";

export type ConferenceId = "aoco" | "ada" | "easo" | "easd" | "obesityweek";

export type ConferenceRegion = "APAC" | "North America" | "EMEA" | "Global" | "LATAM";

export type ConferenceCategory =
  | "Obesity"
  | "Diabetes"
  | "Nutrition"
  | "Sports Medicine"
  | "Multidisciplinary";

export type ConferenceTopicTag =
  | "GLP-1"
  | "Obesity"
  | "Diabetes"
  | "Nutrition"
  | "Sports Medicine";

export type ConferenceStatus =
  | "Upcoming"
  | "In Preparation"
  | "Registration Open"
  | "Abstract Due"
  | "Completed";

export type EnterpriseConference = {
  id: ConferenceId;
  name: string;
  acronym: string;
  date: string;
  endDate: string;
  location: string;
  region: string;
  topics: string[];
  relatedCountryIds: CountryId[];
  priority: PriorityLevel;
  inbodyPresence: string;
  notes: string[];
  preparationDeadline: string;
};

export type CalendarConference = {
  id: ConferenceId;
  name: string;
  acronym: string;
  startDate: string;
  endDate: string;
  displayDate: string;
  country: string;
  city: string;
  region: ConferenceRegion;
  category: ConferenceCategory;
  topicTags: ConferenceTopicTag[];
  status: ConferenceStatus;
  importance: PriorityLevel;
  preparationDeadline: string;
  abstractDeadline: string | null;
  registrationDeadline: string | null;
  travelLeadDays: number;
};

export type ConferenceSession = {
  title: string;
  track: string;
  date: string;
  speakers: string[];
};

export type ConferenceCompany = {
  name: string;
  role: "Exhibitor" | "Sponsor" | "Speaker" | "Partner";
  focus: string;
};

export type ConferenceActionItem = {
  task: string;
  owner: string;
  dueDate: string;
  status: "pending" | "in-progress" | "done";
};

export type ConferenceDetail = CalendarConference & {
  overview: string;
  importantDates: { label: string; date: string; note?: string }[];
  scientificTopics: string[];
  glp1Sessions: ConferenceSession[];
  obesitySessions: ConferenceSession[];
  kolIds: string[];
  kolNames: string[];
  companies: {
    novoNordisk: ConferenceCompany[];
    eliLilly: ConferenceCompany[];
    otherPlayers: ConferenceCompany[];
  };
  exhibition: {
    boothNumber: string;
    hall: string;
    hours: string;
    setupDate: string;
    notes: string[];
  };
  inbodyOpportunity: {
    summary: string;
    pipelineEstimate: string;
    targets: string[];
  };
  suggestedAgenda: { time: string; activity: string }[];
  actionItems: ConferenceActionItem[];
  relatedPapers: { title: string; journal: string; relevance: string }[];
  relatedNews: { title: string; source: string; date: string }[];
  relatedCountryIds: CountryId[];
  aiStrategySummary: string[];
};

export type { CountryId };
