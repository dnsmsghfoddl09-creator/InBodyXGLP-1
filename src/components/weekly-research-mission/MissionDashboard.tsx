import { Badge } from "@/components/ui/Badge";
import {
  getCountryMeta,
  PRIORITY_COLORS,
  PRIORITY_LABELS,
  type ResearchMission,
} from "@/data/weekly-research-mission";

type MissionDashboardProps = {
  mission: ResearchMission;
};

function ProgressRing({ percent }: { percent: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="-rotate-90" width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="8" />
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-xl font-bold tabular-nums text-blue-600">{percent}%</span>
    </div>
  );
}

export function MissionDashboard({ mission }: MissionDashboardProps) {
  const countries = mission.countryIds.map(getCountryMeta);

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-800 px-5 py-5 text-white lg:px-6 lg:py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">Today&apos;s Mission</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight lg:text-2xl">{mission.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-blue-100">{mission.description}</p>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <DashboardCell label="Mission Progress" value={`${mission.completionPercent}% complete`}>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${mission.completionPercent}%` }}
              />
            </div>
          </DashboardCell>

          <DashboardCell label="Target Countries">
            <div className="mt-2 flex flex-wrap gap-1.5">
              {countries.map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700"
                >
                  {c.flag} {c.name}
                </span>
              ))}
            </div>
          </DashboardCell>

          <DashboardCell label="Research Priority">
            <p className="mt-1 text-sm leading-relaxed text-gray-700">{mission.researchPriority}</p>
          </DashboardCell>

          <DashboardCell label="Deadline">
            <p className="mt-1 text-lg font-semibold text-gray-900">{mission.deadline}</p>
            <Badge variant="amber">{mission.conference}</Badge>
          </DashboardCell>

          <DashboardCell label="Assigned Team">
            <ul className="mt-1 space-y-1">
              {mission.assignedTeam.map((member) => (
                <li key={member} className="text-sm text-gray-700">
                  · {member}
                </li>
              ))}
            </ul>
          </DashboardCell>

          <DashboardCell label="Priority Level">
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white ${PRIORITY_COLORS[mission.priority]}`}
              >
                P{mission.priority}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {PRIORITY_LABELS[mission.priority]}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500">Theme: {mission.theme}</p>
          </DashboardCell>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Completion</p>
          <ProgressRing percent={mission.completionPercent} />
          <p className="mt-2 text-center text-xs text-gray-500">
            {mission.expectedOutputs.length} deliverables selected
          </p>
        </div>
      </div>
    </section>
  );
}

function DashboardCell({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      {value && <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>}
      {children}
    </div>
  );
}
