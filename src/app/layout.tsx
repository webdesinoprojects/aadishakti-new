import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: 'swap',
});

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { CanvasWrapper } from "@/components/webgl/CanvasWrapper";

export const metadata: Metadata = {
  title: "Aadishakti Group | Industrial Lead Recycling & Manufacturing",
  description: "Leading Indian industrial company specializing in lead recycling and non-ferrous metal manufacturing with a global footprint.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-transparent text-brand-light">
        <CanvasWrapper />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 w-full relative z-10 pointer-events-none">
            {/* The main content overlays the canvas but allows pointer events to pass through to the 3D scene, except for interactive elements inside children */}
            <div className="pointer-events-auto">
              {children}
            </div>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

