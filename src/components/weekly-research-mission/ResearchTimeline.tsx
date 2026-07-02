import type { TimelineStage } from "@/data/weekly-research-mission";

type ResearchTimelineProps = {
  stages: TimelineStage[];
};

const statusStyles = {
  completed: { dot: "bg-emerald-500 ring-emerald-100", line: "bg-emerald-200", badge: "text-emerald-700 bg-emerald-50" },
  "in-progress": { dot: "bg-blue-600 ring-blue-100 animate-pulse", line: "bg-blue-200", badge: "text-blue-700 bg-blue-50" },
  pending: { dot: "bg-gray-300 ring-gray-100", line: "bg-gray-200", badge: "text-gray-500 bg-gray-50" },
};

export function ResearchTimeline({ stages }: ResearchTimelineProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
      <h3 className="text-sm font-semibold text-gray-900">Research Timeline</h3>
      <p className="mt-1 text-xs text-gray-500">Mission lifecycle from creation to executive delivery</p>

      <div className="mt-6">
        {stages.map((stage, index) => {
          const style = statusStyles[stage.status];
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast && (
                <div
                  className={`absolute left-[11px] top-6 h-[calc(100%-12px)] w-0.5 ${style.line}`}
                  aria-hidden
                />
              )}
              <div className={`relative z-10 mt-0.5 h-6 w-6 shrink-0 rounded-full ring-4 ${style.dot}`} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{stage.label}</p>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${style.badge}`}>
                    {stage.status.replace("-", " ")}
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-gray-500">{stage.date}</p>
                {stage.detail && (
                  <p className="mt-1 text-xs leading-relaxed text-gray-600">{stage.detail}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
