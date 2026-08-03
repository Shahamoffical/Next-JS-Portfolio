"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefreshCw, Palette, ShoppingBag } from "lucide-react";
import { FaShopify, FaWordpress, FaReact, FaLaravel, FaVuejs } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: "Shopify & Liquid", category: "E-Commerce", icon: <FaShopify className="w-8 h-8 text-[#96BF48]" />, desc: "Custom themes, Shopify Plus, Liquid section rendering, Checkout extensions" },
  { name: "WordPress & Elementor", category: "CMS", icon: <FaWordpress className="w-8 h-8 text-[#21759B]" />, desc: "Decoupled headless builds, WPGraphQL, custom plugin architectures" },
  { name: "MERN Stack", category: "Full-Stack", icon: <FaReact className="w-8 h-8 text-[#61DAFB]" />, desc: "MongoDB, Express.js, React.js, Node.js high-performance web apps" },
  { name: "PHP & Laravel", category: "Backend", icon: <FaLaravel className="w-8 h-8 text-[#FF2D20]" />, desc: "Robust API engines, database ORM routing, secure enterprise backends" },
  { name: "Vue.js", category: "Frontend", icon: <FaVuejs className="w-8 h-8 text-[#4FC08D]" />, desc: "Reactive UI state management, lightweight component architectures" },
  { name: "Make.com & APIs", category: "Automation", icon: <RefreshCw className="w-8 h-8 text-[#a855f7]" />, desc: "Automated CRM webhooks, WhatsApp order pipelines, data synchronization" },
  { name: "Tailwind CSS", category: "Styling", icon: <Palette className="w-8 h-8 text-[#06B6D4]" />, desc: "Mobile-first responsive design system, modern utility layouting" },
  { name: "WooCommerce", category: "Storefronts", icon: <ShoppingBag className="w-8 h-8 text-[#96588A]" />, desc: "Custom payment gateways, subscription engines, speed optimizations" }
];

export default function AboutSection() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-header",
        { opacity: 0, y: 25 },
        {
          scrollTrigger: { trigger: ".about-header", start: "top 90%" },
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".stack-card",
        { opacity: 0, y: 35 },
        {
          scrollTrigger: { trigger: ".stack-grid", start: "top 85%" },
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="about-section py-12 px-6 md:px-12 max-w-7xl mx-auto border-t border-border relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-10 w-[400px] h-[400px] rounded-full radial-bg-blue opacity-20 -z-10"></div>

      {/* Section Header */}
      <div className="about-header text-center max-w-3xl mx-auto mb-8 space-y-3">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Agency Overview
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-heading m-0 font-sans">
          About Our Digital Solutions Agency
        </h2>
        <h3 className="text-xl sm:text-2xl font-semibold text-primary font-sans m-0">
          Engineering High-Performance Web Applications
        </h3>
        <p className="text-text-secondary text-base leading-relaxed max-w-2xl mx-auto">
          We combine enterprise-grade frontend frameworks with optimized backend architectures. From high-converting <strong className="text-text-heading">Shopify Plus</strong> storefronts to custom <strong className="text-text-heading">WordPress &amp; WooCommerce</strong> engines, we deliver measurable business results.
        </p>
      </div>

      {/* Our Stack Visual Grid */}
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-sm font-mono font-bold tracking-widest text-primary uppercase">
            Our Core Stack &amp; Infrastructure
          </span>
        </div>

        <div className="stack-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((item, idx) => (
            <div
              key={idx}
              className="stack-card p-6 rounded-2xl border border-primary/40 bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_12px_30px_rgba(192,0,0,0.145)] hover:shadow-[0_16px_36px_rgba(192,0,0,0.22)] group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center p-2 rounded-xl bg-bg-alt border border-border/60">{item.icon}</div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-primary/5 border border-primary/15">
                  {item.category}
                </span>
              </div>
              <h4 className="text-lg font-bold text-text-heading mb-2 group-hover:text-primary transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed font-light m-0">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
