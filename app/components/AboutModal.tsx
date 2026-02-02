"use client";
import React, { useEffect, useState } from "react";

interface AboutModalProps {
    onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
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
                background: visible ? "var(--background)" : "transparent",
                transition: "background 0.6s cubic-bezier(.22,1,.36,1)",
                cursor: "default",
            }}
            onClick={handleClose}
        >
            <div
                className="relative max-w-2xl w-full mx-4"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(40px)",
                    transition: "all 0.8s cubic-bezier(.22,1,.36,1) 0.3s",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.25em", color: "var(--muted-foreground)", textTransform: "uppercase", display: "block", marginBottom: 24 }}>
                    About
                </span>
                <h2 style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 400, color: "var(--foreground)", fontStyle: "italic", marginBottom: 32, lineHeight: 1.1 }}>
                    Ansh Goswami is a visual storyteller based in India.
                </h2>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, lineHeight: 1.8, color: "var(--muted-foreground)", display: "flex", flexDirection: "column", gap: 16 }}>
                    <p>
                        Specializing in automotive and travel photography, my work explores the intersection of speed, silence, and the human condition.
                    </p>
                    <p>
                        With a background in cinematic direction, I bring a narrative approach to every frame, ensuring that even static images convey a sense of motion and story.
                    </p>
                </div>

                <div style={{ marginTop: 48, display: "flex", gap: 32 }}>
                    {["Instagram", "Behance", "Email"].map((l) => (
                        <span key={l} className="sidebar-link" style={{ cursor: "pointer", textTransform: "uppercase", fontSize: 11, letterSpacing: "0.1em" }}>{l}</span>
                    ))}
                </div>
            </div>

            {/* Close hint */}
            <div
                className="fixed top-8 right-8"
                style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--muted-foreground)",
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
