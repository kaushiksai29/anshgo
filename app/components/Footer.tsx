"use client";
import React, { useState, useEffect } from "react";
import { INSTAGRAM_URL } from "../data/projects";

export default function Footer() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
        };
        tick();
        const iv = setInterval(tick, 30000);
        return () => clearInterval(iv);
    }, []);

    return (
        <footer
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            style={{
                padding: "clamp(24px, 4vw, 48px)",
                borderTop: "1px solid var(--border)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 9,
                letterSpacing: "0.15em",
                color: "var(--muted-foreground)",
            }}
        >
            <div>ANSH GOSWAMI — {new Date().getFullYear()}</div>
            <div>LOCAL TIME {time}</div>
            <div className="flex gap-6">
                <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-link"
                    style={{ cursor: "none", textTransform: "uppercase", textDecoration: "none", color: "inherit" }}
                >
                    Instagram
                </a>
                <span className="sidebar-link" style={{ cursor: "none", textTransform: "uppercase" }}>Behance</span>
                <span className="sidebar-link" style={{ cursor: "none", textTransform: "uppercase" }}>Email</span>
            </div>
        </footer>
    );
}
