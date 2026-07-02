import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getPageMockCards } from "@/data/page-mock-cards";

type ModuleCardsProps = {
  pageId: string;
  title?: string;
};

export function ModuleCards({ pageId, title = "Preview Data" }: ModuleCardsProps) {
  const cards = getPageMockCards(pageId);

  if (cards.length === 0) return null;

  return (
    <Card title={title} subtitle="Sample records from mock data">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors hover:border-blue-100 hover:bg-blue-50/30"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-snug text-gray-900">{item.title}</p>
              {item.badge && <Badge variant="blue">{item.badge}</Badge>}
            </div>
            {item.subtitle && (
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{item.subtitle}</p>
            )}
            {item.meta && <p className="mt-2 text-xs font-medium text-gray-400">{item.meta}</p>}
          </div>
        ))}
      </div>
    </Card>
  );
}
