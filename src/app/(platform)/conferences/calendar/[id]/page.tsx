import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConferenceDetailView } from "@/components/conference-calendar/ConferenceDetailView";
import { conferenceProvider, type ConferenceId } from "@/lib/intelligence";

type PageProps = {
  params: Promise<{ id: string }>;
};

const VALID_IDS: ConferenceId[] = ["aoco", "ada", "easo", "easd", "obesityweek"];

export async function generateStaticParams() {
  return VALID_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = conferenceProvider.getDetail(id as ConferenceId);
  if (!detail) return { title: "Conference Not Found" };
  return {
    title: `${detail.acronym} | Global Conference Calendar`,
    description: detail.overview,
  };
}

export default async function ConferenceDetailPage({ params }: PageProps) {
  const { id } = await params;
  if (!VALID_IDS.includes(id as ConferenceId)) notFound();
  const detail = conferenceProvider.getDetail(id as ConferenceId);
  if (!detail) notFound();
  return <ConferenceDetailView detail={detail} />;
}
