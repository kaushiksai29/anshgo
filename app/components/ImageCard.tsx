"use client";
import { useState, useEffect, useRef } from "react";

export interface ProjectData {
    id: number;
    title: string;
    category: string;
    span: "large" | "tall" | "wide" | "medium";
    img: string;
    meta: {
        camera: string;
        iso: string;
        aperture: string;
        speed: string;
    };
    videoUrl?: string;
}

interface ImageCardProps {
    project: ProjectData;
    index: number;
    onSelect: (project: ProjectData) => void;
}

export default function ImageCard({ project, index, onSelect }: ImageCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
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
                    <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.25em", color: "rgba(245,245,245,0.5)", textTransform: "uppercase" }}>
                        {project.category} — {String(project.id).padStart(2, "0")}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-playfair-display), Georgia, serif", fontSize: "clamp(1.2rem, 2.5vw, 2rem)", fontWeight: 400, color: "#F5F5F5", marginTop: 4, lineHeight: 1.15, fontStyle: "italic" }}>
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
                        fontFamily: "var(--font-jetbrains-mono), monospace",
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
