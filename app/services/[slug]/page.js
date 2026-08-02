"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Cpu,
  Code2,
  Rocket,
  Zap,
  MessageSquare,
  Compass,
  Layers,
  Workflow,
  ShoppingBag,
  Globe,
  Clock,
  Award
} from "lucide-react";
import { FaShopify, FaWordpress, FaReact } from "react-icons/fa";

const capabilityIcons = [Sparkles, Code2, Zap, Layers, ShieldCheck, Workflow];
const processIcons = [Compass, Code2, CheckCircle2, Rocket];

const serviceDetails = {
  "shopify-development": {
    slug: "shopify-development",
    title: "Shopify & Shopify Plus Development",
    icon: FaShopify,
    subtitle: "Custom Liquid Themes, OS 2.0 Architectures & High-Volume E-Commerce Optimization",
    badge: "Shopify Expert",
    overview: "We engineer high-converting, sub-second custom Shopify Liquid themes and Shopify Plus architectures. From custom slide-out cart drawers to complex product section rendering and Make.com CRM synchronization, we deliver full-scale e-commerce solutions.",
    capabilities: [
      { title: "Custom Shopify Liquid OS 2.0 Themes", desc: "Bespoke pixel-perfect themes built from scratch with modular drag-and-drop section schemas." },
      { title: "Shopify Plus Replatforming", desc: "Seamless migration of high-volume stores with zero data loss or SEO ranking drops." },
      { title: "AJAX Slide-Out Cart Drawers", desc: "Instant slide-out cart drawers with dynamic free-shipping progress bars and upsells." },
      { title: "Checkout Extensibility & Apps", desc: "Custom checkout UI extensions, order routing scripts, and private Shopify app integrations." },
      { title: "Sub-2 Second Mobile Speed", desc: "Optimized Liquid loops, WebP image compression, and lazy loading for sub-1.2s mobile LCP." },
      { title: "Make.com & ERP Webhooks", desc: "Real-time automated synchronization between Shopify orders, inventory, and CRMs." }
    ],
    techStack: ["Shopify Plus", "Liquid OS 2.0", "Shopify Storefront API", "GraphQL", "JavaScript ES6", "Tailwind CSS", "Make.com"],
    process: [
      { title: "Architecture & Wireframing", desc: "Designing responsive UI layouts and mapping section schema requirements." },
      { title: "Custom Liquid Development", desc: "Writing clean, semantic Liquid code with zero bloat or slow app dependencies." },
      { title: "Speed & SEO Audit", desc: "Enforcing 95+ PageSpeed scores, Schema.org product markup, and Core Web Vitals." },
      { title: "Launch & Support", desc: "Staging deployment, domain DNS setup, and post-launch technical maintenance." }
    ],
    faq: [
      {
        q: "Can you convert our custom Figma designs into a Shopify Liquid OS 2.0 theme?",
        a: "Yes, we specialize in converting Figma designs directly into pixel-perfect custom Shopify Liquid OS 2.0 themes with full drag-and-drop section controls.",
        icon: ShoppingBag
      },
      {
        q: "Will our custom Shopify store pass Google Core Web Vitals on mobile?",
        a: "Guaranteed. We optimize Liquid loops, asset loading, and image compression to achieve sub-2 second mobile load times and 95+ PageSpeed scores.",
        icon: Zap
      },
      {
        q: "How do you handle Shopify Plus replatforming without losing SEO traffic?",
        a: "We implement 1-to-1 URL redirect maps (301s), preserve meta schemas, and migrate all customer & order history with zero data loss or ranking drops.",
        icon: ShieldCheck
      },
      {
        q: "Can you build custom slide-out cart drawers with upsell offers?",
        a: "Yes, we build custom AJAX slide-out cart drawers with dynamic free-shipping progress bars, upsell product recommendations, and custom gift notes.",
        icon: Code2
      },
      {
        q: "Do you integrate Make.com workflows for automated inventory sync?",
        a: "Yes, we build automated Make.com webhook scenarios connecting your Shopify store directly with inventory management, CRMs, and ERP systems.",
        icon: Cpu
      }
    ]
  },

  "wordpress-woocommerce": {
    slug: "wordpress-woocommerce",
    title: "WordPress & WooCommerce Solutions",
    icon: FaWordpress,
    subtitle: "Custom PHP Themes, Decoupled WPGraphQL & WhatsApp Order Redirection",
    badge: "WordPress Specialist",
    overview: "Custom WordPress and WooCommerce solutions tailored for businesses that demand high page speed, flexible content management, and custom booking integrations.",
    capabilities: [
      { title: "Custom WordPress Theme Development", desc: "Clean PHP theme architectures without bulky pre-built page builders." },
      { title: "WooCommerce Custom Checkouts", desc: "Optimized 1-click WooCommerce checkouts and instant WhatsApp order redirection." },
      { title: "Headless WP & WPGraphQL", desc: "Decoupled Headless WordPress paired with Next.js frontend for sub-second speeds." },
      { title: "Vagaro & Booking API Sync", desc: "Direct API integrations with appointment booking engines like Vagaro and BeautyOS." },
      { title: "Security & Malware Protection", desc: "Hardened WordPress security, automated daily backups, and SSL firewall setup." },
      { title: "Google Maps Local SEO", desc: "Structured LocalBusiness schema for #1 local map pack rankings." }
    ],
    techStack: ["WordPress Core", "WooCommerce", "PHP", "WPGraphQL", "REST APIs", "Vagaro API", "Elementor Pro"],
    process: [
      { title: "Discovery & Planning", desc: "Defining site structure, booking integrations, and SEO keyword targets." },
      { title: "PHP Theme Engineering", desc: "Developing lightweight custom WordPress templates and WooCommerce hooks." },
      { title: "Performance Tuning", desc: "Caching configuration, database query cleanup, and asset minification." },
      { title: "Deployment & Training", desc: "Live site deployment, SSL installation, and admin walkthrough training." }
    ],
    faq: [
      {
        q: "Can you build a custom WordPress theme without heavy page builders?",
        a: "Yes, we write clean custom PHP themes and Gutenberg blocks to ensure lightweight performance and sub-1 second page loads.",
        icon: Globe
      },
      {
        q: "How does WooCommerce WhatsApp checkout redirection work?",
        a: "We build custom 1-click WooCommerce checkout flows that launch pre-filled WhatsApp customer order messages instantly.",
        icon: MessageSquare
      },
      {
        q: "Can you build a Headless WordPress architecture with Next.js & WPGraphQL?",
        a: "Yes, we decouple WordPress backend with Next.js frontend via WPGraphQL APIs for sub-second speeds and maximum security.",
        icon: Zap
      },
      {
        q: "Do you integrate Vagaro or external booking APIs into WordPress?",
        a: "Yes, we integrate third-party booking APIs (Vagaro, Mindbody, Acuity) directly into custom WordPress user interfaces.",
        icon: ShieldCheck
      },
      {
        q: "How do you secure WordPress against malware and security breaches?",
        a: "We implement hardened security headers, SSL firewalls, automated daily backups, and malware protection routines.",
        icon: Clock
      }
    ]
  },

  "custom-development": {
    slug: "custom-development",
    title: "Full Stack Custom Development",
    icon: FaReact,
    subtitle: "MERN Stack Web Applications, React/Next.js Frontend & Node.js REST APIs",
    badge: "MERN Stack Architect",
    overview: "Engineered web applications built using modern JavaScript stacks (React, Next.js, Node.js, Express, MongoDB). Ideal for custom SaaS portals, admin dashboards, and complex digital platforms.",
    capabilities: [
      { title: "MERN Stack Web Apps", desc: "Scalable MongoDB, Express, React, and Node.js web applications." },
      { title: "Next.js SSR & ISR Frontend", desc: "Server-side rendered and incrementally generated Next.js web applications." },
      { title: "REST & GraphQL APIs", desc: "Secure backend microservices with JWT authentication and rate limiting." },
      { title: "Custom Admin Dashboards", desc: "Tailored CMS dashboards for managing projects, leads, and analytics." },
      { title: "Stripe & Payment Gateways", desc: "PCI-compliant payment processing with subscription billing webhooks." },
      { title: "Cloud Hosting & Vercel", desc: "Automated CI/CD deployments on Vercel, AWS, and Supabase cloud infrastructure." }
    ],
    techStack: ["React.js", "Next.js", "Node.js", "Express", "MongoDB", "Supabase", "Tailwind CSS", "TypeScript"],
    process: [
      { title: "API Schema Design", desc: "Architecting database models, REST endpoints, and security auth flows." },
      { title: "Frontend Component Dev", desc: "Building modular React/Next.js components with Tailwind CSS." },
      { title: "Integration & Testing", desc: "End-to-end API integration, unit testing, and load testing." },
      { title: "Vercel Production Launch", desc: "Deploying production environment with automated SSL & CDN routing." }
    ],
    faq: [
      {
        q: "Why choose Next.js & React over traditional web applications?",
        a: "Next.js provides server-side rendering (SSR), incremental static regeneration (ISR), instant page transitions, and superior search engine indexing.",
        icon: Code2
      },
      {
        q: "Do you handle custom REST and GraphQL API development?",
        a: "Yes, we design secure Node.js and Express backend microservices with JWT authentication, rate limiting, and database indexing.",
        icon: Cpu
      },
      {
        q: "Can you build custom admin CMS dashboards tailored to our business?",
        a: "Yes, we engineer custom admin dashboards for managing projects, client leads, order workflows, and real-time analytics.",
        icon: ShieldCheck
      },
      {
        q: "How do you integrate payment gateways like Stripe & PayPal?",
        a: "We build PCI-compliant Stripe and PayPal integrations with webhook handlers for single purchases and recurring subscription billing.",
        icon: Zap
      },
      {
        q: "What database solutions do you implement for MERN stack builds?",
        a: "We design and manage MongoDB, PostgreSQL, and Supabase database schemas with automated daily backup routines.",
        icon: Clock
      }
    ]
  },

  "ai-agents-automations": {
    slug: "ai-agents-automations",
    title: "AI Agents & Workflow Automations",
    icon: Cpu,
    subtitle: "Autonomous Lead Pipelines, Make.com Scenarios & WhatsApp AI Bots",
    badge: "AI Automation Specialist",
    overview: "Automate manual business workflows with intelligent AI agents and Make.com integrations. We build 24/7 lead qualification pipelines, WhatsApp automated customer bots, and custom OpenAI GPT-4 API workflows.",
    capabilities: [
      { title: "Make.com Workflow Automation", desc: "Complex automated multi-step scenarios connecting forms, CRMs, and email pipelines." },
      { title: "OpenAI GPT-4 API Agents", desc: "Custom AI assistants trained on your business data for instant customer support." },
      { title: "WhatsApp Business API Bots", desc: "Automated conversational checkout and lead qualification directly inside WhatsApp." },
      { title: "Automated Lead Routing", desc: "Instant SMS/WhatsApp alerts sent to your sales team whenever a prospect submits a lead." },
      { title: "Inventory & CRM Sync", desc: "Automated two-way syncing between e-commerce platforms and Google Sheets/CRMs." },
      { title: "Custom Webhook Integrations", desc: "Connecting disparate SaaS applications via secure REST webhook endpoints." }
    ],
    techStack: ["Make.com", "OpenAI API", "WhatsApp Business API", "Node.js", "Webhooks", "JSON", "Supabase"],
    process: [
      { title: "Workflow Audit", desc: "Mapping out repetitive business tasks and lead qualification bottlenecks." },
      { title: "Make.com Scenario Build", desc: "Building error-handled automation scenarios and API webhooks." },
      { title: "AI Prompt Tuning", desc: "Fine-tuning OpenAI assistant prompts for accurate business responses." },
      { title: "Live Automation Testing", desc: "Rigorous testing to ensure 100% reliable 24/7 execution." }
    ],
    faq: [
      {
        q: "How fast does the AI agent respond to incoming website leads?",
        a: "Inquiries are processed in less than 5 seconds, qualifying prospects via OpenAI GPT-4 and sending instant WhatsApp alerts to your sales team.",
        icon: Cpu
      },
      {
        q: "Do we need coding experience to manage Make.com scenarios?",
        a: "No, Make.com features a visual workflow builder. We provide complete setup documentation and video walkthroughs for your team.",
        icon: Workflow
      },
      {
        q: "Can you build a 24/7 automated WhatsApp customer support bot?",
        a: "Yes, we build intelligent WhatsApp Business API bots trained on your business data for automated order tracking and FAQs.",
        icon: MessageSquare
      },
      {
        q: "Is our customer and business data secure with AI workflows?",
        a: "Yes, all OpenAI and Make.com integrations use enterprise API security with zero data retention for model training.",
        icon: ShieldCheck
      },
      {
        q: "Can AI automations sync Shopify and Google Sheets in real-time?",
        a: "Yes, we build two-way automated webhooks that sync Shopify orders, customer details, and inventory into Google Sheets or CRMs.",
        icon: Clock
      }
    ]
  },

  "website-speed-seo": {
    slug: "website-speed-seo",
    title: "Website Speed & Technical SEO",
    icon: Zap,
    subtitle: "Sub-2 Second Mobile Speed Optimization & Google Maps #1 Ranking",
    badge: "Speed & SEO Specialist",
    overview: "Transform slow-loading websites into high-speed sales machines. We optimize Core Web Vitals (LCP, CLS, INP) and implement advanced technical SEO to double organic search traffic.",
    capabilities: [
      { title: "Sub-2 Second Speed Guarantee", desc: "Passing mobile Core Web Vitals benchmarks with sub-1.2s Largest Contentful Paint." },
      { title: "Google Maps Local SEO", desc: "Optimizing Google Business Profiles and local citations for top local map rankings." },
      { title: "Schema.org Structured Data", desc: "JSON-LD product, review, and organization schema for rich Google search snippets." },
      { title: "Asset & JS Minification", desc: "Async script loading, critical CSS extraction, and WebP image optimization." },
      { title: "Technical SEO Audits", desc: "Fixing crawl errors, duplicate content, canonical tags, and XML sitemaps." },
      { title: "Server Caching & CDN Setup", desc: "Cloudflare CDN routing, edge caching, and server compression optimization." }
    ],
    techStack: ["Google PageSpeed Insights", "Lighthouse", "Cloudflare CDN", "Schema.org JSON-LD", "Core Web Vitals", "GSC"],
    process: [
      { title: "Performance Audit", desc: "Analyzing initial Lighthouse scores, render-blocking resources, and LCP delays." },
      { title: "Code & Asset Optimization", desc: "Compressing media, refactoring Liquid/PHP loops, and minifying scripts." },
      { title: "Technical SEO Implementation", desc: "Injecting JSON-LD schema, optimizing title tags, and submitting sitemaps." },
      { title: "Verification & Report", desc: "Running post-optimization audits to confirm 95+ PageSpeed scores." }
    ],
    faq: [
      {
        q: "Can you fix slow Shopify or WordPress sites without breaking design?",
        a: "Absolutely. All speed optimizations preserve your exact design layout while eliminating unnecessary script bottlenecks.",
        icon: Zap
      },
      {
        q: "How do you achieve #1 Google Maps Local Pack rankings?",
        a: "We implement structured Schema.org LocalBusiness data, optimize Google Business Profiles, and build authoritative local citations.",
        icon: Award
      },
      {
        q: "What Core Web Vitals metrics do you optimize for Google?",
        a: "We optimize Largest Contentful Paint (LCP < 1.2s), Cumulative Layout Shift (CLS = 0), and Interaction to Next Paint (INP).",
        icon: ShieldCheck
      },
      {
        q: "What is Schema.org JSON-LD structured data and why is it vital?",
        a: "JSON-LD schema gives Google search bots clear product, pricing, review, and author data to generate rich search snippets.",
        icon: Code2
      },
      {
        q: "How long does it take to see organic Google SEO ranking improvements?",
        a: "Technical SEO fixes and schema injection typically reflect in Google Search Console rankings within 2 to 4 weeks.",
        icon: Clock
      }
    ]
  }
};

export default function SingleServicePage() {
  const params = useParams();
  const slug = params?.slug;

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const service = serviceDetails[slug] || serviceDetails["shopify-development"];
  const ServiceIcon = service.icon;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-primary font-bold">{service.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> {service.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
              Available for Contract &amp; Full-Time
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight flex items-center gap-3">
              <ServiceIcon className="w-10 h-10 text-primary shrink-0" />
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-primary font-semibold font-mono">
              {service.subtitle}
            </p>
          </div>

          <p className="text-slate-600 font-light text-base leading-relaxed">
            {service.overview}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-[0_4px_16px_rgba(192,0,0,0.35)]"
            >
              <MessageSquare className="w-4 h-4" /> Request Quote for {service.title} &rarr;
            </Link>
            <a
              href="mailto:shahamabbasdev@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono font-bold hover:bg-slate-100 transition-colors"
            >
              Direct Email &rarr;
            </a>
          </div>
        </div>

        {/* Capabilities Grid (6 Cards with SVG Icons) */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">Features &amp; Deliverables</span>
            <h2 className="text-2xl font-bold text-slate-900 m-0">What We Build &amp; Deliver</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.capabilities.map((cap, idx) => {
              const CapIcon = capabilityIcons[idx % capabilityIcons.length];
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3 hover:border-primary/40 hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-xs">
                    <CapIcon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 m-0">{cap.title}</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed m-0">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider border-b border-slate-100 pb-3">
            Tech Stack &amp; Specialized Tools
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {service.techStack.map((tech, idx) => (
              <span key={idx} className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Process Timeline (4 Steps with SVG Icons) */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">Workflow</span>
            <h2 className="text-2xl font-bold text-slate-900 m-0">Engineering Process</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((p, idx) => {
              const StepIcon = processIcons[idx % processIcons.length];
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 absolute top-4 right-4">
                    <StepIcon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 m-0 pr-8">{p.title}</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed m-0">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section Matching Reference Image (5 Custom Questions Per Service) */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">Service FAQs</span>
            <h2 className="text-2xl font-bold text-slate-900 m-0">Frequently Asked Questions</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md divide-y divide-slate-200">
            {service.faq.map((item, idx) => {
              const QuestionIcon = item.icon || Sparkles;
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-5 first:pt-0 last:pb-0 transition-colors">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                        isOpen ? "bg-primary text-white" : "bg-slate-100 text-slate-900 group-hover:bg-primary group-hover:text-white"
                      }`}>
                        <QuestionIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors m-0">
                        {item.q}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : "group-hover:text-slate-700"
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pl-14 pt-3 text-xs sm:text-sm text-slate-600 font-light leading-relaxed animate-in fade-in duration-200">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary via-[#820000] to-[#500000] text-white space-y-6 shadow-2xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold m-0">Ready to Start Your {service.title} Project?</h2>
          <p className="text-white/80 text-sm font-light max-w-xl mx-auto m-0">
            Get in touch for a free technical consultation and fixed project quote. We respond within 24 hours.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-xl"
            >
              Submit Project Inquiry &rarr;
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-8 border-t border-slate-200">
          <Link href="/services" className="inline-flex items-center gap-2 text-xs font-bold font-mono text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>
        </div>
      </div>
    </div>
  );
}
