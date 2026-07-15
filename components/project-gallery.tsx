"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/site-data";

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
  const filtered = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <div className="project-toolbar">
        <p><strong>{filtered.length}</strong> project {filtered.length === 1 ? "story" : "stories"}</p>
        <div className="project-filters" aria-label="Filter projects">
          {categories.map((category) => <button className={filter === category ? "active" : ""} aria-pressed={filter === category} onClick={() => setFilter(category)} key={category}>{category}</button>)}
        </div>
      </div>
      <div className="project-story-grid">
        {filtered.map((project, index) => (
          <article className="project-story" key={project.slug}>
            <div className="project-story-image">
              <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 800px) 100vw, 50vw" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="project-story-copy">
              <p>{project.category} · {project.location}</p>
              <h2>{project.title}</h2>
              <dl>
                <div><dt>Scope</dt><dd>{project.scope}</dd></div>
                <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>
                <div><dt>Materials</dt><dd>{project.materials}</dd></div>
                <div><dt>Challenge</dt><dd>{project.challenge}</dd></div>
                <div><dt>Result</dt><dd>{project.result}</dd></div>
              </dl>
              {project.source && <small>{project.source}</small>}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

