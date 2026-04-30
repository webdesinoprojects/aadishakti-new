"use client";

import { WebGLPageWrapper, SplitText } from "@/components/webgl/WebGLPage";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <WebGLPageWrapper maxZ={0}>
      <section className="webgl-section h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-4xl sticky top-1/3">
          <h1 className="font-heading text-6xl md:text-[8vw] font-bold uppercase mix-blend-difference mb-6">
            <SplitText text="Contact Us" />
          </h1>
          <p className="fade-line translate-y-10 opacity-0 text-brand-steel text-2xl leading-relaxed font-light mix-blend-difference mb-12">
            Get in touch with our global team for sales, procurement, or general inquiries.
          </p>
          <div className="fade-line translate-y-10 opacity-0 mix-blend-difference flex flex-col gap-4">
            <p className="text-xl">marketing@aadishakti.com</p>
            <p className="text-xl">+91-8743000299</p>
            <button className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-amber transition-colors duration-500 w-fit mt-8">
              Send Enquiry <ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </WebGLPageWrapper>
  );
}
