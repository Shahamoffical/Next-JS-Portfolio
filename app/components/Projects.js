"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Headless WooCommerce Engine",
    subtitle: "Custom E-Commerce Platform",
    desc: "A decoupled storefront leveraging Next.js on the frontend, communicating via WPGraphQL with a robust, optimized WordPress core.",
    img: "/project_woo.png",
    stack: ["Next.js", "React.js", "WPGraphQL", "WordPress Core", "Tailwind CSS"],
    link: "https://github.com",
    gridClass: "lg:col-span-7 h-[400px] md:h-[450px]",
  },
  {
    title: "Editorial Showcase Site",
    subtitle: "Creative Design Portfolio",
    desc: "A highly interactive editorial design experience utilizing GSAP ScrollTrigger timeline states for smooth layouts and animations.",
    img: "/project_wp.png",
    stack: ["WordPress Core", "PHP", "GSAP Animations", "Tailwind CSS", "Vite"],
    link: "https://github.com",
    gridClass: "lg:col-span-5 h-[400px] md:h-[450px]",
  },
  {
    title: "Developer Analytics Dashboard",
    subtitle: "Cloud API Orchestration & Web App",
    desc: "A real-time data visualizer tracking API endpoints, request latencies, and billing charts, built on a modular backend.",
    img: "/project_dash.png",
    stack: ["React.js", "Zustand", "Node.js / Express", "Chart.js", "PostgreSQL"],
    link: "https://github.com",
    gridClass: "lg:col-span-12 h-[450px] md:h-[500px]",
  },
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
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border relative"
    >
      <div className="absolute left-1/4 top-1/3 w-[350px] h-[350px] rounded-full radial-bg-blue opacity-20 -z-10"></div>

      <div className="projects-header text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Portfolio
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-heading m-0">
          Selected Projects & Web Apps
        </h2>
        <p className="text-text-secondary font-light">
          A showcase of custom full-stack solutions and WordPress themes built
          with strict attention to performance and clean layout.
        </p>
      </div>

      <div className="projects-grid grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`project-bento-card group relative rounded-3xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 flex flex-col justify-end shadow-card hover:shadow-elevated ${project.gridClass}`}
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

              <h3 className="text-2xl font-bold text-text-heading flex items-center gap-2 m-0 group/title cursor-pointer">
                {project.title}
                <ArrowUpRight className="w-5 h-5 text-primary opacity-0 -translate-y-1 translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-y-0 group-hover/title:translate-x-0 transition-all duration-300" />
              </h3>

              <p className="text-text-secondary text-sm font-light leading-relaxed m-0 opacity-80 group-hover:opacity-100 transition-opacity">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.stack.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded bg-white/80 backdrop-blur-sm text-[10px] font-mono text-text-heading border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary-dark transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              </div>
            </div>

            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </div>
        ))}
      </div>
    </section>
  );
}
