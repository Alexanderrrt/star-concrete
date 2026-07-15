"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/portal", label: "Project status" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Star Quality Concrete home">
        <span className="brand-mark" aria-hidden="true">S</span>
        <span><strong>STAR</strong><small>QUALITY CONCRETE</small></span>
      </Link>
      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
        {links.map((link) => (
          <Link className={pathname.startsWith(link.href) ? "active" : ""} href={link.href} key={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <div className="mobile-nav-actions">
          <a href="tel:+14089470159" onClick={() => setOpen(false)}>San Jose · 408 947 0159</a>
          <Link href="/estimate" onClick={() => setOpen(false)}>Request an estimate</Link>
        </div>
      </nav>
      <Link className="header-cta" href="/estimate">Get an estimate <span aria-hidden="true">↗</span></Link>
      <button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span></span><span></span>
      </button>
    </header>
  );
}
