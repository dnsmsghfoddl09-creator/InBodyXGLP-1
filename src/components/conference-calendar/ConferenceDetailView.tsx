import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { countryProvider } from "@/lib/intelligence";
import type { ConferenceDetail } from "@/types/conference";

type ConferenceDetailViewProps = {
  detail: ConferenceDetail;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ConferenceDetailView({ detail }: ConferenceDetailViewProps) {
  const countries = detail.relatedCountryIds
    .map((id) => countryProvider.listCountries().find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="flex-1">
      <div className="border-b border-gray-100 bg-white px-4 py-6 lg:px-8 lg:py-8">
        <Link href="/conferences/calendar" prefetch={false} className="text-xs font-medium text-blue-600 hover:text-blue-700">
          ← Global Conference Calendar
        </Link>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-blue-600">{detail.acronym}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 lg:text-3xl">{detail.name}</h1>
        <p className="mt-2 text-sm text-gray-500">{detail.displayDate} · {detail.city}, {detail.country}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="blue">{detail.region}</Badge>
          <Badge variant={detail.importance === 1 ? "red" : "amber"}>P{detail.importance} Importance</Badge>
          <Badge>{detail.status}</Badge>
        </div>
      </div>

      <div className="space-y-6 px-4 py-6 lg:px-8 lg:py-8">
        <Section title="Overview">
          <p className="text-sm leading-relaxed text-gray-700">{detail.overview}</p>
        </Section>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Important Dates">
            <ul className="space-y-2">
              {detail.importantDates.map((d) => (
                <li key={d.label} className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">{d.label}</span>
                  <span className="font-medium text-gray-900">{d.date}{d.note ? ` · ${d.note}` : ""}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Scientific Topics">
            <ul className="space-y-1.5">
              {detail.scientificTopics.map((t) => (
                <li key={t} className="text-sm text-gray-700">· {t}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="GLP-1 Sessions">
            {detail.glp1Sessions.map((s) => (
              <div key={s.title} className="mb-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3 last:mb-0">
                <p className="text-sm font-medium text-gray-900">{s.title}</p>
                <p className="mt-1 text-xs text-gray-500">{s.track} · {s.date}</p>
                <p className="mt-1 text-xs text-gray-600">{s.speakers.join(", ")}</p>
              </div>
            ))}
          </Section>
          <Section title="Obesity Sessions">
            {detail.obesitySessions.map((s) => (
              <div key={s.title} className="mb-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3 last:mb-0">
                <p className="text-sm font-medium text-gray-900">{s.title}</p>
                <p className="mt-1 text-xs text-gray-500">{s.track} · {s.date}</p>
                <p className="mt-1 text-xs text-gray-600">{s.speakers.join(", ")}</p>
              </div>
            ))}
          </Section>
        </div>

        <Section title="Key Opinion Leaders">
          <ul className="grid gap-2 sm:grid-cols-2">
            {detail.kolNames.map((k) => (
              <li key={k} className="rounded-xl border border-gray-100 bg-blue-50/30 px-3 py-2 text-sm text-gray-800">{k}</li>
            ))}
          </ul>
        </Section>

        <div className="grid gap-6 lg:grid-cols-3">
          <Section title="Novo Nordisk">
            {detail.companies.novoNordisk.map((c) => (
              <CompanyRow key={c.name} company={c} />
            ))}
          </Section>
          <Section title="Eli Lilly">
            {detail.companies.eliLilly.map((c) => (
              <CompanyRow key={c.name} company={c} />
            ))}
          </Section>
          <Section title="Other Industry Players">
            {detail.companies.otherPlayers.length === 0 ? (
              <p className="text-sm text-gray-500">No tracked players</p>
            ) : (
              detail.companies.otherPlayers.map((c) => <CompanyRow key={c.name} company={c} />)
            )}
          </Section>
        </div>

        <Section title="Exhibition Information">
          <dl className="grid gap-3 sm:grid-cols-2 text-sm">
            <div><dt className="text-gray-400">Booth</dt><dd className="font-medium text-gray-900">{detail.exhibition.boothNumber}</dd></div>
            <div><dt className="text-gray-400">Hall</dt><dd className="font-medium text-gray-900">{detail.exhibition.hall}</dd></div>
            <div><dt className="text-gray-400">Hours</dt><dd className="font-medium text-gray-900">{detail.exhibition.hours}</dd></div>
            <div><dt className="text-gray-400">Setup</dt><dd className="font-medium text-gray-900">{detail.exhibition.setupDate}</dd></div>
          </dl>
          <ul className="mt-3 space-y-1">
            {detail.exhibition.notes.map((n) => (
              <li key={n} className="text-xs text-gray-600">· {n}</li>
            ))}
          </ul>
        </Section>

        <Section title="InBody Opportunity">
          <p className="text-sm leading-relaxed text-gray-700">{detail.inbodyOpportunity.summary}</p>
          <p className="mt-2 text-sm font-semibold text-blue-600">{detail.inbodyOpportunity.pipelineEstimate}</p>
          <ul className="mt-3 space-y-1">
            {detail.inbodyOpportunity.targets.map((t) => (
              <li key={t} className="text-sm text-gray-700">· {t}</li>
            ))}
          </ul>
        </Section>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Suggested Meeting Agenda">
            <ul className="space-y-2">
              {detail.suggestedAgenda.map((a) => (
                <li key={a.time} className="flex gap-3 text-sm">
                  <span className="shrink-0 font-medium text-blue-600">{a.time}</span>
                  <span className="text-gray-700">{a.activity}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Action Items">
            <ul className="space-y-2">
              {detail.actionItems.map((a) => (
                <li key={a.task} className="rounded-xl border border-gray-100 bg-gray-50/50 p-3 text-sm">
                  <p className="font-medium text-gray-900">{a.task}</p>
                  <p className="mt-1 text-xs text-gray-500">{a.owner} · Due {a.dueDate}</p>
                  <Badge variant={a.status === "done" ? "green" : a.status === "in-progress" ? "amber" : "default"}>
                    {a.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Related Research Papers">
            {detail.relatedPapers.length === 0 ? (
              <p className="text-sm text-gray-500">None linked</p>
            ) : (
              detail.relatedPapers.map((p) => (
                <div key={p.title} className="mb-2 rounded-xl border border-gray-100 p-3 text-sm">
                  <p className="font-medium text-gray-900">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.journal}</p>
                  <p className="mt-1 text-xs text-blue-600">{p.relevance}</p>
                </div>
              ))
            )}
          </Section>
          <Section title="Related News">
            {detail.relatedNews.length === 0 ? (
              <p className="text-sm text-gray-500">None linked</p>
            ) : (
              detail.relatedNews.map((n) => (
                <div key={n.title} className="mb-2 rounded-xl border border-gray-100 p-3 text-sm">
                  <p className="font-medium text-gray-900">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.source} · {n.date}</p>
                </div>
              ))
            )}
          </Section>
        </div>

        <Section title="Related Countries">
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => c && (
              <span key={c.id} className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700">
                {c.flag} {c.name}
              </span>
            ))}
          </div>
        </Section>

        <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">AI Strategy Summary</p>
          <ul className="mt-4 space-y-3">
            {detail.aiStrategySummary.map((line) => (
              <li key={line} className="flex gap-3 rounded-xl bg-white/10 p-3 text-sm leading-relaxed text-blue-50">
                <span className="text-blue-200">✦</span>
                {line}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function CompanyRow({ company }: { company: { name: string; role: string; focus: string } }) {
  return (
    <div className="mb-2 rounded-xl border border-gray-100 bg-gray-50/50 p-3 text-sm last:mb-0">
      <p className="font-medium text-gray-900">{company.name}</p>
      <p className="text-xs text-gray-500">{company.role}</p>
      <p className="mt-1 text-xs text-gray-600">{company.focus}</p>
    </div>
  );
}
