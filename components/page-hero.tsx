import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
  compact?: boolean;
};

export function PageHero({ eyebrow, title, description, image, imageAlt = "", compact = false }: PageHeroProps) {
  return (
    <section className={`page-hero${image ? " has-image" : ""}${compact ? " compact" : ""}`}>
      <div className="page-hero-copy">
        <p className="eyebrow"><span></span>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {image && <div className="page-hero-image"><Image src={image} alt={imageAlt} fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>}
    </section>
  );
}

