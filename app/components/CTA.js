"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-card",
        { opacity: 0, scale: 0.95, y: 40 },
        {
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
          opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="cta"
      className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full relative"
    >
      <div className="absolute left-10 bottom-10 w-[300px] h-[300px] rounded-full radial-bg-blue opacity-20 -z-10"></div>
      <div className="absolute right-10 top-10 w-[300px] h-[300px] rounded-full radial-bg-indigo opacity-15 -z-10"></div>

      <div className="cta-card rounded-3xl p-12 md:p-20 border border-primary/10 text-center flex flex-col items-center justify-center space-y-8 relative overflow-hidden shadow-elevated bg-gradient-to-br from-primary via-[#0052cc] to-indigo">
        {/* Decorative */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50"></div>
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full border border-white/10 opacity-30 rotate-45 select-none pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full border border-white/10 opacity-20 select-none pointer-events-none"></div>

        <div className="space-y-4 max-w-2xl relative z-10">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-white/80 px-4 py-1.5 rounded-full border border-white/20 bg-white/10">
            Let&apos;s Work Together
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white m-0 leading-tight font-sans">
            Ready to Build Your Next Scalable Web Product?
          </h2>
          <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto mt-2">
            Whether you need a custom headless WordPress implementation, a
            dynamic React full-stack app, or complex API integrations, let&apos;s
            collaborate to build something exceptional.
          </p>
        </div>

        <div className="relative z-10 pt-2">
          <a
            href="mailto:example@example.com"
            className="inline-flex items-center gap-3.5 px-10 py-5 rounded-2xl bg-white text-primary text-base font-bold hover:bg-bg-alt transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            <Calendar className="w-5 h-5" />
            Schedule a Discovery Call
          </a>
        </div>
      </div>
    </div>
  );
}
