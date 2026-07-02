import type { CountryId } from "@/data/countries";
import { latestNews } from "@/data/mock-data";
import type { IntelligenceProvider, News } from "@/lib/intelligence/types";

const NEWS_COUNTRY_MAP: Record<string, CountryId[]> = {
  "Supply Chain": ["japan", "south-korea", "indonesia", "thailand"],
  Regulatory: ["usa", "uk", "germany"],
  Earnings: ["usa"],
  "Digital Health": ["usa", "singapore", "australia"],
};

const MOCK_NEWS: News[] = latestNews.map((item, index) => ({
  id: `news-${index + 1}`,
  title: item.title,
  source: item.source,
  publishedAt: item.time,
  tag: item.tag,
  tags: [item.tag, "GLP-1", "News"],
  countryIds: NEWS_COUNTRY_MAP[item.tag] ?? ["usa"],
  summary: item.title,
}));

function matchesKeyword(item: News, keyword: string): boolean {
  const q = keyword.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    item.source.toLowerCase().includes(q) ||
    item.tag.toLowerCase().includes(q) ||
    item.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export const newsProvider: IntelligenceProvider<News, CountryId> = {
  getLatest() {
    return [...MOCK_NEWS];
  },

  getByCountry(country) {
    return MOCK_NEWS.filter((n) => n.countryIds.includes(country));
  },

  search(keyword) {
    if (!keyword.trim()) return this.getLatest();
    return MOCK_NEWS.filter((n) => matchesKeyword(n, keyword));
  },

  getRelated(tags) {
    if (tags.length === 0) return this.getLatest();
    const normalized = tags.map((t) => t.toLowerCase());
    return MOCK_NEWS.filter((n) =>
      n.tags.some((t) => normalized.includes(t.toLowerCase())),
    );
  },
};
