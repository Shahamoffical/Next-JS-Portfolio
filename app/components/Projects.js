"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Peakloom UK",
    url: "https://peakloom.co.uk",
    subtitle: "Gym Creatine & Fitness Supplement Store",
    desc: "A high-performance custom Shopify Liquid OS 2.0 storefront engineered for Peakloom UK, specializing in premium gym creatine, workout supplements, subscription bundles, and sub-1.1s mobile speed.",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    stack: ["Shopify Plus", "Liquid OS 2.0", "Creatine Store", "UK E-Commerce", "Make.com"],
    github: "https://github.com/agency-portfolio/peakloom-shopify",
    liveDemo: "https://peakloom.co.uk",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "Furmora UK",
    url: "https://furmora.co.uk",
    subtitle: "Puppy Pads & Pet Supplies Store",
    desc: "Custom Shopify storefront engineered for Furmora UK, featuring 1-click puppy pad product bundles, automated subscription refills, custom slide-out cart drawers, and instant checkout.",
    img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&auto=format&fit=crop&q=80",
    stack: ["Shopify OS 2.0", "Liquid", "Puppy Pads", "UK Pet Store", "Cart Drawer"],
    github: "https://github.com/agency-portfolio/furmora-shopify",
    liveDemo: "https://furmora.co.uk",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "REGENT SCENT UAE",
    url: "https://regentscents.com",
    subtitle: "Luxury Perfume & Fragrance Store",
    desc: "Bespoke luxury fragrance Shopify Plus storefront built for REGENT SCENT UAE, featuring multi-currency AED/USD switching, gold-themed luxury UI, custom fragrance quiz filtering, and instant checkout.",
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&auto=format&fit=crop&q=80",
    stack: ["Shopify Plus", "Liquid OS 2.0", "Luxury Perfume", "UAE Multi-Currency", "Fragrance Quiz"],
    github: "https://github.com/agency-portfolio/regent-scent-shopify",
    liveDemo: "https://regentscents.com",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "MobileCart Canada",
    url: "https://mobilecart.ca",
    subtitle: "Shopify Plus & Mobile Commerce Engine",
    desc: "A high-performance custom Shopify Liquid theme with dynamic product filtering loops, instant checkout extensions, and automated Make.com CRM synchronization.",
    img: "/project_woo.png",
    stack: ["Shopify Plus", "Liquid", "Make.com", "Tailwind CSS", "Technical SEO"],
    github: "https://github.com/agency-portfolio/mobilecart-shopify",
    liveDemo: "https://mobilecart.ca",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "Chateau Salon & Spa",
    url: "https://chateausalon.com",
    subtitle: "Custom WordPress & Booking Architecture",
    desc: "An elegant custom WordPress theme integrated with online appointment scheduling engines, dynamic service galleries, and Google Maps local SEO targeting.",
    img: "/project_wp.png",
    stack: ["WordPress Core", "PHP Laravel", "Vagaro API", "Elementor Pro", "Technical SEO"],
    github: "https://github.com/agency-portfolio/chateausalon-wp",
    liveDemo: "https://chateausalon.com",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "Eatarra Fresh E-Commerce",
    url: "https://eatarra.com",
    subtitle: "WooCommerce & WhatsApp Order Redirection",
    desc: "A scalable WooCommerce storefront featuring custom dynamic product loops, instant WhatsApp order redirection, sub-2 second page speeds, and subscription payments.",
    img: "/project_dash.png",
    stack: ["WooCommerce", "WordPress", "WhatsApp API", "PHP", "Speed 98+"],
    github: "https://github.com/agency-portfolio/eatarra-woocommerce",
    liveDemo: "https://eatarra.com",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  }
];

export default function Projects() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 20 },
        {
          scrollTrigger: { trigger: ".projects-header", start: "top 90%" },
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".project-bento-card",
        { opacity: 0, y: 50 },
        {
          scrollTrigger: { trigger: ".projects-grid", start: "top 85%" },
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border relative"
    >
      <div className="absolute left-1/4 top-1/3 w-[350px] h-[350px] rounded-full radial-bg-blue opacity-20 -z-10"></div>

      <div className="projects-header text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Live Portfolio
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-heading m-0 font-sans">
          Live Project Demos &amp; Web Configurations
        </h2>
        <h3 className="text-xl sm:text-2xl font-semibold text-primary font-sans m-0">
          E-commerce &amp; Corporate Web Builds
        </h3>
        <p className="text-text-secondary font-light text-base max-w-xl mx-auto">
          Explore production builds engineered for client success across Shopify Plus, WordPress, WooCommerce, and custom MERN architectures.
        </p>
      </div>

      <div className="projects-grid grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`project-bento-card group relative rounded-3xl overflow-hidden border border-primary/40 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-end shadow-[0_12px_30px_rgba(192,0,0,0.145)] hover:shadow-[0_16px_36px_rgba(192,0,0,0.22)] ${project.gridClass}`}
          >
            {/* Image */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-bg-alt flex items-center justify-center overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover opacity-90 transition-transform duration-750 scale-100 group-hover:scale-[1.03] group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col items-start text-left space-y-4 max-w-xl transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
                {project.subtitle}
              </div>

              <h4 className="text-2xl font-bold text-text-heading flex items-center gap-2 m-0 group/title">
                <a href={project.liveDemo} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                  {project.title} ({project.url.replace('https://', '')})
                  <ArrowUpRight className="w-5 h-5 text-primary opacity-0 -translate-y-1 translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-y-0 group-hover/title:translate-x-0 transition-all duration-300" />
                </a>
              </h4>

              <p className="text-text-secondary text-sm font-light leading-relaxed m-0 opacity-80 group-hover:opacity-100 transition-opacity">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.stack.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm text-[10px] font-mono text-text-heading border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-all duration-200"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-text-heading text-xs font-mono hover:bg-bg-alt transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
              </div>
            </div>

            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </div>
        ))}
      </div>
    </section>
  );
}
