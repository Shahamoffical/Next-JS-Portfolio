"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
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
  },
  {
    id: "4",
    title: "Sub-2 Second Website Speed Optimization & Core Web Vitals",
    slug: "website-speed-optimization-core-web-vitals",
    category: "Website Speed Optimization",
    created_at: "2026-07-12",
    excerpt: "Comprehensive speed optimization guide for web applications, LCP, CLS, and INP metrics.",
    content: "Optimizing LCP, CLS, and INP metrics across mobile and desktop devices...",
    featured_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "5",
    title: "Full Stack MERN E-Commerce Web App Architecture",
    slug: "full-stack-mern-ecommerce-web-app-architecture",
    category: "MERN Stack",
    created_at: "2026-07-05",
    excerpt: "Building scalable Node.js, Express, MongoDB, and React e-commerce architectures with Stripe payments.",
    content: "Building full-stack MERN web applications with JWT authentication and real-time MongoDB sync...",
    featured_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "6",
    title: "Custom WooCommerce Checkout & WhatsApp Order Automation",
    slug: "custom-woocommerce-checkout-whatsapp-order-automation",
    category: "WooCommerce",
    created_at: "2026-06-28",
    excerpt: "Streamlining 1-click WooCommerce checkouts with automated WhatsApp order confirmation webhooks.",
    content: "Integrating Make.com and WhatsApp Business API for instant customer checkout alerts...",
    featured_image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "7",
    title: "Advanced Shopify Section Rendering & Cart Drawers",
    slug: "advanced-shopify-section-rendering-cart-drawers",
    category: "Shopify Development",
    created_at: "2026-06-20",
    excerpt: "Creating instantaneous AJAX slide-out cart drawers with Shopify section rendering APIs.",
    content: "Building custom slide-out cart drawers with dynamic upsells and progress bars...",
    featured_image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80"
  }
];

export default function BlogPage() {
  const supabase = createClient();
  const [articles, setArticles] = useState(defaultArticles);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const ARTICLES_PER_PAGE = 6;

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

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE) || 1;
  const displayedArticles = articles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((art) => (
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
                  <span className="font-mono text-slate-400">Shaham Abbas Dev Guide</span>
                  <span className="font-bold text-[#c00000] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Full Article <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-12 border-t border-slate-200/80">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:border-[#c00000] hover:text-[#c00000] disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700 transition-all shadow-sm flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-xl font-mono text-xs font-bold transition-all shadow-sm ${
                    currentPage === page
                      ? "bg-[#c00000] text-white shadow-[0_4px_14px_rgba(192,0,0,0.35)]"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-[#c00000] hover:text-[#c00000]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:border-[#c00000] hover:text-[#c00000] disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700 transition-all shadow-sm flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
