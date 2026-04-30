"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Scene } from "./Scene";

export const CanvasWrapper = () => {
  useEffect(() => {
    // Initialize the global camera Z variable that ScrollTrigger will manipulate
    if (typeof window !== "undefined") {
      (window as any).cameraZ = 5; // Initial start position (slightly backed off from Z=0)
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-auto bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* Dark vignette overlay for cinematic feel */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-[1]" />
    </div>
  );
};
