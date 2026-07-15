import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/site-data";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://star-concrete.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Star Quality Concrete | Bay Area Ready-Mix & Pumping", template: "%s | Star Quality Concrete" },
  description: company.description,
  applicationName: company.name,
  alternates: { canonical: "/" },
  icons: { icon: "/media/logo.jpg", shortcut: "/media/logo.jpg" },
  openGraph: { title: company.name, description: company.description, type: "website", siteName: company.name, url: "/", images: [{ url: "/og.png", width: 1732, height: 909, alt: "Star Quality Concrete ready-mix truck" }] },
  twitter: { card: "summary_large_image", title: company.name, description: company.tagline, images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.description,
    foundingDate: String(company.founded),
    telephone: company.mainPhone,
    email: company.email,
    address: { "@type": "PostalAddress", streetAddress: "1404 S 7th St", addressLocality: "San Jose", addressRegion: "CA", postalCode: "95112", addressCountry: "US" },
    areaServed: ["San Jose", "Santa Clara County", "South County", "San Benito County"],
    openingHours: "Mo-Fr 08:00-16:00",
    url: siteUrl,
    sameAs: [company.yelp],
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
