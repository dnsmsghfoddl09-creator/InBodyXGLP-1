export type { PageMeta, NavLink, NavGroup } from "./pages";
export {
  pageRegistry,
  sidebarGroups,
  PLATFORM_NAME,
  getPageBySlug,
  getAllSlugs,
  slugToSegments,
  segmentsToSlug,
} from "./pages";

import { pageRegistry, type PageMeta } from "./pages";

export const pageMeta: Record<string, PageMeta> = Object.fromEntries(
  pageRegistry.map((page) => [page.id, page]),
);

export function getPageMeta(key: string): PageMeta {
  return pageMeta[key] ?? pageRegistry[0];
}
