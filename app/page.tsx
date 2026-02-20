"use client";
import React, { useState, useEffect, useCallback } from "react";
import Navigation from "./components/Navigation";
import ProjectHero from "./components/ProjectHero";
import ImageCard from "./components/ImageCard";
import Lightbox from "./components/Lightbox";
import PageTransition from "./components/PageTransition";
import Footer from "./components/Footer";
import AboutModal from "./components/AboutModal";
import { ProjectData } from "./types";
import { PROJECTS } from "./data/projects";

const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E`;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [transitioning, setTransitioning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchCategory = useCallback((cat: string) => {
    if (cat === activeCategory) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setTimeout(() => setTransitioning(false), 100);
    }, 450);
  }, [activeCategory]);

  const filtered = activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);
  const projectCount = filtered.length;

  return (
    <div className="flex min-h-screen">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9990,
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundSize: "128px 128px",
          opacity: "var(--texture-opacity)",
          animation: "grainShift 0.5s steps(4) infinite",
          mixBlendMode: "overlay",
        }}
      />

      <PageTransition active={transitioning} />
      {selectedProject && (
        <Lightbox
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          hasNext={filtered.length > 1}
          hasPrev={filtered.length > 1}
          onNext={() => {
            const idx = filtered.findIndex(p => p.id === selectedProject.id);
            const nextIdx = (idx + 1) % filtered.length;
            setSelectedProject(filtered[nextIdx]);
          }}
          onPrev={() => {
            const idx = filtered.findIndex(p => p.id === selectedProject.id);
            const prevIdx = (idx - 1 + filtered.length) % filtered.length;
            setSelectedProject(filtered[prevIdx]);
          }}
        />
      )}
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}

      <Navigation
        activeCategory={activeCategory}
        onCategoryChange={switchCategory}
        onAboutClick={() => setAboutOpen(true)}
        mounted={mounted}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
      />

      <main
        className="flex-1 overflow-y-auto min-h-screen transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ marginLeft: sidebarCollapsed ? 0 : 0 }}
      >
        <ProjectHero activeCategory={activeCategory} projectCount={projectCount} mounted={mounted} />

        {/* Category pills (mobile) */}
        <div className="flex md:hidden gap-3 px-6 py-4 overflow-x-auto" style={{ borderBottom: "1px solid var(--border)" }}>
          {["All", "Projects", "Automotive", "Travel", "Portraits", "Events", "Short Films"].map((cat) => (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "8px 16px",
                borderRadius: 20,
                border: `1px solid ${activeCategory === cat ? "var(--muted-foreground)" : "var(--border)"}`,
                background: activeCategory === cat ? "var(--border)" : "transparent",
                color: activeCategory === cat ? "var(--foreground)" : "var(--muted-foreground)",
                cursor: "none",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Grid */}
        <section
          className="grid grid-cols-12 gap-3 md:gap-4"
          style={{
            padding: "clamp(16px, 3vw, 40px)",
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(20px)" : "translateY(0)",
            transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {filtered.map((project, i) => (
            <ImageCard key={project.id} project={project} index={i} onSelect={setSelectedProject} />
          ))}
        </section>

        <Footer />
      </main>
    </div>
  );
}
