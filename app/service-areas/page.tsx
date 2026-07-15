import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EstimateCta } from "@/components/estimate-cta";
import { PageHero } from "@/components/page-hero";
import { company, serviceAreas } from "@/lib/site-data";

export const metadata: Metadata = { title: "Service Areas", description: "Star Quality Concrete dispatch coverage across San Jose, South County, and nearby Bay Area communities." };

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero eyebrow="Service areas" title={<>Local dispatch.<br /><em>Clear coverage.</em></>} description="Confirm the service region, review local access considerations, and send the jobsite details to the right dispatch team." />
      <section className="area-overview"><div className="area-map"><Image src="/media/locations.png" alt="Map of Star Quality Concrete service locations" fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div><div><p className="eyebrow light"><span></span>Two dispatch teams</p><h2>Start with the jobsite.</h2><p>Availability and delivery timing depend on the exact address, route, volume, and schedule. Call the relevant team for time-sensitive coordination.</p><div className="dispatch-cards"><a href={`tel:${company.sanJoseDispatchHref}`}><span>San Jose</span><strong>{company.sanJoseDispatch}</strong><small>{company.address}</small></a><a href={`tel:${company.southCountyDispatchHref}`}><span>South County</span><strong>{company.southCountyDispatch}</strong><small>Gilroy · Morgan Hill · Hollister</small></a></div></div></section>
      <section className="section area-index"><div className="section-heading"><div><p className="eyebrow"><span></span>Coverage guide</p><h2>Choose your area.</h2></div><p>Each page includes region-specific access notes, nearby coverage, services, and the appropriate dispatch contact.</p></div><div>{serviceAreas.map((area, index) => <Link href={`/service-areas/${area.slug}`} key={area.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{area.region} · {area.dispatch} dispatch</small><h3>{area.city}</h3><p>{area.intro}</p></div><b>↗</b></Link>)}</div></section>
      <EstimateCta title="Confirm your jobsite." />
    </>
  );
}

