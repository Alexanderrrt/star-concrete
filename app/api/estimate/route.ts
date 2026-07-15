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

const row = (label: string, value: string) =>
  `<tr><td style="padding:9px 14px;color:#6f6d68;border-bottom:1px solid #e6e1d8;width:34%">${escapeHtml(label)}</td><td style="padding:9px 14px;font-weight:600;border-bottom:1px solid #e6e1d8">${escapeHtml(value || "Not provided")}</td></tr>`;

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
    const htmlBody = `<div style="font-family:Arial,sans-serif;color:#171719;max-width:680px;margin:auto"><div style="background:#64182a;color:white;padding:24px"><div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase">Website estimate request</div><h1 style="margin:8px 0 0;font-size:28px">${escapeHtml(payload.projectType)} in ${escapeHtml(payload.city)}</h1></div><table role="presentation" style="width:100%;border-collapse:collapse;background:#faf9f6">${details.map(([label, value]) => row(label, value)).join("")}</table><p style="padding:18px 14px;color:#6f6d68;font-size:13px">Reply to this email to contact ${escapeHtml(name)} directly.</p></div>`;

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
