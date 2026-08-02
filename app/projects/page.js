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
    category: "wordpress",
    categoryLabel: "WordPress & WooCommerce",
    subtitle: "Mobile Selling & Tech E-Commerce Store",
    desc: "A high-performance WordPress & WooCommerce mobile selling storefront engineered for MobileCart Canada, featuring smartphones, tablet accessories, instant checkout, and sub-1.2s loading speeds across Canada.",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80",
    stack: ["WooCommerce", "WordPress", "Canada Mobile Store", "Feb 2026", "PHP"],
    github: "https://github.com/agency-portfolio/mobilecart-canada-wp",
    liveDemo: "https://mobilecart.ca/",
    metrics: "Feb 2026 • Canada Mobile WooCommerce",
  },
  {
    id: "incubee-pk",
    slug: "incubee-pk",
    title: "Incubee PK",
    category: "wordpress",
    categoryLabel: "WordPress & WooCommerce",
    subtitle: "Digital Courses & Software House Portal",
    desc: "A modern WordPress agency platform built for Incubee PK, featuring digital skills training courses, student registration portals, software development portfolio showcases, and corporate client inquiry workflows.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    stack: ["WordPress Core", "Digital Courses", "Software House", "Jan 2026", "Elementor Pro"],
    github: "https://github.com/agency-portfolio/incubee-wp",
    liveDemo: "https://www.incubee.pk/",
    metrics: "Jan 2026 • Digital Courses & Tech Agency",
  },
  {
    id: "saferdot-lms",
    slug: "saferdot-lms",
    title: "Saferdot LMS & Driving Academy",
    category: "wordpress",
    categoryLabel: "WordPress & WooCommerce",
    subtitle: "LMS & Truck Driving Courses & Certification Portal",
    desc: "A custom WordPress LMS platform built for Saferdot, offering professional truck driving courses, student enrollment workflows, automated quiz evaluations, and verifiable certification issuance.",
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop&q=80",
    stack: ["WordPress LMS", "LearnDash", "Truck Driving", "Certifications", "Dec 2025"],
    github: "https://github.com/agency-portfolio/saferdot-lms-wp",
    liveDemo: "https://saferdot.com/",
    metrics: "Dec 2025 • Truck Driving LMS & Certification",
  },
  {
    id: "gb-constructions",
    slug: "gb-constructions",
    title: "GB Constructions",
    category: "wordpress",
    categoryLabel: "WordPress & WooCommerce",
    subtitle: "Civil Infrastructure, Roads & Bridge Construction Portal",
    desc: "A high-performance WordPress corporate portal engineered for GB Constructions, showcasing major civil infrastructure projects, road works, bridge construction engineering, and municipal tenders.",
    img: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&auto=format&fit=crop&q=80",
    stack: ["WordPress Core", "PHP", "Roads & Bridges", "Civil Engineering", "Technical SEO"],
    github: "https://github.com/agency-portfolio/gbconstructions-wp",
    liveDemo: "https://gbconstructions.org/",
    metrics: "Civil Infrastructure • Roads & Bridge Tenders",
  },
  {
    id: "shaham-ai-bot",
    slug: "shaham-ai-bot",
    title: "Shaham AI Chatbot",
    category: "ai",
    categoryLabel: "AI Agents & Automations",
    subtitle: "Autonomous AI Assistant & Conversational Bot",
    desc: "An intelligent AI chatbot application powered by OpenAI GPT-4 API and real-time conversational streaming for instant automated customer support and lead qualification.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    stack: ["OpenAI GPT-4", "React.js", "Next.js", "AI Agent", "Tailwind CSS"],
    github: "https://github.com/agency-portfolio/shaham-ai-bot",
    liveDemo: "https://shaham-ai.vercel.app/",
    metrics: "<100ms Streaming • 24/7 AI Automation",
  },
  {
    id: "halal-animal-care",
    slug: "halal-animal-care",
    title: "HASC - Halal Animal Selling & Care",
    category: "custom",
    categoryLabel: "Custom Development",
    subtitle: "Full-Stack E-Commerce & Monthly Care Subscription",
    desc: "A full-stack web application designed for selling and managing animal care during Eid-ul-Adha and special events. Features live animal browsing, instant purchase, monthly care subscription plans, and booking workflows for citizens.",
    img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    stack: ["Node.js", "Express", "MongoDB", "React.js", "Subscriptions", "MERN Stack"],
    github: "https://github.com/Shahamoffical/HalalAnimalSellingWebsite",
    liveDemo: "https://halal-animal-selling-website.vercel.app/",
    metrics: "Monthly Subscriptions • Eid Event Booking",
  },
  {
    id: "trading-app-pro",
    slug: "trading-app-pro",
    title: "TradingApp Pro",
    category: "custom",
    categoryLabel: "Custom Development",
    subtitle: "Full-Stack Financial Trading & Analytics Application",
    desc: "A modern full-stack web trading platform featuring live stock & crypto price tracking, interactive charts, portfolio analytics, and secure order execution.",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    stack: ["React.js", "Node.js", "Express", "Financial Trading", "Tailwind CSS", "WebSocket"],
    github: "https://github.com/agency-portfolio/trading-app",
    liveDemo: "https://trading-app-inky-gamma.vercel.app/",
    metrics: "Live Price Stream • Real-Time Analytics",
  },
  {
    id: "peakloom",
    slug: "peakloom",
    title: "Peakloom UK",
    category: "shopify",
    categoryLabel: "Shopify Development",
    subtitle: "Gym Creatine & Fitness Supplement Store",
    desc: "A high-performance custom Shopify Liquid OS 2.0 storefront engineered for Peakloom UK, specializing in premium gym creatine, workout supplements, subscription bundles, and sub-1.1s mobile speed.",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    stack: ["Shopify Plus", "Liquid OS 2.0", "Creatine Store", "UK E-Commerce", "Make.com"],
    github: "https://github.com/agency-portfolio/peakloom-shopify",
    liveDemo: "https://peakloom.co.uk",
    metrics: "Sub-1.1s LCP • +185% Gym Conversion",
  },
  {
    id: "furmora",
    slug: "furmora",
    title: "Furmora UK",
    category: "shopify",
    categoryLabel: "Shopify Development",
    subtitle: "Puppy Pads & Pet Supplies Store",
    desc: "Custom Shopify storefront engineered for Furmora UK, featuring 1-click puppy pad product bundles, automated subscription refills, custom slide-out cart drawers, and instant checkout.",
    img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&auto=format&fit=crop&q=80",
    stack: ["Shopify OS 2.0", "Liquid", "Puppy Pads", "UK Pet Store", "Cart Drawer"],
    github: "https://github.com/agency-portfolio/furmora-shopify",
    liveDemo: "https://furmora.co.uk",
    metrics: "1-Click Bundles • Sub-1.2s Mobile Speed",
  },
  {
    id: "regent-scent",
    slug: "regent-scent",
    title: "REGENT SCENT UAE",
    category: "shopify",
    categoryLabel: "Shopify Development",
    subtitle: "Luxury Perfume & Fragrance Store",
    desc: "Bespoke luxury fragrance Shopify Plus storefront built for REGENT SCENT UAE, featuring multi-currency AED/USD switching, gold-themed luxury UI, custom fragrance quiz filtering, and instant checkout.",
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&auto=format&fit=crop&q=80",
    stack: ["Shopify Plus", "Liquid OS 2.0", "Luxury Perfume", "UAE Multi-Currency", "Fragrance Quiz"],
    github: "https://github.com/agency-portfolio/regent-scent-shopify",
    liveDemo: "https://regentscents.com",
    metrics: "Luxury UI • AED/USD Multi-Currency",
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
