"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    type: "work",
    date: "2023 - Present",
    role: "Senior Full Stack & WordPress Developer",
    company: "PixelForge Tech (Remote)",
    desc: [
      "Engineered high-performance headless CMS architectures utilizing Next.js / React frontends and decoupled custom WordPress backends via GraphQL.",
      "Optimized site performance and core web vitals, raising mobile Lighthouse performance scores from 45 to 95+ across client properties.",
      "Established standard Git workflows and automated CI/CD deployment pipelines on AWS.",
    ],
    stack: ["React.js", "Node.js", "WordPress Core", "GraphQL", "Tailwind v4", "AWS"],
  },
  {
    type: "work",
    date: "2021 - 2023",
    role: "Full-Stack Developer",
    company: "Nexus Web Solutions",
    desc: [
      "Designed and coded responsive, custom Gutenberg block systems and WooCommerce plugins tailored for complex administrative needs.",
      "Built secure RESTful APIs in Laravel/PHP and integrated payment processors including Stripe and custom payment gateways.",
      "Collaborated closely with design teams to transition high-fidelity Figma concepts into pixel-perfect semantic layouts.",
    ],
    stack: ["PHP", "Laravel", "MySQL", "JavaScript ES6+", "Figma", "Sass"],
  },
  {
    type: "education",
    date: "2017 - 2021",
    role: "BS in Computer Science",
    company: "National University of Sciences & Technology",
    desc: [
      "Graduated with honors. Specialization in Software Engineering, OOP principles, and Database Design Systems.",
      "Developed web-based scheduling engines and real-time dashboard systems as research capstone projects.",
    ],
    stack: ["Java", "Python", "SQL", "HTML5 & CSS3", "Software Architecture"],
  },
];

export default function Experience() {
  const containerRef = useRef();
  const lineRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-header",
        { opacity: 0, y: 20 },
        {
          scrollTrigger: { trigger: ".timeline-header", start: "top 90%" },
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: ".timeline-container", start: "top 30%", end: "bottom 40%", scrub: true },
        }
      );

      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item) => {
        const dot = item.querySelector(".timeline-dot");
        const content = item.querySelector(".timeline-content");

        gsap.fromTo(
          dot,
          { backgroundColor: "#f1f5f9", borderColor: "#e2e8f0", boxShadow: "0 0 0px rgba(0,102,255,0)" },
          {
            backgroundColor: "#ffffff", borderColor: "#0066ff",
            boxShadow: "0 0 12px rgba(0,102,255,0.3)",
            scrollTrigger: { trigger: item, start: "top 70%", end: "top 40%", toggleActions: "play reverse play reverse" },
          }
        );

        gsap.fromTo(
          content,
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 75%" },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border relative"
    >
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full radial-bg-blue opacity-30 -z-10"></div>

      <div className="timeline-header text-center mb-20 space-y-4">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Timeline
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-heading m-0">
          Education & Experience
        </h2>
        <p className="text-text-secondary font-light max-w-xl mx-auto">
          A track record of technical accomplishments and professional roles in software development.
        </p>
      </div>

      <div className="timeline-container relative w-full mt-10">
        {/* Track line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-[1px]"></div>
        {/* Animated line */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] timeline-line -translate-x-[1px] origin-top"
        ></div>

        <div className="space-y-12">
          {timelineData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="timeline-item relative flex flex-col md:flex-row items-start md:justify-between w-full">
                <div className={`hidden md:block w-[45%] text-right font-mono text-sm font-semibold pt-4 text-primary ${isEven ? "" : "order-last text-left"}`}>
                  {item.date}
                </div>

                <div className="timeline-dot absolute left-4 md:left-1/2 w-6 h-6 rounded-full border-2 bg-white border-border z-10 -translate-x-1/2 flex items-center justify-center transition-all duration-300">
                  {item.type === "work" ? (
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5 text-indigo" />
                  )}
                </div>

                <div className={`timeline-content pl-10 md:pl-0 w-full md:w-[45%] text-left ${isEven ? "order-last" : ""}`}>
                  <div className="md:hidden text-xs font-mono font-bold text-primary mb-2">
                    {item.date}
                  </div>

                  <div className="bg-white rounded-2xl p-6 md:p-8 border border-border hover:border-primary/20 transition-all duration-300 shadow-card">
                    <h3 className="text-lg font-bold text-text-heading m-0 leading-tight">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-text-secondary mt-1">
                      {item.company}
                    </div>

                    <ul className="mt-5 space-y-2.5 text-text-secondary text-xs font-light pl-4 list-disc">
                      {item.desc.map((bullet, bidx) => (
                        <li key={bidx} className="leading-relaxed">{bullet}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border">
                      {item.stack.map((stk, sidx) => (
                        <span key={sidx} className="px-2.5 py-1 rounded bg-bg-alt text-[10px] font-mono text-primary border border-border">
                          {stk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
