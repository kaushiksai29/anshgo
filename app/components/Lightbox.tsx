"use client";
import { useState, useEffect } from "react";
import { ProjectData } from "../types";

interface LightboxProps {
    project: ProjectData;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

export default function Lightbox({ project, onClose, onNext, onPrev, hasNext, hasPrev }: LightboxProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowRight" && onNext) onNext();
            if (e.key === "ArrowLeft" && onPrev) onPrev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onNext, onPrev]);

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


            {/* Controls Layer */}
            <div className="fixed inset-0 z-[10005] pointer-events-none p-4 md:p-10 flex flex-col justify-between">
                {/* Top Bar: Close */}
                <div className="flex justify-end pointer-events-auto">
                    <button
                        onClick={handleClose}
                        className="group flex flex-col items-center justify-center p-2 hover:opacity-70 transition-opacity"
                    >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground">
                            <line x1="10" y1="10" x2="30" y2="30" />
                            <line x1="30" y1="10" x2="10" y2="30" />
                        </svg>
                        <span style={{ fontSize: 9, letterSpacing: "0.2em", marginTop: 4, color: "var(--foreground)" }}>CLOSE</span>
                    </button>
                </div>

                {/* Middle: Navigation */}
                <div className="flex justify-between items-center w-full absolute top-1/2 left-0 right-0 px-4 md:px-8 transform -translate-y-1/2">
                    {/* Prev */}
                    <div className="pointer-events-auto">
                        {hasPrev && (
                            <button onClick={(e) => { e.stopPropagation(); onPrev?.(); }} className="p-4 hover:scale-110 transition-transform text-foreground">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                        )}
                    </div>
                    {/* Next */}
                    <div className="pointer-events-auto">
                        {hasNext && (
                            <button onClick={(e) => { e.stopPropagation(); onNext?.(); }} className="p-4 hover:scale-110 transition-transform text-foreground">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom Spacer */}
                <div />
            </div>

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
                    className="w-full rounded shadow-2xl"
                    style={{ maxHeight: "75vh", objectFit: "cover" }}
                />
                <div className="flex justify-between items-end mt-6">
                    <div>
                        <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.25em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>
                            {project.category}
                        </span>
                        <h2 style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.8rem)", fontWeight: 400, color: "var(--foreground)", fontStyle: "italic", marginTop: 4 }}>
                            {project.title}
                        </h2>
                    </div>
                    <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "var(--muted-foreground)", textAlign: "right", lineHeight: 2 }}>
                        <div>{project.meta.camera}</div>
                        <div>{project.meta.aperture} · {project.meta.speed} · ISO {project.meta.iso}</div>
                    </div>
                </div>
            </div>


        </div>
    );
}
