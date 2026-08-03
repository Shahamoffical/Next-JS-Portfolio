"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, ArrowUpRight, Clock, Tag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: "Building Custom Shopify Plus Liquid Themes for High-Volume Stores",
    category: "Shopify Development",
    readTime: "6 min read",
    desc: "A technical guide to Liquid section rendering, custom product loop filtering, and optimizing mobile checkout conversion rates for Shopify Plus.",
    date: "July 28, 2026",
    tags: ["SHOPIFY PLUS", "LIQUID", "CHECKOUT EXTENSIONS"]
  },
  {
    title: "Decoupled WordPress & WooCommerce Architectures with WPGraphQL",
    category: "WordPress Developer",
    readTime: "8 min read",
    desc: "How headless WordPress setups paired with Next.js or Vue.js deliver sub-2 second load speeds while retaining full Gutenberg CMS control.",
    date: "July 22, 2026",
    tags: ["WORDPRESS", "WOOCOMMERCE", "HEADLESS COMMERCE"]
  },
  {
    title: "Technical SEO Strategies for E-Commerce & Google Maps Ranking",
    category: "Technical SEO",
    readTime: "5 min read",
    desc: "Core Web Vitals optimization, JSON-LD structured schema markup, and crawling strategies that drive top Google Maps and organic rankings.",
    date: "July 15, 2026",
    tags: ["TECHNICAL SEO", "CORE WEB VITALS", "SCHEMA MARKUP"]
  }
];

export default function BlogSection() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-header",
        { opacity: 0, y: 25 },
        {
          scrollTrigger: { trigger: ".blog-header", start: "top 90%" },
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: ".blog-grid", start: "top 85%" },
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={containerRef}
      className="blog-section py-12 px-6 md:px-12 max-w-7xl mx-auto border-t border-border relative overflow-hidden"
    >
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full radial-bg-blue opacity-20 -z-10"></div>

      {/* Header */}
      <div className="blog-header text-center max-w-3xl mx-auto mb-8 space-y-3">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Content Hub
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-heading m-0 font-sans">
          Technical Insights &amp; E-commerce Strategy
        </h2>
        <h3 className="text-xl sm:text-2xl font-semibold text-primary font-sans m-0">
          Latest in Shopify Plus, WordPress, &amp; Tech SEO
        </h3>
        <p className="text-text-secondary font-light text-base max-w-xl mx-auto">
          In-depth technical articles on custom website development, headless commerce patterns, and search engine optimization.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art, idx) => (
          <article
            key={idx}
            className="blog-card group p-7 rounded-3xl border border-primary/40 bg-white shadow-[0_12px_30px_rgba(192,0,0,0.145)] hover:shadow-[0_16px_36px_rgba(192,0,0,0.22)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                <span className="font-bold text-primary uppercase tracking-wider">{art.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{art.readTime}</span>
              </div>

              <h4 className="text-xl font-bold text-text-heading group-hover:text-primary transition-colors leading-snug m-0 cursor-pointer">
                {art.title}
              </h4>

              <p className="text-xs text-text-secondary leading-relaxed font-light m-0">
                {art.desc}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-text-muted">{art.date}</span>
              <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 cursor-pointer">
                Read Article <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
