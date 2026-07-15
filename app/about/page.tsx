import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EstimateCta } from "@/components/estimate-cta";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "About Star", description: "The history of Star Quality Concrete from a small Bay Area operation to advanced mixing and local dispatch." };

const timeline = [
  ["1979", "Sandman’s delivery business acquires a small Bay Area concrete company with two trucks, forming Star Quality Concrete."],
  ["1982", "Star buys the Monterey and Old Tully site, adds an enhanced batch plant, and installs scales."],
  ["1989", "The company purchases the Seventh Street property in San Jose."],
  ["1990", "Star moves into the new property and builds its San Jose facility."],
  ["2004", "Two Italian twin-shaft, high-shear batch plants bring advanced homogenization to the operation."],
  ["2008", "A solar-powered crushing plant supports the company’s move toward a greener future."],
  ["2009", "A plant system moves to Hollister to make room for base rock at the San Jose site."],
  ["Today", "Local dispatch coordinates ready-mix and pumping support across San Jose, South County, and nearby Bay Area communities."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title={<>Built here.<br /><em>Still moving.</em></>} description="Decades of investment in plants, people, equipment, and local dispatch—starting from a small two-truck Bay Area operation." image="/media/about.jpg" imageAlt="Historic Star Quality Concrete operations" />
      <section className="section story-intro"><div><p className="eyebrow"><span></span>The through-line</p><h2>Infrastructure in service of consistency.</h2></div><div><p>Star’s published history is a story of practical investment: larger facilities, improved batch plants, safer trucks, cleaner equipment, and a wider South Bay footprint.</p><p>The company’s stated focus is straightforward—quality concrete, professional delivery, coordinated pumping, and customer care from dispatch through completion.</p><Link className="text-link" href="/services">Explore the services ↘</Link></div></section>
      <section className="history-section"><div className="history-sticky"><p className="eyebrow light"><span></span>Company timeline</p><h2>1979<br />to now.</h2><Image src="/media/plant.jpg" alt="Star Quality Concrete truck" width={680} height={410} /></div><ol>{timeline.map(([year, text], index) => <li key={year}><span>{String(index + 1).padStart(2, "0")}</span><strong>{year}</strong><p>{text}</p></li>)}</ol></section>
      <section className="section responsibility"><div><p className="eyebrow"><span></span>Responsibility</p><h2>Safer routes.<br />Cleaner sites.</h2></div><div><article><span>01</span><h3>Truck visibility</h3><p>Backup cameras support safer movement around active jobsites.</p></article><article><span>02</span><h3>Driver control</h3><p>Automatic transmissions help drivers focus on route and site conditions.</p></article><article><span>03</span><h3>Wash-out systems</h3><p>On-truck systems are designed to reduce mess at customer properties.</p></article><article><span>04</span><h3>Alternative fuel</h3><p>The company has stated that it is growing its compressed-natural-gas fleet.</p></article></div></section>
      <EstimateCta title="Put experience on site." />
    </>
  );
}

