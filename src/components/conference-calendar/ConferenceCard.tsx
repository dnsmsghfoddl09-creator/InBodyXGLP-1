import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { CalendarConference } from "@/types/conference";

const importanceVariant = (p: number): "red" | "amber" | "blue" =>
  p === 1 ? "red" : p === 2 ? "amber" : "blue";

const statusVariant = (s: string): "red" | "amber" | "green" | "default" =>
  s === "Abstract Due" ? "red" : s === "In Preparation" ? "amber" : s === "Registration Open" ? "green" : "default";

type ConferenceCardProps = {
  conference: CalendarConference;
  compact?: boolean;
};

export function ConferenceCard({ conference, compact = false }: ConferenceCardProps) {
  return (
    <Link
      href={`/conferences/calendar/${conference.id}`}
      prefetch={false}
      className="group block rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{conference.acronym}</p>
          <h3 className="mt-0.5 text-sm font-semibold leading-snug text-gray-900 group-hover:text-blue-700">
            {conference.name}
          </h3>
        </div>
        <Badge variant={importanceVariant(conference.importance)}>P{conference.importance}</Badge>
      </div>

      <dl className={`mt-3 grid gap-1.5 text-xs ${compact ? "" : "sm:grid-cols-2"}`}>
        <div className="flex justify-between gap-2 sm:block">
          <dt className="text-gray-400">Date</dt>
          <dd className="font-medium text-gray-700">{conference.displayDate}</dd>
        </div>
        <div className="flex justify-between gap-2 sm:block">
          <dt className="text-gray-400">Location</dt>
          <dd className="font-medium text-gray-700">{conference.city}, {conference.country}</dd>
        </div>
        <div className="flex justify-between gap-2 sm:block">
          <dt className="text-gray-400">Status</dt>
          <dd><Badge variant={statusVariant(conference.status)}>{conference.status}</Badge></dd>
        </div>
        <div className="flex justify-between gap-2 sm:block">
          <dt className="text-gray-400">Importance</dt>
          <dd className="font-medium text-gray-700">
            {conference.importance === 1 ? "Critical" : conference.importance === 2 ? "High" : "Medium"}
          </dd>
        </div>
      </dl>

      {!compact && (
        <div className="mt-3 flex flex-wrap gap-1">
          {conference.topicTags.map((tag) => (
            <span key={tag} className="rounded-md bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
