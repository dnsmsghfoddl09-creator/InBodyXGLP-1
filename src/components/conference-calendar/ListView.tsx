import { ConferenceCard } from "@/components/conference-calendar/ConferenceCard";
import type { CalendarConference } from "@/types/conference";

type ListViewProps = {
  conferences: CalendarConference[];
};

export function ListView({ conferences }: ListViewProps) {
  if (conferences.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
        <p className="text-sm font-medium text-gray-900">No conferences match your filters</p>
        <p className="mt-1 text-xs text-gray-500">Try adjusting search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {conferences.map((c) => (
        <ConferenceCard key={c.id} conference={c} />
      ))}
    </div>
  );
}
