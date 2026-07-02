import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { conferenceProvider } from "@/lib/intelligence/conferenceProvider";

export function ConferenceDashboardWidgets() {
  const { upcoming, deadlines, abstractAlerts, travelPrep, countdown } =
    conferenceProvider.getDashboardIntel();

  return (
    <section className="rounded-2xl border border-gray-100/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] xl:col-span-2">
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 lg:px-6 lg:py-5">
        <div className="flex items-start gap-3">
          <span className="text-xl leading-none">📅</span>
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-900">Conference Intelligence</h2>
            <p className="mt-0.5 text-sm text-gray-500">Upcoming events, deadlines, and preparation alerts</p>
          </div>
        </div>
        <Link href="/conferences/calendar" prefetch={false} className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700">
          Open Calendar →
        </Link>
      </div>

      <div className="grid gap-4 p-5 lg:grid-cols-2 lg:p-6 xl:grid-cols-3">
        <Widget title="Upcoming Conferences">
          <ul className="space-y-2">
            {upcoming.slice(0, 4).map((c) => (
              <li key={c.id}>
                <Link href={`/conferences/calendar/${c.id}`} prefetch={false} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-gray-50">
                  <span className="font-medium text-gray-900">{c.acronym}</span>
                  <span className="text-xs text-gray-500">{conferenceProvider.daysUntil(c.startDate)}d</span>
                </Link>
              </li>
            ))}
          </ul>
        </Widget>

        <Widget title="Next Deadlines">
          <ul className="space-y-2">
            {deadlines.slice(0, 5).map((d, i) => (
              <li key={i} className="flex justify-between gap-2 text-xs">
                <span className="text-gray-700"><span className="font-semibold">{d.conference}</span> · {d.label}</span>
                <span className="shrink-0 text-gray-500">{d.date}</span>
              </li>
            ))}
          </ul>
        </Widget>

        {countdown && (
          <Widget title="Conference Countdown">
            <div className="flex flex-col items-center py-2 text-center">
              <p className="text-3xl font-bold tabular-nums text-blue-600">{countdown.days}</p>
              <p className="text-xs font-medium text-gray-500">days until {countdown.name}</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{countdown.fullName}</p>
            </div>
          </Widget>
        )}

        <Widget title="Travel Preparation">
          <ul className="space-y-2">
            {travelPrep.slice(0, 3).map((c) => (
              <li key={c.id} className="rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2 text-xs">
                <p className="font-medium text-gray-900">{c.acronym} — {c.city}</p>
                <p className="text-gray-500">Book travel · {conferenceProvider.daysUntil(c.startDate)} days out</p>
              </li>
            ))}
          </ul>
        </Widget>

        <Widget title="Abstract Submission Alerts">
          {abstractAlerts.length === 0 ? (
            <p className="text-xs text-gray-500">No urgent abstract deadlines</p>
          ) : (
            <ul className="space-y-2">
              {abstractAlerts.map((c) => (
                <li key={c.id} className="rounded-lg border border-red-100 bg-red-50/50 px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-red-800">{c.acronym}</p>
                    <Badge variant="red">{c.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-red-700">Abstract due: {c.abstractDeadline}</p>
                </li>
              ))}
            </ul>
          )}
        </Widget>
      </div>
    </section>
  );
}

function Widget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/30 p-4">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
