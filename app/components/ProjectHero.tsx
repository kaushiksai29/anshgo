"use client";

interface ProjectHeroProps {
    activeCategory: string;
    projectCount: number;
    mounted: boolean;
}

export default function ProjectHero({ activeCategory, projectCount, mounted }: ProjectHeroProps) {
    return (
        <header className="relative flex flex-col justify-end" style={{ minHeight: "70vh", padding: "clamp(24px, 5vw, 64px)" }}>
            {/* Background image with overlay */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/media/automotive/01e4aaab-598d-4cab-b7cd-3e9c6d608b2c_rw_600.jpg"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        opacity: mounted ? 0.25 : 0,
                        transition: "opacity 2s cubic-bezier(.22,1,.36,1) 0.3s",
                        filter: "grayscale(40%)",
                    }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,18,18,0.4) 0%, var(--background) 95%)" }} />
            </div>

            <div className="relative" style={{ maxWidth: 900 }}>
                <div
                    style={{
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: 10,
                        letterSpacing: "0.3em",
                        color: "var(--muted-foreground)",
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
                        fontFamily: "var(--font-playfair-display), Georgia, serif",
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
                        background: "var(--border)",
                        marginTop: 32,
                        opacity: mounted ? 1 : 0,
                        transition: "opacity 1s 1.2s",
                    }}
                />
                <p
                    style={{
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: 11,
                        lineHeight: 1.8,
                        letterSpacing: "0.05em",
                        color: "var(--muted-foreground)",
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
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--muted-foreground)", writingMode: "vertical-rl" }}>
                    SCROLL
                </span>
                <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, var(--muted-foreground), transparent)", animation: "pulseGlow 2s ease infinite" }} />
            </div>
        </header>
    );
}
