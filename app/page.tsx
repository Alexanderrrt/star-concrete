import Image from "next/image";
import Link from "next/link";
import { EstimateCta } from "@/components/estimate-cta";
import { company, projects, serviceAreas, services } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span></span>Bay Area ready-mix concrete</p>
          <h1>Concrete that<br />shows up <em>ready.</em></h1>
          <p className="hero-lede">Superior ready-mix, professional delivery, and coordinated pumping—backed by local dispatch and decades of Bay Area experience.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/estimate">Plan your pour <span>→</span></Link><Link className="text-link" href="/projects">See project stories <span>↘</span></Link></div>
          <div className="hero-proof"><div><strong>1979</strong><span>Bay Area roots<br />and local knowledge</span></div><div><strong>2</strong><span>Local dispatch<br />teams</span></div><div><strong>1</strong><span>Organized request<br />from plan to pour</span></div></div>
        </div>
        <div className="hero-media">
          <Image src="/media/plant.jpg" alt="Star Quality Concrete ready-mix truck" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
          <div className="hero-tag"><span>Built for the Bay</span><strong>Since {company.founded}</strong></div>
          <div className="scroll-cue">EXPLORE <span>↓</span></div>
        </div>
      </section>

      <section className="dispatch-bar" aria-label="Dispatch contacts">
        <p>Ready to schedule?</p>
        <a href={`tel:${company.sanJoseDispatchHref}`}><span>San Jose dispatch</span><strong>{company.sanJoseDispatch}</strong></a>
        <a href={`tel:${company.southCountyDispatchHref}`}><span>South County</span><strong>{company.southCountyDispatch}</strong></a>
        <p className="hours">Mon–Fri <strong>8:00–4:00</strong></p>
      </section>

      <section className="section services-section">
        <div className="section-heading"><div><p className="eyebrow"><span></span>What we deliver</p><h2>One team.<br />Every pour.</h2></div><p>From high-performance mixes to planned placement, Star helps keep Bay Area jobs moving.</p></div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article className={`service-card${index === 0 ? " featured" : ""}`} key={service.slug}>
              <span className="service-number">{service.number}</span><div className="service-icon" aria-hidden="true">{service.shortName.slice(0, 3).toUpperCase()}</div><h3>{service.name}</h3><p>{service.summary}</p><Link href={`/services/${service.slug}`}>Explore service <span>↗</span></Link>
            </article>
          ))}
        </div>
        <Link className="section-link" href="/services">View every service and FAQ →</Link>
      </section>

      <section className="quality-section">
        <div className="quality-image"><Image src="/media/fleet.jpg" alt="Aerial view of a large commercial concrete placement" fill sizes="(max-width: 900px) 100vw, 54vw" /></div>
        <div className="quality-copy"><p className="eyebrow light"><span></span>The Star standard</p><h2>Made to perform.<br />Delivered with care.</h2><p>Better concrete starts before the truck rolls. Star’s high-shear, twin-shaft process thoroughly blends cement, sand, aggregate, fly ash, slag, and additives for a uniform mix.</p><ul><li><span>01</span><div><strong>Precision mixing</strong><small>High-shear, twin-shaft homogenization</small></div></li><li><span>02</span><div><strong>Safer delivery</strong><small>Backup cameras and automatic transmissions</small></div></li><li><span>03</span><div><strong>Cleaner jobsites</strong><small>On-truck environmental wash-out systems</small></div></li></ul><Link className="button button-cream" href="/about">How Star got here <span>→</span></Link></div>
      </section>

      <section className="section home-projects">
        <div className="section-heading"><div><p className="eyebrow"><span></span>Field notes</p><h2>Work worth<br />standing on.</h2></div><p>Real project imagery with the scope, material, access challenge, and result made clear.</p></div>
        <div className="home-project-grid">
          {projects.slice(0, 3).map((project, index) => <article key={project.slug}><div><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /><span>{String(index + 1).padStart(2, "0")}</span></div><p>{project.category} · {project.location}</p><h3>{project.title}</h3><small>{project.scope}</small></article>)}
        </div>
        <Link className="section-link" href="/projects">View the project portfolio →</Link>
      </section>

      <section className="process-section">
        <div className="process-intro"><p className="eyebrow light"><span></span>A clearer way to order</p><h2>From plan<br />to pour.</h2><p>Share the essentials once. The guided request turns them into a concise email brief for dispatch.</p><Link className="button button-light" href="/estimate">Start your estimate <span>→</span></Link></div>
        <ol className="process-list"><li><span>01</span><div><h3>Define the project</h3><p>Choose the work type, approximate size or volume, and placement needs.</p></div></li><li><span>02</span><div><h3>Document the site</h3><p>Add the address, access constraints, and any helpful photo or plan names.</p></div></li><li><span>03</span><div><h3>Confirm timing</h3><p>Share the preferred date, flexibility, and planning budget.</p></div></li><li><span>04</span><div><h3>Send one clear brief</h3><p>Review the structured request, open it in your mail app, attach files, and send.</p></div></li></ol>
      </section>

      <section className="section home-about">
        <div className="about-copy"><p className="eyebrow"><span></span>Our story</p><h2>Bay Area roots.<br />Built to keep moving.</h2><p>Star grew from a small two-truck operation into a local concrete supplier with advanced mixing equipment, South Bay facilities, and a continuing focus on cleaner delivery.</p><Link className="text-link" href="/about">Read the company timeline <span>↘</span></Link></div>
        <div className="timeline"><div><strong>1979</strong><p>Star begins with a small batch plant and a two-truck concrete operation.</p></div><div><strong>1989</strong><p>The company acquires its Seventh Street property in San Jose.</p></div><div><strong>2004</strong><p>Advanced Italian twin-shaft, high-shear batch plants join the operation.</p></div><div><strong>Today</strong><p>Two dispatch teams support homeowner, contractor, and commercial work.</p></div></div>
      </section>

      <section className="home-locations">
        <div><p className="eyebrow light"><span></span>Local dispatch</p><h2>Concrete,<br />closer to site.</h2><p>Nine focused service-area pages help customers confirm coverage and prepare the access details dispatch needs.</p><div className="area-chips">{serviceAreas.slice(0, 6).map((area) => <Link href={`/service-areas/${area.slug}`} key={area.slug}>{area.city} ↗</Link>)}</div><Link className="button button-light" href="/service-areas">See every service area <span>→</span></Link></div>
        <div className="home-location-map"><Image src="/media/locations.png" alt="Map of Star Quality Concrete plant locations" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
      </section>

      <section className="section buildhub-teaser">
        <div className="section-heading"><div><p className="eyebrow"><span></span>BuildHub experience</p><h2>Less chasing.<br />More building.</h2></div><p>The plan’s dashboard and portal concepts are available as transparent interactive demos—sample data, clearly labeled.</p></div>
        <div className="teaser-grid"><Link href="/dashboard"><span>Contractor demo</span><h3>Leads, website, and analytics.</h3><p>Explore the sample pipeline, modular website editor, and illustrative performance view.</p><b>Open dashboard demo →</b></Link><Link href="/portal"><span>Client demo</span><h3>Milestones without phone tag.</h3><p>Use the supplied demo code to explore progress, documents, photos, and project status.</p><b>Open client portal demo →</b></Link></div>
      </section>

      <section className="review-source-band"><div><span>Independent feedback</span><h2>See the full customer record.</h2><p>Reviews change over time. Visit Yelp directly for current ratings, dates, photos, and unedited customer feedback.</p></div><a href={company.yelp} target="_blank" rel="noreferrer">View Star Concrete on Yelp <span>↗</span></a></section>
      <EstimateCta />
    </>
  );
}
