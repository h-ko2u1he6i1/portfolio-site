import type { MetadataRoute } from "next";
import { worksData } from "@/data/works";
import { studiesData } from "@/data/studies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/works", "/studies"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const workRoutes = worksData.map((work) => ({
    url: `${siteUrl}/works/${work.slug}`,
    lastModified: new Date(),
  }));

  const studyRoutes = studiesData.map((study) => ({
    url: `${siteUrl}/studies/${study.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...workRoutes, ...studyRoutes];
}
