import type { MetadataRoute } from "next";
import { serviceAreas, services } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://star-concrete.vercel.app";
  const routes = ["", "/services", "/projects", "/about", "/service-areas", "/estimate", "/portal", "/dashboard", "/privacy", "/accessibility"];
  return [
    ...routes.map((route) => ({ url: `${base}${route}`, changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...services.map((service) => ({ url: `${base}/services/${service.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...serviceAreas.map((area) => ({ url: `${base}/service-areas/${area.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

