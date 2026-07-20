import { NewsIntelligenceModule } from "@/components/news/NewsIntelligenceModule";

export default function NewsIntelligencePage() {
  return (
    <div className="flex-1">
      <div className="border-b border-gray-100 bg-white px-4 py-6 lg:px-8 lg:py-8">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Intelligence</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 lg:text-3xl">
          News Center
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500 lg:text-base">
          Curated GLP-1 and obesity care headlines from global sources with executive summaries,
          business impact, and recommended actions for InBody strategy teams.
        </p>
      </div>

      <div className="px-4 py-6 lg:px-8 lg:py-8">
        <NewsIntelligenceModule variant="center" />
      </div>
    </div>
  );
}
