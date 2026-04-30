"use client";

import { WebGLPageWrapper, SplitText } from "@/components/webgl/WebGLPage";

export default function Gallery() {
  return (
    <WebGLPageWrapper maxZ={-60}>
      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3">
          <h1 className="font-heading text-6xl md:text-[8vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Media Gallery" />
          </h1>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl leading-relaxed font-light mix-blend-difference">
            Explore our state-of-the-art facilities and processes through the lens.
          </p>
        </div>
      </section>

      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3 ml-auto text-right">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="The Process" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference">
            Hover over the 3D meshes to interact with our manufacturing imagery.
          </p>
        </div>
      </section>
      
      <section className="webgl-section h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="The Plants" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference">
            A visual tour of AMRPL Roorkee and AGRPL Mundra.
          </p>
        </div>
      </section>
    </WebGLPageWrapper>
  );
}
