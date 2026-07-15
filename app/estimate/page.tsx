import type { Metadata } from "next";
import { EstimateForm } from "@/components/estimate-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Request an Estimate", description: "Create a structured concrete estimate request with project, site, schedule, budget, file, and contact details." };

export default function EstimatePage() {
  return <><PageHero compact eyebrow="Estimate request" title={<>Plan the pour.<br /><em>Once, clearly.</em></>} description="No vague contact box. Send structured project details and optional files directly to the Star Quality Concrete team." /><EstimateForm /></>;
}
