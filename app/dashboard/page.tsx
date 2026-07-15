import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { WorkspaceDemo } from "@/components/workspace-demo";

export const metadata: Metadata = { title: "BuildHub Dashboard Demo", description: "Interactive sample of a construction lead pipeline, modular website editor, and marketing analytics workspace." };

export default function DashboardPage() {
  return <><PageHero compact eyebrow="BuildHub dashboard" title={<>Simple by default.<br /><em>Powerful when needed.</em></>} description="An interactive front-end demonstration of the plan’s contractor workspace. Every record and metric on this page is clearly marked sample or illustrative." /><section className="section dashboard-page"><WorkspaceDemo /></section></>;
}

