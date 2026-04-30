"use client";

import { WebGLPageWrapper, SplitText } from "@/components/webgl/WebGLPage";

export default function About() {
  return (
    <WebGLPageWrapper maxZ={-35}>
      {/* 1. Hero / Vision (Image is Centered, Text is Centered) */}
      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl mx-auto text-center sticky top-1/3">
          <h1 className="font-heading text-5xl md:text-[7vw] font-bold uppercase mix-blend-difference leading-[0.9] tracking-tighter mb-8">
            <SplitText text="Pioneering Sustainable Metallurgy" />
          </h1>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl leading-relaxed font-light mix-blend-difference">
            Aadishakti Group stands at the forefront of the Indian non-ferrous metal manufacturing sector. We recycle hazardous lead-acid battery waste into high-value industrial metals, driving the circular economy since 1994.
          </p>
        </div>
      </section>

      {/* 2. Roorkee Plant (Image is Left, Text is Right) */}
      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl sticky top-1/3 ml-auto text-right">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="AMRPL Roorkee" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference mb-4">
            Established in 1994.
          </p>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-xl font-light mix-blend-difference">
            The group's original manufacturing unit, acquired in 2014 and rebranded in 2023. A registered recycler of hazardous lead waste, primarily serving the domestic Indian market with strong logistics connectivity.
          </p>
        </div>
      </section>

      {/* 3. Mundra Plant (Image is Right, Text is Left) */}
      <section className="webgl-section h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl sticky top-1/3">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="AGRPL Mundra" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference mb-4">
            Established in 2018.
          </p>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-xl font-light mix-blend-difference">
            Export-oriented, large-scale smelting focus located near India's largest commercial port. Incorporates cutting-edge technologies to drive our global distribution capabilities.
          </p>
        </div>
      </section>
    </WebGLPageWrapper>
  );
}
