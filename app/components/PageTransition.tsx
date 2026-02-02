"use client";

interface PageTransitionProps {
    active: boolean;
}

export default function PageTransition({ active }: PageTransitionProps) {
    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9000 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                    key={i}
                    className="absolute left-0 right-0"
                    style={{
                        top: `${i * (100 / 6)}%`,
                        height: `${100 / 6 + 0.5}%`,
                        background: "var(--background)",
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: active ? "left" : "right",
                        transition: `transform 0.55s cubic-bezier(.76,0,.24,1) ${active ? i * 0.04 : (5 - i) * 0.04}s`,
                    }}
                />
            ))}
        </div>
    );
}
