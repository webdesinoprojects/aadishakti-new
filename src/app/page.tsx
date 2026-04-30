"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// Utility to split text into words for stagger animations without GSAP SplitText plugin
const SplitText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden ${className || ''}`}>
      {text.split(" ").map((word, index) => (
        <span key={index} className="split-word inline-block translate-y-[100%] opacity-0 mr-4 pb-2">
          {word}
        </span>
      ))}
    </span>
  );
};

const processes = [
  { id: "p1", title: "Collection", desc: "Global sourcing of spent lead-acid batteries.", z: 0 },
  { id: "p2", title: "Separation", desc: "Automated sorting of plastics, acid, and lead.", z: -20 },
  { id: "p3", title: "Smelting", desc: "Rotary furnaces operating at extreme temperatures.", z: -40 },
  { id: "p4", title: "Refining", desc: "Refining to 99.98% purity in giant kettles.", z: -60 },
  { id: "p5", title: "Alloying", desc: "Customized alloys for specialized applications.", z: -80 },
  { id: "p6", title: "Casting", desc: "Casting pure ingots for global export.", z: -100 },
];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Map Scroll to WebGL Camera Z
    // We animate a dummy object to map scroll progress from 0 to 1 to the Z values
    const proxy = { z: 5 }; // Initial camera Z
    
    gsap.to(proxy, {
      z: -105, // Fly past the last plane
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrub
        onUpdate: () => {
          if (typeof window !== "undefined") {
            (window as any).cameraZ = proxy.z;
          }
        }
      }
    });

    // 2. Typography Stagger Entries (SplitText simulation)
    const sections = gsap.utils.toArray('.webgl-section') as HTMLElement[];
    
    sections.forEach((section) => {
      const words = section.querySelectorAll('.split-word');
      const lines = section.querySelectorAll('.fade-line');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      if (words.length) {
        tl.to(words, {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.03,
          ease: "power4.out"
        }, 0);
      }
      
      if (lines.length) {
        tl.to(lines, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out"
        }, 0.5);
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative w-full">
      
      {/* SECTION 1: Hero */}
      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-6xl sticky top-1/3">
          <h1 className="font-heading text-6xl md:text-[8vw] font-bold text-white leading-[0.9] uppercase tracking-tighter drop-shadow-lg mb-8">
            <SplitText text="Pioneering Metallurgy" />
          </h1>
          <p className="fade-line translate-y-10 opacity-0 text-white drop-shadow-md text-xl md:text-3xl max-w-3xl font-light">
            A globally recognized industrial leader specializing in secondary lead recycling and non-ferrous metal manufacturing.
          </p>
        </div>
      </section>

      {/* 3D Page Sections mapped to the 6 processes */}
      {processes.map((process, i) => (
        <section key={process.id} className="webgl-section h-[200vh] flex flex-col justify-center px-6 md:px-24">
          <div className="max-w-4xl sticky top-1/3 ml-auto text-right">
            <div className="fade-line translate-y-10 opacity-0 text-brand-amber font-heading font-bold text-[8vw] leading-none drop-shadow-lg opacity-50 mb-4">
              0{i+1}
            </div>
            <h2 className="font-heading text-5xl md:text-[6vw] font-bold text-white uppercase drop-shadow-lg mb-6">
              <SplitText text={process.title} />
            </h2>
            <p className="fade-line translate-y-10 opacity-0 text-white drop-shadow-md text-xl md:text-3xl font-light">
              {process.desc}
            </p>
          </div>
        </section>
      ))}

      {/* FINAL SECTION: Outro & Call to action */}
      <section className="webgl-section h-screen flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-heading text-5xl md:text-[7vw] font-bold text-white uppercase drop-shadow-lg mb-12">
          <SplitText text="Forging The Future" />
        </h2>
        <div className="fade-line translate-y-10 opacity-0 drop-shadow-lg">
          <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-amber transition-colors duration-500">
            Connect With Us <ArrowRight />
          </Link>
        </div>
      </section>

    </div>
  );
}
