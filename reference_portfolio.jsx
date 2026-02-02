import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: 1, title: "Midnight Drift", category: "Automotive", span: "large", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85", meta: { camera: "Sony A7IV", iso: "800", aperture: "f/2.8", speed: "1/125s" } },
  { id: 2, title: "Coastal Fragments", category: "Travel", span: "tall", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85", meta: { camera: "Fuji X-T5", iso: "200", aperture: "f/8", speed: "1/500s" } },
  { id: 3, title: "Carbon Heritage", category: "Automotive", span: "medium", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85", meta: { camera: "Canon R5", iso: "400", aperture: "f/4", speed: "1/250s" } },
  { id: 4, title: "The Quiet Temple", category: "Travel", span: "wide", img: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&q=85", meta: { camera: "Sony A7IV", iso: "100", aperture: "f/11", speed: "1/60s" } },
  { id: 5, title: "Velocity", category: "Automotive", span: "medium", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=85", meta: { camera: "Nikon Z8", iso: "1600", aperture: "f/2", speed: "1/1000s" } },
  { id: 6, title: "Monsoon Passage", category: "Travel", span: "large", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85", meta: { camera: "Fuji X-T5", iso: "400", aperture: "f/5.6", speed: "1/320s" } },
  { id: 7, title: "Twin Turbo", category: "Automotive", span: "tall", img: "https://images.unsplash.com/photo-1614162118012-f3291e9d3eb4?w=800&q=85", meta: { camera: "Sony A1", iso: "3200", aperture: "f/1.8", speed: "1/2000s" } },
  { id: 8, title: "Desert Atlas", category: "Travel", span: "medium", img: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=85", meta: { camera: "Hasselblad X2D", iso: "64", aperture: "f/16", speed: "1/30s" } },
];

const CATEGORIES = ["All", "Automotive", "Travel"];

// ─── Noise SVG (inline, no network) ─────────────────────────────────────────
const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E`;

// ─── Custom Cursor ──────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const hoverLabel = useRef("");
  const raf = useRef(null);

  useEffect(() => {
    const lerp = (a, b, n) => a + (b - a) * n;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e) => {
      const card = e.target.closest("[data-cursor]");
      if (card) {
        hovering.current = true;
        hoverLabel.current = card.dataset.cursor || "VIEW";
      }
    };
    const onOut = (e) => {
      const card = e.target.closest("[data-cursor]");
      if (card) {
        hovering.current = false;
        hoverLabel.current = "";
      }
    };

    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const s = hovering.current ? 80 : 24;
        ringRef.current.style.transform = `translate(${pos.current.x - s / 2}px, ${pos.current.y - s / 2}px)`;
        ringRef.current.style.width = `${s}px`;
        ringRef.current.style.height = `${s}px`;
        ringRef.current.style.opacity = hovering.current ? "1" : "0.5";
        ringRef.current.style.background = hovering.current ? "rgba(245,245,245,0.12)" : "transparent";
        ringRef.current.style.mixBlendMode = hovering.current ? "difference" : "normal";
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x - 40}px, ${pos.current.y - 8}px)`;
        labelRef.current.style.opacity = hovering.current ? "1" : "0";
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: "#F5F5F5", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference", transition: "none" }} />
      <div ref={ringRef} style={{ position: "fixed", top: 0, left: 0, width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(245,245,245,0.4)", pointerEvents: "none", zIndex: 9998, transition: "width 0.4s cubic-bezier(.22,1,.36,1), height 0.4s cubic-bezier(.22,1,.36,1), opacity 0.3s, background 0.3s", mixBlendMode: "difference" }} />
      <div ref={labelRef} style={{ position: "fixed", top: 0, left: 0, width: 80, textAlign: "center", pointerEvents: "none", zIndex: 9999, fontSize: 10, letterSpacing: "0.2em", fontFamily: "'JetBrains Mono', monospace", color: "#F5F5F5", mixBlendMode: "difference", transition: "opacity 0.3s" }}>
        {hoverLabel.current || "VIEW"}
      </div>
    </>
  );
}

// ─── Image Reveal Card ──────────────────────────────────────────────────────
function ImageCard({ project, index, onSelect }) {
  const cardRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const spanClass = {
    large: "col-span-12 md:col-span-8 row-span-2",
    tall: "col-span-12 md:col-span-4 row-span-2",
    wide: "col-span-12 md:col-span-8 row-span-1",
    medium: "col-span-12 md:col-span-4 row-span-1",
  }[project.span] || "col-span-12 md:col-span-4";

  const aspectClass = {
    large: "aspect-[16/10]",
    tall: "aspect-[3/4]",
    wide: "aspect-[21/9]",
    medium: "aspect-[4/3]",
  }[project.span] || "aspect-[4/3]";

  const delay = `${(index % 4) * 0.12 + 0.1}s`;

  return (
    <div
      ref={cardRef}
      className={`${spanClass} group relative overflow-hidden`}
      data-cursor="VIEW"
      style={{ cursor: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Clip-path reveal container */}
      <div
        className={`relative w-full h-full ${aspectClass} overflow-hidden`}
        style={{
          clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          transition: `clip-path 1.2s cubic-bezier(.22,1,.36,1) ${delay}`,
        }}
      >
        {/* Image with parallax-like scale */}
        <img
          src={project.img}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1.0)",
            transition: "transform 0.8s cubic-bezier(.22,1,.36,1)",
            filter: hovered ? "brightness(0.7)" : "brightness(0.85)",
          }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(18,18,18,0.7) 0%, transparent 50%)" }} />

        {/* Title overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5 md:p-8"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            opacity: revealed ? 1 : 0,
            transition: "transform 0.6s cubic-bezier(.22,1,.36,1), opacity 0.6s ease",
            transitionDelay: `${parseFloat(delay) + 0.3}s`,
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.25em", color: "rgba(245,245,245,0.5)", textTransform: "uppercase" }}>
            {project.category} — {String(project.id).padStart(2, "0")}
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontWeight: 400, color: "#F5F5F5", marginTop: 4, lineHeight: 1.15, fontStyle: "italic" }}>
            {project.title}
          </h3>
        </div>

        {/* EXIF metadata on hover */}
        <div
          className="absolute top-4 right-4"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-8px)",
            transition: "all 0.5s cubic-bezier(.22,1,.36,1)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            color: "rgba(245,245,245,0.6)",
            textAlign: "right",
            lineHeight: 1.8,
          }}
        >
          <div>{project.meta.camera}</div>
          <div>{project.meta.aperture} · {project.meta.speed}</div>
          <div>ISO {project.meta.iso}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Lightbox / Detail View ─────────────────────────────────────────────────
function Lightbox({ project, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 600);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 10000,
        background: visible ? "rgba(10,10,10,0.96)" : "rgba(10,10,10,0)",
        transition: "background 0.6s cubic-bezier(.22,1,.36,1)",
        cursor: "default",
      }}
      onClick={handleClose}
    >
      {/* Staggered bars transition */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="fixed left-0 right-0"
          style={{
            top: `${i * 20}%`,
            height: "20.5%",
            background: "#121212",
            transform: visible ? "scaleY(0)" : "scaleY(1)",
            transformOrigin: visible ? "top" : "bottom",
            transition: `transform 0.7s cubic-bezier(.76,0,.24,1) ${visible ? 0.3 + i * 0.06 : i * 0.04}s`,
            zIndex: 10001,
          }}
        />
      ))}

      <div
        className="relative max-w-5xl w-full mx-4 md:mx-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
          transition: "all 0.8s cubic-bezier(.22,1,.36,1) 0.5s",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={project.img}
          alt={project.title}
          className="w-full rounded"
          style={{ maxHeight: "75vh", objectFit: "cover" }}
        />
        <div className="flex justify-between items-end mt-6">
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.25em", color: "rgba(245,245,245,0.4)", textTransform: "uppercase" }}>
              {project.category}
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.8rem)", fontWeight: 400, color: "#F5F5F5", fontStyle: "italic", marginTop: 4 }}>
              {project.title}
            </h2>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "rgba(245,245,245,0.4)", textAlign: "right", lineHeight: 2 }}>
            <div>{project.meta.camera}</div>
            <div>{project.meta.aperture} · {project.meta.speed} · ISO {project.meta.iso}</div>
          </div>
        </div>
      </div>

      {/* Close hint */}
      <div
        className="fixed top-8 right-8"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "rgba(245,245,245,0.3)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s 0.8s",
          cursor: "pointer",
        }}
        onClick={handleClose}
      >
        [ESC] CLOSE
      </div>
    </div>
  );
}

// ─── Page Transition Overlay ────────────────────────────────────────────────
function PageTransition({ active }) {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9000 }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${i * (100 / 6)}%`,
            height: `${100 / 6 + 0.5}%`,
            background: "#0a0a0a",
            transform: active ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: active ? "left" : "right",
            transition: `transform 0.55s cubic-bezier(.76,0,.24,1) ${active ? i * 0.04 : (5 - i) * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────
export default function MagazinePortfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [transitioning, setTransitioning] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, []);

  const switchCategory = useCallback((cat) => {
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
    <div style={{ background: "#121212", minHeight: "100vh", color: "#F5F5F5", cursor: "none", overflow: "hidden" }}>
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { cursor: none !important; }
        ::selection { background: rgba(245,245,245,0.15); color: #F5F5F5; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #121212; }
        ::-webkit-scrollbar-thumb { background: rgba(245,245,245,0.12); border-radius: 2px; }
        @keyframes grainShift { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,1%)} 30%{transform:translate(-1%,4%)} 40%{transform:translate(2%,-2%)} 50%{transform:translate(-3%,2%)} 60%{transform:translate(4%,-1%)} 70%{transform:translate(-2%,3%)} 80%{transform:translate(1%,-4%)} 90%{transform:translate(3%,2%)} }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideIn { from { transform:translateX(-100%) } to { transform:translateX(0) } }
        @keyframes pulseGlow { 0%,100%{ opacity:0.3 } 50%{ opacity:1 } }
        .sidebar-link { position:relative; transition: color 0.3s, padding-left 0.4s cubic-bezier(.22,1,.36,1); }
        .sidebar-link:hover { color: #F5F5F5 !important; padding-left: 12px; }
        .sidebar-link::before { content:''; position:absolute; left:0; top:50%; width:0; height:1px; background:#F5F5F5; transition: width 0.4s cubic-bezier(.22,1,.36,1); transform:translateY(-50%); }
        .sidebar-link:hover::before { width:8px; }
        .sidebar-link.active { color: #F5F5F5 !important; padding-left: 12px; }
        .sidebar-link.active::before { width: 8px; }
      `}</style>

      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9990,
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundSize: "128px 128px",
          opacity: 0.035,
          animation: "grainShift 0.5s steps(4) infinite",
          mixBlendMode: "overlay",
        }}
      />

      <CustomCursor />
      <PageTransition active={transitioning} />
      {selectedProject && <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />}

      <div className="flex min-h-screen">
        {/* ─── Sidebar ──────────────────────────────────────────────── */}
        {/* Mobile hamburger */}
        <button
          className="fixed top-6 left-6 z-50 md:hidden"
          style={{ cursor: "none", background: "none", border: "none", color: "#F5F5F5", padding: 8 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <div style={{ width: 24, display: "flex", flexDirection: "column", gap: sidebarOpen ? 0 : 5, alignItems: "flex-start" }}>
            <span style={{ display: "block", width: sidebarOpen ? 24 : 24, height: 1.5, background: "#F5F5F5", transition: "all 0.3s", transform: sidebarOpen ? "rotate(45deg) translateY(0.75px)" : "none" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#F5F5F5", transition: "all 0.3s", opacity: sidebarOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: sidebarOpen ? 24 : 20, height: 1.5, background: "#F5F5F5", transition: "all 0.3s", transform: sidebarOpen ? "rotate(-45deg) translateY(-0.75px)" : "none", marginTop: sidebarOpen ? -1.5 : 0 }} />
          </div>
        </button>

        <aside
          className={`fixed md:sticky top-0 left-0 h-screen flex flex-col justify-between py-10 px-8 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          style={{
            width: "clamp(220px, 18vw, 280px)",
            borderRight: "1px solid rgba(245,245,245,0.06)",
            background: "#121212",
            transition: "transform 0.5s cubic-bezier(.22,1,.36,1)",
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fadeInUp 1s cubic-bezier(.22,1,.36,1) forwards" : "none",
          }}
        >
          <div>
            {/* Logo / Name */}
            <div style={{ marginBottom: 64 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1rem, 1.6vw, 1.3rem)", fontWeight: 700, letterSpacing: "0.04em", lineHeight: 1.2 }}>
                ANSH
              </div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1rem, 1.6vw, 1.3rem)", fontWeight: 400, fontStyle: "italic", letterSpacing: "0.04em", lineHeight: 1.2 }}>
                Goswami
              </div>
              <div style={{ width: 24, height: 1, background: "rgba(245,245,245,0.2)", marginTop: 16 }} />
            </div>

            {/* Nav links */}
            <nav style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`sidebar-link ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => { switchCategory(cat); setSidebarOpen(false); }}
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: activeCategory === cat ? "#F5F5F5" : "rgba(245,245,245,0.3)",
                    cursor: "none",
                    padding: 0,
                  }}
                >
                  {cat}
                </button>
              ))}
              <div style={{ width: "100%", height: 1, background: "rgba(245,245,245,0.04)", margin: "4px 0" }} />
              <button
                className="sidebar-link"
                style={{
                  background: "none", border: "none", textAlign: "left",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(245,245,245,0.3)", cursor: "none", padding: 0,
                }}
              >
                About
              </button>
              <button
                className="sidebar-link"
                style={{
                  background: "none", border: "none", textAlign: "left",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(245,245,245,0.3)", cursor: "none", padding: 0,
                }}
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Bottom metadata */}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(245,245,245,0.18)", lineHeight: 2.2 }}>
            <div>BASED IN INDIA</div>
            <div>PORTFOLIO © 2025</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80", animation: "pulseGlow 3s ease infinite", display: "inline-block" }} />
              <span>AVAILABLE FOR WORK</span>
            </div>
          </div>
        </aside>

        {/* ─── Main Content ─────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto" style={{ minHeight: "100vh" }}>
          {/* Hero */}
          <header className="relative flex flex-col justify-end" style={{ minHeight: "70vh", padding: "clamp(24px, 5vw, 64px)" }}>
            {/* Background image with overlay */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1800&q=80"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: mounted ? 0.25 : 0,
                  transition: "opacity 2s cubic-bezier(.22,1,.36,1) 0.3s",
                  filter: "grayscale(40%)",
                }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,18,18,0.4) 0%, #121212 95%)" }} />
            </div>

            <div className="relative" style={{ maxWidth: 900 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "rgba(245,245,245,0.3)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: "all 1s cubic-bezier(.22,1,.36,1) 0.4s",
                }}
              >
                {activeCategory === "All" ? "Selected Works" : activeCategory} — {String(projectCount).padStart(2, "0")} Projects
              </div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(40px)",
                  transition: "all 1.2s cubic-bezier(.22,1,.36,1) 0.6s",
                }}
              >
                Stories told<br />
                through <span style={{ fontStyle: "normal", fontWeight: 700 }}>light</span><br />
                & motion
              </h1>
              <div
                style={{
                  width: 48,
                  height: 1,
                  background: "rgba(245,245,245,0.15)",
                  marginTop: 32,
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 1s 1.2s",
                }}
              />
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  lineHeight: 1.8,
                  letterSpacing: "0.05em",
                  color: "rgba(245,245,245,0.35)",
                  maxWidth: 440,
                  marginTop: 20,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  transition: "all 1s cubic-bezier(.22,1,.36,1) 1s",
                }}
              >
                Automotive & travel photography capturing the poetry of speed, silence, and the in-between.
              </p>
            </div>

            {/* Scroll indicator */}
            <div
              className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 1s 1.5s",
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(245,245,245,0.2)", writingMode: "vertical-rl" }}>
                SCROLL
              </span>
              <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, rgba(245,245,245,0.2), transparent)", animation: "pulseGlow 2s ease infinite" }} />
            </div>
          </header>

          {/* Category pills (mobile) */}
          <div className="flex md:hidden gap-3 px-6 py-4 overflow-x-auto" style={{ borderBottom: "1px solid rgba(245,245,245,0.06)" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => switchCategory(cat)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: `1px solid ${activeCategory === cat ? "rgba(245,245,245,0.3)" : "rgba(245,245,245,0.08)"}`,
                  background: activeCategory === cat ? "rgba(245,245,245,0.08)" : "transparent",
                  color: activeCategory === cat ? "#F5F5F5" : "rgba(245,245,245,0.3)",
                  cursor: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ─── Editorial Grid ──────────────────────────────────────── */}
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

          {/* Footer */}
          <footer
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            style={{
              padding: "clamp(24px, 4vw, 48px)",
              borderTop: "1px solid rgba(245,245,245,0.04)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.15em",
              color: "rgba(245,245,245,0.15)",
            }}
          >
            <div>ANSH GOSWAMI — {new Date().getFullYear()}</div>
            <div>LOCAL TIME {time}</div>
            <div className="flex gap-6">
              {["Instagram", "Behance", "Email"].map((l) => (
                <span key={l} className="sidebar-link" style={{ cursor: "none", textTransform: "uppercase" }}>{l}</span>
              ))}
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}