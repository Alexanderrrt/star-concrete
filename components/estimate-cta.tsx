import Link from "next/link";

export function EstimateCta({ title = "Ready when you are.", copy = "Tell us what you’re planning. We’ll organize the details so dispatch can respond with the right questions." }) {
  return (
    <section className="closing-cta">
      <div><p className="eyebrow light"><span></span>Let’s make it solid</p><h2>{title}</h2></div>
      <div><p>{copy}</p><Link className="button button-light" href="/estimate">Request an estimate <span aria-hidden="true">→</span></Link></div>
    </section>
  );
}

