"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

const blogArticles = [
  {
    id: 1,
    title: "Building Custom Shopify Plus Liquid Themes for High-Volume Stores",
    slug: "building-custom-shopify-plus-liquid-themes",
    category: "Shopify Development",
    date: "July 28, 2026",
    excerpt: "Essential technical tips for custom Shopify Plus Liquid theme development, section rendering, and app integration.",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Decoupled WordPress & WooCommerce Architectures with WPGraphQL",
    slug: "decoupled-wordpress-woocommerce-architectures-wpgraphql",
    category: "WordPress Development",
    date: "July 22, 2026",
    excerpt: "Maximize site performance and headless flexibility with Next.js and WPGraphQL backend queries.",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Technical SEO Strategies for E-Commerce & Google Maps Ranking",
    slug: "technical-seo-strategies-ecommerce-google-maps-ranking",
    category: "Technical SEO",
    date: "July 15, 2026",
    excerpt: "Core Web Vitals optimization, JSON-LD structured schema markup, and local ranking playbook.",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Sub-2 Second Website Speed Optimization & Core Web Vitals",
    slug: "website-speed-optimization-core-web-vitals",
    category: "Website Speed Optimization",
    date: "July 08, 2026",
    excerpt: "Optimizing LCP, CLS, and INP metrics across mobile and desktop devices.",
    readTime: "3 min read"
  }
];

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold uppercase tracking-wider">
          Technical Blog & Insights
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Articles, Guides &amp; SEO Insights
        </h1>
        <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
          In-depth technical guides covering Shopify Liquid development, Headless WordPress, MERN Stack, and Technical SEO.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogArticles.map((art) => (
          <article
            key={art.id}
            className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-primary/40 hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">{art.category}</span>
                <span className="text-slate-400">{art.date}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                {art.title}
              </h2>

              <p className="text-xs text-slate-500 font-light leading-relaxed">{art.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">{art.readTime}</span>
              <span className="font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
