"use client";
import React, { useEffect, useState } from "react";
import { INSTAGRAM_URL } from "../data/projects";

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
                className="relative w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.8s cubic-bezier(.22,1,.36,1) 0.3s",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Section */}
                <div className="w-full md:w-5/12 aspect-[3/4] relative overflow-hidden bg-neutral-900 shadow-2xl">
                    <img
                        src="/media/about/582a1c7b-20c0-4ce0-b538-8b3ad9ecf156_rw_3840.jpg"
                        alt="Ansh Goswami"
                        className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-6/12 flex flex-col justify-center text-center md:text-right space-y-8">
                    <p style={{
                        fontFamily: "var(--font-playfair-display), Georgia, serif",
                        fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                        fontWeight: 400,
                        color: "var(--foreground)",
                        lineHeight: 1.6
                    }}>
                        &apos;99 born, Baltimore-based photographer who pushes the boundaries of photography through unique perspectives and creative editing techniques.
                    </p>
                    <p style={{
                        fontFamily: "var(--font-playfair-display), Georgia, serif",
                        fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                        fontWeight: 400,
                        color: "var(--muted-foreground)",
                        lineHeight: 1.6
                    }}>
                        Specializing in automotive and portrait photography. I believe that anything that moves people is art, my work is bound to illuminating life through my lens.
                    </p>

                    {/* Links */}
                    <div className="flex justify-center md:justify-end gap-8 pt-4">
                        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="sidebar-link" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", color: "inherit" }}>Instagram</a>
                        <a href="#" className="sidebar-link" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", color: "inherit" }}>Behance</a>
                        <a href="mailto:hello@anshgo.com" className="sidebar-link" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", color: "inherit" }}>Email</a>
                    </div>
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
