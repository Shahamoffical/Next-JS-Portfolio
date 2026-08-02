"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Sparkles, Filter, Code2, Cpu, Globe, ShoppingBag } from "lucide-react";
import { FaGithub as Github, FaShopify, FaWordpress, FaReact } from "react-icons/fa";

const projectsData = [
  {
    id: "mobilecart-canada",
    slug: "mobilecart-canada",
    title: "MobileCart Canada",
    category: "shopify",
    categoryLabel: "Shopify Development",
    subtitle: "Shopify Plus & Mobile Commerce Engine",
    desc: "A high-performance custom Shopify Liquid theme with dynamic product filtering loops, instant checkout extensions, sub-1.5s mobile LCP speeds, and automated Make.com CRM synchronization.",
    img: "/project_woo.png",
    stack: ["Shopify Plus", "Liquid", "Make.com", "Tailwind CSS", "Technical SEO"],
    github: "https://github.com/agency-portfolio/mobilecart-shopify",
    liveDemo: "https://mobilecart.ca",
    metrics: "Sub-1.2s LCP • +140% Conversion",
  },
  {
    id: "chateau-salon",
    slug: "chateau-salon",
    title: "Chateau Salon & Spa",
    category: "wordpress",
    categoryLabel: "WordPress & WooCommerce",
    subtitle: "Custom WordPress & Booking Architecture",
    desc: "An elegant custom WordPress theme integrated with online appointment scheduling engines, dynamic service galleries, and Google Maps local SEO targeting.",
    img: "/project_wp.png",
    stack: ["WordPress Core", "PHP", "Vagaro API", "Elementor Pro", "Technical SEO"],
    github: "https://github.com/agency-portfolio/chateausalon-wp",
    liveDemo: "https://chateausalon.com",
    metrics: "#1 Google Ranking • 99% Speed Score",
  },
  {
    id: "eatarra-woocommerce",
    slug: "eatarra-woocommerce",
    title: "Eatarra Fresh E-Commerce",
    category: "wordpress",
    categoryLabel: "WordPress & WooCommerce",
    subtitle: "WooCommerce & WhatsApp Order Redirection",
    desc: "A scalable WooCommerce storefront featuring custom dynamic product loops, instant WhatsApp order redirection, sub-2 second page speeds, and subscription payments.",
    img: "/project_dash.png",
    stack: ["WooCommerce", "WordPress", "WhatsApp API", "PHP", "Speed 98+"],
    github: "https://github.com/agency-portfolio/eatarra-woocommerce",
    liveDemo: "https://eatarra.com",
    metrics: "1-Click Checkout • 100k+ Orders",
  },
  {
    id: "saferdot-cybersecurity",
    slug: "saferdot-cybersecurity",
    title: "Saferdot Cybersecurity",
    category: "custom",
    categoryLabel: "Custom Development",
    subtitle: "MERN Stack Corporate Application",
    desc: "A modern full-stack MERN application with real-time threat dashboards, decoupled REST APIs, automated security webhooks, and responsive glassmorphism UI.",
    img: "/project_woo.png",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/agency-portfolio/saferdot-mern",
    liveDemo: "https://saferdot.com",
    metrics: "Real-time Sync • Enterprise Security",
  },
  {
    id: "autoleads-ai-assistant",
    slug: "autoleads-ai-assistant",
    title: "AutoLeads AI Sales Agent",
    category: "ai",
    categoryLabel: "AI Agents & Automations",
    subtitle: "Autonomous Make.com & OpenAI Lead Pipeline",
    desc: "An intelligent AI agent automation system that qualifies incoming website leads via OpenAI GPT-4, syncs with CRM pipelines, and triggers automated WhatsApp customer follow-ups.",
    img: "/project_dash.png",
    stack: ["OpenAI API", "Make.com", "WhatsApp Bot", "Node.js", "Webhooks"],
    github: "https://github.com/agency-portfolio/autoleads-ai",
    liveDemo: "https://next-js-portfolio-one-bay.vercel.app/admin",
    metrics: "24/7 Automated Qualify • 0ms Latency",
  },
  {
    id: "apex-shopify-store",
    slug: "apex-shopify-store",
    title: "Apex Apparel Shopify Plus",
    category: "shopify",
    categoryLabel: "Shopify Development",
    subtitle: "Custom OS 2.0 Liquid & Cart Drawer",
    desc: "Bespoke Shopify Plus storefront with custom slide-out cart drawers, dynamic upsell bundles, multi-currency localization, and JSON-LD product schemas.",
    img: "/project_wp.png",
    stack: ["Shopify Plus", "Liquid OS 2.0", "JavaScript", "GraphQL"],
    github: "https://github.com/agency-portfolio/apex-shopify",
    liveDemo: "https://mobilecart.ca",
    metrics: "+68% AOV Increase • 100% Mobile",
  },
  {
    id: "headless-wpgraphql-portal",
    slug: "headless-wpgraphql-portal",
    title: "Decoupled WP Headless Portal",
    category: "custom",
    categoryLabel: "Custom Development",
    subtitle: "Next.js & Headless WordPress Architecture",
    desc: "Sub-second headless web portal combining Next.js frontend with WordPress backend via WPGraphQL, ISR incremental generation, and edge caching.",
    img: "/project_woo.png",
    stack: ["Next.js", "Headless WP", "WPGraphQL", "Vercel Edge"],
    github: "https://github.com/agency-portfolio/headless-wp",
    liveDemo: "https://chateausalon.com",
    metrics: "Sub-800ms LCP • Instant ISR",
  },
  {
    id: "whatsapp-ecom-bot",
    slug: "whatsapp-ecom-bot",
    title: "WhatsApp Smart Order Bot",
    category: "ai",
    categoryLabel: "AI Agents & Automations",
    subtitle: "Automated Conversational Checkout",
    desc: "Automated conversational e-commerce AI bot allowing customers to inquire about inventory, place 1-click orders, and receive tracking notifications via WhatsApp.",
    img: "/project_dash.png",
    stack: ["WhatsApp API", "Make.com", "Node.js", "MongoDB"],
    github: "https://github.com/agency-portfolio/whatsapp-bot",
    liveDemo: "https://eatarra.com",
    metrics: "85% Conversion Rate • Zero Cart Abandon",
  }
];

const categoryTabs = [
  { id: "all", label: "All Projects", icon: Globe },
  { id: "shopify", label: "Shopify Development", icon: FaShopify },
  { id: "wordpress", label: "WordPress & WooCommerce", icon: FaWordpress },
  { id: "custom", label: "Custom Development", icon: Code2 },
  { id: "ai", label: "AI Agents & Automations", icon: Cpu }
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = activeTab === "all"
    ? projectsData
    : projectsData.filter((p) => p.category === activeTab);

  return (
    <div className="pt-28 pb-24 min-h-screen max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Featured Engineering Work
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Client Projects &amp; Digital Solutions
        </h1>
        <p className="text-slate-500 font-light text-base md:text-lg leading-relaxed">
          Production builds engineered for high conversion, sub-second speed, and scalable performance across Shopify Plus, WordPress, MERN stack, and AI Automations.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 rounded-2xl bg-slate-100/80 border border-slate-200/80 max-w-4xl mx-auto">
        {categoryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-3xl border border-slate-200/80 bg-white hover:border-primary/50 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden relative"
          >
            {/* Top Image Banner */}
            <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

              {/* Category Badge */}
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-primary text-white text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-md">
                {project.categoryLabel}
              </span>

              {/* Metrics Pill */}
              <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-mono font-bold shadow-md">
                ⚡ {project.metrics}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                  {project.subtitle}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {project.desc}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 text-slate-700 text-[11px] font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-primary transition-colors shadow-sm"
                >
                  View Details &rarr;
                </Link>

                <div className="flex items-center gap-2">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:text-primary hover:border-primary text-xs font-mono font-semibold transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" /> Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-mono font-semibold transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
