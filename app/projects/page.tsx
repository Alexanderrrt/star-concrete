import type { Metadata } from "next";
import { EstimateCta } from "@/components/estimate-cta";
import { PageHero } from "@/components/page-hero";
import { ProjectGallery } from "@/components/project-gallery";
import { projects } from "@/lib/site-data";

export const metadata: Metadata = { title: "Project Portfolio", description: "Explore residential, commercial, outdoor, and delivery project stories with scope, materials, challenges, and results." };

export default function ProjectsPage() {
  return <><PageHero eyebrow="Project portfolio" title={<>Work with<br /><em>real context.</em></>} description="A useful portfolio should explain more than the finished surface. These stories show the scope, material, access challenge, and result." image="/media/fleet.jpg" imageAlt="Large commercial concrete placement from above" /><section className="section project-page"><ProjectGallery projects={projects} /></section><EstimateCta title="Planning something similar?" /></>;
}

