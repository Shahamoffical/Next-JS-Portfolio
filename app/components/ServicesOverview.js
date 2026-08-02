"use client";

import React from "react";
import { ArrowUpRight, CheckCircle2, Cpu } from "lucide-react";
import { FaShopify, FaWordpress, FaReact } from "react-icons/fa";
import { SiSpeedtest } from "react-icons/si";
import Link from "next/link";

const servicesList = [
  {
    slug: "shopify-development",
    icon: <FaShopify className="w-8 h-8 text-[#96bf48]" />,
    color: "#96bf48",
    title: "Shopify & Shopify Plus Development",
    desc: "Custom Liquid theme engineering, checkout extensions, section rendering, and seamless app integrations.",
    bullets: ["Custom Liquid Themes", "Shopify Plus Replatforming", "Sub-2s Speed Optimization"]
  },
  {
    slug: "wordpress-woocommerce",
    icon: <FaWordpress className="w-8 h-8 text-[#21759b]" />,
    color: "#21759b",
    title: "WordPress & WooCommerce Engineering",
    desc: "Decoupled headless architectures with WPGraphQL, Elementor Pro customization, and Vagaro/Make.com webhooks.",
    bullets: ["Headless WPGraphQL Builds", "WooCommerce Automation", "Custom Plugin Development"]
  },
  {
    slug: "custom-development",
    icon: <FaReact className="w-8 h-8 text-[#61dafb]" />,
    color: "#61dafb",
    title: "MERN Stack Web Applications",
    desc: "Full-stack React, Next.js, Node.js, and MongoDB platforms built for high scalability and complex workflow security.",
    bullets: ["React & Next.js SSR/SSG", "REST & GraphQL APIs", "Secure Admin Portals"]
  },
  {
    slug: "ai-agents-automations",
    icon: <Cpu className="w-8 h-8 text-[#8b5cf6]" />,
    color: "#8b5cf6",
    title: "AI Agents & Workflow Automations",
    desc: "24/7 autonomous lead qualification pipelines, OpenAI GPT-4 API workflows, and WhatsApp Business API bots.",
    bullets: ["Make.com Scenario Build", "OpenAI GPT-4 Agents", "WhatsApp Order Bots"]
  },
  {
    slug: "website-speed-seo",
    icon: <SiSpeedtest className="w-8 h-8 text-[#ec4899]" />,
    color: "#ec4899",
    title: "Technical SEO & Speed Optimization",
    desc: "Passing Core Web Vitals (LCP, CLS, INP) for 98+ PageSpeed desktop/mobile scores and Google Maps rank dominance.",
    bullets: ["Core Web Vitals Pass", "JSON-LD Schema Markup", "Sub-2s Page Load"]
  }
];

export default function ServicesOverview() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold uppercase tracking-wider">
          Our Specializations
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Specialized Digital Engineering Services
        </h1>
        <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
          High-performance development solutions for scaling e-commerce brands, custom web platforms, and automated workflow pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between group"
            style={{
              borderColor: `${service.color}40`,
              borderWidth: "1px"
            }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">{service.icon}</div>
                <Link
                  href={`/services/${service.slug}`}
                  className="p-2.5 rounded-full bg-slate-50 group-hover:bg-primary group-hover:text-white transition-colors text-slate-400"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                  <Link href={`/services/${service.slug}`}>
                    {service.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{service.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs font-mono font-medium text-slate-700">
                {service.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href={`/services/${service.slug}`}
                className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono font-bold hover:bg-primary hover:text-white hover:border-primary transition-all text-center block"
              >
                View Service Details &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
