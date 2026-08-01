"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase";

const defaultArticles = [
  {
    id: "1",
    title: "Building Custom Shopify Plus Liquid Themes for High-Volume Stores",
    slug: "building-custom-shopify-plus-liquid-themes",
    category: "Shopify Development",
    created_at: "2026-08-01",
    excerpt: "Essential technical guidelines and code snippets for custom Shopify Plus Liquid development and high-volume e-commerce optimization.",
    content: "Building high-volume Shopify Plus stores requires more than default OS 2.0 themes...",
    featured_image: "https://images.unsplash.com/photo-1556742049-0a6791490271?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "Decoupled WordPress & WooCommerce Architectures with WPGraphQL",
    slug: "decoupled-wordpress-woocommerce-architectures-wpgraphql",
    category: "WordPress Development",
    created_at: "2026-07-24",
    excerpt: "Learn how to build sub-2 second headless WordPress websites with Next.js and GraphQL APIs.",
    content: "Headless WordPress decouples the admin dashboard from the user frontend...",
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "Technical SEO Strategies for E-Commerce & Google Maps Ranking",
    slug: "technical-seo-strategies-ecommerce-google-maps-ranking",
    category: "Technical SEO",
    created_at: "2026-07-18",
    excerpt: "Master Google Maps rankings and e-commerce technical SEO strategies to double organic traffic.",
    content: "Rank #1 on Google for high-intent e-commerce keywords requires flawless technical foundation...",
    featured_image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1200&auto=format&fit=crop&q=80"
  }
];

export default function BlogPage() {
  const supabase = createClient();
  const [articles, setArticles] = useState(defaultArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchPosts() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "Published")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setArticles(data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div className="pt-28 pb-24 min-h-screen max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-[#c00000]/10 border border-[#c00000]/30 text-[#c00000] font-mono text-xs font-extrabold uppercase tracking-wider">
          Technical Insights &amp; Guides
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          E-Commerce, Shopify &amp; SEO Playbook
        </h1>
        <p className="text-slate-500 font-light text-base md:text-lg leading-relaxed">
          In-depth technical articles covering custom Shopify Liquid development, Headless Commerce, MERN applications, and Technical SEO.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-4 border-[#c00000]/20 border-t-[#c00000] animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/blog/${art.slug}`}
              className="p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-[#c00000]/40 hover:shadow-2xl transition-all duration-300 space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {art.featured_image && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100">
                    <img
                      src={art.featured_image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#c00000] text-white text-[10px] font-mono font-bold shadow-md">
                      {art.category}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#c00000]" />
                    <span>
                      {new Date(art.created_at || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{Math.ceil((art.content?.split(/\s+/).length || 200) / 200)} min read</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#c00000] transition-colors leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">{art.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">DevShaham Guide</span>
                <span className="font-bold text-[#c00000] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Article <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
