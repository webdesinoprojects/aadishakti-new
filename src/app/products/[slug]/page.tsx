"use client";

import { WebGLPageWrapper, SplitText } from "@/components/webgl/WebGLPage";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const productsData: Record<string, any> = {
  "refined-lead": {
    title: "Refined / Pure Lead Ingots",
    desc: "Purity 99.97%–99.985% Pb. Extensively used in battery manufacturing, radiation shielding, cable sheathing, and ammunition.",
    specs: "Pb: 99.98% Min <br /> Sb: 0.001% Max <br /> As: 0.001% Max"
  },
  "lead-alloys": {
    title: "Lead Alloys",
    desc: "Lead-Antimony Alloy (2.5%, 3.0%, 4.5% grades), Lead-Calcium Alloy, Tin-based alloys. Crucial for battery grids, ballasts, and radiation shielding.",
    specs: "Antimony (Sb): 2.5% - 4.5% <br /> Lead (Pb): Balance <br /> Tin (Sn): 0.5% Max"
  },
  "red-lead-oxide": {
    title: "Red Lead Oxide",
    desc: "Pb₃O₄ — Soft orange-red powder. Extensively used in battery manufacturing, anti-corrosion paints, glass, enamels, and ferrite production.",
    specs: "Pb3O4: 95% Min <br /> Apparent Density: 1.2 - 1.5 g/cc <br /> Water Absorption: 12 - 14 mg/g"
  },
  "grey-lead-oxide": {
    title: "Grey Lead Oxide",
    desc: "Lead Sub-Oxide (2PbO·Pb). Essential active material in lead-acid batteries, industrial coatings, glass and ceramic manufacturing.",
    specs: "PbO: 70% - 75% <br /> Free Lead: 25% - 30% <br /> Apparent Density: 1.3 - 1.6 g/cc"
  }
};

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = productsData[params.slug] || { title: "Product Not Found", desc: "Specifications unavailable.", specs: "N/A" };

  return (
    <WebGLPageWrapper maxZ={0}>
      <section className="webgl-section h-[150vh] flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3">
          <Link href="/products" className="flex items-center gap-2 text-brand-amber font-bold tracking-widest uppercase mb-12 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <h1 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6 capitalize">
            <SplitText text={product.title} />
          </h1>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl leading-relaxed font-light mix-blend-difference">
            {product.desc}
          </p>
        </div>
      </section>

      <section className="webgl-section h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3 ml-auto text-right">
          <h2 className="font-heading text-5xl md:text-[6vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Technical Specs" />
          </h2>
          <p 
            className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl font-light mix-blend-difference mb-8"
            dangerouslySetInnerHTML={{ __html: product.specs }}
          />
          <div className="fade-line translate-y-10 opacity-0 mix-blend-difference flex justify-end gap-6">
            <Link href="/contact" className="text-white uppercase tracking-widest font-bold hover:text-brand-amber transition-colors">Request Quote</Link>
          </div>
        </div>
      </section>
    </WebGLPageWrapper>
  );
}
