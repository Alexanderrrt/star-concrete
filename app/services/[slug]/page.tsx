import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EstimateCta } from "@/components/estimate-cta";
import { PageHero } from "@/components/page-hero";
import { getService, services } from "@/lib/site-data";

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.name, description: service.summary, alternates: { canonical: `/services/${service.slug}` } };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return (
    <>
      <PageHero eyebrow={`Service ${service.number}`} title={<>{service.name.split(" ").slice(0, -1).join(" ")}<br /><em>{service.name.split(" ").at(-1)}</em></>} description={service.description} image={service.image} imageAlt={service.imageAlt} />
      <section className="section service-detail-intro"><div><p className="eyebrow"><span></span>Typical work</p><h2>Built around the project.</h2></div><ul>{service.projectTypes.map((type) => <li key={type}><span>✓</span>{type}</li>)}</ul></section>
      <section className="service-benefits"><div className="section-heading"><div><p className="eyebrow light"><span></span>Why it works</p><h2>Details that<br />keep work moving.</h2></div><p>Every order is project-specific. These are the planning advantages to discuss with the office and dispatch team.</p></div><div>{service.benefits.map((benefit, index) => <article key={benefit.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div></section>
      <section className="section service-process"><div><p className="eyebrow"><span></span>Service process</p><h2>Four clear steps.</h2><p>Start with the request. Confirm specifications, availability, and pricing directly with Star before scheduling.</p><Link className="button button-primary" href="/estimate">Start an estimate <span>→</span></Link></div><ol>{service.process.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></section>
      <section className="section faq-section"><div><p className="eyebrow"><span></span>Common questions</p><h2>Before you schedule.</h2></div><div>{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>＋</span></summary><p>{faq.answer}</p></details>)}</div></section>
      <section className="related-services"><p>Other services</p><div>{services.filter((item) => item.slug !== service.slug).map((item) => <Link href={`/services/${item.slug}`} key={item.slug}><span>{item.number}</span><strong>{item.name}</strong><b>↗</b></Link>)}</div></section>
      <EstimateCta title="Plan this service." copy="Current pricing and availability depend on your mix, volume, delivery location, timing, and placement needs." />
    </>
  );
}

