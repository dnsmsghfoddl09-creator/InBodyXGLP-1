import { CompetitorIntelligenceModule } from "@/components/competitors/CompetitorIntelligenceModule";

export default function CompetitorIntelligencePage() {
  return (
    <div className="flex-1">
      <div className="border-b border-gray-100 bg-white px-4 py-6 lg:px-8 lg:py-8">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Intelligence</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 lg:text-3xl">
          Competitor Intelligence
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500 lg:text-base">
          Track GLP-1 competitors across pipeline, clinical trials, partnerships, market expansion,
          and InBody strategic response opportunities.
        </p>
      </div>

      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <CompetitorIntelligenceModule variant="center" />
      </div>
    </div>
  );
}
