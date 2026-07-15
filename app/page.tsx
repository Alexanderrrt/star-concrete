"use client";

import { FormEvent, useEffect, useState } from "react";

const projects = [
  { title: "Residential foundation", tag: "Residential", location: "San Jose", image: "/media/yelp-03.jpg", detail: "Rebar, forms & ready-mix" },
  { title: "Backyard concrete grid", tag: "Residential", location: "South Bay", image: "/media/yelp-04.jpg", detail: "Clean geometric finish" },
  { title: "Custom patio pour", tag: "Outdoor", location: "San Jose", image: "/media/yelp-05.jpg", detail: "Pumped placement" },
  { title: "Commercial slab", tag: "Commercial", location: "Bay Area", image: "/media/fleet.jpg", detail: "High-volume placement" },
  { title: "Fleet-ready delivery", tag: "Delivery", location: "San Jose", image: "/media/plant.jpg", detail: "Dispatch to placement" },
];

const estimateSteps = ["Project", "Site", "Timeline", "Contact"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [estimateStep, setEstimateStep] = useState(0);
  const [estimateSent, setEstimateSent] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [workspaceTab, setWorkspaceTab] = useState<"contractor" | "client">("contractor");

  useEffect(() => {
    document.body.style.overflow = estimateOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [estimateOpen]);

  const openEstimate = () => {
    setEstimateSent(false);
    setEstimateStep(0);
    setEstimateOpen(true);
  };

  const submitEstimate = (event: FormEvent) => {
    event.preventDefault();
    if (estimateStep < estimateSteps.length - 1) setEstimateStep((step) => step + 1);
    else setEstimateSent(true);
  };

  const filteredProjects = projectFilter === "All"
    ? projects
    : projects.filter((project) => project.tag === projectFilter);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Star Quality Concrete home">
          <span className="brand-mark">S</span>
          <span><strong>STAR</strong><small>QUALITY CONCRETE</small></span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#locations" onClick={() => setMenuOpen(false)}>Locations</a>
          <a href="#portal" onClick={() => setMenuOpen(false)}>Project login</a>
        </nav>
        <button className="header-cta" onClick={openEstimate}>Get an estimate <span>↗</span></button>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span></span><span></span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span></span> Bay Area ready-mix concrete</p>
          <h1>Concrete that<br />shows up <em>ready.</em></h1>
          <p className="hero-lede">Superior ready-mix, professional delivery and dependable pumping—backed by over 30 years of Bay Area experience.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={openEstimate}>Plan your pour <span>→</span></button>
            <a className="text-link" href="#projects">See our work <span>↘</span></a>
          </div>
          <div className="hero-proof">
            <div><strong>30+</strong><span>Years serving<br />the Bay Area</span></div>
            <div><strong>2</strong><span>Local dispatch<br />centers</span></div>
            <div><strong>01</strong><span>Call from mix<br />to placement</span></div>
          </div>
        </div>
        <div className="hero-media">
          <img src="/media/plant.jpg" alt="Star Quality Concrete ready-mix truck" />
          <div className="hero-tag"><span>Built for the Bay</span><strong>Since 1979</strong></div>
          <div className="scroll-cue">SCROLL <span>↓</span></div>
        </div>
      </section>

      <section className="dispatch-bar" aria-label="Dispatch contacts">
        <p>Ready to schedule?</p>
        <a href="tel:+14089470159"><span>San Jose dispatch</span><strong>408 947 0159</strong></a>
        <a href="tel:+14088481560"><span>South County</span><strong>408 848 1560</strong></a>
        <p className="hours">Mon–Fri <strong>8:00–4:00</strong></p>
      </section>

      <section className="section services" id="services">
        <div className="section-heading">
          <div><p className="eyebrow"><span></span> What we deliver</p><h2>One team.<br />Every pour.</h2></div>
          <p>From high-performance mixes to precise placement, our people and equipment help keep your job moving.</p>
        </div>
        <div className="service-grid">
          <article className="service-card featured">
            <span className="service-number">01</span>
            <div className="service-icon">MIX</div>
            <h3>Ready-mix concrete</h3>
            <p>Consistent, high-quality concrete produced with a high-shear twin-shaft homogenization process.</p>
            <button onClick={openEstimate}>Request a mix <span>↗</span></button>
          </article>
          <article className="service-card">
            <span className="service-number">02</span>
            <div className="service-icon">PMP</div>
            <h3>Concrete pumping</h3>
            <p>Professional pumping and placement coordination from dispatch through project completion.</p>
            <button onClick={openEstimate}>Plan placement <span>↗</span></button>
          </article>
          <article className="service-card">
            <span className="service-number">03</span>
            <div className="service-icon">CLR</div>
            <h3>Color & specialty</h3>
            <p>Davis Colors, Class F Pozzolan, slag and project-specific additives for the finish you need.</p>
            <button onClick={openEstimate}>Explore options <span>↗</span></button>
          </article>
        </div>
      </section>

      <section className="quality-section">
        <div className="quality-image"><img src="/media/fleet.jpg" alt="Aerial view of a large commercial concrete placement" /></div>
        <div className="quality-copy">
          <p className="eyebrow light"><span></span> The Star standard</p>
          <h2>Made to perform.<br />Delivered with care.</h2>
          <p>Better concrete starts before the truck rolls. Our process thoroughly blends cement, sand, aggregate, fly ash, slag and additives for a uniform, dependable mix.</p>
          <ul>
            <li><span>01</span><div><strong>Precision mixing</strong><small>High-shear, twin-shaft homogenization</small></div></li>
            <li><span>02</span><div><strong>Safer delivery</strong><small>Backup cameras and automatic transmissions</small></div></li>
            <li><span>03</span><div><strong>Cleaner jobsites</strong><small>On-truck environmental wash-out systems</small></div></li>
          </ul>
          <a className="button button-cream" href="#about">How we got here <span>→</span></a>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-heading project-heading">
          <div><p className="eyebrow"><span></span> Field notes</p><h2>Work worth<br />standing on.</h2></div>
          <div className="project-filters" aria-label="Filter projects">
            {["All", "Residential", "Commercial", "Outdoor", "Delivery"].map((filter) => (
              <button className={projectFilter === filter ? "active" : ""} key={filter} onClick={() => setProjectFilter(filter)}>{filter}</button>
            ))}
          </div>
        </div>
        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-image"><img src={project.image} alt={project.title} /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="project-meta"><p>{project.tag} · {project.location}</p><h3>{project.title}</h3><small>{project.detail}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="process-intro">
          <p className="eyebrow light"><span></span> A clearer way to order</p>
          <h2>From plan<br />to pour.</h2>
          <p>Share the essentials once. We’ll turn them into a structured request so dispatch can respond with the right questions.</p>
          <button className="button button-light" onClick={openEstimate}>Start your estimate <span>→</span></button>
        </div>
        <ol className="process-list">
          <li><span>01</span><div><h3>Tell us what you’re building</h3><p>Choose the project type, approximate size and placement needs.</p></div></li>
          <li><span>02</span><div><h3>Share your site details</h3><p>Add the location, access notes and any helpful plans or photos.</p></div></li>
          <li><span>03</span><div><h3>Confirm the timing</h3><p>Tell us when you want to pour and how flexible the schedule is.</p></div></li>
          <li><span>04</span><div><h3>Connect with dispatch</h3><p>Your organized request goes to the team for a direct follow-up.</p></div></li>
        </ol>
      </section>

      <section className="section about" id="about">
        <div className="about-copy">
          <p className="eyebrow"><span></span> Our story</p>
          <h2>Bay Area roots.<br />Built to keep moving.</h2>
          <p>Star began when the Sandman delivery business acquired a small two-truck concrete company. What followed was decades of investment in plants, people and cleaner equipment.</p>
          <a className="text-link" href="#locations">Find your nearest plant <span>↘</span></a>
        </div>
        <div className="timeline">
          <div><strong>1979</strong><p>Star Quality Concrete begins with a small batch plant and two-truck operation.</p></div>
          <div><strong>1989</strong><p>The company acquires its Seventh Street property in San Jose.</p></div>
          <div><strong>2004</strong><p>Two advanced Italian twin-shaft, high-shear batch plants join the operation.</p></div>
          <div><strong>Today</strong><p>Local dispatch serves homeowners, contractors and large commercial projects.</p></div>
        </div>
      </section>

      <section className="locations" id="locations">
        <div className="location-content">
          <p className="eyebrow light"><span></span> Local dispatch</p>
          <h2>Concrete,<br />closer to site.</h2>
          <p>Two dispatch teams support projects across San Jose, South County and the greater Bay Area.</p>
          <div className="location-cards">
            <a href="tel:+14089470159"><span>San Jose</span><strong>408 947 0159</strong><small>1404 S 7th St · San Jose, CA</small></a>
            <a href="tel:+14088481560"><span>South County</span><strong>408 848 1560</strong><small>Gilroy · Hollister · Morgan Hill</small></a>
          </div>
          <p className="coverage">Also serving <strong>Campbell · Santa Clara · Sunnyvale · Milpitas · Los Gatos</strong></p>
        </div>
        <div className="location-visual"><img src="/media/locations.png" alt="Map of Star Quality Concrete service locations" /><div className="map-pin pin-one"><span></span>San Jose</div><div className="map-pin pin-two"><span></span>South County</div></div>
      </section>

      <section className="workspace section" id="portal">
        <div className="workspace-heading">
          <div><p className="eyebrow"><span></span> BuildHub workspace</p><h2>Less chasing.<br />More building.</h2></div>
          <div className="workspace-tabs" role="tablist" aria-label="Workspace preview">
            <button role="tab" aria-selected={workspaceTab === "contractor"} className={workspaceTab === "contractor" ? "active" : ""} onClick={() => setWorkspaceTab("contractor")}>Contractor view</button>
            <button role="tab" aria-selected={workspaceTab === "client"} className={workspaceTab === "client" ? "active" : ""} onClick={() => setWorkspaceTab("client")}>Client view</button>
          </div>
        </div>
        <div className="workspace-window">
          <aside><div className="mini-brand">S</div><span className="side-active">Overview</span><span>Leads</span><span>Projects</span><span>Calendar</span><span>Documents</span><span>Messages</span><span>Analytics</span><small>Star Quality Concrete<br />Admin workspace</small></aside>
          {workspaceTab === "contractor" ? (
            <div className="dashboard-panel">
              <div className="panel-top"><div><small>WEDNESDAY, JULY 15</small><h3>Good afternoon, Star team.</h3></div><button onClick={openEstimate}>+ New lead</button></div>
              <div className="stat-grid"><div><span>New leads</span><strong>12</strong><small>↑ 18% this month</small></div><div><span>Estimates open</span><strong>08</strong><small>$184k pipeline</small></div><div><span>Projects active</span><strong>05</strong><small>2 updates due</small></div></div>
              <div className="dashboard-lower"><div className="pipeline"><div className="widget-title"><strong>Lead pipeline</strong><span>View all →</span></div><div className="lead-row"><b>JD</b><span><strong>Driveway replacement</strong><small>San Jose · Residential</small></span><em>New</em></div><div className="lead-row"><b>MP</b><span><strong>Commercial slab</strong><small>Santa Clara · Commercial</small></span><em className="warm">Estimate</em></div><div className="lead-row"><b>AL</b><span><strong>Backyard patio</strong><small>Campbell · Residential</small></span><em className="green">Qualified</em></div></div><div className="activity"><div className="widget-title"><strong>Today</strong><span>Jul 15</span></div><p><b>8:00</b><span>Dispatch · San Jose</span></p><p><b>10:30</b><span>Site walk · Campbell</span></p><p><b>2:00</b><span>Pour · Santa Clara</span></p></div></div>
            </div>
          ) : (
            <div className="dashboard-panel client-panel">
              <div className="panel-top"><div><small>PROJECT #SQ-2418</small><h3>Commercial slab · Santa Clara</h3></div><span className="on-track">● On track</span></div>
              <div className="progress-card"><div><span>Project progress</span><strong>68%</strong></div><div className="progress-line"><i></i></div><div className="milestones"><span className="done">✓ Approved</span><span className="done">✓ Site prep</span><span className="current">● Pour & finish</span><span>○ Closeout</span></div></div>
              <div className="dashboard-lower"><div className="pipeline"><div className="widget-title"><strong>Latest updates</strong><span>View project →</span></div><div className="update-row"><img src="/media/yelp-05.jpg" alt="Concrete project progress" /><span><strong>Placement preparation complete</strong><small>New photos added · Today, 9:42 AM</small></span></div><div className="update-row document"><b>PDF</b><span><strong>Mix design approval</strong><small>Signed by client · Jul 13</small></span></div></div><div className="activity"><div className="widget-title"><strong>Next milestone</strong><span>In 2 days</span></div><h4>Concrete placement</h4><p>Friday · 7:00 AM</p><button>Message project team</button></div></div>
            </div>
          )}
        </div>
      </section>

      <section className="review-band">
        <div><span className="quote-mark">“</span><blockquote>Deliveries on time. Drivers friendly. Products are high quality—and they went out of their way to save me money.</blockquote><p>Jabir J. L. · Customer review</p></div>
        <a href="https://www.yelp.com/biz/star-concrete-san-jose" target="_blank" rel="noreferrer">Read all 82 reviews on Yelp <span>↗</span></a>
      </section>

      <section className="closing-cta">
        <div><p className="eyebrow light"><span></span> Let’s make it solid</p><h2>Ready when<br />you are.</h2></div>
        <div><p>Tell us what you’re planning. We’ll organize the details and help you get the right mix, equipment and timing.</p><button className="button button-light" onClick={openEstimate}>Request an estimate <span>→</span></button></div>
      </section>

      <footer>
        <div className="footer-brand"><div className="brand"><span className="brand-mark">S</span><span><strong>STAR</strong><small>QUALITY CONCRETE</small></span></div><p>Quality concrete. Local dispatch.<br />Built for the Bay Area.</p></div>
        <div><strong>Explore</strong><a href="#services">Services</a><a href="#projects">Projects</a><a href="#about">Our story</a><a href="#locations">Locations</a></div>
        <div><strong>Contact</strong><a href="tel:+14089470669">Main office · 408 947 0669</a><a href="mailto:tbbsandman@gmail.com">tbbsandman@gmail.com</a><span>Mon–Fri · 8:00 AM–4:00 PM</span></div>
        <div className="footer-action"><strong>Need project access?</strong><p>Review milestones, documents and updates in one place.</p><a href="#portal">Open client portal →</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Star Quality Concrete</span><span>San Jose · South County · Bay Area</span><a href="#top">Back to top ↑</a></div>
      </footer>

      {estimateOpen && (
        <div className="estimate-modal" role="dialog" aria-modal="true" aria-labelledby="estimate-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setEstimateOpen(false); }}>
          <div className="estimate-card">
            <button className="modal-close" onClick={() => setEstimateOpen(false)} aria-label="Close estimate request">×</button>
            {!estimateSent ? (
              <>
                <p className="eyebrow"><span></span> Guided estimate</p>
                <h2 id="estimate-title">Let’s plan your pour.</h2>
                <div className="step-track">{estimateSteps.map((step, index) => <span className={index <= estimateStep ? "active" : ""} key={step}><i>{index + 1}</i>{step}</span>)}</div>
                <form onSubmit={submitEstimate}>
                  {estimateStep === 0 && <div className="form-step"><label>What are you working on?</label><div className="choice-grid">{["Foundation", "Driveway", "Patio / flatwork", "Commercial slab", "Other"].map((choice) => <label className="choice" key={choice}><input type="radio" name="project" required /><span>{choice}</span></label>)}</div><label>Approximate size<input type="text" placeholder="e.g. 1,200 sq ft or 18 cubic yards" /></label></div>}
                  {estimateStep === 1 && <div className="form-step two-col"><label>Project address<input type="text" required placeholder="Street address" /></label><label>City<input type="text" required placeholder="San Jose" /></label><label className="full">Site access notes<textarea placeholder="Gate width, grade, street access or pumping needs" rows={3}></textarea></label><label className="upload full"><input type="file" multiple accept="image/*,.pdf" /><span><b>＋</b> Add photos or plans <small>Images or PDF · up to 10MB each</small></span></label></div>}
                  {estimateStep === 2 && <div className="form-step"><label>When would you like to pour?<input type="date" required /></label><label>How flexible is the date?<select defaultValue=""><option value="" disabled>Select one</option><option>Exact date needed</option><option>Flexible within one week</option><option>Flexible within one month</option><option>Just planning</option></select></label><label>Estimated budget<select defaultValue=""><option value="" disabled>Select a range</option><option>Under $5,000</option><option>$5,000–$15,000</option><option>$15,000–$50,000</option><option>$50,000+</option><option>Not sure</option></select></label></div>}
                  {estimateStep === 3 && <div className="form-step two-col"><label>First name<input type="text" required placeholder="First name" /></label><label>Last name<input type="text" required placeholder="Last name" /></label><label>Email<input type="email" required placeholder="you@company.com" /></label><label>Phone<input type="tel" required placeholder="(408) 555-0123" /></label><label className="full">Company <span>(optional)</span><input type="text" placeholder="Company name" /></label></div>}
                  <div className="form-actions">{estimateStep > 0 && <button type="button" className="back-button" onClick={() => setEstimateStep((step) => step - 1)}>← Back</button>}<button className="button button-primary" type="submit">{estimateStep === 3 ? "Send request" : "Continue"} <span>→</span></button></div>
                </form>
              </>
            ) : (
              <div className="estimate-success"><span>✓</span><p className="eyebrow">Request organized</p><h2>We’ve got the details.</h2><p>Your project request is ready for the Star team. For time-sensitive scheduling, call San Jose dispatch at <a href="tel:+14089470159">408 947 0159</a>.</p><button className="button button-primary" onClick={() => setEstimateOpen(false)}>Back to the site <span>→</span></button></div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
