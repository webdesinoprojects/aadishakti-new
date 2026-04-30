"use client";

import { WebGLPageWrapper, SplitText } from "@/components/webgl/WebGLPage";

export default function Import() {
  return (
    <WebGLPageWrapper maxZ={-15}>
      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-5xl sticky top-1/3">
          <h1 className="font-heading text-6xl md:text-[8vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Global Import" />
          </h1>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl leading-relaxed font-light mix-blend-difference">
            Aadishakti Group imports drained lead-acid battery scrap globally (car, inverter, solar, and industrial batteries) as raw material feedstock, expertly managed by our dedicated import desk.
          </p>
        </div>
      </section>

      <section className="webgl-section h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3 ml-auto text-right">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="ISRI Compliant" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference">
            We hold valid MoEF licenses for importing battery scrap (RAINS, RACKS). We ensure completely transparent, legal, and environmentally compliant procurement.
          </p>
        </div>
      </section>
    </WebGLPageWrapper>
  );
}
