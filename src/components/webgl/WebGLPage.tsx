"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const SplitText = ({ text, className }: { text: string; className?: string }) => {
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

export const WebGLPageWrapper = ({ children, maxZ = -105 }: { children: React.ReactNode, maxZ?: number }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reset camera position immediately on route change
    if (typeof window !== "undefined") {
      (window as any).cameraZ = 5;
    }

    const proxy = { z: 5 };
    
    gsap.to(proxy, {
      z: maxZ, 
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: () => {
          if (typeof window !== "undefined") {
            (window as any).cameraZ = proxy.z;
          }
        }
      }
    });

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
      {children}
    </div>
  );
};
