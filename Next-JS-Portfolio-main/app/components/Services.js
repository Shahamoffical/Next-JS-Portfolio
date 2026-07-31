"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Code2, TrendingUp, Layout, Box, Cloud, Database, Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    icon: <Code2 strokeWidth={1.5} className="w-6 h-6" />,
    title: "Shopify Development & Headless Commerce",
    subtitle: "Shopify Plus & Liquid Theme Engineering",
    proficiency: 95,
    color: "#10b981", // Emerald
    tags: ["SHOPIFY PLUS", "LIQUID", "CHECKOUT EXTENSIONS", "DYNAMIC PRODUCT LOOPS"],
    desc: "Custom Liquid templates, customized checkout flows, dynamic product filtering loops, and high-converting headless storefronts."
  },
  {
    num: "02",
    icon: <Layout strokeWidth={1.5} className="w-6 h-6" />,
    title: "WordPress & WooCommerce Developer Solutions",
    subtitle: "Custom Themes & Decoupled Builds",
    proficiency: 94,
    color: "#21759b", // WP Blue
    tags: ["WORDPRESS", "WOOCOMMERCE", "ELEMENTOR", "WHATSAPP REDIRECTION"],
    desc: "Custom WordPress architectures, WooCommerce store builds, Elementor custom widgets, and instant WhatsApp order redirection integrations."
  },
  {
    num: "03",
    icon: <Brain strokeWidth={1.5} className="w-6 h-6" />,
    title: "MERN Stack & Custom Application Development",
    subtitle: "Full-Stack Web Engineering",
    proficiency: 92,
    color: "#c00000", // Crimson Primary
    tags: ["REACT.JS", "NODE.JS", "EXPRESS", "MONGODB"],
    desc: "High-performance single page applications, enterprise REST/GraphQL APIs, real-time dashboards, and custom SaaS architectures."
  },
  {
    num: "04",
    icon: <Cloud strokeWidth={1.5} className="w-6 h-6" />,
    title: "Make.com Automation & Data Workflows",
    subtitle: "Automated Marketing & CRM Integration",
    proficiency: 88,
    color: "#a855f7", // Purple
    tags: ["MAKE.COM", "WEBHOOKS", "AUTOMATED WORKFLOWS", "CRM DATA PIPELINES"],
    desc: "Automating cross-platform data synchronization, automated marketing workflows, inventory webhooks, and customer data pipelines."
  },
  {
    num: "05",
    icon: <TrendingUp strokeWidth={1.5} className="w-6 h-6" />,
    title: "Technical SEO & Speed Optimization",
    subtitle: "Search Engine Authority & Core Web Vitals",
    proficiency: 90,
    color: "#f59e0b", // Orange
    tags: ["TECHNICAL SEO", "PAGESPEED 95+", "SCHEMA MARKUP", "CORE WEB VITALS"],
    desc: "Sub-2 second load speeds, structured schema markup, technical crawl optimizations, and top Google Maps positioning."
  },
  {
    num: "06",
    icon: <Box strokeWidth={1.5} className="w-6 h-6" />,
    title: "3D & Interactive Web Environments",
    subtitle: "Three.js & Immersive UI",
    proficiency: 80,
    color: "#ec4899", // Pink
    tags: ["THREE.JS", "GSAP", "CANVAS INTERACTION"],
    desc: "Engaging 3D canvas backgrounds, GSAP scroll triggers, interactive product configurators, and micro-animations."
  }
];

export default function Services() {
  const sectionRef = useRef();
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-title",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: ".services-title", start: "top 90%", toggleActions: "play none none none" },
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: ".services-grid", start: "top 85%", toggleActions: "play none none none" },
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        }
      );
      
      // Animate progress bars
      gsap.fromTo(
        ".progress-bar-fill",
        { width: "0%" },
        {
          scrollTrigger: { trigger: ".services-grid", start: "top 75%", toggleActions: "play none none none" },
          width: (i, target) => target.dataset.width,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.1
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-section py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Background decorations - soft blurred spots */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-50/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-100/30 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className="services-title text-center mb-16 space-y-3">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Agency Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-heading m-0 font-sans">
          Specialized Web Development Services
        </h2>
        <div className="w-16 h-[2px] mx-auto bg-gradient-to-r from-primary to-primary-dark rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 relative z-10">
        {services.map((svc, i) => (
          <div
            key={i}
            onClick={() => setActiveCard(i)}
            onMouseEnter={() => setActiveCard(i)}
            onMouseLeave={() => setActiveCard(null)}
            className="service-card group relative bg-white rounded-3xl p-7 transition-all duration-500 cursor-pointer"
            style={{ 
              boxShadow: activeCard === i ? `0 12px 30px ${svc.color}28` : `0 8px 24px ${svc.color}15`,
              borderColor: activeCard === i ? `${svc.color}60` : `${svc.color}38`,
              borderWidth: "1px",
              borderStyle: "solid",
              transform: activeCard === i ? "translateY(-4px)" : "translateY(0)"
            }}
          >
            {/* Active background gradient */}
            <div 
              className="absolute inset-0 transition-opacity duration-500 rounded-3xl z-0 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom right, ${svc.color}15, white)`,
                opacity: activeCard === i ? 1 : 0
              }}
            ></div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Top Row: Icon and Number */}
              <div className="flex justify-between items-start mb-8">
                <div 
                  className="p-3.5 rounded-2xl transition-colors duration-300 shadow-sm"
                  style={{ color: svc.color, backgroundColor: `${svc.color}15` }}
                >
                  {svc.icon}
                </div>
                <span className="text-gray-300 font-bold text-sm tracking-widest">{svc.num}</span>
              </div>

              {/* Title and Subtitle */}
              <div className="mb-10">
                <h3 className="text-[19px] font-bold text-gray-900 mb-1.5">{svc.title}</h3>
                <p className="text-[13px] font-medium text-gray-500">{svc.subtitle}</p>
              </div>

              <div className="mt-auto">
                {/* Proficiency Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase">PROFICIENCY</span>
                  <span className="text-xs font-bold" style={{ color: svc.color }}>{svc.proficiency}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1 w-full bg-gray-100 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="progress-bar-fill h-full rounded-full"
                    data-width={`${svc.proficiency}%`}
                    style={{ backgroundColor: svc.color }}
                  ></div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-bold px-3 py-1.5 rounded-full border transition-all duration-300 tracking-wider whitespace-nowrap"
                      style={{
                         backgroundColor: activeCard === i ? `${svc.color}15` : '#f9fafb',
                         color: activeCard === i ? svc.color : '#9ca3af',
                         borderColor: activeCard === i ? 'transparent' : '#f3f4f6'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

