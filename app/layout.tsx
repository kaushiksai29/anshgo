import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./components/ThemeProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ansh Goswami | Portfolio",
  description: "Stories told through light & motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${jetbrains.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
