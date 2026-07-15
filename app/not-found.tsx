import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><p className="eyebrow"><span></span>404 · Not found</p><h1>This page<br /><em>didn’t set.</em></h1><p>The address may have changed. Start from the homepage or send a new estimate request.</p><div><Link className="button button-primary" href="/">Back home <span>→</span></Link><Link className="text-link" href="/estimate">Request an estimate</Link></div></section>;
}

