"use client";
import { useState, useEffect } from "react";
import { ProjectData } from "../types";

interface LightboxProps {
    project: ProjectData;
    onClose: () => void;
}

export default function Lightbox({ project, onClose }: LightboxProps) {
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
                        background: "var(--background)",
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
                        <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.25em", color: "rgba(245,245,245,0.4)", textTransform: "uppercase" }}>
                            {project.category}
                        </span>
                        <h2 style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.8rem)", fontWeight: 400, color: "#F5F5F5", fontStyle: "italic", marginTop: 4 }}>
                            {project.title}
                        </h2>
                    </div>
                    <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "rgba(245,245,245,0.4)", textAlign: "right", lineHeight: 2 }}>
                        <div>{project.meta.camera}</div>
                        <div>{project.meta.aperture} · {project.meta.speed} · ISO {project.meta.iso}</div>
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
