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
