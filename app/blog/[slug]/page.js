"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
  ChevronRight,
  Clock,
  Eye,
  Share2,
  Check,
  Copy,
  MessageSquare,
  Send,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Quote,
  HelpCircle,
  Tag,
  CheckCircle2,
  Calendar,
  ThumbsUp
} from "lucide-react";
import { FaTwitter, FaLinkedin, FaWhatsapp, FaGithub, FaFacebookF, FaInstagram } from "react-icons/fa";

// Default Demo Fallback Posts for Dynamic Matching
const defaultDemoPosts = [
  {
    id: "1",
    title: "Building Custom Shopify Plus Liquid Themes for High-Volume Stores",
    slug: "building-custom-shopify-plus-liquid-themes",
    category: "Shopify Development",
    author: "Shaham Abbas",
    author_role: "Senior E-Commerce & Liquid Architect",
    views: "1,420",
    status: "Published",
    date: "August 1, 2026",
    content: `Building high-volume Shopify Plus stores requires more than default OS 2.0 themes. When handling thousands of concurrent checkouts, section rendering APIs, Liquid loop optimization, and Core Web Vitals become the main drivers of conversion.

## 1. Section Rendering API & Dynamic Caching

Shopify's Section Rendering API allows you to fetch dynamic updated sections of a page without reloading the entire DOM. This is crucial for ajax carts, dynamic filters, and quick view drawers.

\`\`\`liquid
{% comment %} Custom Section Snippet for Ajax Cart Update {% endcomment %}
{% schema %}
{
  "name": "Featured Product Slider",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Recommended for You"
    }
  ]
}
{% endschema %}
\`\`\`

> "Optimizing section rendering reduced server latency by 45% across our flagship Shopify Plus client stores."

## 2. Liquid Loop Optimization & Image CDN Sizing

Avoid nested \`for\` loops inside product collections. Always request explicit \`image_url\` sizes with srcset parameters to minimize Largest Contentful Paint (LCP).

\`\`\`html
<img
  src="{{ product.featured_image | image_url: width: 600 }}"
  srcset="{{ product.featured_image | image_url: width: 300 }} 300w,
          {{ product.featured_image | image_url: width: 600 }} 600w,
          {{ product.featured_image | image_url: width: 900 }} 900w"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  alt="{{ product.title | escape }}"
/>
\`\`\`

## 3. SEO Schema JSON-LD & Structured Data

To ensure Google indexes your e-commerce products with rich price snippets and star reviews, insert JSON-LD schema dynamically into product templates:

\`\`\`json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Custom Liquid Theme Architecture",
  "image": "https://images.unsplash.com/photo-1556742049-0a6791490271?w=1200&auto=format&fit=crop&q=80",
  "description": "High performance custom Shopify Liquid theme development.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "2999.00",
    "availability": "https://schema.org/InStock"
  }
}
\`\`\`

## Conclusion

By structuring your Shopify Liquid code cleanly, modularizing sections, and employing structured JSON-LD schemas, you can achieve sub-2 second load times and top Google search rankings.`,
    tags: "Shopify, Liquid, E-Commerce, SEO, Performance",
    excerpt: "Essential technical guidelines and code snippets for custom Shopify Plus Liquid development and high-volume e-commerce optimization.",
    faqs: "Q: Is Liquid faster than Headless React for Shopify?\nA: Liquid with cached sections is often faster for initial page load and simpler to maintain than headless builds.\n\nQ: How do you pass Core Web Vitals on Shopify?\nA: By eliminating unneeded apps, serving responsive image srcsets, and deferring non-essential scripts.",
    seo_title: "Building Custom Shopify Plus Liquid Themes Guide 2026",
    seo_desc: "In-depth guide to Liquid theme optimization, Section Rendering API, and sub-2 second load times for Shopify Plus.",
    featured_image: "https://images.unsplash.com/photo-1556742049-0a6791490271?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "2",
    title: "Decoupled WordPress & WooCommerce Architectures with WPGraphQL",
    slug: "decoupled-wordpress-woocommerce-architectures-wpgraphql",
    category: "WordPress Development",
    author: "Shaham Abbas",
    author_role: "Headless Web Architect",
    views: "980",
    status: "Published",
    date: "July 24, 2026",
    content: `Headless WordPress decouples the admin dashboard from the user frontend. By pairing Next.js with WPGraphQL, you gain total frontend freedom while preserving the content editing experience client teams love.

## 1. Setting Up WPGraphQL Endpoints

WPGraphQL turns your WordPress site into a GraphQL API server. Here is how we query custom posts and WooCommerce products:

\`\`\`graphql
query GetPublishedPosts {
  posts(where: { status: PUBLISH }) {
    nodes {
      id
      title
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
\`\`\`

> "Headless WordPress delivers ultimate speed while shielding your backend database behind static site generation."

## 2. ISR & On-Demand Revalidation in Next.js

Using Next.js Incremental Static Regeneration (ISR), pages rebuild in milliseconds when new articles or products are published in WordPress.`,
    tags: "WordPress, Headless, NextJS, WPGraphQL, WooCommerce",
    excerpt: "Learn how to build sub-2 second headless WordPress websites with Next.js and GraphQL APIs.",
    faqs: "Q: Why use Headless WordPress?\nA: For bulletproof security, instant page transitions, and sub-second load times.",
    seo_title: "Decoupled WordPress & WooCommerce with WPGraphQL",
    seo_desc: "Guide to headless WordPress with Next.js and WPGraphQL architecture.",
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    title: "Technical SEO Strategies for E-Commerce & Google Maps Ranking",
    slug: "technical-seo-strategies-ecommerce-google-maps-ranking",
    category: "Technical SEO",
    author: "Shaham Abbas",
    author_role: "Technical SEO Specialist",
    views: "2,150",
    status: "Published",
    date: "July 18, 2026",
    content: `Rank #1 on Google for high-intent e-commerce keywords requires flawless technical foundation, sitemap hierarchy, and structured local business metadata.

## 1. Schema JSON-LD & Local Business Signals

Injecting accurate Schema markup directly onto your homepage and product pages informs Google crawlers about your physical business location, domain authority, and user reviews.

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "DevShaham - Digital Agency",
  "url": "https://devshaham.com",
  "priceRange": "$$$",
  "telephone": "+923213567058"
}
\`\`\`

## 2. Speed & Core Web Vitals Optimization

Google prioritizes LCP (Largest Contentful Paint) < 2.5s and CLS (Cumulative Layout Shift) < 0.1. Optimizing fonts and inline critical CSS is paramount.`,
    tags: "SEO, Schema, Google Maps, Core Web Vitals, E-Commerce",
    excerpt: "Master Google Maps rankings and e-commerce technical SEO strategies to double organic traffic.",
    faqs: "Q: How long does technical SEO take to rank?\nA: Usually 4 to 8 weeks after Google re-indexes updated schema and sitemaps.",
    seo_title: "Technical SEO Strategies for E-Commerce 2026",
    seo_desc: "Top technical SEO playbook for Google Maps rankings and high-converting e-commerce sites.",
    featured_image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1200&auto=format&fit=crop&q=80"
  }
];

export default function SingleBlogPostPage() {
  const params = useParams();
  const slugParam = params?.slug;

  const supabase = createClient();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const [tocList, setTocList] = useState([]);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Comments state
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Marcus Vance",
      role: "E-Commerce Director",
      date: "August 1, 2026",
      avatar: "MV",
      content: "This guide on Section Rendering API was exactly what our team needed. Implementing the image srcset suggestions dropped our LCP down to 1.2s!",
      likes: 8
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Shopify Developer",
      date: "July 30, 2026",
      avatar: "SJ",
      content: "Great breakdown of JSON-LD product schemas. Super easy to copy and apply directly into Liquid section snippets.",
      likes: 5
    }
  ]);
  const [newComment, setNewComment] = useState({ name: "", email: "", text: "" });
  const [commentPosted, setCommentPosted] = useState(false);

  // 1. Fetch Article Data
  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadPost() {
      if (!slugParam) return;

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slugParam)
        .single();

      if (!error && data) {
        setArticle(data);
      } else {
        const matched = defaultDemoPosts.find(p => p.slug === slugParam) || defaultDemoPosts[0];
        setArticle(matched);
      }
      setLoading(false);
    }

    loadPost();
  }, [slugParam]);

  // 2. Reading Progress Bar & TOC Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      const headings = document.querySelectorAll("h2[id], h3[id]");
      let currentActive = "";
      headings.forEach((heading) => {
        const top = heading.getBoundingClientRect().top;
        if (top <= 140) {
          currentActive = heading.id;
        }
      });
      if (currentActive) {
        setActiveHeading(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  // 3. Auto Extract Table of Contents
  useEffect(() => {
    if (!article?.content) return;

    const lines = article.content.split("\n");
    const extracted = [];
    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        const title = line.replace("## ", "").trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        extracted.push({ id, title, level: 2 });
      } else if (line.startsWith("### ")) {
        const title = line.replace("### ", "").trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        extracted.push({ id, title, level: 3 });
      }
    });

    if (extracted.length === 0) {
      extracted.push(
        { id: "overview", title: "Overview", level: 2 },
        { id: "key-takeaways", title: "Key Takeaways", level: 2 },
        { id: "conclusion", title: "Conclusion", level: 2 }
      );
    }
    setTocList(extracted);
  }, [article]);

  // Handle Share Copy Link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopiedLink(true);
      setTimeout(() => setIsCopiedLink(false), 2500);
    }
  };

  // Handle Code Copy
  const handleCopyCode = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2500);
  };

  // Handle Comment Submission
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.text) return;

    const added = {
      id: Date.now(),
      name: newComment.name,
      role: "Verified Reader",
      date: "Just now",
      avatar: newComment.name.substring(0, 2).toUpperCase(),
      content: newComment.text,
      likes: 1
    };

    setComments([added, ...comments]);
    setNewComment({ name: "", email: "", text: "" });
    setCommentPosted(true);
    setTimeout(() => setCommentPosted(false), 4000);
  };

  // Handle Like Comment
  const handleLikeComment = (commentId) => {
    setComments((prev) =>
      prev.map((item) => {
        if (item.id === commentId) {
          const isLiked = !!item.userLiked;
          return {
            ...item,
            userLiked: !isLiked,
            likes: isLiked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
  };

  // Handle Newsletter Submit
  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-32 text-slate-800">
        <div className="w-10 h-10 rounded-full border-4 border-[#c00000]/20 border-t-[#c00000] animate-spin mb-4"></div>
        <p className="text-slate-400 text-xs font-mono tracking-widest uppercase">Loading Article...</p>
      </div>
    );
  }

  const post = article || defaultDemoPosts[0];
  const wordCount = post.content ? post.content.split(/\s+/).length : 600;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));

  // Parse FAQs
  const parsedFaqs = [];
  if (post.faqs) {
    const pairs = post.faqs.split("\n\n");
    pairs.forEach(pair => {
      const parts = pair.split("\nA: ");
      if (parts.length === 2) {
        parsedFaqs.push({ q: parts[0].replace("Q: ", ""), a: parts[1] });
      }
    });
  }

  const relatedPosts = defaultDemoPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#c00000] selection:text-white">
      {/* 1. TOP SCROLLING READING PROGRESS BAR */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#c00000] via-rose-500 to-amber-500 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      ></div>

      {/* ARTICLE WRAPPER CONTAINER */}
      <article className="pt-28 pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* 2. BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-8 overflow-x-auto py-1">
          <Link href="/" className="hover:text-[#c00000] transition-colors flex items-center gap-1 shrink-0 font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/blog" className="hover:text-[#c00000] transition-colors shrink-0 font-medium">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[#c00000] font-bold truncate max-w-[200px] sm:max-w-xs">{post.category || "Shopify Development"}</span>
        </nav>

        {/* 3. HERO ARTICLE HEADER */}
        <header className="space-y-6 max-w-4xl mb-12">
          {/* Category & Tags Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-full bg-[#c00000] text-white font-mono text-xs font-extrabold uppercase tracking-wider shadow-sm">
              {post.category || "Shopify Development"}
            </span>
            {post.tags && post.tags.split(",").slice(0, 2).map((t, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300/60 text-slate-700 font-mono text-[11px]">
                #{t.trim()}
              </span>
            ))}
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-sans">
            {post.title}
          </h1>

          {/* Excerpt Summary */}
          {post.excerpt && (
            <p className="text-base sm:text-xl text-slate-600 font-light leading-relaxed border-l-4 border-[#c00000] pl-4 py-1">
              {post.excerpt}
            </p>
          )}

          {/* Author Metadata Card (Light Theme) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <img
                src="/profilecard.jpeg"
                alt="Shaham Abbas"
                className="w-11 h-11 rounded-full object-cover shadow-md border-2 border-[#c00000] shrink-0"
              />
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  {post.author || "Shaham Abbas"}
                  <CheckCircle2 className="w-4 h-4 text-[#c00000]" />
                </div>
                <div className="text-[11px] font-mono text-slate-500">{post.author_role || "Senior E-Commerce & Web Architect"}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c00000]" />
                <span>{post.date || "August 1, 2026"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{readTime} min read</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>{post.views || "1,420"} views</span>
              </div>
            </div>
          </div>
        </header>

        {/* 4. FEATURED HERO COVER IMAGE (16:9) */}
        <div className="relative w-full aspect-[16/9] max-h-[580px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg mb-16 group">
          <img
            src={post.featured_image || "https://images.unsplash.com/photo-1556742049-0a6791490271?w=1400&auto=format&fit=crop&q=80"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-mono z-10">
            <span className="bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-800 font-semibold shadow-sm text-[10px] sm:text-xs text-center">
              📷 High-Resolution Technical Reference
            </span>
            <span className="bg-[#c00000] text-white font-bold px-3 sm:px-3.5 py-1.5 rounded-xl shadow-md text-[10px] sm:text-xs text-center">
              DevShaham Exclusive Guide
            </span>
          </div>
        </div>

        {/* 5. MAIN 2-COLUMN LAYOUT (1440px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: MAIN ARTICLE CONTENT (8 COLS) */}
          <main className="lg:col-span-8 space-y-10 text-slate-700 text-base sm:text-lg leading-relaxed font-light">
            {/* ARTICLE CONTENT RENDERER */}
            <div className="prose prose-slate max-w-none space-y-8">
              {post.content ? (
                post.content.split("\n\n").map((block, idx) => {
                  // Heading H2
                  if (block.startsWith("## ")) {
                    const titleText = block.replace("## ", "").trim();
                    const headingId = titleText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    return (
                      <h2
                        key={idx}
                        id={headingId}
                        className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight pt-8 border-t border-slate-200/80 font-sans flex items-center gap-3 scroll-mt-28"
                      >
                        <span className="w-2.5 h-7 rounded-full bg-[#c00000] inline-block"></span>
                        {titleText}
                      </h2>
                    );
                  }

                  // Heading H3
                  if (block.startsWith("### ")) {
                    const titleText = block.replace("### ", "").trim();
                    const headingId = titleText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    return (
                      <h3
                        key={idx}
                        id={headingId}
                        className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pt-4 font-sans scroll-mt-28"
                      >
                        {titleText}
                      </h3>
                    );
                  }

                  // Quote Block
                  if (block.startsWith("> ")) {
                    const quoteText = block.replace("> ", "").replace(/"/g, "");
                    return (
                      <blockquote key={idx} className="relative p-6 sm:p-8 rounded-2xl bg-slate-100/90 border-l-4 border-[#c00000] shadow-sm my-6">
                        <Quote className="w-8 h-8 text-[#c00000]/20 absolute top-4 right-4" />
                        <p className="text-lg sm:text-xl font-medium text-slate-900 italic leading-relaxed m-0">
                          &ldquo;{quoteText}&rdquo;
                        </p>
                      </blockquote>
                    );
                  }

                  // Code Block (Dark navy syntax container inside light theme)
                  if (block.includes("```")) {
                    const codeMatch = block.match(/```(\w+)?\n([\s\S]*?)```/);
                    const lang = codeMatch ? codeMatch[1] || "code" : "code";
                    const codeText = codeMatch ? codeMatch[2] : block.replace(/```/g, "");

                    return (
                      <div key={idx} className="rounded-2xl border border-slate-800 bg-[#0f172a] overflow-hidden shadow-md my-6">
                        <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
                          <span className="text-amber-400 uppercase font-bold tracking-wider">{lang}</span>
                          <button
                            onClick={() => handleCopyCode(codeText, idx)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                          >
                            {copiedCodeIndex === idx ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-6 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
                          <code>{codeText}</code>
                        </pre>
                      </div>
                    );
                  }

                  // Regular Paragraph
                  return (
                    <p key={idx} className="text-slate-700 leading-relaxed font-light text-base sm:text-lg">
                      {block}
                    </p>
                  );
                })
              ) : (
                <p>No content available for this post.</p>
              )}
            </div>

            {/* CALLOUT BOX / PRO TIP */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50/60 border border-amber-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-amber-400/20 text-amber-700 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900 m-0">Pro Tip for Store Owners &amp; Developers</h4>
                <p className="text-xs sm:text-sm text-slate-700 font-light leading-relaxed m-0">
                  Always test custom Liquid changes on a staging duplicate theme before publishing to your live Shopify store. Use Shopify CLI for version control and automated GitHub integration.
                </p>
              </div>
            </div>

            {/* INTERACTIVE FAQ ACCORDION SECTION */}
            {parsedFaqs.length > 0 && (
              <section className="pt-8 border-t border-slate-200/80 space-y-6">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-[#c00000]" />
                  <h3 className="text-2xl font-bold text-slate-900 m-0">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-4">
                  {parsedFaqs.map((faq, fIdx) => (
                    <div key={fIdx} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                      <div className="text-base font-bold text-slate-900 flex items-start gap-2">
                        <span className="text-[#c00000] font-mono">Q.</span>
                        {faq.q}
                      </div>
                      <div className="text-sm text-slate-600 font-light leading-relaxed pl-5 border-l-2 border-slate-200">
                        {faq.a}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TAGS LIST */}
            {post.tags && (
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400 mr-2" />
                {post.tags.split(",").map((t, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-mono hover:border-[#c00000] hover:text-[#c00000] transition-colors cursor-pointer shadow-sm">
                    #{t.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* SOCIAL SHARING BAR */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#c00000]" /> Share this Article
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-100 text-slate-600 hover:text-white hover:bg-sky-500 transition-all shadow-sm"
                  title="Share on Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-100 text-slate-600 hover:text-white hover:bg-blue-600 transition-all shadow-sm"
                  title="Share on LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-100 text-slate-600 hover:text-white hover:bg-emerald-500 transition-all shadow-sm"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-2xl bg-[#c00000] text-white text-xs font-bold hover:bg-[#820000] transition-all flex items-center gap-2 shadow-md"
                >
                  {isCopiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* FULL AUTHOR BIO CARD */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src="/profilecard.jpeg"
                alt="Shaham Abbas"
                className="w-20 h-20 rounded-full object-cover shadow-lg border-2 border-[#c00000] shrink-0"
              />
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 m-0">Written by Shaham Abbas</h3>
                    <p className="text-xs font-mono text-[#c00000] mt-0.5">Senior Shopify Developer &amp; Technical SEO Architect</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center text-center w-fit self-center sm:self-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#c00000] transition-all shadow-sm shrink-0"
                  >
                    Hire Shaham &rarr;
                  </Link>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed m-0">
                  Specializing in custom Shopify Liquid themes, headless WPGraphQL integrations, MERN stack web applications, and automated e-commerce workflows. Helping brands scale internationally with sub-second page performance.
                </p>
              </div>
            </div>
          </main>

          {/* RIGHT COLUMN: STICKY SIDEBAR (4 COLS) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28">
            {/* STICKY TABLE OF CONTENTS */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider m-0 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c00000]"></span> Table of Contents
                </h3>
                <span className="text-[10px] font-mono text-slate-400">{tocList.length} Headings</span>
              </div>

              <ul className="space-y-2 text-xs font-medium">
                {tocList.map((item, idx) => (
                  <li key={idx} style={{ paddingLeft: item.level === 3 ? "1rem" : "0rem" }}>
                    <a
                      href={`#${item.id}`}
                      className={`block py-1.5 px-3 rounded-xl transition-all border-l-2 ${
                        activeHeading === item.id
                          ? "border-[#c00000] bg-[#c00000]/10 text-[#c00000] font-bold"
                          : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* AUTHOR CARD SIDEBAR */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4 text-center">
              <img
                src="/profilecard.jpeg"
                alt="Shaham Abbas"
                className="w-16 h-16 rounded-full object-cover mx-auto shadow-md border-2 border-[#c00000]"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900 m-0">Shaham Abbas</h4>
                <p className="text-[11px] font-mono text-[#c00000] mt-0.5">E-Commerce Engineer</p>
              </div>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Building high-converting Shopify Plus stores and technical SEO infrastructure.
              </p>
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-slate-600">
                <a href="https://github.com/Shahamabbas" target="_blank" rel="noopener noreferrer" title="GitHub" className="p-2 rounded-xl bg-slate-100 hover:text-slate-900 hover:bg-slate-200 transition-colors">
                  <FaGithub className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/shahamabbas" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-2 rounded-xl bg-slate-100 hover:text-blue-600 hover:bg-slate-200 transition-colors">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/share/1BnNJiiwi5/" target="_blank" rel="noopener noreferrer" title="Facebook" className="p-2 rounded-xl bg-slate-100 hover:text-blue-700 hover:bg-slate-200 transition-colors">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/shahamabbasdev" target="_blank" rel="noopener noreferrer" title="Instagram" className="p-2 rounded-xl bg-slate-100 hover:text-pink-600 hover:bg-slate-200 transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://x.com/Shahamabbasdev" target="_blank" rel="noopener noreferrer" title="Twitter / X" className="p-2 rounded-xl bg-slate-100 hover:text-slate-900 hover:bg-slate-200 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="https://wa.me/923213567058" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="p-2 rounded-xl bg-slate-100 hover:text-emerald-600 hover:bg-slate-200 transition-colors">
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* NEWSLETTER SIDEBAR CARD */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 shadow-sm space-y-4">
              <div className="p-3 rounded-2xl bg-[#c00000]/10 text-[#c00000] w-fit">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 m-0">Join 5,000+ Developers</h4>
                <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">
                  Get exclusive Shopify Liquid snippets, speed optimization tricks, and technical SEO guides delivered to your inbox.
                </p>
              </div>

              {subscribed ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Subscribed successfully!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#c00000] shadow-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#c00000] text-white text-xs font-bold hover:bg-[#820000] transition-all shadow-md"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>

        {/* 6. PREVIOUS / NEXT ARTICLE NAVIGATION */}
        <section className="mt-20 pt-10 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/blog/${defaultDemoPosts[1].slug}`}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-[#c00000]/60 hover:shadow-md transition-all space-y-2 group"
          >
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Previous Article
            </div>
            <div className="text-sm font-bold text-slate-900 group-hover:text-[#c00000] transition-colors line-clamp-1">
              {defaultDemoPosts[1].title}
            </div>
          </Link>

          <Link
            href={`/blog/${defaultDemoPosts[2].slug}`}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-[#c00000]/60 hover:shadow-md transition-all space-y-2 text-right group"
          >
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1">
              Next Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-sm font-bold text-slate-900 group-hover:text-[#c00000] transition-colors line-clamp-1">
              {defaultDemoPosts[2].title}
            </div>
          </Link>
        </section>

        {/* 7. RELATED ARTICLES (3 CARDS GRID) */}
        <section className="mt-20 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#c00000] uppercase tracking-wider font-bold">Recommended</span>
              <h3 className="text-2xl font-bold text-slate-900 m-0">Related Technical Articles</h3>
            </div>
            <Link href="/blog" className="text-xs font-mono text-[#c00000] hover:underline font-bold">
              View All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-[#c00000]/50 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100">
                    <img src={rel.featured_image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#c00000] text-white text-[10px] font-mono font-bold shadow-md">
                      {rel.category}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#c00000] transition-colors leading-snug line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-light line-clamp-2">{rel.excerpt}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>{rel.date}</span>
                  <span className="text-[#c00000] font-bold group-hover:translate-x-1 transition-transform">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 8. NEWSLETTER CTA BANNER */}
        <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#c00000] via-[#900000] to-slate-900 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider">
              Free Weekly Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Scale Your E-Commerce Store &amp; Technical SEO?
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 font-light leading-relaxed">
              Subscribe to get expert Shopify Liquid code snippets, speed performance benchmarks, and headless development guides straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="email"
              required
              placeholder="Enter your business email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-xl bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all shadow-xl shrink-0"
            >
              Get Free Access
            </button>
          </form>
        </section>

        {/* 9. COMMENTS SECTION */}
        <section className="mt-20 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-[#c00000]" />
              <h3 className="text-2xl font-bold text-slate-900 m-0">Reader Comments ({comments.length})</h3>
            </div>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h4 className="text-base font-bold text-slate-900 m-0">Leave a Reply</h4>

            {commentPosted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Your comment has been posted!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#c00000]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={newComment.email}
                  onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#c00000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-600 mb-1">Comment Message *</label>
              <textarea
                rows={4}
                required
                placeholder="Share your technical thoughts or questions..."
                value={newComment.text}
                onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#c00000] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-[#c00000] text-white font-bold text-xs hover:bg-[#820000] transition-all shadow-md"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-[#c00000] font-bold text-xs flex items-center justify-center border border-slate-200">
                      {c.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{c.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{c.role} • {c.date}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLikeComment(c.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border shadow-sm ${
                      c.userLiked
                        ? "bg-[#c00000] text-white border-[#c00000] font-bold shadow-md"
                        : "bg-slate-50 text-slate-600 hover:text-[#c00000] hover:border-[#c00000] border-slate-200"
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${c.userLiked ? "fill-white" : ""}`} />
                    <span>{c.likes}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed m-0 pl-13">
                  {c.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
