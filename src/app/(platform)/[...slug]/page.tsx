import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModulePage } from "@/components/layout/ModulePage";
import { getPageBySlug, getAllSlugs, segmentsToSlug } from "@/data/navigation";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug: slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(segmentsToSlug(slug));
  if (!page) return { title: "Not Found" };
  return {
    title: `${page.title} | InBody Global Strategy Intelligence`,
    description: page.description,
  };
}

export default async function DynamicModulePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(segmentsToSlug(slug));
  if (!page) notFound();
  return <ModulePage meta={page} showCards={page.id !== "ai-assistant" && page.id !== "settings"} />;
}
