"use client";

import { WebGLPageWrapper, SplitText } from "@/components/webgl/WebGLPage";
import Link from "next/link";

export default function Products() {
  return (
    <WebGLPageWrapper maxZ={-60}>
      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3">
          <h1 className="font-heading text-6xl md:text-[8vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Our Products" />
          </h1>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl leading-relaxed font-light mix-blend-difference">
            High-purity refined lead, lead alloys, and lead oxides for domestic and international markets.
          </p>
        </div>
      </section>

      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3 ml-auto text-right">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Refined Lead Ingots" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference mb-8">
            Purity 99.97%–99.985% Pb. Used in battery manufacturing, radiation shielding, cable sheathing, and ammunition.
          </p>
          <div className="fade-line translate-y-10 opacity-0 mix-blend-difference">
            <Link href="/products/refined-lead" className="text-brand-amber uppercase tracking-widest font-bold">View Specs</Link>
          </div>
        </div>
      </section>
      
      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Lead Alloys" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference mb-8">
            Lead-Antimony (2.5%, 3.0%, 4.5%), Lead-Calcium, and Tin-based alloys for battery grids and ballasts.
          </p>
          <div className="fade-line translate-y-10 opacity-0 mix-blend-difference">
            <Link href="/products/lead-alloys" className="text-brand-amber uppercase tracking-widest font-bold">View Specs</Link>
          </div>
        </div>
      </section>

      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3 ml-auto text-right">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Red Lead Oxide" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference mb-8">
            Pb₃O₄ — Soft orange-red powder used in anti-corrosion paints, glass, enamels, and ferrite production.
          </p>
          <div className="fade-line translate-y-10 opacity-0 mix-blend-difference">
            <Link href="/products/red-lead-oxide" className="text-brand-amber uppercase tracking-widest font-bold">View Specs</Link>
          </div>
        </div>
      </section>

      <section className="webgl-section h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Grey Lead Oxide" />
          </h2>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference mb-8">
            Lead Sub-Oxide (2PbO·Pb). Active material in lead-acid batteries, industrial coatings, and ceramic manufacturing.
          </p>
          <div className="fade-line translate-y-10 opacity-0 mix-blend-difference">
            <Link href="/products/grey-lead-oxide" className="text-brand-amber uppercase tracking-widest font-bold">View Specs</Link>
          </div>
        </div>
      </section>
    </WebGLPageWrapper>
  );
}
