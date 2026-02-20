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

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(18,18,18,0.3) 0%, transparent 40%)" }} />
            </div>
        </div>
    );
}
