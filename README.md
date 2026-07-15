# Star Quality Concrete

A production-ready, multi-route marketing site and BuildHub product demonstration for Star Quality Concrete. Built with Next.js App Router and prepared for Vercel.

## Included

- Conversion-focused responsive homepage
- Reusable service index and three detailed service pages
- Filterable project portfolio with scope, materials, challenge, and result
- Nine localized service-area pages
- Five-step guided estimate flow that prepares a structured email draft
- Clearly labeled interactive contractor dashboard and client portal demos
- Company history, privacy, accessibility, sitemap, robots, structured data, and social sharing metadata
- Keyboard navigation, reduced-motion support, responsive layouts, and semantic form controls

The dashboard and portal intentionally use sample data. They demonstrate the product plan without presenting fictional metrics or records as real business information.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm test
```

This runs linting, the production build, route/data checks, and completion safeguards.

## Vercel deployment

1. Import `Alexanderrrt/star-concrete` in Vercel.
2. Keep the detected framework preset as **Next.js**.
3. Set `NEXT_PUBLIC_SITE_URL` to the final production origin, such as `https://concrete.example.com`.
4. Deploy from `main`.

No database, server credentials, or private environment values are required. The estimate wizard prepares a structured email draft in the visitor’s own mail application; it does not upload form data or files to the site.

## Content sources

Business facts and official media were adapted from [starconcrete.com](https://starconcrete.com/). Selected customer-uploaded project images originated on the linked [Yelp listing](https://www.yelp.com/biz/star-concrete-san-jose) and are identified in the project portfolio. Review data is linked rather than copied so visitors see the current independent record.
