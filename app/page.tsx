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

const PROJECTS: ProjectData[] = [
  { id: 1, title: "Midnight Drift", category: "Automotive", span: "large", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85", meta: { camera: "Sony A7IV", iso: "800", aperture: "f/2.8", speed: "1/125s" } },
  { id: 2, title: "Coastal Fragments", category: "Travel", span: "tall", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85", meta: { camera: "Fuji X-T5", iso: "200", aperture: "f/8", speed: "1/500s" } },
  { id: 3, title: "Carbon Heritage", category: "Automotive", span: "medium", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85", meta: { camera: "Canon R5", iso: "400", aperture: "f/4", speed: "1/250s" } },
  { id: 4, title: "The Quiet Temple", category: "Travel", span: "wide", img: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&q=85", meta: { camera: "Sony A7IV", iso: "100", aperture: "f/11", speed: "1/60s" } },
  { id: 5, title: "Velocity", category: "Automotive", span: "medium", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=85", meta: { camera: "Nikon Z8", iso: "1600", aperture: "f/2", speed: "1/1000s" } },
  { id: 6, title: "Monsoon Passage", category: "Travel", span: "large", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85", meta: { camera: "Fuji X-T5", iso: "400", aperture: "f/5.6", speed: "1/320s" } },
  { id: 7, title: "Twin Turbo", category: "Automotive", span: "tall", img: "https://images.unsplash.com/photo-1614162118012-f3291e9d3eb4?w=800&q=85", meta: { camera: "Sony A1", iso: "3200", aperture: "f/1.8", speed: "1/2000s" } },
  { id: 8, title: "Desert Atlas", category: "Travel", span: "medium", img: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=85", meta: { camera: "Hasselblad X2D", iso: "64", aperture: "f/16", speed: "1/30s" } },
  { id: 9, title: "Street Souls", category: "Portraits", span: "tall", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=85", meta: { camera: "Sony A7IV", iso: "400", aperture: "f/1.4", speed: "1/200s" } },
  { id: 10, title: "Neon Nights", category: "Events", span: "large", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85", meta: { camera: "Canon R5", iso: "1600", aperture: "f/2.8", speed: "1/100s" } },
  { id: 11, title: "Urban Flow", category: "Short Films", span: "wide", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=85", meta: { camera: "RED Komodo", iso: "800", aperture: "T2.0", speed: "24fps" }, videoUrl: "https://cdn-prod-ccv.adobe.com/BGTmqxJdtW4/rend/master.m3u8?hdnts=st%3D1770060127%7Eexp%3D1770319327%7Eacl%3D%2Fshared_assets%2Fimage%2F*%21%2Fz%2FBGTmqxJdtW4%2Frend%2F*%21%2Fi%2FBGTmqxJdtW4%2Frend%2F*%21%2FBGTmqxJdtW4%2Frend%2F*%21%2FBGTmqxJdtW4%2Fimage%2F*%21%2FBGTmqxJdtW4%2Fcaptions%2F*%7Ehmac%3D50fc8afe39633ce9f7a9df1b47012c5234307cae3f056d1d7713e31fcb5c650c" },
  { id: 12, title: "Studio Gaze", category: "Portraits", span: "medium", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85", meta: { camera: "Hasselblad X2D", iso: "100", aperture: "f/2.8", speed: "1/160s" } },
  { id: 13, title: "Neon Noir", category: "Short Films", span: "tall", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=85", meta: { camera: "Sony FX3", iso: "3200", aperture: "f/1.8", speed: "60fps" }, videoUrl: "https://cdn-prod-ccv.adobe.com/I9CAa8_gxT8/rend/master.m3u8?hdnts=st%3D1770060126%7Eexp%3D1770319326%7Eacl%3D%2Fshared_assets%2Fimage%2F*%21%2Fz%2FI9CAa8_gxT8%2Frend%2F*%21%2Fi%2FI9CAa8_gxT8%2Frend%2F*%21%2FI9CAa8_gxT8%2Frend%2F*%21%2FI9CAa8_gxT8%2Fimage%2F*%21%2FI9CAa8_gxT8%2Fcaptions%2F*%7Ehmac%3D71751522d2e08c173b8c580db640ad89782afffb00d65cbab5833bbbaa8530d5" },
  { id: 14, title: "Desert Mirage", category: "Short Films", span: "medium", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=800&q=85", meta: { camera: "BMPCC 6K", iso: "400", aperture: "T2.8", speed: "24fps" }, videoUrl: "https://cdn-prod-ccv.adobe.com/V89r2kEcVqo/rend/master.m3u8?hdnts=st%3D1770060126%7Eexp%3D1770319326%7Eacl%3D%2Fshared_assets%2Fimage%2F*%21%2Fz%2FV89r2kEcVqo%2Frend%2F*%21%2Fi%2FV89r2kEcVqo%2Frend%2F*%21%2FV89r2kEcVqo%2Frend%2F*%21%2FV89r2kEcVqo%2Fimage%2F*%21%2FV89r2kEcVqo%2Fcaptions%2F*%7Ehmac%3D6c9369f650207209ed8230a51bb55b2c92ce24e8bc652361786a1719fc9f6b79" },
  { id: 15, title: "City Rhythms", category: "Short Films", span: "large", img: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1200&q=85", meta: { camera: "Arri Alexa Mini", iso: "800", aperture: "T2.8", speed: "25fps" }, videoUrl: "https://cdn-prod-ccv.adobe.com/8R5P2YI5xIG/rend/master.m3u8?hdnts=st%3D1770060126%7Eexp%3D1770319326%7Eacl%3D%2Fshared_assets%2Fimage%2F*%21%2Fz%2F8R5P2YI5xIG%2Frend%2F*%21%2Fi%2F8R5P2YI5xIG%2Frend%2F*%21%2F8R5P2YI5xIG%2Frend%2F*%21%2F8R5P2YI5xIG%2Fimage%2F*%21%2F8R5P2YI5xIG%2Fcaptions%2F*%7Ehmac%3D49a911bc428133c430fb4f69fc002a52403aa978cd78e1f43f3f5e3ca488881c" },
];

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
