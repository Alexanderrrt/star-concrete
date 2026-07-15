import Link from "next/link";
import { company, serviceAreas, services } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="brand" href="/" aria-label="Star Quality Concrete home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span><strong>STAR</strong><small>QUALITY CONCRETE</small></span>
        </Link>
        <p>Quality concrete. Local dispatch.<br />Built for the Bay Area.</p>
      </div>
      <div className="footer-column">
        <strong>Services</strong>
        {services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.shortName}</Link>)}
        <Link href="/projects">Project portfolio</Link>
      </div>
      <div className="footer-column">
        <strong>Service areas</strong>
        {serviceAreas.slice(0, 5).map((area) => <Link href={`/service-areas/${area.slug}`} key={area.slug}>{area.city}</Link>)}
        <Link href="/service-areas">View all areas</Link>
      </div>
      <div className="footer-column">
        <strong>Contact</strong>
        <a href={`tel:${company.mainPhoneHref}`}>Main office · {company.mainPhone}</a>
        <a href={`mailto:${company.email}`}>{company.email}</a>
        <span>{company.hours}</span>
        <a href={company.yelp} target="_blank" rel="noreferrer">Independent reviews on Yelp ↗</a>
      </div>
      <div className="footer-action">
        <strong>Planning a pour?</strong>
        <p>Share the site, volume, timing, and placement details in one organized request.</p>
        <Link href="/estimate">Start an estimate →</Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Star Quality Concrete</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/accessibility">Accessibility</Link></div>
        <Link href="/dashboard">BuildHub demo</Link>
      </div>
    </footer>
  );
}

