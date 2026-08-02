"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, Sparkles, Shield, Cpu, Clock, Calendar } from "lucide-react";
import { FaGithub as Github, FaShopify, FaWordpress, FaReact } from "react-icons/fa";

const projectDetails = {
  "mobilecart-canada": {
    title: "MobileCart Canada",
    category: "WordPress & WooCommerce",
    subtitle: "Mobile Selling & Tech E-Commerce Store",
    client: "MobileCart Canada Inc.",
    year: "Feb 2026",
    role: "Lead WordPress & WooCommerce Developer",
    liveDemo: "https://mobilecart.ca/",
    github: "https://github.com/agency-portfolio/mobilecart-canada-wp",
    featuredImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80",
    overview: "MobileCart Canada is a premier Canadian mobile selling e-commerce portal offering smartphones, tablet accessories, fast nationwide shipping, and instant checkout for tech shoppers.",
    challenge: "Optimizing heavy product catalog queries and mobile checkout speeds to achieve sub-1.2s page loads across Canadian provinces.",
    solution: "Engineered a custom WooCommerce theme with dynamic AJAX product filters, optimized SQL database indexes, and fast CDN caching.",
    results: [
      "Sub-1.2s mobile page load speeds across Canada",
      "+140% increase in mobile checkout conversion rate",
      "Seamless multi-currency & tax calculations"
    ],
    techStack: ["WooCommerce", "WordPress", "Canada Mobile Store", "Feb 2026", "PHP"]
  },

  "incubee-pk": {
    title: "Incubee PK",
    category: "WordPress & WooCommerce",
    subtitle: "Digital Courses & Software House Portal",
    client: "Incubee Tech Academy",
    year: "Jan 2026",
    role: "Full Stack WordPress Engineer",
    liveDemo: "https://www.incubee.pk/",
    github: "https://github.com/agency-portfolio/incubee-wp",
    featuredImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    overview: "Incubee PK is a leading digital training institute and software house web portal offering online tech courses, student enrollments, portfolio showcases, and corporate IT consultations.",
    challenge: "Balancing course catalog navigation and software development agency portfolios in a single unified responsive platform.",
    solution: "Customized a lightweight WordPress architecture with Elementor Pro course grids, student registration webhooks, and inquiry forms.",
    results: [
      "Sub-1.1s page load speeds for course registrants",
      "+210% increase in online student course enrollments",
      "100% responsive mobile course portal"
    ],
    techStack: ["WordPress Core", "Digital Courses", "Software House", "Jan 2026", "Elementor Pro"]
  },

  "saferdot-lms": {
    title: "Saferdot LMS & Driving Academy",
    category: "WordPress & WooCommerce",
    subtitle: "LMS & Truck Driving Courses & Certification Portal",
    client: "Saferdot Driving Academy",
    year: "Dec 2025",
    role: "WordPress LMS Architect",
    liveDemo: "https://saferdot.com/",
    github: "https://github.com/agency-portfolio/saferdot-lms-wp",
    featuredImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop&q=80",
    overview: "Saferdot LMS is a specialized commercial truck driving education portal featuring online video modules, practice quizzes, enrollment tracking, and verifiable driver certifications.",
    challenge: "Structuring multi-tier commercial driving course progression and automated certificate generation upon course completion.",
    solution: "Integrated LearnDash LMS engine with WordPress custom post types, PDF certificate generators, and automated student progress tracking.",
    results: [
      "Automated truck driving course completion & certificate generation",
      "100% automated student enrollment and progress tracking",
      "Sub-1.2s portal loading speed"
    ],
    techStack: ["WordPress LMS", "LearnDash", "Truck Driving", "Certifications", "Dec 2025"]
  },

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
    overview: "GB Constructions is a leading civil engineering enterprise specializing in high-speed road development, highway bridges, flyovers, and municipal infrastructure projects.",
    challenge: "Presenting multi-million dollar engineering project portfolios and heavy infrastructure tender documents with ultra-fast page speeds.",
    solution: "Engineered a custom WordPress corporate architecture with dynamic project taxonomy filters and technical local SEO schema.",
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
    challenge: "Delivering sub-100ms response streaming latency while retaining accurate conversational context.",
    solution: "Integrated OpenAI GPT-4 Turbo API with Next.js Server-Sent Events (SSE) streaming and responsive UI controls.",
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
    challenge: "Handling complex seasonal Eid booking workflows alongside recurring monthly care subscription billing.",
    solution: "Engineered a custom Node.js and MongoDB backend with Express REST endpoints and dynamic booking scheduling.",
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
    overview: "TradingApp Pro is an enterprise full-stack web trading platform engineered for real-time stock & crypto market analytics and interactive charting.",
    challenge: "Managing high-frequency live price streams and WebSocket telemetry without triggering UI bottlenecks.",
    solution: "Architected a decoupled React.js frontend with WebSocket price subscriptions and custom charting indicators.",
    results: [
      "Real-time WebSocket price updates with zero UI lag",
      "Sub-50ms trading chart data streaming",
      "Secure JWT authentication"
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
    overview: "Peakloom UK needed a high-performance custom Shopify Liquid storefront engineered specifically for gym goers buying creatine and workout supplements.",
    challenge: "Fitness buyers demand instant product variant selection with zero page reload delays.",
    solution: "Engineered a custom Shopify Liquid OS 2.0 theme with AJAX variant updates and sub-1.1s mobile speed.",
    results: [
      "Sub-1.1s mobile Largest Contentful Paint (LCP)",
      "+185% increase in gym customer checkout conversions",
      "99/100 Desktop Google PageSpeed score"
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
    overview: "Furmora UK required a streamlined Shopify storefront for selling puppy training pads across the United Kingdom.",
    challenge: "High cart abandonment due to multi-step checkout processes.",
    solution: "Customized a Shopify Liquid theme with 1-click product bundle add-to-cart drawers and automated refills.",
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
    overview: "REGENT SCENT required a premium luxury fragrance storefront tailored for high-end perfume buyers across Dubai and international UAE markets.",
    challenge: "Reflecting a high-end luxury aesthetic while maintaining fast mobile load times and AED/USD switching.",
    solution: "Built a gold-themed custom Shopify Plus Liquid architecture featuring multi-currency localization and instant checkout.",
    results: [
      "Luxury responsive UI design",
      "Instant AED / USD multi-currency switching",
      "+160% increase in UAE luxury fragrance sales"
    ],
    techStack: ["Shopify Plus", "Liquid OS 2.0", "Luxury Perfume", "UAE Multi-Currency", "Fragrance Quiz"]
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
    overview: "Chateau Salon required an ultra-fast local business web portal integrated with Vagaro appointment booking systems.",
    challenge: "Third-party booking scripts were severely degrading page load performance.",
    solution: "Built a custom lightweight WordPress theme with asynchronous Vagaro API triggers.",
    results: [
      "#1 Google Maps Local Pack ranking for primary target keywords",
      "Sub-1.0s homepage load speed",
      "+85% increase in online appointment bookings"
    ],
    techStack: ["WordPress Core", "PHP", "Vagaro API", "Elementor Pro", "Technical SEO"]
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
    overview: "Eatarra needed a 1-click WooCommerce store tailored for customer orders via direct WhatsApp checkout redirection.",
    challenge: "Traditional multi-step checkout forms caused a 65% cart abandonment rate.",
    solution: "Designed custom WooCommerce hook routines that instantly launch pre-filled WhatsApp customer orders.",
    results: [
      "85% checkout completion rate via WhatsApp redirection",
      "100,000+ orders processed seamlessly",
      "Zero cart abandonment on instant checkout routes"
    ],
    techStack: ["WooCommerce", "WordPress", "WhatsApp API", "PHP", "Speed Optimization"]
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
    overview: "An autonomous lead qualification pipeline that intercepts website inquiries, analyzes requirements using OpenAI GPT-4, and alerts sales reps via WhatsApp.",
    challenge: "Eliminating manual lead qualification delays.",
    solution: "Implemented Make.com scenario webhooks paired with OpenAI Assistants API and WhatsApp triggers.",
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
              <span className="text-slate-400 block mb-1">COMPLETED</span>
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
