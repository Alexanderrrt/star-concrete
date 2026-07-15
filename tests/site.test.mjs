import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("ships the required public and product surfaces", async () => {
  const required = [
    "app/page.tsx",
    "app/services/page.tsx",
    "app/services/[slug]/page.tsx",
    "app/projects/page.tsx",
    "app/about/page.tsx",
    "app/service-areas/page.tsx",
    "app/service-areas/[slug]/page.tsx",
    "app/estimate/page.tsx",
    "app/api/estimate/route.ts",
    "app/dashboard/page.tsx",
    "app/portal/page.tsx",
    "app/privacy/page.tsx",
    "app/accessibility/page.tsx",
    "app/sitemap.ts",
    "app/robots.ts",
    "public/og.png",
  ];
  await Promise.all(required.map((path) => access(new URL(path, root))));
});

test("uses the Vercel-native Next.js lifecycle", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  assert.equal(packageJson.name, "star-quality-concrete");
  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
  for (const removed of ["vinext", "wrangler", "@cloudflare/vite-plugin", "drizzle-orm"]) {
    assert.equal(packageJson.dependencies?.[removed] ?? packageJson.devDependencies?.[removed], undefined);
  }
});

test("keeps business claims sourced, demos disclosed, and estimate delivery server-side", async () => {
  const [home, dashboard, portal, estimate, estimateApi] = await Promise.all([
    read("app/page.tsx"),
    read("components/workspace-demo.tsx"),
    read("components/portal-demo.tsx"),
    read("components/estimate-form.tsx"),
    read("app/api/estimate/route.ts"),
  ]);
  assert.match(home, /Independent feedback/);
  assert.doesNotMatch(home, /\$184k|18% this month|Customer review/);
  assert.match(dashboard, /Sample data only/);
  assert.match(portal, /sample information only/i);
  assert.doesNotMatch(estimate, /mailto:/);
  assert.match(estimate, /\/api\/estimate/);
  assert.match(estimateApi, /RESEND_API_KEY/);
  assert.match(estimateApi, /ESTIMATE_RECIPIENT/);
  assert.match(estimateApi, /reply_to/);
});

test("has reusable services and localized area content", async () => {
  const data = await read("lib/site-data.ts");
  assert.match(data, /ready-mix-concrete/);
  assert.match(data, /concrete-pumping/);
  assert.match(data, /color-specialty-mixes/);
  for (const city of ["San Jose", "Santa Clara", "Campbell", "Sunnyvale", "Milpitas", "Los Gatos", "Morgan Hill", "Gilroy", "Hollister"]) {
    assert.match(data, new RegExp(city));
  }
});
