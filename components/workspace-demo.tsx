"use client";

import { useState } from "react";

type Tab = "pipeline" | "website" | "analytics";

const demoLeads = [
  { initials: "JD", name: "Driveway replacement", place: "San Jose · Residential", status: "New" },
  { initials: "MP", name: "Commercial slab", place: "Santa Clara · Commercial", status: "Estimate" },
  { initials: "AL", name: "Backyard patio", place: "Campbell · Residential", status: "Qualified" },
  { initials: "RG", name: "Foundation pour", place: "Morgan Hill · Residential", status: "Scheduled" },
];

export function WorkspaceDemo() {
  const [tab, setTab] = useState<Tab>("pipeline");
  const [enabled, setEnabled] = useState([true, true, true]);
  const labels = ["Ready-mix concrete", "Concrete pumping", "Color & specialty mixes"];

  return (
    <div className="workspace-demo">
      <div className="demo-disclosure"><strong>Interactive product demo</strong><span>Sample data only — no customer records are shown or saved.</span></div>
      <div className="workspace-tabs" role="tablist" aria-label="BuildHub dashboard demo">
        <button role="tab" aria-selected={tab === "pipeline"} className={tab === "pipeline" ? "active" : ""} onClick={() => setTab("pipeline")}>Lead pipeline</button>
        <button role="tab" aria-selected={tab === "website"} className={tab === "website" ? "active" : ""} onClick={() => setTab("website")}>Website editor</button>
        <button role="tab" aria-selected={tab === "analytics"} className={tab === "analytics" ? "active" : ""} onClick={() => setTab("analytics")}>Analytics</button>
      </div>
      <div className="workspace-window">
        <aside>
          <div className="mini-brand">S</div>
          <span className={tab === "pipeline" ? "side-active" : ""}>Overview</span>
          <span>Leads</span><span>Projects</span><span>Calendar</span><span>Documents</span><span>Messages</span>
          <span className={tab === "analytics" ? "side-active" : ""}>Analytics</span>
          <small>Star Quality Concrete<br />BuildHub demo</small>
        </aside>
        <div className="dashboard-panel">
          {tab === "pipeline" && (
            <>
              <div className="panel-top"><div><small>DEMO WORKSPACE</small><h3>Lead overview</h3></div><span className="demo-pill">Sample data</span></div>
              <div className="stat-grid"><div><span>New leads</span><strong>12</strong><small>Demo month</small></div><div><span>Estimates open</span><strong>08</strong><small>Sample pipeline</small></div><div><span>Projects active</span><strong>05</strong><small>2 updates due</small></div></div>
              <div className="dashboard-lower">
                <div className="pipeline"><div className="widget-title"><strong>Lead pipeline</strong><span>Sample records</span></div>{demoLeads.map((lead) => <div className="lead-row" key={lead.name}><b>{lead.initials}</b><span><strong>{lead.name}</strong><small>{lead.place}</small></span><em className={lead.status === "Qualified" || lead.status === "Scheduled" ? "green" : lead.status === "Estimate" ? "warm" : ""}>{lead.status}</em></div>)}</div>
                <div className="activity"><div className="widget-title"><strong>Today</strong><span>Demo</span></div><p><b>8:00</b><span>Dispatch · San Jose</span></p><p><b>10:30</b><span>Site walk · Campbell</span></p><p><b>2:00</b><span>Pour · Santa Clara</span></p></div>
              </div>
            </>
          )}
          {tab === "website" && (
            <>
              <div className="panel-top"><div><small>MODULAR WEBSITE</small><h3>Service visibility</h3></div><span className="demo-pill">Preview only</span></div>
              <div className="editor-grid">
                <div className="editor-controls"><strong>Homepage services</strong><p>Turn modules on or off without changing the layout.</p>{labels.map((label, index) => <label key={label}><span><b>{label}</b><small>{enabled[index] ? "Visible on website" : "Hidden"}</small></span><input type="checkbox" checked={enabled[index]} onChange={() => setEnabled((values) => values.map((value, itemIndex) => itemIndex === index ? !value : value))} /></label>)}<strong className="theme-label">Brand accent</strong><div className="swatches"><button aria-label="Burgundy theme" className="selected"></button><button aria-label="Charcoal theme"></button><button aria-label="Safety orange theme"></button></div></div>
                <div className="editor-preview"><small>LIVE PREVIEW</small><h4>One team.<br />Every pour.</h4>{labels.map((label, index) => enabled[index] && <div key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></div>)}</div>
              </div>
            </>
          )}
          {tab === "analytics" && (
            <>
              <div className="panel-top"><div><small>SAMPLE REPORT</small><h3>Marketing performance</h3></div><span className="demo-pill">Illustrative</span></div>
              <div className="analytics-grid">
                <div className="analytics-chart"><div className="widget-title"><strong>Estimate requests</strong><span>Last 6 months</span></div><div className="bars">{[42, 58, 49, 74, 66, 88].map((height, index) => <div key={index}><i style={{ height: `${height}%` }}></i><span>{["Feb", "Mar", "Apr", "May", "Jun", "Jul"][index]}</span></div>)}</div></div>
                <div className="analytics-summary"><div><span>Visitor → lead</span><strong>4.8%</strong><small>Illustrative conversion</small></div><div><span>Average response</span><strong>1h 24m</strong><small>Illustrative response time</small></div><div><span>Top service</span><strong>Ready-mix</strong><small>Illustrative interest</small></div></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

