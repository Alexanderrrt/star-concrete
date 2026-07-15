"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { company } from "@/lib/site-data";

const steps = ["Project", "Site", "Timing", "Contact", "Review"];

type EstimateData = {
  projectType: string;
  size: string;
  placement: string;
  address: string;
  city: string;
  access: string;
  pourDate: string;
  flexibility: string;
  budget: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
};

const initialData: EstimateData = {
  projectType: "",
  size: "",
  placement: "",
  address: "",
  city: "",
  access: "",
  pourDate: "",
  flexibility: "",
  budget: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
};

export function EstimateForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [files, setFiles] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: keyof EstimateData, value: string) => setData((current) => ({ ...current, [field]: value }));

  const summary = useMemo(() => [
    "STAR QUALITY CONCRETE — ESTIMATE REQUEST",
    "",
    `Project: ${data.projectType || "Not provided"}`,
    `Approximate size / volume: ${data.size || "Not provided"}`,
    `Placement needs: ${data.placement || "Not provided"}`,
    `Address: ${[data.address, data.city].filter(Boolean).join(", ") || "Not provided"}`,
    `Site access: ${data.access || "Not provided"}`,
    `Requested pour date: ${data.pourDate || "Not provided"}`,
    `Date flexibility: ${data.flexibility || "Not provided"}`,
    `Budget range: ${data.budget || "Not provided"}`,
    `Files to attach: ${files.length ? files.join(", ") : "None"}`,
    "",
    `Contact: ${[data.firstName, data.lastName].filter(Boolean).join(" ")}`,
    `Company: ${data.companyName || "Not provided"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    "Please confirm current availability, mix recommendations, delivery requirements, and pricing.",
  ].join("\n"), [data, files]);

  const next = (event: FormEvent) => {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEmail = () => {
    const subject = `Estimate request — ${data.projectType} — ${data.city}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
    setReady(true);
  };

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="estimate-workspace">
      <aside className="estimate-sidebar">
        <p className="eyebrow light"><span></span>Guided request</p>
        <h2>One clear brief for dispatch.</h2>
        <p>Complete each step and we’ll format your project details into a ready-to-send email.</p>
        <ol>
          {steps.map((label, index) => (
            <li className={index === step ? "active" : index < step ? "done" : ""} key={label}>
              <span>{index < step ? "✓" : String(index + 1).padStart(2, "0")}</span>{label}
            </li>
          ))}
        </ol>
        <div className="estimate-help"><small>Time-sensitive?</small><a href={`tel:${company.sanJoseDispatchHref}`}>{company.sanJoseDispatch}</a><span>San Jose dispatch</span></div>
      </aside>

      <div className="estimate-form-shell">
        <div className="estimate-form-top"><span>Step {step + 1} of {steps.length}</span><div><i style={{ width: `${((step + 1) / steps.length) * 100}%` }}></i></div></div>
        {!ready ? (
          <form ref={formRef} onSubmit={next}>
            {step === 0 && (
              <fieldset className="estimate-step">
                <legend><small>Project details</small>What are you building?</legend>
                <div className="choice-grid">
                  {["Foundation", "Driveway", "Patio / flatwork", "Commercial slab", "Retaining wall", "Other"].map((choice) => (
                    <label className="choice" key={choice}><input type="radio" name="projectType" value={choice} checked={data.projectType === choice} onChange={(event) => update("projectType", event.target.value)} required /><span>{choice}</span></label>
                  ))}
                </div>
                <div className="field-row">
                  <label>Approximate size or volume<input value={data.size} onChange={(event) => update("size", event.target.value)} placeholder="e.g. 1,200 sq ft or 18 cubic yards" required /></label>
                  <label>Expected placement method<select value={data.placement} onChange={(event) => update("placement", event.target.value)} required><option value="" disabled>Select one</option><option>Direct truck discharge</option><option>Pump required</option><option>Wheelbarrow / buggy</option><option>Not sure — please advise</option></select></label>
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset className="estimate-step">
                <legend><small>Site details</small>Where is the pour?</legend>
                <div className="field-row">
                  <label>Project address<input value={data.address} onChange={(event) => update("address", event.target.value)} placeholder="Street address" required /></label>
                  <label>City<input value={data.city} onChange={(event) => update("city", event.target.value)} placeholder="San Jose" required /></label>
                </div>
                <label>Access and placement notes<textarea value={data.access} onChange={(event) => update("access", event.target.value)} placeholder="Gate widths, street access, slopes, overhead lines, distance from truck to forms…" rows={5} required /></label>
                <label className="upload-field">
                  <input type="file" multiple accept="image/*,.pdf" onChange={(event) => setFiles(Array.from(event.target.files ?? []).map((file) => file.name))} />
                  <span><b>＋</b><strong>{files.length ? `${files.length} file${files.length === 1 ? "" : "s"} selected` : "Choose site photos or plans"}</strong><small>File names are added to the brief. Attach the files to the email draft before sending.</small></span>
                </label>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="estimate-step">
                <legend><small>Schedule & budget</small>When do you need it?</legend>
                <div className="field-row">
                  <label>Preferred pour date<input type="text" inputMode="numeric" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" title="Enter a date as MM/DD/YYYY" placeholder="MM/DD/YYYY" value={data.pourDate} onChange={(event) => update("pourDate", event.target.value)} required /></label>
                  <label>Date flexibility<select value={data.flexibility} onChange={(event) => update("flexibility", event.target.value)} required><option value="" disabled>Select one</option><option>Exact date needed</option><option>Flexible within one week</option><option>Flexible within one month</option><option>Planning only</option></select></label>
                </div>
                <label>Estimated project budget<select value={data.budget} onChange={(event) => update("budget", event.target.value)} required><option value="" disabled>Select a range</option><option>Under $5,000</option><option>$5,000–$15,000</option><option>$15,000–$50,000</option><option>$50,000+</option><option>Not sure</option></select></label>
                <p className="form-note">This is planning context, not a quote. Final pricing depends on mix, volume, distance, schedule, additives, pumping, and site conditions.</p>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="estimate-step">
                <legend><small>Your contact</small>Who should dispatch call?</legend>
                <div className="field-row">
                  <label>First name<input value={data.firstName} onChange={(event) => update("firstName", event.target.value)} autoComplete="given-name" required /></label>
                  <label>Last name<input value={data.lastName} onChange={(event) => update("lastName", event.target.value)} autoComplete="family-name" required /></label>
                  <label>Email<input type="email" value={data.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" required /></label>
                  <label>Phone<input type="tel" value={data.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" required /></label>
                </div>
                <label>Company <span>(optional)</span><input value={data.companyName} onChange={(event) => update("companyName", event.target.value)} autoComplete="organization" /></label>
                <label className="consent"><input type="checkbox" required /><span>I agree to share these details with Star Quality Concrete for the purpose of responding to this request.</span></label>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset className="estimate-step review-step">
                <legend><small>Final review</small>Your request is organized.</legend>
                <div className="estimate-summary">
                  <div><span>Project</span><strong>{data.projectType}</strong><small>{data.size} · {data.placement}</small></div>
                  <div><span>Site</span><strong>{data.city}</strong><small>{data.address}</small></div>
                  <div><span>Timing</span><strong>{data.pourDate}</strong><small>{data.flexibility} · {data.budget}</small></div>
                  <div><span>Contact</span><strong>{data.firstName} {data.lastName}</strong><small>{data.email} · {data.phone}</small></div>
                </div>
                {files.length > 0 && <p className="attachment-reminder"><strong>Remember:</strong> attach {files.join(", ")} to the email draft before sending.</p>}
              </fieldset>
            )}

            <div className="estimate-actions">
              {step > 0 && <button className="button button-secondary" type="button" onClick={() => setStep((current) => current - 1)}>← Back</button>}
              {step < 4 ? <button className="button button-primary" type="submit">Continue <span>→</span></button> : <button className="button button-primary" type="button" onClick={openEmail}>Open email draft <span>↗</span></button>}
            </div>
          </form>
        ) : (
          <div className="estimate-ready">
            <span className="success-mark">✓</span>
            <p className="eyebrow"><span></span>Email draft prepared</p>
            <h2>Review, attach, send.</h2>
            <p>Your mail app should now have a structured draft addressed to Star Quality Concrete. Review the details, attach any selected files, and send it when you’re ready.</p>
            <div><button className="button button-primary" onClick={openEmail}>Open draft again ↗</button><button className="button button-secondary" onClick={copySummary}>{copied ? "Copied ✓" : "Copy request details"}</button></div>
          </div>
        )}
      </div>
    </div>
  );
}
