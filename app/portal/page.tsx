import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PortalDemo } from "@/components/portal-demo";

export const metadata: Metadata = { title: "Client Project Portal Demo", description: "Explore a sample construction project portal with milestones, documents, progress photos, and payment status." };

export default function PortalPage() {
  return <><PageHero compact eyebrow="Client portal" title={<>One place for<br /><em>project clarity.</em></>} description="A transparent interactive demo of the plan’s client experience. Use the sample code shown below; no real project or customer information is exposed." /><section className="section portal-page"><PortalDemo /></section></>;
}

