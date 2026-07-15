import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EstimateCta } from "@/components/estimate-cta";
import { PageHero } from "@/components/page-hero";
import { services } from "@/lib/site-data";

export const metadata: Metadata = { title: "Concrete Services", description: "Ready-mix concrete, coordinated pumping, and color or specialty mix options for Bay Area projects." };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Concrete services" title={<>The right mix.<br /><em>The right plan.</em></>} description="A focused service set built around quality concrete, coordinated delivery, placement access, and finish requirements." image="/media/cng.jpg" imageAlt="Star Quality Concrete mixer fleet" />
      <section className="section service-index">
        {services.map((service) => (
          <article key={service.slug}>
            <div className="service-index-image"><Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
            <div className="service-index-copy"><span>{service.number}</span><p className="eyebrow"><span></span>{service.shortName}</p><h2>{service.name}</h2><p>{service.description}</p><ul>{service.projectTypes.slice(0, 4).map((type) => <li key={type}>{type}</li>)}</ul><Link className="button button-primary" href={`/services/${service.slug}`}>Explore service <span>→</span></Link></div>
          </article>
        ))}
      </section>
      <EstimateCta title="Have a mix in mind?" copy="Send the project type, volume, access, timing, and specification in one organized request." />
    </>
  );
}
