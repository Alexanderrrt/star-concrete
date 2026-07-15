import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;
  return {
    title: "Star Quality Concrete | Bay Area Ready-Mix & Pumping",
    description: "Quality ready-mix concrete, professional pumping and local dispatch for homeowners, contractors and commercial projects across the Bay Area.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Star Quality Concrete",
      description: "Concrete that shows up ready. Bay Area ready-mix and pumping since 1979.",
      type: "website",
      images: [{ url: imageUrl, width: 1732, height: 909, alt: "Star Quality Concrete ready-mix truck" }],
    },
    twitter: { card: "summary_large_image", title: "Star Quality Concrete", description: "Concrete that shows up ready.", images: [imageUrl] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
