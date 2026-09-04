import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { studiesData } from "@/data/studies";
import WorkDetail from "@/components/works/WorkDetail";

export function generateStaticParams() {
  return studiesData.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = studiesData.find((s) => s.slug === slug);
  if (!study) return { title: "Not Found" };

  return {
    title: study.title,
    description: study.longDescription.slice(0, 120),
    openGraph: {
      title: study.title,
      description: study.longDescription.slice(0, 120),
      images: [{ url: study.image }],
    },
  };
}

export default async function StudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = studiesData.find((s) => s.slug === slug);

  if (!study) notFound();

  return (
    <WorkDetail
      item={study}
      kicker="Study"
      backHref="/studies"
      backLabel="Study 一覧へ"
    />
  );
}
