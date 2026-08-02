"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "MobileCart Canada",
    url: "https://mobilecart.ca/",
    subtitle: "Mobile Selling & Tech E-Commerce Store",
    desc: "A high-performance WordPress & WooCommerce mobile selling storefront engineered for MobileCart Canada, featuring smartphones, tablet accessories, instant checkout, and sub-1.2s loading speeds.",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80",
    stack: ["WooCommerce", "WordPress", "Canada Mobile Store", "Feb 2026", "PHP"],
    github: "https://github.com/agency-portfolio/mobilecart-canada-wp",
    liveDemo: "https://mobilecart.ca/",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "Incubee PK",
    url: "https://www.incubee.pk/",
    subtitle: "Digital Courses & Software House Portal",
    desc: "A modern WordPress agency platform built for Incubee PK, featuring digital skills training courses, student registration portals, software development portfolio showcases, and client inquiry workflows.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    stack: ["WordPress Core", "Digital Courses", "Software House", "Jan 2026", "Elementor Pro"],
    github: "https://github.com/agency-portfolio/incubee-wp",
    liveDemo: "https://www.incubee.pk/",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "Saferdot LMS & Driving Academy",
    url: "https://saferdot.com/",
    subtitle: "LMS & Truck Driving Courses & Certification Portal",
    desc: "A custom WordPress LMS platform built for Saferdot, offering professional truck driving courses, student enrollment workflows, automated quiz evaluations, and verifiable certification issuance.",
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop&q=80",
    stack: ["WordPress LMS", "LearnDash", "Truck Driving", "Certifications", "Dec 2025"],
    github: "https://github.com/agency-portfolio/saferdot-lms-wp",
    liveDemo: "https://saferdot.com/",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "GB Constructions",
    url: "https://gbconstructions.org/",
    subtitle: "Civil Infrastructure, Roads & Bridge Construction Portal",
    desc: "A high-performance WordPress corporate portal engineered for GB Constructions, showcasing major civil infrastructure projects, road works, bridge construction engineering, and municipal tenders.",
    img: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&auto=format&fit=crop&q=80",
    stack: ["WordPress Core", "PHP", "Roads & Bridges", "Civil Engineering", "Technical SEO"],
    github: "https://github.com/agency-portfolio/gbconstructions-wp",
    liveDemo: "https://gbconstructions.org/",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "Shaham AI Chatbot",
    url: "https://shaham-ai.vercel.app/",
    subtitle: "Autonomous AI Assistant & Conversational Bot",
    desc: "An intelligent AI chatbot application powered by OpenAI GPT-4 API and real-time conversational streaming for instant automated customer support and lead qualification.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    stack: ["OpenAI GPT-4", "React.js", "Next.js", "AI Agent", "Tailwind CSS"],
    github: "https://github.com/agency-portfolio/shaham-ai-bot",
    liveDemo: "https://shaham-ai.vercel.app/",
    gridClass: "lg:col-span-6 h-[420px] md:h-[460px]",
  },
  {
    title: "HASC - Halal Animal Selling & Care",
    url: "https://halal-animal-selling-website.vercel.app/",
    subtitle: "Full-Stack E-Commerce & Monthly Care Subscription",
    desc: "A full-stack web application designed for selling and managing animal care during Eid-ul-Adha and special events. Features live animal browsing, instant purchase, monthly care subscription plans, and booking workflows.",
    img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop&q=80",
    stack: ["Node.js", "Express", "MongoDB", "React.js", "Subscriptions", "MERN Stack"],
    github: "https://github.com/Shahamoffical/HalalAnimalSellingWebsite",
    liveDemo: "https://halal-animal-selling-website.vercel.app/",
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
          WordPress, E-commerce, Custom Web &amp; AI Chatbot Builds
        </h3>
        <p className="text-text-secondary font-light text-base max-w-xl mx-auto">
          Explore production builds engineered for client success across WordPress, Shopify Plus, MERN stack full-stack applications, and autonomous AI Chatbots.
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
