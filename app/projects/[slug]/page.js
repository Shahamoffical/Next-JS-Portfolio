"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, Sparkles, Shield, Cpu, Clock, Calendar } from "lucide-react";
import { FaGithub as Github, FaShopify, FaWordpress, FaReact } from "react-icons/fa";

const projectDetails = {
  "mobilecart-canada": {
    title: "MobileCart Canada",
    category: "Shopify Development",
    subtitle: "Shopify Plus & Mobile Commerce Engine",
    client: "MobileCart Commerce Inc.",
    year: "2026",
    role: "Lead E-Commerce Architect",
    liveDemo: "https://mobilecart.ca",
    github: "https://github.com/agency-portfolio/mobilecart-shopify",
    featuredImage: "/project_woo.png",
    overview: "MobileCart Canada needed a complete Shopify Plus theme overhaul to support over 50,000 monthly active shoppers across desktop and mobile devices. Default Shopify OS 2.0 themes were failing Core Web Vitals LCP benchmarks.",
    challenge: "The primary challenge was reducing initial mobile DOM rendering times while maintaining rich interactive product variant selectors, dynamic cart drawer upsells, and instant multi-currency checkout.",
    solution: "Engineered a custom Shopify Liquid architecture with modular section rendering API hooks, async JavaScript asset bundling, and automated Make.com CRM webhooks for order processing.",
    results: [
      "Sub-1.2s mobile Largest Contentful Paint (LCP)",
      "+140% increase in mobile checkout conversion rate",
      "99/100 Desktop Google PageSpeed score",
      "Seamless Make.com webhook sync for inventory management"
    ],
    techStack: ["Shopify Plus", "Liquid OS 2.0", "Make.com", "JavaScript ES6", "Tailwind CSS", "Technical SEO"]
  },
  "chateau-salon": {
    title: "Chateau Salon & Spa",
    category: "WordPress & WooCommerce",
    subtitle: "Custom WordPress & Booking Architecture",
    client: "Chateau Beauty Group",
    year: "2026",
    role: "Full Stack WordPress Engineer",
    liveDemo: "https://chateausalon.com",
    github: "https://github.com/agency-portfolio/chateausalon-wp",
    featuredImage: "/project_wp.png",
    overview: "Chateau Salon required an ultra-fast local business web portal integrated with external Vagaro appointment booking systems and Google Maps local SEO schema.",
    challenge: "Third-party booking scripts were severely degrading page load performance and causing layout shifts on mobile browsers.",
    solution: "Built a custom lightweight WordPress theme with asynchronous Vagaro API modal triggers, local schema markup, and optimized image compression.",
    results: [
      "#1 Google Maps Local Pack ranking for primary target keywords",
      "Sub-1.0s homepage load speed",
      "+85% increase in online appointment bookings"
    ],
    techStack: ["WordPress Core", "PHP", "Vagaro API", "Elementor Pro", "Google Schema", "Technical SEO"]
  },
  "eatarra-woocommerce": {
    title: "Eatarra Fresh E-Commerce",
    category: "WordPress & WooCommerce",
    subtitle: "WooCommerce & WhatsApp Order Redirection",
    client: "Eatarra Organics",
    year: "2026",
    role: "WooCommerce Solutions Architect",
    liveDemo: "https://eatarra.com",
    github: "https://github.com/agency-portfolio/eatarra-woocommerce",
    featuredImage: "/project_dash.png",
    overview: "Eatarra needed a streamlined 1-click WooCommerce store tailored for international customer orders via direct WhatsApp checkout redirection.",
    challenge: "Traditional multi-step checkout forms caused a 65% cart abandonment rate among mobile customers in target regions.",
    solution: "Designed custom WooCommerce hook routines that instantly compile cart parameters and launch pre-filled WhatsApp customer order messages.",
    results: [
      "85% checkout completion rate via WhatsApp redirection",
      "100,000+ orders processed seamlessly",
      "Zero cart abandonment on instant checkout routes"
    ],
    techStack: ["WooCommerce", "WordPress", "WhatsApp API", "PHP", "Speed Optimization"]
  },
  "saferdot-cybersecurity": {
    title: "Saferdot Cybersecurity",
    category: "Custom Development",
    subtitle: "MERN Stack Corporate Application",
    client: "Saferdot Technologies",
    year: "2026",
    role: "Full Stack MERN Developer",
    liveDemo: "https://saferdot.com",
    github: "https://github.com/agency-portfolio/saferdot-mern",
    featuredImage: "/project_woo.png",
    overview: "Saferdot required an enterprise-grade corporate platform with live threat monitoring dashboards and secure API authentication.",
    challenge: "Managing real-time telemetry updates without impacting page responsiveness.",
    solution: "Created a decoupled MERN stack application with Express REST endpoints, MongoDB database indexing, and React state management.",
    results: [
      "Sub-200ms API response latency",
      "Enterprise security compliance",
      "100% uptime architecture"
    ],
    techStack: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"]
  },
  "autoleads-ai-assistant": {
    title: "AutoLeads AI Sales Agent",
    category: "AI Agents & Automations",
    subtitle: "Autonomous Make.com & OpenAI Lead Pipeline",
    client: "Agency Internal / Client Solutions",
    year: "2026",
    role: "AI Automations Engineer",
    liveDemo: "https://next-js-portfolio-one-bay.vercel.app/admin",
    github: "https://github.com/agency-portfolio/autoleads-ai",
    featuredImage: "/project_dash.png",
    overview: "An autonomous lead qualification pipeline that intercepts website inquiries, analyzes requirements using OpenAI GPT-4, and alerts sales reps instantly via WhatsApp.",
    challenge: "Eliminating manual lead qualification delays while keeping lead responses personal and accurate.",
    solution: "Implemented Make.com scenario webhooks paired with OpenAI Assistants API and WhatsApp Business notification triggers.",
    results: [
      "24/7 instant lead qualification in <5 seconds",
      "Zero missed prospect inquiries",
      "100% automated CRM lead syncing"
    ],
    techStack: ["OpenAI API", "Make.com", "WhatsApp Business API", "Node.js", "Webhooks"]
  }
};

export default function SingleProjectPage() {
  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = projectDetails[slug] || projectDetails["mobilecart-canada"];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-primary font-bold">{project.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-xs font-extrabold uppercase tracking-wider shadow-sm">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 font-mono text-xs">
              {project.role}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-primary font-semibold font-mono">
            {project.subtitle}
          </p>

          {/* Quick Info Grid */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-6 shadow-sm font-mono text-xs">
            <div>
              <span className="text-slate-400 block mb-1">CLIENT</span>
              <span className="font-bold text-slate-900">{project.client}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">YEAR</span>
              <span className="font-bold text-slate-900">{project.year}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">ROLE</span>
              <span className="font-bold text-slate-900">{project.role}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">LIVE DEMO</span>
              <a href={project.liveDemo} target="_blank" rel="noreferrer" className="font-bold text-primary hover:underline flex items-center gap-1">
                Visit Site <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl aspect-video relative">
          <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 text-slate-700 leading-relaxed font-light">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-900 m-0">Project Overview</h2>
              <p className="text-base">{project.overview}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-900 m-0">The Technical Challenge</h2>
              <p className="text-base">{project.challenge}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-900 m-0">The Engineering Solution</h2>
              <p className="text-base">{project.solution}</p>
            </section>

            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 m-0">Key Measurable Results</h2>
              <ul className="space-y-3">
                {project.results.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider border-b border-slate-100 pb-3">
                Tech Stack &amp; Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white space-y-4 shadow-xl">
              <h3 className="text-lg font-bold">Have a Similar Project?</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Let&apos;s build a high-performance custom website or e-commerce engine tailored to your business goals.
              </p>
              <Link
                href="/contact"
                className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all text-center block shadow-md"
              >
                Get Free Technical Consultation &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-12 border-t border-slate-200">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold font-mono text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
