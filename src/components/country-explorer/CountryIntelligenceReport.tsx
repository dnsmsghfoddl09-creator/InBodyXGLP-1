"use client";

import { Badge } from "@/components/ui/Badge";
import {
  CollapsibleSection,
  DataGrid,
  ListBlock,
} from "@/components/country-explorer/CollapsibleSection";
import type { CountryReport } from "@/lib/intelligence";

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 85 ? "text-blue-600 bg-blue-50 border-blue-200" :
    score >= 75 ? "text-emerald-600 bg-emerald-50 border-emerald-200" :
    "text-amber-600 bg-amber-50 border-amber-200";

  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border px-6 py-5 ${color}`}>
      <span className="text-4xl font-bold tabular-nums">{score}</span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-80">
        Opportunity Score
      </span>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: 1 | 2 | 3 | 4 | 5 }) {
  const variant = priority <= 2 ? "red" : priority <= 3 ? "amber" : "blue";
  return <Badge variant={variant}>P{priority}</Badge>;
}

type CountryIntelligenceReportProps = {
  report: CountryReport;
};

export function CountryIntelligenceReport({ report }: CountryIntelligenceReportProps) {
  const { overview } = report;

  return (
    <div className="space-y-4">
      {/* Overview hero */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{report.flag}</span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">{report.name}</h2>
              <p className="text-sm text-gray-500">{report.region} · Country Intelligence Report</p>
            </div>
          </div>
          <ScoreRing score={overview.opportunityScore} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Population", value: overview.population },
            { label: "Obesity", value: overview.obesityPrevalence },
            { label: "GLP-1 Maturity", value: overview.glp1MarketMaturity },
            { label: "Market Growth", value: overview.marketGrowth },
          ].map((m) => (
            <div key={m.label} className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{m.label}</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      <CollapsibleSection title="Overview" icon="🌍" defaultOpen badge="Summary">
        <DataGrid
          rows={[
            { label: "Country", value: report.name },
            { label: "Population", value: overview.population },
            { label: "Obesity Prevalence", value: overview.obesityPrevalence },
            { label: "GLP-1 Market Maturity", value: overview.glp1MarketMaturity },
            { label: "Market Growth", value: overview.marketGrowth },
            { label: "Opportunity Score", value: `${overview.opportunityScore} / 100` },
          ]}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Regulation" icon="⚖️" badge="Compliance">
        <DataGrid
          rows={[
            { label: "Approved GLP-1 Products", value: report.regulation.approvedProducts.join(", ") },
            { label: "Approved Indications", value: report.regulation.approvedIndications.join(", ") },
            { label: "Who Can Prescribe?", value: report.regulation.prescribers },
            { label: "Prescription Restrictions", value: report.regulation.prescriptionRestrictions },
            { label: "Off-Label Status", value: report.regulation.offLabelStatus },
          ]}
        />
        <ListBlock label="Recent Regulatory Updates" items={report.regulation.recentUpdates} />
      </CollapsibleSection>

      <CollapsibleSection title="Insurance" icon="🏦" badge={report.insurance.coverage}>
        <DataGrid
          rows={[
            { label: "Insurance Coverage", value: report.insurance.coverage },
            { label: "Public Insurance", value: report.insurance.publicInsurance },
            { label: "Private Insurance", value: report.insurance.privateInsurance },
            { label: "Out-of-Pocket Payment", value: report.insurance.outOfPocket },
            { label: "Est. Monthly Patient Cost", value: report.insurance.monthlyPatientCost },
          ]}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Treatment Ecosystem" icon="🏥">
        <DataGrid
          rows={[
            { label: "Hospitals", value: report.treatmentEcosystem.hospitals },
            { label: "Clinics", value: report.treatmentEcosystem.clinics },
            { label: "Pharmacies", value: report.treatmentEcosystem.pharmacies },
            { label: "Telemedicine", value: report.treatmentEcosystem.telemedicine },
            { label: "Weight Management Centers", value: report.treatmentEcosystem.weightManagementCenters },
          ]}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Consumer Insights" icon="📊">
        <DataGrid
          rows={[
            { label: "Awareness", value: report.consumerInsights.awareness },
            { label: "Social Media Interest", value: report.consumerInsights.socialMediaInterest },
            { label: "Search Trends", value: report.consumerInsights.searchTrends },
          ]}
        />
        <ListBlock label="Consumer Concerns" items={report.consumerInsights.concerns} />
        <ListBlock label="Popular Keywords" items={report.consumerInsights.popularKeywords} />
      </CollapsibleSection>

      <CollapsibleSection title="Competitor Landscape" icon="🏢">
        <DataGrid
          rows={[
            { label: "Novo Nordisk", value: report.competitorLandscape.novoNordisk },
            { label: "Eli Lilly", value: report.competitorLandscape.lilly },
            { label: "Competitive Activity", value: report.competitorLandscape.competitiveActivity },
          ]}
        />
        <ListBlock label="Local Competitors" items={report.competitorLandscape.localCompetitors} />
        <ListBlock label="Market Leaders" items={report.competitorLandscape.marketLeaders} />
      </CollapsibleSection>

      <CollapsibleSection title="Digital Health" icon="📱">
        <ListBlock label="Major Obesity Apps" items={report.digitalHealth.obesityApps} />
        <ListBlock label="Patient Communities" items={report.digitalHealth.patientCommunities} />
        <ListBlock label="Online Consultation Platforms" items={report.digitalHealth.onlineConsultation} />
        <DataGrid rows={[{ label: "Remote Monitoring", value: report.digitalHealth.remoteMonitoring }]} />
      </CollapsibleSection>

      <CollapsibleSection title="Key Opinion Leaders" icon="👨‍⚕️">
        <ListBlock label="Top Hospitals" items={report.kol.topHospitals} />
        <ListBlock label="Leading Professors" items={report.kol.leadingProfessors} />
        <ListBlock label="Medical Societies" items={report.kol.medicalSocieties} />
        <ListBlock label="Major Conferences" items={report.kol.majorConferences} />
      </CollapsibleSection>

      <CollapsibleSection title="Business Opportunities" icon="💡" badge="5 opportunities" defaultOpen>
        <div className="grid gap-4 lg:grid-cols-2">
          {report.businessOpportunities.map((opp) => (
            <article
              key={opp.title}
              className="rounded-xl border border-gray-100 bg-gray-50/50 p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold leading-snug text-gray-900">{opp.title}</h3>
                <PriorityBadge priority={opp.priority} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{opp.description}</p>
              <dl className="mt-4 space-y-2 text-xs">
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-gray-400">Business Impact</dt>
                  <dd className="mt-0.5 text-gray-700">{opp.businessImpact}</dd>
                </div>
                <div className="flex gap-4">
                  <div>
                    <dt className="font-semibold uppercase tracking-wider text-gray-400">Difficulty</dt>
                    <dd className="mt-0.5">
                      <Badge variant={opp.difficulty === "High" ? "red" : opp.difficulty === "Medium" ? "amber" : "green"}>
                        {opp.difficulty}
                      </Badge>
                    </dd>
                  </div>
                </div>
                <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3">
                  <dt className="font-semibold uppercase tracking-wider text-blue-600">Recommended Action</dt>
                  <dd className="mt-1 font-medium text-gray-900">{opp.recommendedAction}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="AI Strategy" icon="🤖" badge="Executive" defaultOpen>
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">
            AI-Generated Executive Strategy Summary
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-blue-200">Why this country matters</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-50">{report.aiStrategy.whyMatters}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-200">Why now</h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-50">{report.aiStrategy.whyNow}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-blue-200">Recommended actions</h3>
              <ul className="mt-3 space-y-2">
                {report.aiStrategy.recommendedActions.map((action) => (
                  <li key={action} className="flex gap-2 text-sm text-blue-50">
                    <span className="text-blue-300">→</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white p-4 text-gray-900">
              <h3 className="text-sm font-semibold text-red-600">Potential risks</h3>
              <ul className="mt-3 space-y-2">
                {report.aiStrategy.potentialRisks.map((risk) => (
                  <li key={risk} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-red-400">⚠</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
