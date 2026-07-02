import type { ResearchMission } from "@/data/weekly-research-mission";

type AiResearchPlannerProps = {
  recommendations: ResearchMission["aiRecommendations"];
};

export function AiResearchPlanner({ recommendations }: AiResearchPlannerProps) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white shadow-lg lg:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">AI Research Planner</p>
      <h3 className="mt-1 text-lg font-semibold">Strategic Research Recommendations</h3>
      <p className="mt-1 text-sm text-blue-200">
        AI-generated priorities based on mission scope, country gaps, and conference timeline
      </p>

      <ul className="mt-6 space-y-3">
        {recommendations.map((rec, i) => (
          <li
            key={rec}
            className="flex gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/20 text-xs font-bold text-blue-100">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-blue-50">{rec}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
