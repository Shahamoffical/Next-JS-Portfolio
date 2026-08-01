"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Zap, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    title: "Shopify Plus Telehealth Platform",
    client: "Regional E-Commerce & Telehealth",
    metrics: [
      { label: "PageSpeed Score", value: "98 / 100", change: "+42%" },
      { label: "Conversion Rate", value: "+45%", change: "Uplift" },
      { label: "Checkout Speed", value: "1.2s", change: "Sub-2s Target" }
    ],
    highlights: [
      "Engineered dynamic reusable Liquid theme components for custom product configurations.",
      "Integrated automated Make.com data pipelines for instant CRM customer synchronization.",
      "Achieved sub-2 second mobile load times and 100% Core Web Vitals pass rate."
    ],
    tags: ["SHOPIFY PLUS", "LIQUID THEME", "MAKE.COM PIPELINES", "PAGESPEED 98+"]
  },
  {
    title: "Decoupled WooCommerce & WhatsApp Pipeline",
    client: "Direct-to-Consumer Food Delivery",
    metrics: [
      { label: "Mobile Orders", value: "+65%", change: "WhatsApp Direct" },
      { label: "Cart Abandonment", value: "-30%", change: "Reduced" },
      { label: "Local SEO Rank", value: "#1 Maps", change: "Top Placement" }
    ],
    highlights: [
      "Built custom WooCommerce checkout flow with direct WhatsApp order routing.",
      "Implemented dynamic product loop filtering and micro-cached database queries.",
      "Structured Technical SEO schema markup resulting in #1 local Google Maps positioning."
    ],
    tags: ["WOOCOMMERCE", "WHATSAPP API", "CUSTOM PHP", "TECHNICAL SEO"]
  }
];

export default function CaseStudies() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".case-header",
        { opacity: 0, y: 25 },
        {
          scrollTrigger: { trigger: ".case-header", start: "top 90%" },
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".case-card",
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: ".case-grid", start: "top 85%" },
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="case-studies"
      ref={containerRef}
      className="casestudies-section py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] rounded-full radial-bg-indigo opacity-20 -z-10"></div>

      {/* Header */}
      <div className="case-header text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Proven Impact
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-heading m-0 font-sans">
          Client Results &amp; Performance Metrics
        </h2>
        <h3 className="text-xl sm:text-2xl font-semibold text-primary font-sans m-0">
          Transforming Storefronts &amp; Technical SEO Optimization
        </h3>
        <p className="text-text-secondary font-light text-base max-w-xl mx-auto">
          Deep dives into technical builds showcasing speed optimizations, automated data pipelines, and measurable revenue growth.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="case-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
        {caseStudies.map((item, idx) => (
          <div
            key={idx}
            className="case-card p-8 rounded-3xl border border-primary/40 bg-white shadow-[0_12px_30px_rgba(192,0,0,0.145)] hover:shadow-[0_16px_36px_rgba(192,0,0,0.22)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest">
                    {item.client}
                  </span>
                  <h4 className="text-2xl font-bold text-text-heading mt-1 m-0">
                    {item.title}
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              {/* Metrics Badge Row */}
              <div className="grid grid-cols-3 gap-4 py-3 bg-bg-alt rounded-2xl p-4 border border-border/60">
                {item.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="text-center">
                    <div className="text-2xl font-bold text-primary font-mono">{m.value}</div>
                    <div className="text-[11px] font-semibold text-text-heading mt-0.5">{m.label}</div>
                    <div className="text-[9px] font-mono text-emerald-600 uppercase font-bold mt-0.5">{m.change}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-2.5 pt-2">
                {item.highlights.map((hl, hlIdx) => (
                  <div key={hlIdx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-text-secondary leading-relaxed m-0 font-light">
                      {hl}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Footer */}
            <div className="pt-6 mt-6 border-t border-border flex flex-wrap gap-2">
              {item.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-primary/5 text-primary border border-primary/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
