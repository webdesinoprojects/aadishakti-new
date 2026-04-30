"use client";

import type { DistortionMaterialProps, StoryMaterialProps, HomeStoryMaterialProps } from "../../types/custom-materials";
import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { DistortionMaterial, StoryMaterial, HomeStoryMaterial } from "./ShaderMaterial";
import gsap from "gsap";

extend({ DistortionMaterial, StoryMaterial, HomeStoryMaterial });

interface PlaneProps {
  url: string;
  position: [number, number, number];
  holographic?: boolean;
}

const ImagePlane = ({ url, position, holographic = false }: PlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const texture = useTexture(url);
  
  const [hovered, setHovered] = useState(false);
  const targetHover = useRef(0);
  const mouseUv = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state, delta) => {
    if (materialRef.current && meshRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      targetHover.current = THREE.MathUtils.lerp(targetHover.current, hovered ? 1 : 0, 0.1);
      materialRef.current.uHover = targetHover.current;
      materialRef.current.uMouse.lerp(mouseUv.current, 0.1);

      const dist = state.camera.position.z - position[2];
      materialRef.current.uDistance = dist;
      materialRef.current.uHolographic = holographic ? 1.0 : 0.0;
      
      if (holographic) {
        // 3D Holographic "Card Fold" Effect
        const targetRotationX = THREE.MathUtils.clamp((dist - 5) * 0.05, 0, Math.PI / 3);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
        // Subtle float
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[2]) * 0.2;
      } else {
        // Strict original homepage behavior
        meshRef.current.rotation.x = 0;
        meshRef.current.position.y = position[1];
      }
    }
  });

  const handlePointerMove = (e: any) => {
    if (e.uv) {
      mouseUv.current.set(e.uv.x, e.uv.y);
    }
  };

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[16, 9, 64, 64]} />
      {/* @ts-ignore - React Three Fiber custom material registration */}
      <distortionMaterial 
        ref={materialRef} 
        uTexture={texture} 
        transparent={true} 
      />
    </mesh>
  );
};

import { usePathname } from "next/navigation";

export const Scene = () => {
  const { camera } = useThree();
  const pathname = usePathname();
  const isAbout = pathname === '/about';
  const isHome = pathname === '/';
  
  // Map scroll progress to camera Z
  useFrame(() => {
    if (typeof window !== "undefined") {
      const globalCameraZ = (window as any).cameraZ;
      if (globalCameraZ !== undefined) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, globalCameraZ, 0.1);
      }
    }
  });

  // Dynamic Route Planes
  const planes = useMemo(() => {
    if (pathname === '/about') {
      return [
        { url: "/images/hero-bg.png", position: [0, 0, 0] as [number, number, number] }, 
        { url: "/images/plant-roorkee.png", position: [-5, 0, -20] as [number, number, number] }, 
        { url: "/images/plant-mundra.png", position: [5, 0, -40] as [number, number, number] }, 
      ];
    }
    
    if (pathname === '/gallery') {
      return [
        { url: "/images/process_1_collection_1777554152607.png", position: [-5, 0, 0] as [number, number, number] },
        { url: "/images/process_2_breaking_1777554170007.png", position: [5, 0, -10] as [number, number, number] },
        { url: "/images/process_3_smelting_1777554184021.png", position: [-5, 0, -20] as [number, number, number] },
        { url: "/images/process_4_refining_1777554218069.png", position: [5, 0, -30] as [number, number, number] },
        { url: "/images/process_5_alloying_1777554235634.png", position: [-5, 0, -40] as [number, number, number] },
        { url: "/images/process_6_casting_1777554251287.png", position: [5, 0, -50] as [number, number, number] },
        { url: "/images/plant-roorkee.png", position: [-5, 0, -60] as [number, number, number] },
        { url: "/images/plant-mundra.png", position: [5, 0, -70] as [number, number, number] },
      ];
    }
    
    if (pathname === '/import') {
      return [
        { url: "/images/global-network.png", position: [0, 0, -10] as [number, number, number] },
      ];
    }

    // Default (Homepage & others)
    return [
      { url: "/images/process_1_collection_1777554152607.png", position: [0, 0, 0] as [number, number, number] },
      { url: "/images/process_2_breaking_1777554170007.png", position: [0, 0, -20] as [number, number, number] },
      { url: "/images/process_3_smelting_1777554184021.png", position: [0, 0, -40] as [number, number, number] },
      { url: "/images/process_4_refining_1777554218069.png", position: [0, 0, -60] as [number, number, number] },
      { url: "/images/process_5_alloying_1777554235634.png", position: [0, 0, -80] as [number, number, number] },
      { url: "/images/process_6_casting_1777554251287.png", position: [0, 0, -100] as [number, number, number] },
    ];
  }, [pathname]);

  const AboutStoryTransition = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const { viewport } = useThree();
    
    // Load the 3 specific images for the About page
    const [tex1, tex2, tex3] = useTexture([
      "/images/hero-bg.png", 
      "/images/plant-roorkee.png", 
      "/images/plant-mundra.png"
    ]);

    useFrame((state) => {
      if (materialRef.current && meshRef.current) {
        materialRef.current.uTime = state.clock.elapsedTime;
        
        // Calculate progress based on camera Z (5 to -35) -> 40 units total
        // We want uScroll to go from 0 to 2.0
        const progress = THREE.MathUtils.clamp((5 - state.camera.position.z) / 20, 0, 2.0);
        materialRef.current.uScroll = progress;

        // Lock mesh slightly in front of the camera so it always fills the screen
        meshRef.current.position.z = state.camera.position.z - 5;
      }
    });

    return (
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Cover the entire viewport */}
        <planeGeometry args={[16, 9, 64, 64]} />
        {/* @ts-ignore - React Three Fiber custom material registration */}
        <storyMaterial 
          ref={materialRef} 
          uTex1={tex1} 
          uTex2={tex2} 
          uTex3={tex3} 
        />
      </mesh>
    );
  };

  const HomeStoryTransition = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    
    // Load the 6 specific images for the Homepage
    const [tex1, tex2, tex3, tex4, tex5, tex6] = useTexture([
      "/images/process_1_collection_1777554152607.png",
      "/images/process_2_breaking_1777554170007.png",
      "/images/process_3_smelting_1777554184021.png",
      "/images/process_4_refining_1777554218069.png",
      "/images/process_5_alloying_1777554235634.png",
      "/images/process_6_casting_1777554251287.png"
    ]);

    useFrame((state) => {
      if (materialRef.current && meshRef.current) {
        materialRef.current.uTime = state.clock.elapsedTime;
        
        // Calculate progress based on camera Z (5 to -105) -> 110 units total.
        // We want uScroll to go from 0 to 5.0 (6 textures = 5 transitions).
        // 110 / 22 = 5.0.
        const progress = THREE.MathUtils.clamp((5 - state.camera.position.z) / 22, 0, 5.0);
        materialRef.current.uScroll = progress;

        // Lock mesh slightly in front of the camera so it always fills the screen
        meshRef.current.position.z = state.camera.position.z - 5;
      }
    });

    return (
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[16, 9, 64, 64]} />
        {/* @ts-ignore - React Three Fiber custom material registration */}
        <homeStoryMaterial 
          ref={materialRef} 
          uTex1={tex1} 
          uTex2={tex2} 
          uTex3={tex3} 
          uTex4={tex4}
          uTex5={tex5}
          uTex6={tex6}
        />
      </mesh>
    );
  };

  return (
    <>
      {isAbout && <fog attach="fog" args={['#050505', 2, 18]} />}
      <ambientLight intensity={0.5} />
      
      {isAbout ? (
        <AboutStoryTransition />
      ) : isHome ? (
        <HomeStoryTransition />
      ) : (
        planes.map((plane, index) => (
          <ImagePlane key={`${pathname}-${index}`} url={plane.url} position={plane.position} holographic={false} />
        ))
      )}
      
      {useMemo(() => {
        const positions = new Float32Array(3000);
        for (let i = 0; i < positions.length; i++) {
          positions[i] = (Math.random() - 0.5) * 100;
        }
        return (
          <points position={[0, 0, -50]}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={positions}
                count={1000}
                itemSize={3}
                args={[positions, 3]}
              />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#e5a93d" transparent opacity={0.5} />
          </points>
        );
      }, [])}
    </>
  );
};
