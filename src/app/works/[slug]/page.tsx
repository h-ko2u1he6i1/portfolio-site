import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { worksData } from "@/data/works";
import WorkDetail from "@/components/works/WorkDetail";

export function generateStaticParams() {
  return worksData.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = worksData.find((w) => w.slug === slug);
  if (!work) return { title: "Not Found" };

  return {
    title: work.title,
    description: work.longDescription.slice(0, 120),
    openGraph: {
      title: work.title,
      description: work.longDescription.slice(0, 120),
      images: [{ url: work.image }],
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = worksData.find((w) => w.slug === slug);

  if (!work) notFound();

  return (
    <WorkDetail
      item={work}
      kicker="Work"
      backHref="/works"
      backLabel="Works 一覧へ"
    />
  );
}
