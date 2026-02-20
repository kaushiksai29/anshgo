"use client";
import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

const CATEGORIES = ["All", "Projects", "Automotive", "Travel", "Portraits", "Events", "Short Films"];

interface NavigationProps {
    activeCategory: string;
    onCategoryChange: (cat: string) => void;
    onAboutClick: () => void;
    mounted: boolean;
    collapsed: boolean;
    onToggleCollapse: () => void;
}

export default function Navigation({ activeCategory, onCategoryChange, onAboutClick, mounted, collapsed, onToggleCollapse }: NavigationProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <button
                className="fixed top-6 left-6 z-50 md:hidden"
                style={{ cursor: "none", background: "none", border: "none", color: "#F5F5F5", padding: 8 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <div style={{ width: 24, display: "flex", flexDirection: "column", gap: sidebarOpen ? 0 : 5, alignItems: "flex-start" }}>
                    <span style={{ display: "block", width: sidebarOpen ? 24 : 24, height: 1.5, background: "var(--foreground)", transition: "all 0.3s", transform: sidebarOpen ? "rotate(45deg) translateY(0.75px)" : "none" }} />
                    <span style={{ display: "block", width: 16, height: 1.5, background: "var(--foreground)", transition: "all 0.3s", opacity: sidebarOpen ? 0 : 1 }} />
                    <span style={{ display: "block", width: sidebarOpen ? 24 : 20, height: 1.5, background: "var(--foreground)", transition: "all 0.3s", transform: sidebarOpen ? "rotate(-45deg) translateY(-0.75px)" : "none", marginTop: sidebarOpen ? -1.5 : 0 }} />
                </div>
            </button>

            <aside
                className={`fixed md:sticky top-0 left-0 h-screen flex flex-col justify-between py-10 px-8 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                style={{
                    width: collapsed ? "80px" : "clamp(220px, 18vw, 280px)",
                    borderRight: "1px solid var(--border)",
                    background: "var(--background)",
                    transition: "width 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1)",
                    opacity: mounted ? 1 : 0,
                    animation: mounted ? "fadeInUp 1s cubic-bezier(.22,1,.36,1) forwards" : "none",
                    overflow: "hidden",
                }}
            >
                {/* Desktop Collapse Toggle */}
                <button
                    onClick={onToggleCollapse}
                    className="hidden md:flex absolute top-1/2 -right-3 w-6 h-12 bg-background border border-border items-center justify-center rounded-l-md z-50 hover:bg-muted transition-colors"
                    style={{ transform: 'translateY(-50%)' }}
                >
                    {collapsed ? <ChevronRight size={14} className="text-foreground" /> : <ChevronLeft size={14} className="text-foreground" />}
                </button>

                <div style={{ opacity: collapsed ? 0 : 1, transition: "opacity 0.3s", pointerEvents: collapsed ? "none" : "auto" }}>
                    {/* Logo / Name */}
                    <div style={{ marginBottom: 64, whiteSpace: "nowrap" }}>
                        <div style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: "clamp(1rem, 1.6vw, 1.3rem)", fontWeight: 700, letterSpacing: "0.04em", lineHeight: 1.2 }}>
                            ANSH
                        </div>
                        <div style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: "clamp(1rem, 1.6vw, 1.3rem)", fontWeight: 400, fontStyle: "italic", letterSpacing: "0.04em", lineHeight: 1.2 }}>
                            Goswami
                        </div>
                        <div style={{ width: 24, height: 1, background: "var(--border)", marginTop: 16 }} />
                    </div>

                    {/* Nav links */}
                    <nav style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                className={`sidebar-link ${activeCategory === cat ? "active" : ""}`}
                                onClick={() => { onCategoryChange(cat); setSidebarOpen(false); }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    textAlign: "left",
                                    fontFamily: "var(--font-jetbrains-mono), monospace",
                                    fontSize: 11,
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: activeCategory === cat ? "var(--foreground)" : "var(--muted-foreground)",
                                    cursor: "none",
                                    padding: 0,
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                        <div style={{ width: "100%", height: 1, background: "var(--border)", margin: "4px 0" }} />
                        <button
                            className="sidebar-link"
                            onClick={() => { onAboutClick(); setSidebarOpen(false); }}
                            style={{
                                background: "none", border: "none", textAlign: "left",
                                fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11,
                                letterSpacing: "0.2em", textTransform: "uppercase",
                                color: "var(--muted-foreground)", cursor: "none", padding: 0,
                            }}
                        >
                            About
                        </button>
                        <a
                            href="https://www.instagram.com/anshgo.jpeg?igsh=MXE3cDZqcm1xNmZnMA%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sidebar-link"
                            style={{
                                background: "none", border: "none", textAlign: "left",
                                fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11,
                                letterSpacing: "0.2em", textTransform: "uppercase",
                                color: "var(--muted-foreground)", cursor: "none", padding: 0,
                                textDecoration: "none",
                            }}
                        >
                            Contact
                        </a>
                    </nav>
                    <div style={{ marginTop: 24 }}>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Bottom metadata */}
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--muted-foreground)", lineHeight: 2.2, opacity: collapsed ? 0 : 1, transition: "opacity 0.3s" }}>
                    <div>BASED IN BALTIMORE, MD</div>
                    <div>PORTFOLIO © {new Date().getFullYear()}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80", animation: "pulseGlow 3s ease infinite", display: "inline-block" }} />
                        <span>AVAILABLE FOR WORK</span>
                    </div>
                </div>
            </aside>
        </>
    );
}
