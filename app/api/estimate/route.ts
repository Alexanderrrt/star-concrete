import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 10;

const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const allowedFileTypes = new Set([
  "application/pdf",
  "image/heic",
  "image/heif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type EstimatePayload = {
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
  companyName?: string;
  website?: string;
  consented: boolean;
};

const requiredFields: Array<keyof EstimatePayload> = [
  "projectType", "size", "placement", "address", "city", "access", "pourDate",
  "flexibility", "budget", "firstName", "lastName", "email", "phone",
];

const clean = (value: unknown, maxLength = 500) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function normalizePayload(input: unknown): EstimatePayload | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const payload: EstimatePayload = {
    projectType: clean(raw.projectType, 80),
    size: clean(raw.size, 120),
    placement: clean(raw.placement, 80),
    address: clean(raw.address, 180),
    city: clean(raw.city, 80),
    access: clean(raw.access, 1200),
    pourDate: clean(raw.pourDate, 20),
    flexibility: clean(raw.flexibility, 80),
    budget: clean(raw.budget, 80),
    firstName: clean(raw.firstName, 80),
    lastName: clean(raw.lastName, 80),
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 50),
    companyName: clean(raw.companyName, 120),
    website: clean(raw.website, 200),
    consented: raw.consented === true,
  };

  if (payload.website) return null;
  if (!payload.consented) return null;
  if (requiredFields.some((field) => !payload[field])) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return null;
  return payload;
}

const emailRow = (label: string, value: string) =>
  `<tr>
    <td style="padding:12px 0;color:#77736d;font-size:13px;line-height:1.45;border-bottom:1px solid #ebe7df;width:34%;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:12px 0 12px 18px;color:#1e1b1c;font-size:14px;line-height:1.45;font-weight:700;border-bottom:1px solid #ebe7df;vertical-align:top">${escapeHtml(value || "Not provided")}</td>
  </tr>`;

const emailSection = (title: string, rows: Array<[string, string]>) =>
  `<tr><td style="padding:0 34px 24px">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;background:#ffffff;border:1px solid #e8e2d8;border-radius:10px">
      <tr><td style="padding:18px 20px 7px;color:#64182a;font-size:12px;line-height:1.2;font-weight:800;letter-spacing:1.4px;text-transform:uppercase">${escapeHtml(title)}</td></tr>
      <tr><td style="padding:0 20px 8px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">${rows.map(([label, value]) => emailRow(label, value)).join("")}</table></td></tr>
    </table>
  </td></tr>`;

function formatPourDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const [, year, month, day] = match;
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))));
}

function buildEmailHtml(payload: EstimatePayload, files: File[]) {
  const name = `${payload.firstName} ${payload.lastName}`;
  const fullAddress = `${payload.address}, ${payload.city}`;
  const replyUrl = `mailto:${payload.email}?subject=${encodeURIComponent(`Re: concrete estimate for ${payload.projectType}`)}`;
  const callUrl = `tel:${payload.phone.replace(/[^+\d]/g, "")}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  const attachments = files.length ? files.map((file) => file.name).join(", ") : "No files attached";

  return `<!doctype html>
  <html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#f2efe9;color:#1e1b1c;font-family:Arial,Helvetica,sans-serif">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">New ${escapeHtml(payload.projectType)} estimate request from ${escapeHtml(name)} in ${escapeHtml(payload.city)}.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f2efe9">
      <tr><td align="center" style="padding:28px 12px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;max-width:680px;background:#faf9f6;border:1px solid #ddd6cb;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(45,35,30,.08)">
          <tr><td style="height:6px;background:#64182a;font-size:0;line-height:0">&nbsp;</td></tr>
          <tr><td style="padding:18px 28px;background:#ffffff">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
              <td><img src="https://starconcrete.vercel.app/media/logo.jpg" width="150" alt="Star Quality Concrete" style="display:block;width:150px;max-width:100%;height:auto;border:0"></td>
              <td align="right" style="color:#77736d;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:1.2px;text-transform:uppercase">Website estimate<br>request</td>
            </tr></table>
          </td></tr>
          <tr><td style="padding:34px;background:#64182a;color:#ffffff">
            <div style="margin:0 0 10px;color:#e8c9d0;font-size:11px;line-height:1.2;font-weight:800;letter-spacing:1.5px;text-transform:uppercase">New project lead</div>
            <h1 style="margin:0;font-size:30px;line-height:1.15;font-weight:800">${escapeHtml(payload.projectType)} in ${escapeHtml(payload.city)}</h1>
            <p style="margin:12px 0 0;color:#f5e9ec;font-size:15px;line-height:1.5">Submitted by ${escapeHtml(name)}${payload.companyName ? ` · ${escapeHtml(payload.companyName)}` : ""}</p>
          </td></tr>
          <tr><td style="padding:28px 34px 20px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;background:#fff7e7;border:1px solid #ead8ae;border-radius:9px"><tr>
              <td style="padding:15px 18px;color:#5f4d24;font-size:13px;line-height:1.5"><strong style="color:#64182a">Ready for review.</strong> Reply to this email to contact ${escapeHtml(payload.firstName)} directly.</td>
            </tr></table>
          </td></tr>
          ${emailSection("Project", [["Project type", payload.projectType], ["Approx. size / volume", payload.size], ["Placement method", payload.placement]])}
          ${emailSection("Site", [["Project address", fullAddress], ["Access and placement notes", payload.access]])}
          ${emailSection("Schedule & budget", [["Preferred pour date", formatPourDate(payload.pourDate)], ["Date flexibility", payload.flexibility], ["Budget range", payload.budget]])}
          ${emailSection("Customer", [["Contact", name], ["Company", payload.companyName || "Not provided"], ["Email", payload.email], ["Phone", payload.phone], ["Attachments", attachments]])}
          <tr><td style="padding:0 34px 30px">
            <table role="presentation" cellspacing="0" cellpadding="0"><tr>
              <td style="background:#64182a;border-radius:7px"><a href="${escapeHtml(replyUrl)}" style="display:inline-block;padding:13px 19px;color:#ffffff;font-size:13px;font-weight:800;text-decoration:none">Reply to customer</a></td>
              <td width="10">&nbsp;</td>
              <td style="background:#ffffff;border:1px solid #cfc7bc;border-radius:7px"><a href="${escapeHtml(callUrl)}" style="display:inline-block;padding:12px 18px;color:#64182a;font-size:13px;font-weight:800;text-decoration:none">Call ${escapeHtml(payload.firstName)}</a></td>
              <td width="10">&nbsp;</td>
              <td><a href="${escapeHtml(mapUrl)}" style="color:#64182a;font-size:13px;font-weight:700">View map</a></td>
            </tr></table>
          </td></tr>
          <tr><td style="padding:18px 34px;background:#ebe7df;color:#77736d;font-size:11px;line-height:1.5">Sent securely from the Star Quality Concrete website. The customer consented to share these project and contact details.</td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ESTIMATE_RECIPIENT;
  const from = process.env.ESTIMATE_FROM_EMAIL;

  if (!apiKey || !recipient || !from) {
    console.error("Estimate delivery is missing required email environment variables.");
    return NextResponse.json({ error: "Estimate delivery is temporarily unavailable. Please call dispatch." }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const rawPayload = formData.get("payload");
    if (typeof rawPayload !== "string") {
      return NextResponse.json({ error: "The request could not be read." }, { status: 400 });
    }

    const payload = normalizePayload(JSON.parse(rawPayload));
    if (!payload) {
      return NextResponse.json({ error: "Please review the required project and contact details." }, { status: 400 });
    }

    const files = formData.getAll("files").filter((item): item is File => item instanceof File && item.size > 0);
    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `Please attach no more than ${MAX_FILES} files.` }, { status: 400 });
    }

    const totalBytes = files.reduce((total, file) => total + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json({ error: "Attachments must total 4 MB or less." }, { status: 400 });
    }
    if (files.some((file) => !allowedFileTypes.has(file.type))) {
      return NextResponse.json({ error: "Attachments must be JPG, PNG, WebP, HEIC, or PDF files." }, { status: 400 });
    }

    const attachments = await Promise.all(files.map(async (file) => ({
      filename: file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120),
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    })));
    const name = `${payload.firstName} ${payload.lastName}`;
    const subject = `New estimate request — ${payload.projectType} — ${payload.city}`;
    const details = [
      ["Project", payload.projectType], ["Approx. size / volume", payload.size], ["Placement", payload.placement],
      ["Address", `${payload.address}, ${payload.city}`], ["Access notes", payload.access], ["Preferred pour date", payload.pourDate],
      ["Date flexibility", payload.flexibility], ["Budget range", payload.budget], ["Contact", name],
      ["Company", payload.companyName || "Not provided"], ["Email", payload.email], ["Phone", payload.phone],
      ["Attachments", files.length ? files.map((file) => file.name).join(", ") : "None"],
    ];
    const textBody = ["NEW STAR QUALITY CONCRETE ESTIMATE REQUEST", "", ...details.map(([label, value]) => `${label}: ${value}`)].join("\n");
    const htmlBody = buildEmailHtml(payload, files);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
        "User-Agent": "star-concrete-website/1.0",
      },
      body: JSON.stringify({
        from,
        to: recipient.split(",").map((email) => email.trim()).filter(Boolean),
        reply_to: payload.email,
        subject,
        html: htmlBody,
        text: textBody,
        attachments,
        tags: [{ name: "source", value: "website-estimate" }],
      }),
    });

    if (!response.ok) {
      const providerError = await response.text();
      console.error("Resend estimate delivery failed:", response.status, providerError);
      return NextResponse.json({ error: "We could not deliver the request. Please try again or call dispatch." }, { status: 502 });
    }

    const result = await response.json() as { id?: string };
    return NextResponse.json({ ok: true, id: result.id });
  } catch (error) {
    console.error("Estimate submission failed:", error);
    return NextResponse.json({ error: "We could not deliver the request. Please try again or call dispatch." }, { status: 500 });
  }
}
