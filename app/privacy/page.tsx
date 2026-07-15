import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Privacy", robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return <><PageHero compact eyebrow="Privacy" title={<>Clear information.<br /><em>No hidden submission.</em></>} description="How this website handles the information you choose to share." /><article className="section legal-copy"><p><strong>Last updated:</strong> July 15, 2026</p><h2>Estimate requests</h2><p>The guided estimate tool runs in your browser and prepares an email draft. It does not upload your form entries or selected files to this website. Information leaves your device only when you review and send the email through your own mail provider.</p><h2>Files</h2><p>The tool records selected file names in the draft as a reminder. It cannot attach those files automatically. You decide whether to attach and send them.</p><h2>Analytics and hosting</h2><p>When deployed, the hosting provider may process standard technical information such as IP address, browser type, and request logs for security and site operation. Any optional analytics added by the site owner should be documented here before activation.</p><h2>External links</h2><p>Links to Yelp, phone services, maps, and email applications are governed by those providers’ terms and privacy practices.</p><h2>Contact</h2><p>For questions about this website or information sent to Star Quality Concrete, email <a href="mailto:tbbsandman@gmail.com">tbbsandman@gmail.com</a> or call <a href="tel:+14089470669">408-947-0669</a>.</p></article></>;
}

