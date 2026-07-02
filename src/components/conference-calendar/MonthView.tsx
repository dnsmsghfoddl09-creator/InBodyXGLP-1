import Link from "next/link";
import type { CalendarConference } from "@/types/conference";

type MonthViewProps = {
  year: number;
  month: number;
  conferences: CalendarConference[];
  onPrev: () => void;
  onNext: () => void;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function MonthView({ year, month, conferences, onPrev, onNext }: MonthViewProps) {
  const monthLabel = new Date(year, month).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function conferencesOnDay(day: number) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return conferences.filter((c) => c.startDate <= dateStr && c.endDate >= dateStr);
  }

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{monthLabel}</h3>
        <div className="flex gap-1">
          <button type="button" onClick={onPrev} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">‹</button>
          <button type="button" onClick={onNext} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-gray-100 bg-gray-100">
        {WEEKDAYS.map((d) => (
          <div key={d} className="bg-gray-50 px-1 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          const dayConfs = day ? conferencesOnDay(day) : [];
          return (
            <div key={i} className="min-h-[72px] bg-white p-1.5">
              {day && (
                <>
                  <span className="text-xs font-medium text-gray-500">{day}</span>
                  <div className="mt-1 space-y-0.5">
                    {dayConfs.map((c) => (
                      <Link
                        key={c.id}
                        href={`/conferences/calendar/${c.id}`}
                        prefetch={false}
                        className="block truncate rounded bg-blue-50 px-1 py-0.5 text-[10px] font-medium text-blue-700 hover:bg-blue-100"
                      >
                        {c.acronym}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
