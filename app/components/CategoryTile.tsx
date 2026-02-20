"use client";
import { useState, useEffect, useRef } from "react";

interface CategoryTileProps {
    category: string;
    thumbnail: string;
    index: number;
    onClick: () => void;
}

export default function CategoryTile({ category, thumbnail, index, onClick }: CategoryTileProps) {
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

    const delay = `${index * 0.12 + 0.1}s`;

    return (
        <div
            ref={cardRef}
            className="col-span-12 md:col-span-6 group relative overflow-hidden"
            data-cursor="VIEW"
            style={{ cursor: "none" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <div
                className="relative w-full h-full aspect-[16/10] overflow-hidden"
                style={{
                    clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                    transition: `clip-path 1.2s cubic-bezier(.22,1,.36,1) ${delay}`,
                }}
            >
                <img
                    src={thumbnail}
                    alt={category}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        transform: hovered ? "scale(1.06)" : "scale(1.0)",
                        transition: "transform 0.8s cubic-bezier(.22,1,.36,1)",
                        filter: hovered ? "brightness(0.6)" : "brightness(0.75)",
                    }}
                    loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(18,18,18,0.7) 0%, transparent 50%)" }} />

                {/* Category title */}
                <div
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
                    style={{
                        transform: hovered ? "translateY(0)" : "translateY(4px)",
                        opacity: revealed ? 1 : 0,
                        transition: "transform 0.6s cubic-bezier(.22,1,.36,1), opacity 0.6s ease",
                        transitionDelay: `${parseFloat(delay) + 0.3}s`,
                    }}
                >
                    <h3 style={{
                        fontFamily: "var(--font-playfair-display), Georgia, serif",
                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                        fontWeight: 400,
                        color: "#F5F5F5",
                        lineHeight: 1.15,
                        fontStyle: "italic",
                    }}>
                        {category}
                    </h3>
                </div>
            </div>
        </div>
    );
}
