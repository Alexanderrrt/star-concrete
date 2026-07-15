"use client";

import { FormEvent, useRef, useState } from "react";
import { company } from "@/lib/site-data";

const steps = ["Project", "Site", "Timing", "Contact", "Review"];
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

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
  projectType: "", size: "", placement: "", address: "", city: "", access: "",
  pourDate: "", flexibility: "", budget: "", firstName: "", lastName: "",
  email: "", phone: "", companyName: "",
};

export function EstimateForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [consented, setConsented] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: keyof EstimateData, value: string) => setData((current) => ({ ...current, [field]: value }));

  const next = (event: FormEvent) => {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectFiles = (selected: FileList | null) => {
    const nextFiles = Array.from(selected ?? []);
    const totalBytes = nextFiles.reduce((total, file) => total + file.size, 0);
    if (nextFiles.length > 3) {
      setFiles([]);
      setFileError("Please choose no more than 3 files.");
      return;
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
      setFiles([]);
      setFileError("Attachments must total 4 MB or less.");
      return;
    }
    setFileError("");
    setFiles(nextFiles);
  };

  const submitEstimate = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("submitting");
    setSubmitError("");

    try {
      const body = new FormData();
      body.append("payload", JSON.stringify({ ...data, consented, website }));
      files.forEach((file) => body.append("files", file));
      const response = await fetch("/api/estimate", { method: "POST", body });
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not deliver the request.");
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not deliver the request.");
      setStatus("error");
    }
  };

  const reset = () => {
    setStep(0);
    setData(initialData);
    setFiles([]);
    setConsented(false);
    setWebsite("");
    setStatus("idle");
    setSubmitError("");
    setFileError("");
  };

  return (
    <div className="estimate-workspace">
      <aside className="estimate-sidebar">
        <p className="eyebrow light"><span></span>Guided request</p>
        <h2>One clear brief for dispatch.</h2>
        <p>Complete each step and your project details will be delivered directly to the Star team.</p>
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
        <div className="estimate-form-top"><span>{status === "success" ? "Request delivered" : `Step ${step + 1} of ${steps.length}`}</span><div><i style={{ width: status === "success" ? "100%" : `${((step + 1) / steps.length) * 100}%` }}></i></div></div>
        {status !== "success" ? (
          <form ref={formRef} onSubmit={step < 4 ? next : submitEstimate}>
            <label className="website-field" aria-hidden="true">Website<input value={website} onChange={(event) => setWebsite(event.target.value)} autoComplete="off" tabIndex={-1} /></label>

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
                  <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf" onChange={(event) => selectFiles(event.target.files)} />
                  <span><b>＋</b><strong>{files.length ? `${files.length} file${files.length === 1 ? "" : "s"} selected` : "Choose site photos or plans"}</strong><small>Optional · Up to 3 JPG, PNG, WebP, HEIC, or PDF files · 4 MB total</small></span>
                </label>
                {fileError && <p className="form-error" role="alert">{fileError}</p>}
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
                <label className="consent"><input type="checkbox" checked={consented} onChange={(event) => setConsented(event.target.checked)} required /><span>I agree to send these details and selected files to Star Quality Concrete so the team can respond to this request.</span></label>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset className="estimate-step review-step">
                <legend><small>Final review</small>Ready to send directly.</legend>
                <div className="estimate-summary">
                  <div><span>Project</span><strong>{data.projectType}</strong><small>{data.size} · {data.placement}</small></div>
                  <div><span>Site</span><strong>{data.city}</strong><small>{data.address}</small></div>
                  <div><span>Timing</span><strong>{data.pourDate}</strong><small>{data.flexibility} · {data.budget}</small></div>
                  <div><span>Contact</span><strong>{data.firstName} {data.lastName}</strong><small>{data.email} · {data.phone}</small></div>
                </div>
                <p className="attachment-reminder"><strong>Direct delivery:</strong> Your request{files.length ? ` and ${files.length} selected file${files.length === 1 ? "" : "s"}` : ""} will be emailed to the Star team when you submit.</p>
                {status === "error" && <p className="submit-error" role="alert">{submitError}</p>}
              </fieldset>
            )}

            <div className="estimate-actions">
              {step > 0 && <button className="button button-secondary" type="button" disabled={status === "submitting"} onClick={() => setStep((current) => current - 1)}>← Back</button>}
              {step < 4 ? <button className="button button-primary" type="submit">Continue <span>→</span></button> : <button className="button button-primary" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send estimate request"} <span>→</span></button>}
            </div>
          </form>
        ) : (
          <div className="estimate-ready" role="status">
            <span className="success-mark">✓</span>
            <p className="eyebrow"><span></span>Request delivered</p>
            <h2>Your project is with the Star team.</h2>
            <p>The estimate details{files.length ? " and selected files were" : " were"} sent successfully. A team member can reply directly to the email address you provided.</p>
            <div><button className="button button-primary" type="button" onClick={reset}>Submit another request</button><a className="button button-secondary" href={`tel:${company.sanJoseDispatchHref}`}>Call dispatch</a></div>
          </div>
        )}
      </div>
    </div>
  );
}
