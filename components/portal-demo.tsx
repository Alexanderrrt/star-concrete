"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export function PortalDemo() {
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (code.trim().toUpperCase() === "SQ-2418") { setOpen(true); setError(""); }
    else setError("That demo code was not recognized. Use SQ-2418 to open the sample project.");
  };

  if (!open) return (
    <div className="portal-entry">
      <div><p className="eyebrow"><span></span>Interactive portal demo</p><h2>Your project, without the phone tag.</h2><p>Real portal access requires a private invitation from the contractor. This public demo uses sample information only.</p></div>
      <form onSubmit={submit}><label>Demo project code<input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Try SQ-2418" autoComplete="off" required /></label>{error && <p className="field-error" role="alert">{error}</p>}<button className="button button-primary">Open sample project <span>→</span></button><small>No personal or customer data is used in this demonstration.</small></form>
    </div>
  );

  return (
    <div className="portal-project">
      <div className="portal-project-top"><div><small>SAMPLE PROJECT · SQ-2418</small><h2>Commercial slab · Santa Clara</h2></div><span>● On track</span></div>
      <div className="portal-progress"><div><span>Project progress</span><strong>68%</strong></div><div className="progress-line"><i></i></div><div><span className="done">✓ Approved</span><span className="done">✓ Site prep</span><span className="current">● Pour & finish</span><span>○ Closeout</span></div></div>
      <div className="portal-grid">
        <section><div className="widget-title"><strong>Latest update</strong><span>Sample · Today</span></div><div className="portal-photo"><Image src="/media/yelp-05.jpg" alt="Sample concrete placement preparation" fill sizes="(max-width: 800px) 100vw, 60vw" /></div><h3>Placement preparation complete</h3><p>Forms and reinforcement have been reviewed. The sample schedule shows concrete placement as the next milestone.</p></section>
        <aside><div className="widget-title"><strong>Next milestone</strong><span>In 2 days</span></div><h3>Concrete placement</h3><p>Friday · 7:00 AM</p><dl><div><dt>Documents</dt><dd>3 approved</dd></div><div><dt>Progress photos</dt><dd>12 files</dd></div><div><dt>Change orders</dt><dd>None open</dd></div><div><dt>Payment status</dt><dd>Current</dd></div></dl><button className="button button-secondary" onClick={() => setOpen(false)}>Exit demo</button></aside>
      </div>
    </div>
  );
}

