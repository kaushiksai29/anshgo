"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -100, y: -100 });
    const target = useRef({ x: -100, y: -100 });
    const hovering = useRef(false);
    const hoverLabel = useRef("");
    const raf = useRef<number | null>(null);

    useEffect(() => {
        const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

        const onMove = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };
        };

        const onOver = (e: MouseEvent) => {
            const targetEl = e.target as HTMLElement;
            const card = targetEl.closest("[data-cursor]") as HTMLElement;
            if (card) {
                hovering.current = true;
                hoverLabel.current = card.dataset.cursor || "VIEW";
            }
        };
        const onOut = (e: MouseEvent) => {
            const targetEl = e.target as HTMLElement;
            const card = targetEl.closest("[data-cursor]") as HTMLElement;
            if (card) {
                hovering.current = false;
                hoverLabel.current = "";
            }
        };

        const tick = () => {
            pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
            pos.current.y = lerp(pos.current.y, target.current.y, 0.15);
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${target.current.x - 2.5}px, ${target.current.y - 2.5}px)`;
            }
            if (ringRef.current) {
                const s = hovering.current ? 48 : 16;
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
                labelRef.current.innerText = hoverLabel.current || "VIEW";
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
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} style={{ position: "fixed", top: 0, left: 0, width: 5, height: 5, borderRadius: "50%", background: "#F5F5F5", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference", transition: "none" }} />
            <div ref={ringRef} style={{ position: "fixed", top: 0, left: 0, width: 16, height: 16, borderRadius: "50%", border: "1px solid rgba(245,245,245,0.3)", pointerEvents: "none", zIndex: 9998, transition: "width 0.4s cubic-bezier(.22,1,.36,1), height 0.4s cubic-bezier(.22,1,.36,1), opacity 0.3s, background 0.3s", mixBlendMode: "difference" }} />
            <div ref={labelRef} style={{ position: "fixed", top: 0, left: 0, width: 80, textAlign: "center", pointerEvents: "none", zIndex: 9999, fontSize: 9, letterSpacing: "0.15em", fontFamily: "var(--font-jetbrains-mono), monospace", color: "#F5F5F5", mixBlendMode: "difference", transition: "opacity 0.3s" }}>
                VIEW
            </div>
        </>
    );
}
