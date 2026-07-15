import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return <><PageHero compact eyebrow="Accessibility" title={<>Built to work<br /><em>for more people.</em></>} description="Star Quality Concrete aims to make this website usable across devices, input methods, and assistive technologies." /><article className="section legal-copy"><h2>Our approach</h2><p>The site uses semantic headings, labeled form controls, keyboard-visible focus states, a skip link, responsive layouts, descriptive image alternatives, and reduced-motion support.</p><h2>Known limitations</h2><p>Some historical and customer-supplied project images may not communicate every visual detail through text alone. The public BuildHub dashboard and portal are product demonstrations, not production account systems.</p><h2>Feedback</h2><p>If you have trouble accessing content or completing the estimate flow, email <a href="mailto:tbbsandman@gmail.com">tbbsandman@gmail.com</a> or call <a href="tel:+14089470669">408-947-0669</a>. Please include the page and the assistance you need.</p></article></>;
}

