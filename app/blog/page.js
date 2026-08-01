"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function BlogPage() {
  const supabase = createClient();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchPosts() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "Published")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    }
    fetchPosts();
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

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 text-sm">No articles published yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-primary/40 hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">{art.category}</span>
                  <span className="text-slate-400">
                    {new Date(art.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs text-slate-500 font-light leading-relaxed">{art.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">
                  {Math.ceil((art.content?.split(/\s+/).length || 200) / 200)} min read
                </span>
                <span className="font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
