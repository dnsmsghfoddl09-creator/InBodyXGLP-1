export type PriorityLevel = 1 | 2 | 3 | 4 | 5;

export type MissionStatus =
  | "planning"
  | "in-progress"
  | "review"
  | "completed"
  | "on-hold";

export type DeliverableType =
  | "executive-summary"
  | "comparison-table"
  | "market-report"
  | "powerpoint-draft"
  | "meeting-agenda"
  | "email-draft"
  | "kol-list"
  | "competitor-analysis"
  | "business-opportunities";

export const DELIVERABLE_LABELS: Record<DeliverableType, string> = {
  "executive-summary": "Executive Summary",
  "comparison-table": "Comparison Table",
  "market-report": "Market Report",
  "powerpoint-draft": "PowerPoint Draft",
  "meeting-agenda": "Meeting Agenda",
  "email-draft": "Email Draft",
  "kol-list": "KOL List",
  "competitor-analysis": "Competitor Analysis",
  "business-opportunities": "Business Opportunities",
};

export type MarketMaturity = "Emerging" | "Developing" | "Mature" | "Advanced";

export type CoverageLevel = "Limited" | "Partial" | "Broad" | "Comprehensive";

export type InfluenceTier = "Global" | "Regional" | "National" | "Emerging";
