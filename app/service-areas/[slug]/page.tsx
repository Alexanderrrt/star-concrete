import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EstimateCta } from "@/components/estimate-cta";
import { PageHero } from "@/components/page-hero";
import { company, getServiceArea, serviceAreas, services } from "@/lib/site-data";

export function generateStaticParams() { return serviceAreas.map((area) => ({ slug: area.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const area = getServiceArea((await params).slug);
  if (!area) return {};
  return { title: `Concrete Delivery in ${area.city}, CA`, description: area.intro, alternates: { canonical: `/service-areas/${area.slug}` } };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const area = getServiceArea((await params).slug);
  if (!area) notFound();
  const phone = area.dispatch === "San Jose" ? company.sanJoseDispatch : company.southCountyDispatch;
  const href = area.dispatch === "San Jose" ? company.sanJoseDispatchHref : company.southCountyDispatchHref;
  return (
    <>
      <PageHero eyebrow={`${area.region} service area`} title={<>Concrete delivery<br /><em>in {area.city}.</em></>} description={area.intro} image="/media/plant.jpg" imageAlt="Star Quality Concrete ready-mix delivery truck" />
      <section className="area-detail-strip"><div><span>Primary dispatch</span><strong>{area.dispatch}</strong></div><a href={`tel:${href}`}><span>Call dispatch</span><strong>{phone}</strong></a><div><span>Office hours</span><strong>Mon–Fri · 8:00–4:00</strong></div></section>
      <section className="section area-detail"><div><p className="eyebrow"><span></span>Local planning note</p><h2>Give dispatch the full picture.</h2><p>{area.localNote}</p><Link className="button button-primary" href="/estimate">Send project details <span>→</span></Link></div><div><h3>Services available to discuss</h3>{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}><span>{service.number}</span><div><strong>{service.name}</strong><small>{service.summary}</small></div><b>↗</b></Link>)}</div></section>
      <section className="section nearby-areas"><p className="eyebrow"><span></span>Nearby coverage</p><h2>Also serving.</h2><div>{area.nearby.map((city) => { const nearby = serviceAreas.find((item) => item.city === city); return nearby ? <Link href={`/service-areas/${nearby.slug}`} key={city}>{city} <span>↗</span></Link> : null; })}</div></section>
      <EstimateCta title={`Plan a ${area.city} pour.`} />
    </>
  );
}

