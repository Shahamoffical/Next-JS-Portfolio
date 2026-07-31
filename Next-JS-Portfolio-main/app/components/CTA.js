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
    <section
      ref={containerRef}
      id="cta"
      className="cta-section py-20 px-6 md:px-12 max-w-7xl mx-auto w-full relative"
    >
      <div className="absolute left-10 bottom-10 w-[300px] h-[300px] rounded-full radial-bg-blue opacity-20 -z-10"></div>
      <div className="absolute right-10 top-10 w-[300px] h-[300px] rounded-full radial-bg-indigo opacity-15 -z-10"></div>

      <div className="cta-card rounded-3xl p-8 md:p-16 border border-primary/10 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-elevated bg-gradient-to-br from-primary via-[#820000] to-[#500000]">
        {/* Decorative */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-50"></div>
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full border border-white/10 opacity-30 rotate-45 select-none pointer-events-none"></div>

        {/* Left Column: Heading & Info */}
        <div className="space-y-6 max-w-xl relative z-10 text-left">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-white/90 px-4 py-1.5 rounded-full border border-white/20 bg-white/10">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white m-0 leading-tight font-sans">
            Start Your Custom Website Development Project
          </h2>
          <h3 className="text-xl font-semibold text-white/90 m-0 font-sans">
            Let&apos;s Build Something Exceptional Together
          </h3>
          <p className="text-white/80 text-sm md:text-base font-light leading-relaxed m-0">
            Whether you need a custom Shopify Plus store, a WooCommerce platform, a MERN stack web app, or Technical SEO optimization, send us a message for a free consultation.
          </p>

          <div className="pt-2 flex flex-col space-y-2 text-xs font-mono text-white/90">
            <div><strong>Direct Email:</strong> <a href="mailto:shaham@agency.com" className="underline hover:text-white">shaham@agency.com</a></div>
            <div><strong>Location:</strong> Available Worldwide (Remote &amp; Contract)</div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-left shadow-2xl border border-white/80 relative z-10">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-text-heading mb-1.5">YOUR NAME</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-text-heading text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-text-heading mb-1.5">YOUR EMAIL</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-text-heading text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-text-heading mb-1.5">PROJECT DETAILS</label>
              <textarea
                rows={3}
                placeholder="Tell us about your project goals, stack requirements, or timeframe..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-text-heading text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all duration-300 shadow-[0_4px_16px_rgba(192,0,0,0.35)] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Submit Project Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
