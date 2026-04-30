"use client";

import { WebGLPageWrapper, SplitText } from "@/components/webgl/WebGLPage";

export default function News() {
  return (
    <WebGLPageWrapper maxZ={0}>
      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3">
          <h1 className="font-heading text-6xl md:text-[8vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Latest News" />
          </h1>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl leading-relaxed font-light mix-blend-difference">
            Updates and announcements from Aadishakti Group.
          </p>
        </div>
      </section>

      <section className="webgl-section h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3 ml-auto text-right">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Recent Updates" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference mb-8">
            - Aadishakti Commences Operations at Mundra Port <br />
            - Awarded 'Best Sustainable Recycler' by MRAI <br />
            - New Rotary Furnace Technology Deployed at Roorkee
          </p>
        </div>
      </section>
    </WebGLPageWrapper>
  );
}
