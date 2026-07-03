"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", percent: 99, color: "#E44D26", icon: "🌐" },
  { name: "CSS", percent: 95, color: "#2965F1", icon: "🎨" },
  { name: "JavaScript", percent: 95, color: "#F7DF1E", icon: "⚡" },
  { name: "Liquid", percent: 90, color: "#0066ff", icon: "💧" },
  { name: "Figma", percent: 90, color: "#A259FF", icon: "🖌️" },
  { name: "WordPress", percent: 95, color: "#21759B", icon: "📝" },
  { name: "Shopify", percent: 90, color: "#96BF48", icon: "🛒" },
  { name: "SEO", percent: 85, color: "#FF6B35", icon: "🔍" },
  { name: "ClickUp", percent: 85, color: "#7B68EE", icon: "✅" },
  { name: "Slack", percent: 90, color: "#4A154B", icon: "💬" },
  { name: "Communication", percent: 95, color: "#0066ff", icon: "🗣️" },
  { name: "Node.js", percent: 88, color: "#339933", icon: "🟢" },
];

export default function Skills() {
  const containerRef = useRef();
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 25 },
        {
          scrollTrigger: { trigger: ".skills-header", start: "top 90%" },
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 90%",
            onEnter: () => setHasAnimated(true),
          },
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".progress-ring-fg",
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: (i, el) => {
            const percent = parseInt(el.getAttribute("data-percent"), 10);
            return circumference - (percent / 100) * circumference;
          },
          duration: 1.8, ease: "power2.out", stagger: 0.08,
          scrollTrigger: { trigger: ".skills-grid", start: "top 85%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-border relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-50 -z-10 radial-bg-indigo"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-40 -z-10 radial-bg-blue"></div>
      <div className="absolute inset-0 -z-10 opacity-[0.4] dot-grid"></div>

      {/* Header */}
      <div className="skills-header text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Top Skills
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-heading m-0">
          See my{" "}
          <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
            expertise
          </span>
        </h2>
        <p className="text-text-secondary font-light">
          A fusion of technical proficiency and creative design thinking,
          developed over years of professional experience.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="skill-card group relative flex flex-col items-center text-center py-8 px-4 rounded-[2rem] transition-all duration-400 cursor-default bg-white border border-border"
            style={{ boxShadow: "var(--shadow-card)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${skill.color}40`;
              e.currentTarget.style.boxShadow = `0 4px 24px ${skill.color}15, 0 1px 4px rgba(0,0,0,0.04)`;
              e.currentTarget.style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.boxShadow = "var(--shadow-card)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Circular Progress Ring */}
            <div className="relative w-[100px] h-[100px] mb-5">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#e2e8f0" strokeWidth="6" />
                <circle
                  className="progress-ring-fg"
                  cx="50" cy="50" r={radius}
                  fill="transparent" stroke={skill.color}
                  strokeWidth="6" strokeDasharray={circumference}
                  strokeDashoffset={circumference}
                  data-percent={skill.percent}
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 4px ${skill.color}40)`, transition: "stroke-dashoffset 1.8s ease-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                {skill.icon}
              </div>
            </div>

            {/* Percentage */}
            <div className="flex items-baseline gap-0.5 mb-1">
              <span className="text-3xl font-bold text-text-heading">{skill.percent}</span>
              <span className="text-lg text-text-muted font-light">%</span>
            </div>

            {/* Name */}
            <span className="text-[11px] font-mono uppercase tracking-widest text-text-secondary mt-1">
              {skill.name}
            </span>

            {/* Bottom bar */}
            <div
              className="mt-5 w-[4px] h-[20px] rounded-full opacity-80"
              style={{ backgroundColor: skill.color }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}
