"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, Sparkles, Shield, Cpu, Clock, Calendar } from "lucide-react";
import { FaGithub as Github, FaShopify, FaWordpress, FaReact } from "react-icons/fa";

const projectDetails = {
  "gb-constructions": {
    title: "GB Constructions",
    category: "WordPress & WooCommerce",
    subtitle: "Civil Infrastructure, Roads & Bridge Construction Portal",
    client: "GB Constructions Pvt Ltd",
    year: "2026",
    role: "Lead WordPress Architect",
    liveDemo: "https://gbconstructions.org/",
    github: "https://github.com/agency-portfolio/gbconstructions-wp",
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=1200&auto=format&fit=crop&q=80",
    overview: "GB Constructions is a leading civil engineering enterprise specializing in high-speed road development, highway bridges, flyovers, and municipal infrastructure projects. Their web portal presents active construction portfolios, tender documentation, and corporate credentials.",
    challenge: "Presenting multi-million dollar engineering project portfolios and heavy infrastructure tender documents with ultra-fast page speeds and accessible mobile navigation.",
    solution: "Engineered a custom WordPress corporate architecture with dynamic project taxonomy filters, asynchronous PDF tender downloads, and technical local SEO schema.",
    results: [
      "Sub-1.2s page loading speed across desktop and mobile",
      "Streamlined tender document downloads for corporate clients",
      "#1 Google search visibility for regional civil infrastructure tenders"
    ],
    techStack: ["WordPress Core", "PHP", "Roads & Bridges", "Civil Engineering", "Technical SEO"]
  },

  "shaham-ai-bot": {
    title: "Shaham AI Chatbot",
    category: "AI Agents & Automations",
    subtitle: "Autonomous AI Assistant & Conversational Bot",
    client: "AI Innovations / Enterprise Solutions",
    year: "2026",
    role: "AI Automations Engineer",
    liveDemo: "https://shaham-ai.vercel.app/",
    github: "https://github.com/agency-portfolio/shaham-ai-bot",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    overview: "Shaham AI Chatbot is an autonomous conversational AI web application engineered to handle 24/7 customer support inquiries, qualify leads, and provide instant real-time streaming answers.",
    challenge: "Delivering sub-100ms response streaming latency while retaining accurate conversational context and business knowledge.",
    solution: "Integrated OpenAI GPT-4 Turbo API with Next.js Server-Sent Events (SSE) streaming, vector memory retrieval, and responsive UI controls.",
    results: [
      "<100ms real-time token streaming response",
      "24/7 autonomous customer lead qualification",
      "100% automated CRM lead logging"
    ],
    techStack: ["OpenAI GPT-4", "React.js", "Next.js", "AI Agent", "Tailwind CSS"]
  },

  "halal-animal-care": {
    title: "HASC - Halal Animal Selling & Care",
    category: "Custom Development",
    subtitle: "Full-Stack E-Commerce & Monthly Care Subscription",
    client: "HASC Livestock Co.",
    year: "2026",
    role: "Full Stack MERN Developer",
    liveDemo: "https://halal-animal-selling-website.vercel.app/",
    github: "https://github.com/Shahamoffical/HalalAnimalSellingWebsite",
    featuredImage: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    overview: "HASC is a comprehensive full-stack e-commerce platform designed for citizens to purchase livestock for Eid-ul-Adha and subscribe to monthly animal care and feeding services.",
    challenge: "Handling complex seasonal Eid booking workflows alongside recurring monthly care subscription billing and live livestock tracking.",
    solution: "Engineered a custom Node.js and MongoDB backend with Express REST endpoints, dynamic booking scheduling, and recurring payment handlers.",
    results: [
      "100% automated monthly animal care subscription processing",
      "Seamless Eid-ul-Adha livestock reservation workflow",
      "Sub-200ms API query performance"
    ],
    techStack: ["Node.js", "Express", "MongoDB", "React.js", "Subscriptions", "MERN Stack"]
  },

  "trading-app-pro": {
    title: "TradingApp Pro",
    category: "Custom Development",
    subtitle: "Full-Stack Financial Trading & Analytics Application",
    client: "FinTech Trading Solutions",
    year: "2026",
    role: "Lead Full Stack Engineer",
    liveDemo: "https://trading-app-inky-gamma.vercel.app/",
    github: "https://github.com/agency-portfolio/trading-app",
    featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    overview: "TradingApp Pro is an enterprise full-stack web trading platform engineered for real-time stock & crypto market analytics, interactive technical charting, and portfolio order execution.",
    challenge: "Managing high-frequency live price streams and WebSocket telemetry without triggering UI re-render bottlenecks.",
    solution: "Architected a decoupled React.js frontend with WebSocket price subscriptions, custom charting indicators, and Node.js backend microservices.",
    results: [
      "Real-time WebSocket price updates with zero UI lag",
      "Sub-50ms trading chart data streaming",
      "Secure JWT authentication and portfolio tracking"
    ],
    techStack: ["React.js", "Node.js", "Express", "Financial Trading", "Tailwind CSS", "WebSocket"]
  },

  "peakloom": {
    title: "Peakloom UK",
    category: "Shopify Development",
    subtitle: "Gym Creatine & Fitness Supplement Store",
    client: "Peakloom UK Ltd",
    year: "2026",
    role: "Shopify Plus Architect",
    liveDemo: "https://peakloom.co.uk",
    github: "https://github.com/agency-portfolio/peakloom-shopify",
    featuredImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    overview: "Peakloom UK needed a high-performance custom Shopify Liquid storefront engineered specifically for gym goers and fitness enthusiasts buying creatine and workout supplements.",
    challenge: "Fitness buyers demand instant product variant selection (flavors, pouch sizes, subscription frequencies) with zero page reload delays on mobile devices.",
    solution: "Engineered a custom Shopify Liquid OS 2.0 theme with AJAX variant updates, dynamic creatine subscription bundle pricing, and sub-1.1s mobile LCP optimization.",
    results: [
      "Sub-1.1s mobile Largest Contentful Paint (LCP)",
      "+185% increase in gym customer checkout conversions",
      "99/100 Desktop Google PageSpeed score",
      "Automated subscription bundle refills via Make.com"
    ],
    techStack: ["Shopify Plus", "Liquid OS 2.0", "Creatine Store", "UK E-Commerce", "Make.com"]
  },

  "furmora": {
    title: "Furmora UK",
    category: "Shopify Development",
    subtitle: "Puppy Pads & Pet Supplies Store",
    client: "Furmora Pet Products UK",
    year: "2026",
    role: "Lead E-Commerce Developer",
    liveDemo: "https://furmora.co.uk",
    github: "https://github.com/agency-portfolio/furmora-shopify",
    featuredImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&auto=format&fit=crop&q=80",
    overview: "Furmora UK required a streamlined Shopify storefront for selling puppy training pads and pet hygiene supplies across the United Kingdom.",
    challenge: "High cart abandonment due to multi-step checkout processes for recurring puppy pad orders.",
    solution: "Customized a Shopify Liquid theme with 1-click product bundle add-to-cart drawers, automated recurring subscription refills, and sub-1.2s mobile loading.",
    results: [
      "1-Click puppy pad bundle selection",
      "Sub-1.2s mobile load speed",
      "+120% increase in repeat subscription orders"
    ],
    techStack: ["Shopify OS 2.0", "Liquid", "Puppy Pads", "UK Pet Store", "Cart Drawer"]
  },

  "regent-scent": {
    title: "REGENT SCENT UAE",
    category: "Shopify Development",
    subtitle: "Luxury Perfume & Fragrance Store",
    client: "REGENT SCENT Perfumes UAE",
    year: "2026",
    role: "Shopify Solutions Architect",
    liveDemo: "https://regentscents.com",
    github: "https://github.com/agency-portfolio/regent-scent-shopify",
    featuredImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&auto=format&fit=crop&q=80",
    overview: "REGENT SCENT required a premium luxury fragrance storefront tailored for high-end perfume buyers across Dubai, Abu Dhabi, and international UAE markets.",
    challenge: "Reflecting a high-end luxury aesthetic while maintaining fast mobile load times and seamless AED/USD multi-currency switching.",
    solution: "Built a gold-themed custom Shopify Plus Liquid architecture featuring multi-currency localization, custom interactive fragrance note filters, and instant checkout.",
    results: [
      "Luxury responsive UI design",
      "Instant AED / USD multi-currency switching",
      "+160% increase in UAE luxury fragrance sales"
    ],
    techStack: ["Shopify Plus", "Liquid OS 2.0", "Luxury Perfume", "UAE Multi-Currency", "Fragrance Quiz"]
  },

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

  const project = projectDetails[slug] || projectDetails["gb-constructions"];

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
